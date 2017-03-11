import React, {PropTypes} from 'react';
import createSyntheticFormEvent from './utils/createSyntheticFormEvent';
import constants from './constants';

const propTypes = {
  onChange: PropTypes.func,
  onError: PropTypes.func
};

const applySideEffects = (sideEffects, evt, props) => (
  sideEffects.reduce(
    (p, fn) => p.then((event) => fn(event, props)),
    Promise.resolve(evt)
  )
);

const handleChange = (sideEffects) => (props) => (evt) => {
  let event = createSyntheticFormEvent(evt);

  applySideEffects(sideEffects, event, props)
    .then((event) => props.onChange(event))
    .catch((err) => props.onError(err, constants.SIDE_EFFECTS_ERROR));
};

const withSideEffects = (sideEffects = []) => (Component) => {
  const onChangeHandler = handleChange(sideEffects);

  class FormWithSideEffects extends React.Component {
    render() {
      return (
        <Component
          {...this.props}
          onChange={onChangeHandler(this.props)}
        />
      );
    }
  }

  FormWithSideEffects.propTypes = propTypes;
  return FormWithSideEffects;
};

export default withSideEffects;

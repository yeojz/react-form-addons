import React from 'react'; 
import PropTypes from 'prop-types';
import invariant from 'invariant';
import createSyntheticFormEvent from '../utils/createSyntheticFormEvent';
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

  invariant(
    Array.isArray(sideEffects),
    `
    Missing or invalid argument 1 for "withSideEffects".
    Expects an argument 1 of type "array". "${typeof sideEffects}" given.
    `
  );

  const onChangeHandler = handleChange(sideEffects);

  class FormWithSideEffects extends React.Component {
    static propTypes = propTypes;

    render() {
      return (
        <Component
          {...this.props}
          onChange={onChangeHandler(this.props)}
        />
      );
    }
  }

  return FormWithSideEffects;
};

export default withSideEffects;

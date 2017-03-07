import React, {PropTypes} from 'react';
import createSyntheticFormEvent from './utils/createSyntheticFormEvent';

const propTypes = {
  formData: PropTypes.object,
  onChange: PropTypes.func
};

const defaultProps = {
  formData: {}
};

const passthrough = (data) => data;

const applySideEffects = (sideEffects, evt, props) => {
  const effects = sideEffects.length > 0 ? sideEffects : [passthrough];

  return effects.reduce(
    (event, fn) => fn(event, props),
    evt
  );
};

const handleChange = (sideEffects) => (props) => (evt) => {
  let event = createSyntheticFormEvent(evt);
  event = applySideEffects(sideEffects, event, props);
  return props.onChange(event);
};

const withSideEffects = (...sideEffects) => (Component) => {
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
  FormWithSideEffects.defaultProps = defaultProps;
  return FormWithSideEffects;
};

export default withSideEffects;

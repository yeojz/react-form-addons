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

  function FormWithSideEffects(props) {
    return (
      <Component
        {...props}
        onChange={onChangeHandler(props)}
      />
    );
  }
  FormWithSideEffects.propTypes = propTypes;
  FormWithSideEffects.defaultProps = defaultProps;
  return FormWithSideEffects;
};

export default withSideEffects;

import React, {PropTypes} from 'react';
import createSyntheticFormEvent from './utils/createSyntheticFormEvent';
import getDataFromKey from './utils/getDataFromKey';
import updateObjectData from './utils/updateObjectData';

const propTypes = {
  formData: PropTypes.object,
  formMeta: PropTypes.object,
  onChange: PropTypes.func
};

const defaultProps = {
  formData: {},
  formMeta: {}
};

const handleToggle = ({formData, formMeta, onChange}) => (evt) => {
  let event = createSyntheticFormEvent(evt, formData, formMeta);
  event.formData = updateObjectData(formData, evt, true);
  return onChange(event);
};

const handleChange = ({formData, formMeta, onChange}) => (evt) => {
  let event = createSyntheticFormEvent(evt, formData, formMeta);
  event.formData = updateObjectData(formData, evt);
  return onChange(event);
};

const withProps = () => (Component) => {
  function FormWithProps(props) {
      return (
      <Component
        {...props}
        formData={props.formData}
        formMeta={props.formMeta}
        getFormData={getDataFromKey(props.formData)}
        getFormMeta={getDataFromKey(props.formMeta)}
        onChange={handleChange(props)}
        onToggle={handleToggle(props)}
      />
    );
  }

  FormWithProps.propTypes = propTypes;
  FormWithProps.defaultProps = defaultProps;
  return FormWithProps;
};

export default withProps;

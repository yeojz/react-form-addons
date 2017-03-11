import React, {PropTypes} from 'react';
import get from 'lodash/get';
import createSyntheticFormEvent from './utils/createSyntheticFormEvent';
import getDataFromKey from './utils/getDataFromKey';
import updateObjectData from './utils/updateObjectData';

const propTypes = {
  name: PropTypes.string,
  formData: PropTypes.object,
  formMeta: PropTypes.object,
  onChange: PropTypes.func
};

const cloneData = (name, data) => ({
  ...get(data, name, {})
});

const getTarget = (name, value) => ({
  name,
  value
});

const updateKey = (name, data, value) => (
  updateObjectData(
    data,
    {target: getTarget(name, value)}
  )
);

const handleChange = (name, props) => (evt) => {
  let event = createSyntheticFormEvent(evt);
  event.target = getTarget(name, event.formData);
  event.formData = updateKey(name, props.formData, event.formData);
  event.formMeta = updateKey(name, props.formMeta, event.formMeta);
  return props.onChange(event);
};

const branch = (defaultName = 'default') => (Component) => {

  const defaultProps = {
    name: defaultName,
    formData: {},
    formMeta: {}
  };

  class BranchedForm extends React.Component {
    render() {
      const formData = cloneData(this.props.name, this.props.formData);
      const formMeta = cloneData(this.props.name, this.props.formMeta);

      return (
        <Component
          {...this.props}
          formData={formData}
          formMeta={formMeta}
          getFormData={getDataFromKey(formData)}
          getFormMeta={getDataFromKey(formMeta)}
          onChange={handleChange(this.props.name, this.props)}
        />
      );
    }
  }

  BranchedForm.propTypes = propTypes;
  BranchedForm.defaultProps = defaultProps;
  return BranchedForm;
};

export default branch;

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

const defaultProps = {
  formData: {},
  formMeta: {}
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

  class BranchedForm extends React.Component {
    render() {
      const name = this.props.name || defaultName;
      const formData = cloneData(name, this.props.formData);
      const formMeta = cloneData(name, this.props.formMeta);

      return (
        <Component
          {...this.props}
          formData={formData}
          formMeta={formMeta}
          getFormData={getDataFromKey(formData)}
          getFormMeta={getDataFromKey(formMeta)}
          onChange={handleChange(name, this.props)}
        />
      );
    }
  }

  BranchedForm.propTypes = propTypes;
  BranchedForm.defaultProps = defaultProps;
  return BranchedForm;
};

export default branch;

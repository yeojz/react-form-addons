import React from 'react'; 
import PropTypes from 'prop-types';
import get from 'lodash/get';
import createSyntheticFormEvent from '../utils/createSyntheticFormEvent';
import updateObjectData from '../utils/updateObjectData';

const propTypes = {
  name: PropTypes.string.isRequired,
  formData: PropTypes.object,
  formMeta: PropTypes.object,
  onChange: PropTypes.func
};

const getTarget = (name, value) => ({
  name,
  value
});

const updateData = (name, data, value) => (
  updateObjectData(
    data,
    {target: getTarget(name, value)}
  )
);

const handleChange = (name, props) => (evt) => {
  let event = createSyntheticFormEvent(evt);
  event.formData = updateData(name, props.formData, event.formData);
  event.formMeta = updateData(name, props.formMeta, event.formMeta);
  event.target = getTarget(name, get(event.formData, name));
  return props.onChange(event);
};

const branch = () => (Component) => {

  const defaultProps = {
    formData: {},
    formMeta: {}
  };

  class BranchedForm extends React.Component {
    static propTypes = propTypes;
    static defaultProps = defaultProps;

    getBranchData = (key) => (
      get(this, ['props', key, this.props.name], {})
    )

    render() {
      const formData = this.getBranchData('formData');
      const formMeta = this.getBranchData('formMeta');

      return (
        <Component
          {...this.props}
          formData={formData}
          formMeta={formMeta}
          onChange={handleChange(this.props.name, this.props)}
        />
      );
    }
  }

  return BranchedForm;
};

export default branch;

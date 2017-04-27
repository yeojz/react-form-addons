import React from 'react'; 
import PropTypes from 'prop-types';
import createSyntheticFormEvent from '../utils/createSyntheticFormEvent';
import getDataFromKey from '../utils/getDataFromKey';
import updateObjectData from '../utils/updateObjectData';

const propTypes = {
  formData: PropTypes.object,
  formMeta: PropTypes.object,
  onChange: PropTypes.func
};

const defaultProps = {
  formData: {},
  formMeta: {}
};

const handleToggle = (props) => (evt) => {
  let event = createSyntheticFormEvent(evt, props.formData, props.formMeta);
  event.formData = updateObjectData(props.formData, evt, true);
  return props.onChange(event);
};

const handleChange = (props) => (evt) => {
  let event = createSyntheticFormEvent(evt, props.formData, props.formMeta);
  event.formData = updateObjectData(props.formData, evt);
  return props.onChange(event);
};

const withProps = () => (Component) => {

  class FormWithProps extends React.Component {
    render() {
      return (
        <Component
          {...this.props}
          formData={this.props.formData}
          formMeta={this.props.formMeta}
          getFormData={getDataFromKey(this.props.formData)}
          getFormMeta={getDataFromKey(this.props.formMeta)}
          onChange={handleChange(this.props)}
          onToggle={handleToggle(this.props)}
        />
      );
    }
  }

  FormWithProps.propTypes = propTypes;
  FormWithProps.defaultProps = defaultProps;
  return FormWithProps;
};

export default withProps;

import React, {PropTypes} from 'react';

import FormComponent from './utils/FormComponent';

const propTypes = {
  name: PropTypes.string,
  formData: PropTypes.object,
  formMeta: PropTypes.object,
  onChange: PropTypes.func
};

const listset = (defaultName = 'default', Container = FormComponent) => (Component) => {

  const defaultProps = {
    name: defaultName,
    formData: {},
    formMeta: {}
  };

  class ListSetForm extends React.component {
    render() {
      return (
        <Container>
          <Component />
        </Container>
      );
    }
  }

  ListSetForm.propTypes = propTypes;
  ListSetForm.defaultProps = defaultProps;
  return ListSetForm;
}

export default listset;

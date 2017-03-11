import React, {PropTypes, Children} from 'react';

const propTypes = {
  children: PropTypes.element
}

class FormContainer extends React.Component {
  render() {
    return Children.only(this.props.children);
  }
}

FormContainer.propTypes = propTypes;
export default FormContainer;

import React, {PropTypes, Children} from 'react';

const propTypes = {
  children: PropTypes.element
}

class FormComponent extends React.Component {
  render() {
    return Children.only(this.props.children);
  }
}

FormComponent.propTypes = propTypes;
export default FormComponent;

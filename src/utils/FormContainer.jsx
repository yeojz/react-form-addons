import React, {PropTypes} from 'react';

const propTypes = {
  children: PropTypes.any
}

class FormContainer extends React.Component {
  render() {
    return (
      <div className='rfa-form-container'>
        {this.props.children}
      </div>
    );
  }
}

FormContainer.propTypes = propTypes;
export default FormContainer;

// @flow
import React from 'react';

type Props = {
  children: any
}

class FormContainer extends React.Component {
  props: Props

  render() {
    return (
      <div className='rfa-form-container'>
        {this.props.children}
      </div>
    );
  }
}

export default FormContainer;

import React, {PropTypes} from 'react';
import {compose, withProps} from '../../../../lib';
import {withReduxState} from '../../../../lib/redux';
import FormSection from '../../scaffolding/FormSection';
import Input from '../../scaffolding/Input';

const FormInput = (props) => (
  <FormSection>
    <Input {...props} name='input1' />
    <button
      className='button is-danger'
      onClick={() => props.onReset()}
    >
      Reset
    </button>
  </FormSection>
);

FormInput.propTypes = {
  onReset: PropTypes.func
}

export default compose(
  withReduxState(),
  withProps()
)(FormInput);

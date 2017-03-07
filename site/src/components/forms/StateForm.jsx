import React from 'react';
import {compose, withProps, withState} from '../../../../lib';
import FormSection from '../../scaffolding/FormSection';
import Input from '../../scaffolding/Input';

const FormInputs = (props) => (
  <FormSection>
      <Input {...props} name='input1' />
  </FormSection>
);

export default compose(
  withState(),
  withProps()
)(FormInputs);

import React from 'react';
import {compose, withProps, withState, withSideEffects} from '../../../../lib';
import FormSection from '../../scaffolding/FormSection';
import Input from '../../scaffolding/Input';

const syncInput1and2 = (event) => {
  const {formData} = event;
  const {name} = event.target;

  if (name === 'input1') {
    formData.input2 = formData.input1;
  }
  if (name === 'input2') {
    formData.input1 = formData.input2;
  }
  event.formData = formData;
  return event;
}

const incrementCount = (event) => {
  const {formData} = event;
  formData.count = Number(formData.count) + 1;
  event.formData = formData;
  return event;
}

const FormInputs = (props) => (
  <FormSection>
      <Input {...props} name='input1' />
      <Input {...props} name='input2' />
      <Input {...props} name='count' disabled />
  </FormSection>
);

export default compose(
  withState({
    count: 0
  }),
  withSideEffects([
    syncInput1and2,
    incrementCount
  ]),
  withProps()
)(FormInputs);

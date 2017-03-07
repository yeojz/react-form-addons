import React from 'react';
import {collection, compose, withProps, withState} from '../../../../lib';
import FormSection from '../../scaffolding/FormSection';
import Input from '../../scaffolding/Input';

const CheckboxFlagOne = (props) => <Input {...props} type='checkbox' name='flag_checkbox' />;
const InputFlag = (props) => <Input {...props} name='flag_input' placeholder='type "open" here'/>;
const InputOne = (props) => <Input {...props} name='input_one' />;
const InputTwo = (props) => <Input {...props} name='input_two' />;

const Form = collection([
  CheckboxFlagOne,
  InputFlag,
  [InputOne, 'flag_checkbox'],
  [InputTwo, (formData) => (
    formData.flag_input === 'open'
  )]
]);

const FormInput = (props) => (
  <FormSection>
    <Form {...props} />
  </FormSection>
);

export default compose(
  withState(),
  withProps()
)(FormInput);

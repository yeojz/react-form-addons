import React from 'react';
import mapValues from 'lodash/mapValues';
import validate from 'validate.js';
import {compose, withProps, withState, withValidation} from '../../../../lib';
import FormSection from '../../scaffolding/FormSection';
import Input from '../../scaffolding/Input';

const rules = {
  email: {
    email: true
  },
  number: {
    numericality: true
  }
}

const runValidateDotJs = (error, formData) => {
  const err = validate(formData, rules);
  if (err) {
    return mapValues(err, (value) => value[0]);
  }
  return error;
}

const FormInputs = (props) => (
  <FormSection>
      <Input {...props} name='email' />
      <Input {...props} name='number' />
  </FormSection>
);

export default compose(
  withState(),
  withValidation([
    runValidateDotJs
  ]),
  withProps()
)(FormInputs);

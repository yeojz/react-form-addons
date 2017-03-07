/*eslint-disable react/prop-types*/
import React from 'react';
import mapValues from 'lodash/mapValues';
import validate from 'validate.js';
import {branch, compose, withProps, withState, withValidation} from '../../../../lib';
import FormSection from '../../scaffolding/FormSection';
import Input from '../../scaffolding/Input';

const rules = {
  email: {
    email: true
  },
  number: {
    numericality: true
  }
};

const runValidateDotJs = (error, formData) => {
  const err = validate(formData, rules);
  if (err) {
    return mapValues(err, (value) => value[0]);
  }
  return error;
};

const BranchFormInputs = (props) => (
  <div>
    <h5>{props.name}</h5>
    <Input {...props} name='email' />
    <Input {...props} name='number' />
  </div>
);

const SubBranch = compose(
  branch(),
  withValidation(runValidateDotJs),
  withProps(),
)(BranchFormInputs);

const FormInputs = (props) => (
  <FormSection>
    <Input {...props} name='nobranch' />
    <SubBranch {...props} name='branch1' />
    <SubBranch {...props} name='branch2' />
  </FormSection>
);

export default compose(
  withState(),
  withProps()
)(FormInputs);

import React, {PropTypes} from 'react';
import mapValues from 'lodash/mapValues';
import validate from 'validate.js';

import definitions from '../definitions';
import {branch, compose, withProps, withState, withValidation} from '../../../lib/index';

import Code from '../scaffolding/Code';
import DisplaySection from '../scaffolding/DisplaySection';
import FormSection from '../scaffolding/FormSection';
import Input from '../scaffolding/Input';
import Printer from '../scaffolding/Printer';

const propTypes = {
  formData: PropTypes.object,
  getFormData: PropTypes.func,
  onChange: PropTypes.func
};

const getCode = () => (
  `
  const SubBranch = compose(
    branch(),
    withProps()
  )(SubForm);

  const Form = (props) => (
    <div>
      <Input {...props} name='nobranch' />
      <SubBranch {...props} name='branch1' />
      <SubBranch {...props} name='branch2' />
    </div>
  )
  export default compose(
    withState()
  )(Form);
  `
);

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

const SubBranch = compose(
  branch(),
  withValidation(runValidateDotJs),
  withProps(),
)((props) => (
  <div>
    <h5>{props.name}</h5>
    <Input {...props} name='email' />
    <Input {...props} name='number' />
  </div>
));

const BranchForm = (props) => (
  <DisplaySection
    name='branch'
    description={definitions.methods.branch}
  >
    <div className='columns'>
      <FormSection>
        <Input {...props} name='nobranch' />
        <SubBranch {...props} name='branch1' />
        <SubBranch {...props} name='branch2' />
      </FormSection>
      <Printer {...props} />
      <Code data={getCode()} />
    </div>
  </DisplaySection>
);

BranchForm.propTypes = propTypes;

export default compose(
  withState(),
  withProps()
)(BranchForm);

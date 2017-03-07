import React, {PropTypes} from 'react';
import mapValues from 'lodash/mapValues';
import validate from 'validate.js';

import definitions from '../definitions';
import {compose, withProps, withState, withValidation} from '../../../lib';

import Code from '../scaffolding/Code';
import DisplaySection from '../scaffolding/DisplaySection';
import FormSection from '../scaffolding/FormSection';
import Input from '../scaffolding/Input';
import Printer from '../scaffolding/Printer';

const propTypes = {
  formData: PropTypes.object
};

const getCode = () => (
  `
  export default compose(
    withState(),
    withValidation(
      runValidateDotJs
    ),
    withProps()
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
}

const runValidateDotJs = (error, formData) => {
  const err = validate(formData, rules);
  if (err) {
    return mapValues(err, (value) => value[0]);
  }
  return error;
}

const ValidationForm = (props) => (
  <DisplaySection
    name='withValidation'
    description={definitions.methods.withValidation}
  >
    <div className='columns'>
      <FormSection>
          <Input {...props} name='email' />
          <Input {...props} name='number' />
      </FormSection>

      <Printer {...props} />
      <Code data={getCode()} />
    </div>
  </DisplaySection>
);

ValidationForm.propTypes = propTypes;

export default compose(
  withState(),
  withValidation(
    runValidateDotJs
  ),
  withProps()
)(ValidationForm);

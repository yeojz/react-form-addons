import React from 'react';
import definitions from '../definitions';
import Code from '../scaffolding/Code';
import DisplaySection from '../scaffolding/DisplaySection';
import Printer from '../scaffolding/Printer';
import ValidationForm from './forms/ValidationForm';
import createExample from '../scaffolding/createExample';

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

const WithValidationExample = (props) => (
  <DisplaySection
    name='withValidation'
    description={definitions.methods.withValidation}
  >
    <div className='columns'>
      <ValidationForm />
      <Printer {...props} />
      <Code data={getCode()} />
    </div>
  </DisplaySection>
);

export default createExample(WithValidationExample);

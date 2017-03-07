import React from 'react';
import definitions from '../definitions';
import Code from '../scaffolding/Code';
import DisplaySection from '../scaffolding/DisplaySection';
import Printer from '../scaffolding/Printer';
import createExample from '../scaffolding/createExample';
import CollectionForm from './forms/CollectionForm';

const getCode = () => ([
  `
  // Sample Sub Component
  const CheckboxFlagOne = (props) => (
    <input
      {...props}
      type='checkbox'
      name='flag_checkbox'
    />
  );
  `, `
  // Create Collection
  const Form = collection([
    CheckboxFlagOne,
    InputFlag,
    [InputOne, 'flag_checkbox'],
    [InputTwo, (formData) => (
      formData.flag_input === 'open'
    )]
  ]);
  `, `
  // Apply state
  export default compose(
    withState(),
    withProps()
  )(Form);
  `
]);

const CollectionExample = (props) => (
  <DisplaySection
    name='collection'
    description={definitions.methods.collection}
  >
    <div className='columns'>
      <CollectionForm />
      <Printer {...props} />
      <Code data={getCode()} />
    </div>
  </DisplaySection>
);

export default createExample(CollectionExample);

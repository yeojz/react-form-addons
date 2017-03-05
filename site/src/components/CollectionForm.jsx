import React, {PropTypes} from 'react';

import definitions from '../definitions';
import {collection, compose, withProps, withState} from '../../../lib/index';

import Code from '../scaffolding/Code';
import DisplaySection from '../scaffolding/DisplaySection';
import FormSection from '../scaffolding/FormSection';
import Input from '../scaffolding/Input';
import Printer from '../scaffolding/Printer';

const propTypes = {
  formData: PropTypes.object,
  getFormData: PropTypes.func,
  onChange: PropTypes.func
}

const getCode = () => (
  `
  // Sample Sub Component
  const CheckboxFlagOne = (props) => (
    <input {...props}
      type='checkbox'
      name='flag_checkbox'
    />
  );

  // Create Collection
  const Form = collection([
    CheckboxFlagOne,
    InputFlag,
    [InputOne, 'flag_checkbox'],
    [InputTwo, (formData) => (
      formData.flag_input === 'open'
    )]
  ]);

  // Apply state
  export default compose(
    withState(),
    withProps()
  )(Form);
  `
);

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

const CollectionForm = (props) => (
  <DisplaySection
    name='collection'
    description={definitions.methods.collection}
  >
    <div className='columns'>
      <FormSection>
        <Form {...props} />
      </FormSection>
      <Printer {...props} />
      <Code data={getCode()} />
    </div>
  </DisplaySection>
);

CollectionForm.propTypes = propTypes;

export default compose(
  withState(),
  withProps()
)(CollectionForm);

import React, {PropTypes} from 'react';
import definitions from '../definitions';
import {compose, withProps, withState, withSideEffects} from '../../../lib';

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
  export default compose(
    withState(),
    withSideEffects(
      syncInput1and2,
      incrementCount
    ),
    withProps()
  )(Form);
  `
);

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

const StatefulForm = (props) => (
  <DisplaySection
    name='withSideEffects'
    description={definitions.methods.withSideEffects}
  >
    <div className='columns'>
      <FormSection>
          <Input {...props} name='input1' />
          <Input {...props} name='input2' />
          <Input {...props} name='count' disabled />
      </FormSection>

      <Printer {...props} />
      <Code data={getCode()} />
    </div>
  </DisplaySection>
);

StatefulForm.propTypes = propTypes;

export default compose(
  withState({
    count: 0
  }),
  withSideEffects(
    syncInput1and2,
    incrementCount
  ),
  withProps()
)(StatefulForm);

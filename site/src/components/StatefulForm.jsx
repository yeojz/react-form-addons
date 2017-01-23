import React, {PropTypes} from 'react';
import definitions from '../definitions';
import {compose, withProps, withState} from '../../../lib/index';

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
    withProps()
  )(Form);
  `
);

const StatefulForm = (props) => (
  <DisplaySection
    name='withState'
    description={definitions.methods.withState}
  >
    <div className='columns'>
      <FormSection>
          <Input {...props} name='input1' />
      </FormSection>
      <Printer {...props} />
      <Code data={getCode()} />
    </div>
  </DisplaySection>
);

StatefulForm.propTypes = propTypes;

export default compose(
  withState(),
  withProps()
)(StatefulForm);

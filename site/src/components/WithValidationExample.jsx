import React, {PropTypes} from 'react';
import definitions from '../definitions';
import Code from '../scaffolding/Code';
import createExample from '../scaffolding/createExample';
import DisplaySection from '../scaffolding/DisplaySection';
import Printer from '../scaffolding/Printer';
import PropsTable from '../scaffolding/PropsTable';
import ValidationForm from './forms/ValidationForm';

const getCode = () => (
  `
  export default compose(
    withState(),
    withValidation([
      runValidateDotJs
    ]),
    withProps()
  )(Form);
  `
);

const entries = {
  onError: 'optional function which will be called when an unexpected exception occurred during validation. Arguments: err, type'
};

const WithValidationExample = (props) => (
  <DisplaySection
    name='withValidation'
    description={definitions.methods.withValidation}
  >
    <div className='columns'>
      <PropsTable
        title='Extra props'
        entries={entries}
      />
    </div>
    <div className='columns'>
      <ValidationForm onChange={props.onChange} />
      <Printer {...props} />
      <Code data={getCode()} />
    </div>
  </DisplaySection>
);

WithValidationExample.propTypes = {
  onChange: PropTypes.func
}

export default createExample(WithValidationExample);

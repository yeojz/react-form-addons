import React, {PropTypes} from 'react';
import definitions from '../definitions';
import Code from '../scaffolding/Code';
import DisplaySection from '../scaffolding/DisplaySection';
import Printer from '../scaffolding/Printer';
import StateForm from './forms/StateForm';
import createExample from '../scaffolding/createExample';

const getCode = () => (`
  export default compose(
    withState(),
    withProps()
  )(Form);
`);

const WithStateExample = (props) => (
  <DisplaySection
    name='withState'
    description={definitions.methods.withState}
  >
    <div className='columns'>
      <StateForm onChange={props.onChange} />
      <Printer {...props} />
      <Code data={getCode()} />
    </div>
  </DisplaySection>
);

WithStateExample.propTypes = {
  onChange: PropTypes.func
}

export default createExample(WithStateExample);

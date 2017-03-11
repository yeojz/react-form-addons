import React, {PropTypes} from 'react';
import definitions from '../definitions';
import Code from '../scaffolding/Code';
import DisplaySection from '../scaffolding/DisplaySection';
import Printer from '../scaffolding/Printer';
import createExample from '../scaffolding/createExample';
import SideEffectsForm from './forms/SideEffectsForm';

const getCode = () => (
  `
  export default compose(
    withState(),
    withSideEffects([
      syncInput1and2,
      incrementCount
    ]),
    withProps()
  )(Form);
  `
);

const WithSideEffectsExample = (props) => (
  <DisplaySection
    name='withSideEffects'
    description={definitions.methods.withSideEffects}
  >
    <div className='columns'>
      <SideEffectsForm onChange={props.onChange} />
      <Printer {...props} />
      <Code data={getCode()} />
    </div>
  </DisplaySection>
);

WithSideEffectsExample.propTypes = {
  onChange: PropTypes.func
}

export default createExample(WithSideEffectsExample);

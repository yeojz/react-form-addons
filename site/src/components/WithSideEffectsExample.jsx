import React, {PropTypes} from 'react';
import definitions from '../definitions';
import Code from '../scaffolding/Code';
import createExample from '../scaffolding/createExample';
import DisplaySection from '../scaffolding/DisplaySection';
import Printer from '../scaffolding/Printer';
import PropsTable from '../scaffolding/PropsTable';
import SideEffectsForm from './forms/SideEffectsForm';

const getCode = () => (`
  export default compose(
    withState(),
    withSideEffects([
      syncInput1and2,
      incrementCount
    ]),
    withProps()
  )(Form);
`);

const entries = {
  onError: `
    optional function which will be called when an unexpected exception occurred when applying side effects.
    Arguments: \`err, type\`
  `
};

const WithSideEffectsExample = (props) => (
  <DisplaySection
    name='withSideEffects'
    description={definitions.methods.withSideEffects}
  >
    <div className='columns'>
      <PropsTable
        title='Extra props'
        entries={entries}
      />
    </div>
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

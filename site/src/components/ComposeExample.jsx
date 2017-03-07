import React from 'react';
import definitions from '../definitions';
import Code from '../scaffolding/Code';
import DisplaySection from '../scaffolding/DisplaySection';

const getWithout = () => (
  `export default funcOne(funcTwo(Form));`
);

const getWith = () => (
  `
  export default compose(
    funcOne,
    funcTwo
  )(Form);
  `
);

const ComposeExample = () => (
  <DisplaySection
    name='compose'
    description={definitions.methods.compose}
  >
    <div className='columns'>
      <Code
          className='is-half'
          data={getWithout()}
          title='without compose'
        />
      <Code
          className='is-half'
          data={getWith()}
          title='with compose'
        />
    </div>
  </DisplaySection>
);

export default ComposeExample;

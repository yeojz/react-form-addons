import React from 'react';
import definitions from '../definitions';
import Code from '../scaffolding/Code';
import DisplaySection from '../scaffolding/DisplaySection';

const getWithout = () => (
  `export default funcOne(funcTwo(Form));`
);

const FormControlExample = () => (
  <DisplaySection
    name='formControl'
    description={definitions.methods.formControl}
  >
    <div className='columns'>
      <Code
          className='is-half'
          data={getWithout()}
          title='formControl'
        />
    </div>
  </DisplaySection>
);

export default FormControlExample;

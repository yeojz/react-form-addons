import React from 'react';
import definitions from '../definitions';
import Code from '../scaffolding/Code';
import DisplaySection from '../scaffolding/DisplaySection';
import PropsTable from '../scaffolding/PropsTable';

const getCode = () => (
  `
  export default compose(
    withProps()
  )(Form);
  `
);

const WithPropsExample = () => (
  <DisplaySection
    name='withProps'
    description={definitions.methods.withProps}
  >
    <div className='columns'>
      <PropsTable entries={definitions.props} />
      <Code data={getCode()} />
    </div>
  </DisplaySection>
);

export default WithPropsExample;

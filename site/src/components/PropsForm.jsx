import React from 'react';
import definitions from '../definitions';
import Code from '../scaffolding/Code';
import DisplaySection from '../scaffolding/DisplaySection';

import PropsTable from './PropsTable';

const getCode = () => (
  `
  export default compose(
    withProps()
  )(Form);
  `
);

const PropsForm = () => (
  <DisplaySection
    name='withProps'
    description={definitions.methods.withProps}
  >
    <div className='columns'>
      <PropsTable />
      <Code data={getCode()} />
    </div>
  </DisplaySection>
);

export default PropsForm;

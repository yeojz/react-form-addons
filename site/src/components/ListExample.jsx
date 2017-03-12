import React, {PropTypes} from 'react';
import definitions from '../definitions';
import Code from '../scaffolding/Code';
import DisplaySection from '../scaffolding/DisplaySection';
import Printer from '../scaffolding/Printer';
import createExample from '../scaffolding/createExample';
import ListForm from './forms/ListForm';

const getCode = () => ([
  `
  // Example
  `
]);

const ListExample = (props) => (
  <DisplaySection
    name='list'
    description={definitions.methods.list}
  >
    <div className='columns'>
      <ListForm onChange={props.onChange} />
      <Printer {...props} />
      <Code data={getCode()} />
    </div>
  </DisplaySection>
);

ListExample.propTypes = {
  onChange: PropTypes.func
}

export default createExample(ListExample);

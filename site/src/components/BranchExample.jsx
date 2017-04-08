import React from 'react';
import PropTypes from 'prop-types';
import definitions from '../definitions';
import Code from '../scaffolding/Code';
import DisplaySection from '../scaffolding/DisplaySection';
import Printer from '../scaffolding/Printer';
import createExample from '../scaffolding/createExample';
import BranchForm from './forms/BranchForm';

const getCode = () => (`
  const SubBranch = compose(
    branch(),
    withProps()
  )(SubForm);

  const Form = (props) => (
    <div>
      <Input {...props} name='nobranch' />
      <SubBranch {...props} name='branch1' />
      <SubBranch {...props} name='branch2' />
    </div>
  );

  export default compose(
    withState()
  )(Form);
`);

const BranchExample = (props) => (
  <DisplaySection
    name='branch'
    description={definitions.methods.branch}
  >
    <div className='columns'>
      <BranchForm onChange={props.onChange} />
      <Printer {...props} />
      <Code data={getCode()} />
    </div>
  </DisplaySection>
);

BranchExample.propTypes = {
  onChange: PropTypes.func
}

export default createExample(BranchExample);

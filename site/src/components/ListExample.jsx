import React, {PropTypes} from 'react';
import definitions from '../definitions';
import Code from '../scaffolding/Code';
import DisplaySection from '../scaffolding/DisplaySection';
import Printer from '../scaffolding/Printer';
import createExample from '../scaffolding/createExample';
import ListForm from './forms/ListForm';

const getCode = () => (
  `
  const FormContainer = (props) => (
    <div className='list-form-container'>
      <button onClick={props.onAdd}>Add One</button>
      {props.children}
    </div>
  );

  const SubForm = (props) => (
    <div>
      <h5>{props.name}</h5>
      <Input {...props} name='email' />
      <Input {...props} name='number' />
      <button onClick={props.onRemove}>Remove</button>
    </div>
  );

  const SubList = compose(
    list(FormContainer),
    withValidation([
      runValidateDotJs
    ]),
    withProps(),
  )(SubForm);

  const Form = (props) => (
    <FormSection>
      <Input {...props} name='root' />
      <SubList {...props} name='list1' />
    </FormSection>
  );

  export default compose(
    withState(),
    withProps()
  )(Form);
  `
);

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

import React, {PropTypes} from 'react';
import definitions from '../definitions';
import Code from '../scaffolding/Code';
import createExample from '../scaffolding/createExample';
import DisplaySection from '../scaffolding/DisplaySection';
import ListForm from './forms/ListForm';
import Printer from '../scaffolding/Printer';
import PropsTable from '../scaffolding/PropsTable';

const getCode = () => (`
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
`);

const entries = {
  onAdd: `
    This is passed to the FormContainer.
    Allows you to prepend \`onAdd('before')\` or append \`onAdd('after')\` to the list
  `,
  onRemove: `
    This is passed on to your Component and FormContainer. Allows you to remove your component.
    If used in FormContainer, you will need to provide the index of the item in the array. i.e. \`onRemove(idx)()\`
    If used in Component, calling \`onRemove()\` will suffice as the index is already pre-initialized.
  `
};

const ListExample = (props) => (
  <DisplaySection
    name='list'
    description={definitions.methods.list}
  >
    <div className='columns'>
      <PropsTable
        title='Extra props'
        entries={entries}
      />
    </div>
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

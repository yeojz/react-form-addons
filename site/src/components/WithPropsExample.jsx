import React from 'react';
import definitions from '../definitions';
import Code from '../scaffolding/Code';
import DisplaySection from '../scaffolding/DisplaySection';
import PropsTable from '../scaffolding/PropsTable';

const getCode = () => (`
  export default compose(
    withProps()
  )(Form);
`);

const entries = {
  formData: `
    Contains the object representation of your data.
    Ideally your forms should not contain nested objects as values.
  `,
  formMeta: `
    Any meta data or additional information for the form.
    The withValidation method uses this to store errors.
  `,
  getFormData: `
    Helper method which defaults to empty string when key is not found.
    In fact, \`props.getFormData(name)\` is the same as \`props.formData[name]\`.
    However, using this method, you can do deep queries like \`getFormData('name.some.nested.key')\`
  `,
  getFormMeta: `
    Similar to \`getFormData\`, but for formMeta.
  `,
  onChange: `
    Method to be passed to all input's onChange prop. Expects a single argument in
    the format of a browser event. i.e. contains \`evt.target.name\` and \`evt.target.value\`.
  `,
  onToggle: `
    Similar to onChange but ensures boolean values for inputs like radio buttons and checkboxes.
  `
};

const WithPropsExample = () => (
  <DisplaySection
    name='withProps'
    description={definitions.methods.withProps}
  >
    <div className='columns'>
      <PropsTable entries={entries} />
      <Code data={getCode()} />
    </div>
  </DisplaySection>
);

export default WithPropsExample;

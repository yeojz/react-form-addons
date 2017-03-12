import React from 'react';
import definitions from '../definitions';
import Code from '../scaffolding/Code';
import DisplaySection from '../scaffolding/DisplaySection';

const getCode = () => (`
  const Component = (props) => (
    <input
      {...props}
      placeholder='some special processing'
    />
  );

  const ControlledInput = formControl(Component);
  export default ControlledInput;
`);

const getConvenience = () => (`
  import {Input} from 'react-form-addons/components';
  import {Textarea} from 'react-form-addons/components';

  <Input {...props} />
  <Textarea {...props} />

  // Almost all props are passed directly over
  // to the native "input" and "textarea"
`);

const FormControlExample = () => (
  <DisplaySection
    name='formControl'
    description={definitions.methods.formControl}
  >
    <div className='columns'>
      <Code
          className='is-half'
          data={getCode()}
          title='Code'
        />
      <Code
          className='is-half'
          data={getConvenience()}
          title='Convenience Components'
        />
    </div>
  </DisplaySection>
);

export default FormControlExample;

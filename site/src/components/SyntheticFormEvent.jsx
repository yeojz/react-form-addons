import React from 'react';
import definitions from '../definitions';
import Code from '../scaffolding/Code';
import DisplaySection from '../scaffolding/DisplaySection';

const getAPI = () => (
  `
  // getters
  event.isSyntheticFormEvent // bool
  event.formData // obj {}
  event.formMeta // obj {}
  event.preventDefault() // func
  event.stopPropagation() // func
  event.target // obj {name, value}

  // setters
  event.target = {}
  event.formData = {}
  event.formMeta = {}
  `
);

const getCode = () => (
  `
  createSyntheticFormEvent(evt);

  // or

  new SyntheticFormEvent(evt);

  // where evt represents the event from React's SyntheticEvent
  // or browser event.
  `
);

const SyntheticFormEvent = () => (
  <DisplaySection
    name='SyntheticFormEvent'
    description={definitions.utils.SyntheticFormEvent}
  >
    <div className='columns'>
      <Code
          className='is-half'
          data={getAPI()}
          title='API'
        />
      <Code
          className='is-half'
          data={getCode()}
        />
    </div>
  </DisplaySection>
);

export default SyntheticFormEvent;

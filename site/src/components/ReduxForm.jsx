import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import definitions from '../definitions';
import {compose, withProps} from '../../../lib';
import {withReduxState} from '../../../lib/redux';

import Code from '../scaffolding/Code';
import DisplaySection from '../scaffolding/DisplaySection';
import FormSection from '../scaffolding/FormSection';
import Input from '../scaffolding/Input';
import JsonOutput from '../scaffolding/JsonOutput';

const propTypes = {
  data: PropTypes.object
};

const getCode = () => (
  `
  const Form = compose(
    withReduxState(),
    withProps()
  )(FormInputs);

  // Usage
  <Form name='example' />
  `
);

const Form = compose(
  withReduxState(),
  withProps()
)((props) => (
  <FormSection>
    <Input {...props} name='input1' />
    <button
      className='button is-danger'
      onClick={() => props.onReset()}
    >
      Reset
    </button>
  </FormSection>
))

const ReduxForm = (props) => (
  <DisplaySection
    name='withReduxState'
    description={definitions.extensions.withReduxState}
  >
    <div className='columns'>
      <Form name='example' />
      <div className='is-one-third column'>
        <JsonOutput
          header='Reducer state'
          value={props.data}
         />
       </div>
      <Code data={getCode()} />
    </div>
  </DisplaySection>
);

ReduxForm.propTypes = propTypes;

const mapStateToProps = (state) => ({
  data: state.forms
})

export default connect(mapStateToProps)(ReduxForm);

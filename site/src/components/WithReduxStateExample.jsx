import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import definitions from '../definitions';
import Code from '../scaffolding/Code';
import DisplaySection from '../scaffolding/DisplaySection';
import JsonOutput from '../scaffolding/JsonOutput';
import ReduxForm from './forms/ReduxForm';

const getCode = () => (`
  import {withReduxState} from 'react-form-addons/redux'

  // Ensure reducers added to redux
  const reducers = combineReducers({
    forms: formReducer
  });

  // During form composition
  const Form = compose(
    withReduxState(),
    withProps()
  )(FormInputs);

  // Usage (note: prop "name" is required)
  <Form name='example' />
`);

const WithReduxStateExample = (props) => (
  <DisplaySection
    name='withReduxState'
    description={definitions.extensions.withReduxState}
  >
    <div className='columns'>
      <ReduxForm name='example' />

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

WithReduxStateExample.propTypes = {
  data: PropTypes.object
};

const mapStateToProps = (state) => ({
  data: state.forms
})

export default connect(mapStateToProps)(WithReduxStateExample);

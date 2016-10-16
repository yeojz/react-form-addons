import React, {PropTypes} from 'react';
import get from 'lodash/get';
import Input from 'stories/common/Input';
import Print from 'stories/common/Print';

const propTypes = {
  formData: PropTypes.object,
  formError: PropTypes.object,
  onChange: PropTypes.func
}

const renderFormError = (showFormError, formError) => {
  if (showFormError) {
    return (
      <Print
        className='box'
        header='formError'
        data={formError} />
    );
  }
}

const renderFormData = (formData) => (
  <Print
    className='box'
    header='formData'
    data={formData} />
)

const renderInput = (name, props) => (
  <Input
    error={get(props, ['formError', name], '')}
    label={name}
    name={name}
    onChange={props.onChange}
    value={get(props, ['formData', name], '')} />
)

const createTwoFields = (text, showFormError = false) => {
  function TwoFields(props) {
    return (
      <div className='basic-add-state'>

        <div className='input-area box'>
          <h3>Inputs</h3>
          <p>{text}</p>
          {renderInput('fieldOne', props)}
          {renderInput('fieldTwo', props)}
        </div>

        {renderFormData(props.formData)}
        {renderFormError(showFormError, props.formError)}
      </div>
    )
  }

  TwoFields.propTypes = propTypes;
  return TwoFields;
}

export default createTwoFields;

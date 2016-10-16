import React, {PropTypes} from 'react';
import withState from 'src/withState';
import withValidation from 'src/withValidation';
import createTwoFields from 'stories/common/createTwoFields';

const validator = (formData, props) => {
  const errors = {}
  if (formData.fieldOne !== 'test') {
    errors.fieldOne = 'fieldOne should equal "test"';
  }
  if (!formData.fieldTwo) {
    errors.fieldTwo = 'fieldTwo should not be empty';
  }
  return errors;
}

const text = 'fieldOne should = "test" and fieldTwo should not be empty';
const AddValidation = createTwoFields(text, true);
const hasState = withState()(AddValidation);
export default withValidation(validator)(hasState);

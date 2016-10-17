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

const text = (
  <section>
    <h3>withValidation</h3>
    <p>
      Provides the mechanism for validation, but not the validation logic.
      <br />You can easily plug in your own validation engine
      (eg: validate.js or joi), as long as the result set is an object.
    </p>
    <p>In this example, <em>fieldOne</em> should equal "test" and <em>fieldTwo</em> should not be empty</p>
  </section>
);
const AddValidation = createTwoFields(text, true);
const hasState = withState()(AddValidation);
export default withValidation(validator)(hasState);

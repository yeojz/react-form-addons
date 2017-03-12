/*eslint-disable react/prop-types*/
import React from 'react';
import mapValues from 'lodash/mapValues';
import validate from 'validate.js';
import {compose, list, withProps, withState, withValidation} from '../../../../lib';
import FormSection from '../../scaffolding/FormSection';
import Input from '../../scaffolding/Input';

const rules = {
  email: {
    email: true
  },
  number: {
    numericality: true
  }
};

const runValidateDotJs = (error, formData) => {
  const err = validate(formData, rules);
  if (err) {
    return mapValues(err, (value) => value[0]);
  }
  return error;
};

const FormContainer = (props) => (
  <div className='list-form-container'>
    <button
      className='button is-info'
      onClick={props.onAdd('after')}>
      + 1 after
    </button>
    <button
      className='button is-info'
      onClick={props.onAdd('before')}>
      + 1 before
    </button>

    <div className='list-form-entries'>
      {props.children}
    </div>
  </div>
);

const ListFormInputs = (props) => (
  <div>
    <h5>{props.name}</h5>
    <Input {...props} name='email' />
    <Input {...props} name='number' />
    <button className='button is-danger' onClick={props.onRemove}>Remove</button>
  </div>
);

const SubList = compose(
  list(FormContainer),
  withValidation([runValidateDotJs]),
  withProps(),
)(ListFormInputs);

const FormInputs = (props) => (
  <FormSection>
    <Input {...props} name='root' />
    <SubList {...props} name='list1' />
  </FormSection>
);

export default compose(
  withState(),
  withProps()
)(FormInputs);

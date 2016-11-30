import React, {PropTypes} from 'react';
import createForm from 'src/createForm';
import withState from 'src/withState';

import Input from 'stories/common/Input';
import Print from 'stories/common/Print';

const propTypes = {
  formData: PropTypes.object
}

const dsl = [
  {
    component: Input,
    label: 'fieldOne',
    name: 'fieldOne',
    type: 'text'
  },
  {
    component: Input,
    label: 'fieldTwo',
    name: 'fieldTwo',
    type: 'text'
  }
]

const Form = createForm(dsl);

const Model = (props) => {
  return (
    <div className='advanced-model'>
      <div className='box inverse'>
        <h3>createForm</h3>
        <p>
          Allows creation of forms using a simple DSL
        </p>
        <p>
          Other than the reserved keys (className, component, formData, value),
          all other keys are passed down AS-IS.
        </p>
      </div>

      <Print
        className='box inverse'
        header='DSL'
        data={dsl} />

      <div className='box'>
        <h3>Form</h3>
        <Form {...props} />
      </div>

      <Print
        className='box inverse'
        header='formData'
        data={props.formData} />
    </div>
  )
}

Model.propTypes = propTypes;
export default withState()(Model);

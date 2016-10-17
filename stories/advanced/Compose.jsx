import React, {PropTypes} from 'react';
import compose from 'src/compose';
import createForm from 'src/createForm';
import withState from 'src/withState';

import Input from 'stories/common/Input';
import Print from 'stories/common/Print';

const propTypes = {
  formData: PropTypes.object
}

const Compose = (props) => {
  return (
    <div className='advanced-compose'>
      <div className='box inverse'>
        <h3>compose</h3>
        <p>
          Helper method that applies multiple form effects onto a single form.
        </p>
      </div>

      <div className='box'>
        <h3>Form</h3>
      </div>

      <Print
        className='box inverse'
        header='formData'
        data={props.formData} />
    </div>
  )
}

Compose.propTypes = propTypes;
export default withState()(Compose);

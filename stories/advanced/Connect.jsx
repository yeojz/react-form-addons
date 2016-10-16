import React, {PropTypes} from 'react';
import withState from 'src/withState';

import Print from 'stories/common/Print';
import ConnectForm from './ConnectForm';

const propTypes = {
  formData: PropTypes.object
}

const Connect = (props) => {
  return (
    <div className='advanced-connect'>
      <div className='box inverse'>
        <p>
          Allows creation of complex forms which consist of various sub-sections
          that may be dependent on the status of other fields.
        </p>
        <p>
          <strong>Note:</strong> The toggling of form sections do not modify the form data.
          If you want to clear the data of a hidden section, you can use "withSideEffect" to do so.
        </p>
      </div>

      <div className='box'>
        <h3>Form</h3>
        <ConnectForm {...props} />
      </div>

      <Print
        className='box inverse'
        header='formData'
        data={props.formData} />
    </div>
  )
}

Connect.propTypes = propTypes;
export default withState()(Connect);

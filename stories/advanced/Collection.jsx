import React, {PropTypes} from 'react';
import collection from 'src/collection';
import createForm from 'src/createForm';
import withState from 'src/withState';

import Input from 'stories/common/Input';
import Print from 'stories/common/Print';

const propTypes = {
  formData: PropTypes.object
}

const Collection = (props) => {
  return (
    <div className='advanced-collection'>
      <div className='box inverse'>
        <h3>collection</h3>
        <p>
          Allows the grouping of data sets into a virtual input.
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

Collection.propTypes = propTypes;
export default withState()(Collection);

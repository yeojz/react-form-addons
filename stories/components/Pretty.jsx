import React, {PropTypes} from 'react';

const propTypes = {
  data: PropTypes.object
}

const Pretty = (props) => (
  <div className='stories-pretty'>
    <pre>{JSON.stringify(props.data, null, 2)}</pre>
  </div>
)

Pretty.propTypes = propTypes;
export default Pretty;

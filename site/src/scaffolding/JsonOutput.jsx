import React, {PropTypes} from 'react';
import Highlight from 'react-highlight.js';

const propTypes = {
  header: PropTypes.string,
  value: PropTypes.object,
};

const defaultProps = {
  value: {}
}

const JsonOutput = (props) => {
  return (
    <div className='jsonoutput__dataset'>
      <h4>{props.header}</h4>
      <div className='jsonoutput__content'>
        <Highlight className='json'>
          {JSON.stringify(props.value, null, 2)}
        </Highlight>
      </div>
    </div>
  );
};

JsonOutput.propTypes = propTypes;
JsonOutput.defaultProps = defaultProps;
export default JsonOutput;

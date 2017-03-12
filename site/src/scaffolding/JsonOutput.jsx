import React, {PropTypes} from 'react';
import marked from 'marked';

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
        <div dangerouslySetInnerHTML={{
          __html: marked('```js\n' + JSON.stringify(props.value, null, 2) + '\n```')
        }} />
      </div>
    </div>
  );
};

JsonOutput.propTypes = propTypes;
JsonOutput.defaultProps = defaultProps;
export default JsonOutput;

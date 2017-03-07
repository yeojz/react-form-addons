import React, {PropTypes} from 'react';
import Highlight from 'react-highlight.js';

const propTypes = {
  className: PropTypes.string,
  data: PropTypes.any,
  title: PropTypes.string
};

const defaultProps = {
  className: 'is-one-third',
  title: 'Code'
};

const renderMulti = (data) => {
  if (Array.isArray(data)) {
    return data.map((str, key) => (
      <Highlight key={key} className='js'>{str}</Highlight>
    ))
  }

  return <Highlight className='js'>{data}</Highlight>
}

const Code = (props) => (
  <div className={`column code ${props.className}`}>
    <h4>{props.title}</h4>
    <div className='code_contents'>
      {renderMulti(props.data)}
    </div>
  </div>
);

Code.propTypes = propTypes;
Code.defaultProps = defaultProps;
export default Code;

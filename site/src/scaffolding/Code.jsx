import React, {PropTypes} from 'react';
import Highlight from 'react-highlight';

const propTypes = {
  className: PropTypes.string,
  data: PropTypes.any,
  title: PropTypes.string
};

const defaultProps = {
  className: 'is-one-third',
  title: 'Code'
};

const Code = (props) => (
  <div className={`column code ${props.className}`}>
    <h4>{props.title}</h4>
    <div className='code_contents'>
      <Highlight className='js'>{props.data}</Highlight>
    </div>
  </div>
);

Code.propTypes = propTypes;
Code.defaultProps = defaultProps;
export default Code;

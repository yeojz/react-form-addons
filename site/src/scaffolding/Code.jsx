import React, {PropTypes} from 'react';
import marked from 'marked';

const propTypes = {
  className: PropTypes.string,
  data: PropTypes.any,
  title: PropTypes.string
};

const defaultProps = {
  className: 'is-one-third',
  title: 'Code'
};

const renderCode = (str) => ({
  __html: marked('```js\n' + str + '\n```')
});

const Code = (props) => (
  <div className={`column code ${props.className}`}>
    <h4>{props.title}</h4>
    <div
      className='code_contents'
      dangerouslySetInnerHTML={renderCode(props.data)}
    />
  </div>
);

Code.propTypes = propTypes;
Code.defaultProps = defaultProps;
export default Code;

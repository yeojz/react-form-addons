import React, {PropTypes} from 'react';
import Highlight from 'react-highlight';
import isEmpty from 'lodash/isEmpty';

const propTypes = {
  className: PropTypes.string,
  formData: PropTypes.object,
  formMeta: PropTypes.object,
};

const defaultProps = {
  className: ''
};

const renderContent = (header, value, showAlways = false) => {
  if (isEmpty(value) && !showAlways) {
    return null;
  }
  return (
    <div className='printer__dataset'>
      <h4>{header}</h4>
      <div className='printer__content'>
        <Highlight className='json'>
          {JSON.stringify(value, null, 2)}
        </Highlight>
      </div>
    </div>
  );
};

const Printer = (props) => (
  <div className={`is-one-third column printer ${props.className}`}>
    {renderContent('FormData', props.formData, true)}
    {renderContent('FormMeta', props.formMeta, true)}
  </div>
)

Printer.propTypes = propTypes;
Printer.defaultProps = defaultProps;
export default Printer;

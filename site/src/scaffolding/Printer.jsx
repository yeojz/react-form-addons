import React, {PropTypes} from 'react';
import JsonOutput from './JsonOutput';

const propTypes = {
  className: PropTypes.string,
  formData: PropTypes.object,
  formMeta: PropTypes.object,
};

const defaultProps = {
  className: ''
};

const Printer = (props) => (
  <div className={`is-one-third column printer ${props.className}`}>
    <JsonOutput
      header='FormData'
      value={props.formData}
    />
    <JsonOutput
      header='FormMeta'
      value={props.formMeta}
    />
  </div>
)

Printer.propTypes = propTypes;
Printer.defaultProps = defaultProps;
export default Printer;

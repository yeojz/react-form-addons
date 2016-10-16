import React, {PropTypes} from 'react';

const propTypes = {
  className: PropTypes.string,
  data: PropTypes.object,
  header: PropTypes.string
}

const defaultProps = {
  className: ''
}

const renderHeader = (header) => {
  if (header) {
    return <h3>{header}</h3>
  }
}

const Print = (props) => (
  <div className={`stories-print ${props.className}`}>
    {renderHeader(props.header)}
    <pre>{JSON.stringify(props.data, null, 2)}</pre>
  </div>
)

Print.propTypes = propTypes;
Print.defaultProps = defaultProps;
export default Print;

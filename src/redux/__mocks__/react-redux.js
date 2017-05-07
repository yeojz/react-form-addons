import React from 'react';
import noop from 'lodash/noop';

export const connect = (mapStateToProps, mapDispatchToProps) => (Component) => (overrides = {}) => {
  const stateProps = mapStateToProps({});

  const dispatchProps = typeof mapDispatchToProps === 'function'
    ? mapDispatchToProps(noop)
    : mapDispatchToProps

  return function ConnectMock(props) {
    return <Component {...props} {...stateProps} {...dispatchProps} {...overrides}/>
  };
}

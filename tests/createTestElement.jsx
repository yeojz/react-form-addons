/* eslint-disable react/prop-types */
import React from 'react';

function createTestElement(opts = {}) {
  const prop = opts.prop;
  const handler = opts.handler || 'onClick';
  const Element = opts.element || 'div';

  class TestElement extends React.Component {
    handleAction = (...args) => {
      this.props[prop](...args);
    }

    render() {
      let action = {};
      action[handler] = this.handleAction;

      return <Element className='testElement' {...action} />
    }
  }

  return TestElement;
}

export default createTestElement;

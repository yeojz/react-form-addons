import React from 'react';
import {shallow} from 'enzyme';
import withSideEffects from 'src/lib/withSideEffects';
import TestDiv from 'tests/mocks/TestDiv';

describe('lib/withSideEffects', function () {
  it('should return a react component', function () {
    const Component = withSideEffects()(TestDiv);
    const elem = shallow(<Component />);
    expect(elem.html()).toBe('<div>test</div>');
  });

  it('decorated component should be called with expected props', function () {
    const Component = withSideEffects()(TestDiv);
    const elem = shallow(<Component />);
    const props = elem.props();

    expect(typeof props.onChange).toBe('function')
  });
});

import React from 'react';
import {shallow} from 'enzyme';
import branch from 'src/lib/branch';
import TestDiv from 'tests/mocks/TestDiv';

describe('lib/branch', function () {
  it('should return a react component', function () {
    const Component = branch()(TestDiv);
    const elem = shallow(<Component name='test' />);
    expect(elem.html()).toBe('<div>test</div>');
  });

  it('decorated component should be called with expected props', function () {
    const Component = branch()(TestDiv);
    const elem = shallow(<Component name='test'/>);
    const props = elem.props();

    expect(typeof props.formData).toBe('object');
    expect(typeof props.formMeta).toBe('object');
    expect(typeof props.onChange).toBe('function');
  });
});

import React from 'react';
import {shallow} from 'enzyme';
import withState from 'src/lib/withState';
import TestDiv from 'tests/TestDiv';

describe('lib/withState', function () {
  it('should return a react component', function () {
    const Component = withState()(TestDiv);
    const elem = shallow(<Component />);
    expect(elem.html()).toBe('<div>test</div>');
  });

  it('decorated component should be called with expected props', function () {
    const Component = withState()(TestDiv);
    const elem = shallow(<Component />);
    const props = elem.props();

    expect(typeof props.formData).toBe('object');
    expect(typeof props.formMeta).toBe('object');
    expect(typeof props.onChange).toBe('function');
  });
});

import React from 'react';
import {shallow} from 'enzyme';
import TestDiv from 'tests/TestDiv';
import branch from './branch';

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

  it('should call onChange event with a SyntheticFormEvent', function () {
    const Component = branch()(TestDiv);
    const onChange = jest.fn();
    const elem = shallow(<Component name='test' onChange={onChange}/>);
    const props = elem.props();

    props.onChange({});
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0].isSyntheticFormEvent).toBe(true);
  });
});

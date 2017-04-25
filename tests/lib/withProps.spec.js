import React from 'react';
import {spy} from 'sinon';
import {shallow} from 'enzyme';
import withProps from 'src/lib/withProps';
import TestDiv from 'tests/mocks/TestDiv';

describe('lib/withProps', function () {
  it('should return a react component', function () {
    const Component = withProps()(TestDiv);
    const elem = shallow(<Component />);
    expect(elem.html()).toBe('<div>test</div>');
  });

  it('decorated component should be called with expected props', function () {
    const Component = withProps()(TestDiv);
    const elem = shallow(<Component />);
    const props = elem.props();

    expect(typeof props.formData).toBe('object');
    expect(typeof props.formMeta).toBe('object');
    expect(typeof props.getFormData).toBe('function');
    expect(typeof props.getFormMeta).toBe('function');
    expect(typeof props.onChange).toBe('function');
    expect(typeof props.onToggle).toBe('function');
  });

  it('should call onChange event with a SyntheticFormEvent', function () {
    const Component = withProps()(TestDiv);
    const onChange = spy();
    const elem = shallow(<Component onChange={onChange}/>);
    const props = elem.props();

    props.onChange({});

    expect(onChange.called).toBe(true);
    expect(onChange.args[0][0].isSyntheticFormEvent).toBe(true);
  });
});

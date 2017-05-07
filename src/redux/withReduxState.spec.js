import React from 'react';
import {shallow, mount} from 'enzyme';
import TestDiv from 'tests/TestDiv';
import createTestElement from 'tests/createTestElement';
import withReduxState from './withReduxState';

jest.mock('react-redux');

describe('redux/withReduxState', function () {

  const TEST_VALUE = 'test value';
  const TEST_NAME = 'sample';

  it('should return a react component', function () {
    const Component = withReduxState()(TestDiv)();
    const elem = shallow(<Component />);
    expect(elem.html()).toBe('<div>test</div>');
  });

  it('should call onChange with name and syntheticFormEvent', function () {
    const onChange = jest.fn();
    const Input = createTestElement({
      element: 'input',
      handler: 'onChange',
      prop: 'onChange'
    });
    const Component = withReduxState()(Input)({onChange});
    const elem = mount(<Component name={TEST_NAME} />);
    const input = elem.find('.testElement');

    input.node.value = TEST_VALUE;
    input.simulate('change');

    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][0]).toEqual(TEST_NAME);
    expect(onChange.mock.calls[0][1].target.value).toEqual(TEST_VALUE);
  });

  it('should call reset', function () {
    const onReset = jest.fn();
    const Div = createTestElement({
      element: 'dev',
      handler: 'onClick',
      prop: 'onReset'
    });
    const Component = withReduxState()(Div)({onReset})
    const elem = mount(<Component name={TEST_NAME} />);
    const div = elem.find('.testElement');
    div.simulate('click');

    expect(onReset.mock.calls.length).toBe(1);
    expect(onReset.mock.calls[0][0]).toBe(TEST_NAME);
  });
});

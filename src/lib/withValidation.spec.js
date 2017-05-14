import React from 'react';
import {shallow} from 'enzyme';
import TestDiv from 'tests/TestDiv';
import withValidation from './withValidation';

describe('lib/withValidation', function () {
  it('should return a react component', function () {
    const Component = withValidation()(TestDiv);
    const elem = shallow(<Component />);
    expect(elem.html()).toBe('<div>test</div>');
  });

  it('decorated component should be called with expected props', function () {
    const Component = withValidation()(TestDiv);
    const elem = shallow(<Component />);
    const props = elem.props();

    expect(typeof props.getFormError).toBe('function');
  });
});

import React from 'react';
import {shallow} from 'enzyme';
import withValidation from 'src/lib/withValidation';
import TestDiv from 'tests/TestDiv';

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

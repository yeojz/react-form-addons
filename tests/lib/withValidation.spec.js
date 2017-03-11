import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import withValidation from 'src/lib/withValidation';
import TestDiv from 'tests/mocks/TestDiv';

describe('withValidation', function () {
  it('should return a react component', function () {
    const Component = withValidation()(TestDiv);
    const elem = shallow(<Component />);
    expect(elem.html()).to.equal('<div>test</div>');
  });

  it('decorated component should be called with expected props', function () {
    const Component = withValidation()(TestDiv);
    const elem = shallow(<Component />);
    const props = elem.props();

    expect(props.getFormError).to.be.a.function;
  });
});

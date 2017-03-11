import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import branch from 'src/lib/branch';
import TestDiv from 'tests/mocks/TestDiv';

describe('branch', function () {
  it('should return a react component', function () {
    const Component = branch()(TestDiv);
    const elem = shallow(<Component />);
    expect(elem.html()).to.equal('<div>test</div>');
  });

  it('decorated component should be called with expected props', function () {
    const Component = branch()(TestDiv);
    const elem = shallow(<Component />);
    const props = elem.props();

    expect(props.formData).to.be.an.object;
    expect(props.formMeta).to.be.an.object;
    expect(props.getFormData).to.be.a.function;
    expect(props.getFormMeta).to.be.a.function;
    expect(props.onChange).to.be.a.function;
  });
});

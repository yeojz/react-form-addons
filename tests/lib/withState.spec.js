import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import withState from 'src/lib/withState';
import TestDiv from 'tests/mocks/TestDiv';

describe('withState', function () {
  it('should return a react component', function () {
    const Component = withState()(TestDiv);
    const elem = shallow(<Component />);
    expect(elem.html()).to.equal('<div>test</div>');
  });

  it('decorated component should be called with expected props', function () {
    const Component = withState()(TestDiv);
    const elem = shallow(<Component />);
    const props = elem.props();

    expect(props.formData).to.be.an.object;
    expect(props.formMeta).to.be.an.object;
    expect(props.onChange).to.be.an.function;
  });
});

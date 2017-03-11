import React from 'react';
import {expect} from 'chai';
import {spy} from 'sinon';
import {shallow} from 'enzyme';
import withProps from 'src/lib/withProps';
import TestDiv from 'tests/mocks/TestDiv';

describe('withProps', function () {
  it('should return a react component', function () {
    const Component = withProps()(TestDiv);
    const elem = shallow(<Component />);
    expect(elem.html()).to.equal('<div>test</div>');
  });

  it('decorated component should be called with expected props', function () {
    const Component = withProps()(TestDiv);
    const elem = shallow(<Component />);
    const props = elem.props();

    expect(props.formData).to.be.an.object;
    expect(props.formMeta).to.be.an.object;
    expect(props.getFormData).to.be.a.function;
    expect(props.getFormMeta).to.be.a.function;
    expect(props.onChange).to.be.a.function;
    expect(props.onToggle).to.be.a.function;
  });

  it('should call onChange event with a SyntheticFormEvent', function () {
    const Component = withProps()(TestDiv);
    const onChange = spy();
    const elem = shallow(<Component onChange={onChange}/>);
    const props = elem.props();

    props.onChange({});

    expect(onChange.called).to.be.true;
    expect(onChange.args[0][0].isSyntheticFormEvent).to.be.true;
  });
});

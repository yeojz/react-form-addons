import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import collection from 'src/collection';
import TestDiv from './mocks/TestDiv';

describe('collection', function () {
  it('should throw an Error when argument not an array', function () {
    const test = () => collection('test');
    expect(test).to.throw(Error);
  });

  it('should return a react component', function () {
    const Component = collection([
      TestDiv
    ]);
    const elem = shallow(<Component />);
    expect(elem.is('.rfa-collection')).to.be.true;
  });
});

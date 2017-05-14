import React from 'react';
import {shallow} from 'enzyme';
import TestDiv from 'tests/TestDiv';
import collection from './collection';

describe('lib/collection', function () {
  it('should throw an Error when argument not an array', function () {
    const test = () => collection('test');
    expect(test).toThrowError(Error);
  });

  it('should return a react component', function () {
    const Component = collection([
      TestDiv
    ]);
    const elem = shallow(<Component />);
    expect(elem.is('.rfa-collection')).toBe(true);
  });
});

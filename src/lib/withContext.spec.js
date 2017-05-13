import React from 'react';
import {shallow} from 'enzyme';
import TestDiv from 'tests/TestDiv';
import withContext from './withContext';

describe('lib/withContext', function () {
  it('should return a react component', function () {
    const Component = withContext()(TestDiv);
    const elem = shallow(<Component />);
    expect(elem.html()).toBe('<div>test</div>');
  });
});

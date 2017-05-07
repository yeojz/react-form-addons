import React from 'react';
import {shallow} from 'enzyme';
import FormContainer from './FormContainer';

describe('utils/FormContainer', function () {
  it('should render a react component', function () {
    const elem = shallow(
      <FormContainer>
        test
      </FormContainer>
    );
    expect(elem.html()).toBe('<div class="rfa-form-container">test</div>');
  });
});

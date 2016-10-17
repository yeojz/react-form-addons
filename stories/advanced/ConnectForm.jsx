import React, {PropTypes} from 'react';
import get from 'lodash/get';
import startCase from 'lodash/startCase';

import connect from 'src/connect';
import Input from 'stories/common/Input';

const propTypes = {
  formData: PropTypes.object,
  onChange: PropTypes.func,
  onToggle: PropTypes.func
}

const SectionOne = (props) => {
  return (
    <div className='section-one'>
      <Input
        checked={get(props, 'formData.flag_section_two', false)}
        label='Enable section 2'
        name='flag_section_two'
        onChange={props.onToggle}
        type='checkbox' />
      <Input
        checked={get(props, 'formData.flag_section_three', false)}
        label='Enable section 3'
        name='flag_section_three'
        onChange={props.onToggle}
        type='checkbox' />
      <Input
        label='Enable section 4 if value = "four"'
        name='randomString'
        onChange={props.onChange}
        type='text'
        value={get(props, 'formData.randomString', '')} />
    </div>
  )
}

const createSubSection = (className, name) => {
  const SubSection = (props) => {
    return (
      <div className={className}>
        <h4>{startCase(className)}</h4>

        <Input
          name={name}
          onChange={props.onChange}
          type='text'
          value={get(props, ['formData', name], '')} />
      </div>
    )
  }
  SubSection.propTypes = propTypes;
  return SubSection;
}

const SectionTwo = createSubSection('section-two', 'section_two_input');
const SectionThree = createSubSection('section-three', 'section_three_input');
const SectionFour = createSubSection('section-four', 'section_four_input');


SectionOne.propTypes = propTypes;
export default connect([
  SectionOne,
  [SectionTwo, 'flag_section_two'],
  [SectionThree, 'flag_section_three'],
  [SectionFour, (formData) => get(formData, 'randomString') === 'four']
])

import React, {PropTypes} from 'react';
import {Element, animateScroll} from 'react-scroll';
import Description from './Description';

const propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.any
};

const DisplaySection = (props) => (
  <Element
    name={props.name}
    className={`display-section ${props.className || ''}`}
  >
    <div id={props.name} className='display-section__content'>
      <Description
        title={props.name}
        text={props.description}
      />
      {props.children}
    </div>

    <span
      className='scrolltop button is-link'
      onClick={() => animateScroll.scrollToTop()}>
      ^ Scroll to top
    </span>
  </Element>
);

DisplaySection.propTypes = propTypes;
export default DisplaySection;

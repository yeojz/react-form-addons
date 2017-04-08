import React from 'react'; 
import PropTypes from 'prop-types';
import textToHtml from '../textToHtml';

const propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.any
};

const Description = (props) => (
  <section className={`description-section ${props.className || ''}`}>
    {props.title ? <h3>{props.title}</h3> : null}
    <div className='description-section__content'>
      {textToHtml(props.text)}
      {props.children}
    </div>
  </section>
);

Description.propTypes = propTypes;
export default Description;

import React, {PropTypes} from 'react';

const propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.any
};

const renderText = (text) => {
  if (Array.isArray(text)) {
    return text.map((value, key) => (
      <p key={key}>{value}</p>
    ));
  }
  return text;
};

const Description = (props) => (
  <section className={`description-section ${props.className || ''}`}>
      {props.title ? <h3>{props.title}</h3> : null}
      <div className='description-section__content'>
        {renderText(props.text)}
        {props.children}
      </div>
  </section>
);

Description.propTypes = propTypes;
export default Description;

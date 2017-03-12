import React, {PropTypes} from 'react';
import marked from 'marked';

const propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.any
};

const processText = (text) => {
  const sentences = text.split('\n');

  return sentences.map((sentence, key) => (
    <div className='sentence' key={key} dangerouslySetInnerHTML={{
      __html: marked(sentence.replace(' ', '') + ' ')
    }} />
  ));
}

const Description = (props) => (
  <section className={`description-section ${props.className || ''}`}>
    {props.title ? <h3>{props.title}</h3> : null}
    <div className='description-section__content'>
      {processText(props.text)}
      {props.children}
    </div>
  </section>
);

Description.propTypes = propTypes;
export default Description;

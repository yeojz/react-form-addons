import React from 'react';
import marked from 'marked';

function textToHtml(text, split = true) {
  const sentences = split ? text.split('\n') : [text];

  return sentences.map((sentence, key) => (
    <div className='sentence' key={key} dangerouslySetInnerHTML={{
      __html: marked(sentence.replace(' ', '') + ' ')
    }} />
  ));
}

export default textToHtml;

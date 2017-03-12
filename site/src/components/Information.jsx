import React from 'react';
import textToHtml from '../textToHtml';

const writeup = `
  \`react-form-addons\` aims to solves the complexity of building and handling large forms.

  The library abstracts possible data input patterns like lists of data, nested
  form data or even conditional form data into Higher-Order functions, and ultimately builds and
  exposes a final "formData" and "formMeta" to your chosen state engine.

  It is __independent of state libraries__, i.e. if you want to use React Component State, Redux, MobX
  or any other state management engine, you should be able to do so with minimal effort.
  For examples, check out the [React Component State](https://github.com/yeojz/react-form-addons/blob/master/src/lib/withState.js) or [Redux State](//github.com/yeojz/react-form-addons/blob/master/src/redux/withReduxState.js) implementations.
`;

const Information = () => (
  <div className='information'>
    {textToHtml(writeup)}
    <h4>Installation</h4>
    <pre className='custom'>npm install react-form-addons --save</pre>
  </div>
)

export default Information

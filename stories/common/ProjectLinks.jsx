import React, {PropTypes} from 'react';

const GITHUB_URL = 'https://github.com/yeojz/react-form-addons';
const NPM_URL = 'https://www.npmjs.com/package/react-form-addons';
const DOC_URL = 'https://github.com/yeojz/react-form-addons/tree/master/docs';

const renderLink = (text, link) => (
  <a href={link} className='navlink' target='_blank'>{text}</a>
)

const ProjectLinks = (props) => (
  <div className='group'>
    <h2>Project Links</h2>
    {renderLink('Github', GITHUB_URL)}
    {renderLink('npm', NPM_URL)}
  </div>
)

export default ProjectLinks;

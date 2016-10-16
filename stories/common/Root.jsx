import React, {PropTypes} from 'react';
import Sidebar from './Sidebar';

const Root = (story) => (
  <div className='stories-common-root'>

    <div className='story-list'>
      <Sidebar />
    </div>

    <div className='story-viewer'>
      <div className='content'>{story()}</div>
    </div>
  </div>
)

export default Root;

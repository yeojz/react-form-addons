import React, {PropTypes} from 'react';
import Sidebar from 'stories/common/Sidebar';

export default function(story) {
  return (
    <div className='stories-common-root'>
      <div className='story-list'>
        <Sidebar />
      </div>

      <div className='story-viewer'>
        <div className='content'>{story()}</div>
      </div>
    </div>
  )
}

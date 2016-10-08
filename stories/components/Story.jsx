import React, {PropTypes} from 'react';

import 'basscss/css/basscss.min';
import 'basscss-forms';
import './_story';

const Story = (story) => (
    <div className='stories-story clearfix'>
        <div className='col col-6'>
            {story()}
        </div>
    </div>
);

export default Story

import React, {PropTypes} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import './_story';

injectTapEventPlugin();

const Story = (story) => (
  <MuiThemeProvider>
    <div className='stories-story clearfix'>
      {story()}
    </div>
  </MuiThemeProvider>
);

export default Story;

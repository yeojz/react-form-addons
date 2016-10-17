import React, {PropTypes} from 'react';
import Layout from 'stories/common/Layout';

export default function(story, active) {
  return <Layout active={active}>{story()}</Layout>;
}

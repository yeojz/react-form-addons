import {configure, setAddon} from '@kadira/storybook';
import {setOptions} from '@kadira/storybook-addon-options';

setOptions({
  name: 'react-form-addons',
  url: 'https://github.com/yeojz/react-form-addons',
  goFullScreen: false,
  showLeftPanel: true,
  showDownPanel: false,
  showSearchBox: false,
  downPanelInRight: false
});

const req = require.context('../stories', true, /\.story\.(js|jsx)$/);
configure(() => req.keys().forEach(req), module);

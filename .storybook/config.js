import {addDecorator, configure, setAddon} from '@kadira/storybook';
import {setOptions} from '@kadira/storybook-addon-options';
import Root from '../stories/common/Root';
import '../stories/_stories';

setOptions({
  name: 'react-form-addons',
  url: 'https://github.com/yeojz/react-form-addons',
  goFullScreen: false,
  showLeftPanel: false,
  showDownPanel: false,
  showSearchBox: false,
  downPanelInRight: false
});

addDecorator(Root);

const req = require.context('../stories', true, /\.story\.(js|jsx)$/);
configure(() => req.keys().forEach(req), module);

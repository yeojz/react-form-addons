import jsdom from 'jsdom';

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>', {
  virtualConsole: jsdom.createVirtualConsole().sendTo(console)
});

global.window = document.defaultView;

Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

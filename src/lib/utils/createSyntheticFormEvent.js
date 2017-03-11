import SyntheticFormEvent from './SyntheticFormEvent';

function createSyntheticFormEvent(evt, ...args) {
  if (evt.isSyntheticFormEvent) {
    return evt;
  }
  return new SyntheticFormEvent(evt, ...args);
}

export default createSyntheticFormEvent;

// @flow
import SyntheticFormEvent from './SyntheticFormEvent';

function createSyntheticFormEvent(evt: PseudoEvent | SyntheticFormEvent, ...args: Array<*>): SyntheticFormEvent {
  if (!evt) {
    return new SyntheticFormEvent();
  }
  if (evt instanceof SyntheticFormEvent) {
    return evt;
  }
  return new SyntheticFormEvent(evt, ...args);
}

export default createSyntheticFormEvent;

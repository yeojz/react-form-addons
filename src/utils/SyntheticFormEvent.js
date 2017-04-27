import get from 'lodash/get';
import noop from 'lodash/noop';

class SyntheticFormEvent {
  constructor(evt = {}, data = {}, meta = {}) {
    this._event = this.extractEvent(evt);
    this._formMeta = meta;
    this._formData = data;
  }

  extractEvent(evt) {
    return {
      target: {
        name: get(evt, 'target.name'),
        value: get(evt, 'target.value')
      },
      preventDefault: get(evt, 'preventDefault', noop),
      stopPropagation: get(evt, 'stopPropagation', noop)
    }
  }

  removeEventActions() {
    this._event.preventDefault = noop;
    this._event.stopPropagation = noop;
  }

  set target(value) {
    this._event.target = value;
  }

  set formData(value) {
    this._formData = value;
  }

  set formMeta(value) {
    this._formMeta = value;
  }

  get isSyntheticFormEvent() {
    return true;
  }

  get formData() {
    return {...this._formData};
  }

  get formMeta() {
    return {...this._formMeta};
  }

  get event() {
    return {...this._event};
  }

  get preventDefault() {
    return get(this, '_event.preventDefault', noop);
  }

  get stopPropagation() {
    return get(this, '_event.stopPropagation', noop);
  }

  get target() {
    return {
      name: get(this, '_event.target.name'),
      value: get(this, '_event.target.value')
    }
  }
}

export default SyntheticFormEvent;

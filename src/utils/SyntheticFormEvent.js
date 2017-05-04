// @flow
import get from 'lodash/get';
import noop from 'lodash/noop';

class SyntheticFormEvent {
  _event: Object
  _formMeta: Object
  _formData: Object

  constructor(evt: DefaultEvent | Object, data: ?Object, meta: ?Object) {
    this._event = this.extractEvent(evt || {});
    this._formMeta = meta || {};
    this._formData = data || {};
  }

  extractEvent(evt: DefaultEvent | Object): FormEvent {
    return {
      target: {
        name: get(evt, 'target.name'),
        value: get(evt, 'target.value')
      },
      preventDefault: get(evt, 'preventDefault', noop),
      stopPropagation: get(evt, 'stopPropagation', noop)
    }
  }

  removeEventActions(): void {
    this._event.preventDefault = noop;
    this._event.stopPropagation = noop;
  }

  set target(value: any) {
    this._event.target = value;
  }

  set formData(value: Object) {
    this._formData = value;
  }

  set formMeta(value: Object) {
    this._formMeta = value;
  }

  get formData(): Object {
    return {...this._formData};
  }

  get formMeta(): Object {
    return {...this._formMeta};
  }

  get event(): FormEvent {
    return {...this._event};
  }

  get preventDefault(): Function {
    return get(this, '_event.preventDefault', noop);
  }

  get stopPropagation(): Function {
    return get(this, '_event.stopPropagation', noop);
  }

  get target(): FormEventTarget {
    return {
      name: get(this, '_event.target.name'),
      value: get(this, '_event.target.value')
    }
  }
}

export default SyntheticFormEvent;

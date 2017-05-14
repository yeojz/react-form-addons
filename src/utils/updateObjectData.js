// @flow
import get from 'lodash/get';
import update from 'immutability-helper';

function getDelta(name: string, value: any): Object {
  return {
    $merge: {
      [name]: value
    }
  }
}

function getBooleanDelta(data: Object, name: string) {
  const current = get(data, name, false);
  return getDelta(name, !current);
}

function updateObjectData(data: Object, evt: PseudoEvent | SyntheticFormEvent, bool: boolean = false) {
  const name = get(evt, 'target.name');
  const value = get(evt, 'target.value');

  const delta = bool
    ? getBooleanDelta(data, name)
    : getDelta(name, value);

  return update(data, delta);
}

export default updateObjectData;

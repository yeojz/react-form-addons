import get from 'lodash/get';
import update from 'immutability-helper';

function getDelta(name, value) {
  return {
    $merge: {
      [name]: value
    }
  }
}

function getBooleanDelta(data, name) {
  const current = get(data, name, false);
  return getDelta(name, !current);
}

function updateObjectData(data, evt, bool = false) {
  const name = get(evt, 'target.name');
  const value = get(evt, 'target.value');

  const delta = bool
    ? getBooleanDelta(data, name)
    : getDelta(name, value);

  return update(data, delta);
}

export default updateObjectData;

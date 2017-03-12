import isEqualWith from 'lodash/isEqualWith';
import {Iterable} from 'immutable'

const checkImmutable = (value1, value2) => {
  if (Iterable.isIterable(value1) || Iterable.isIterable(value2)) {
    return value1 === value2;
  }
  return void 0;
}

function isEqual(value1, value2) {
  return isEqualWith(value1, value2, checkImmutable)
}

export default isEqual;

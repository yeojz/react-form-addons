import get from 'lodash/get';
import isEqual from 'lodash/isEqual';

function isPropKeyEqual(key, props, nextProps) {
  const nextData = get(nextProps, key);
  const currentData = get(props, key);
  return isEqual(nextData, currentData);
}

export default isPropKeyEqual;

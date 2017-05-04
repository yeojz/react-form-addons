// @flow
import get from 'lodash/get';

function getDataFromKey(dataset: Object): any {
  return (key: string, defaultValue: string = '') => (
    get(dataset, key, defaultValue)
  );
}

export default getDataFromKey;

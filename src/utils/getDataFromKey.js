// @flow
import get from 'lodash/get';

function getDataFromKey(dataset: Object): Function {
  return (key: string, defaultValue: string = ''): any => (
    get(dataset, key, defaultValue)
  );
}

export default getDataFromKey;

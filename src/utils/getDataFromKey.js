import get from 'lodash/get';

function getDataFromKey(dataset) {
  return (key, defaultValue = '') => (
    get(dataset, key, defaultValue)
  );
}

export default getDataFromKey;

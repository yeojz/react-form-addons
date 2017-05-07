import getDataFromKey from './getDataFromKey';

describe('lib/utils/getDataFromKey', function () {

  it('should return a function', function () {
    const result = getDataFromKey({});
    expect(typeof result).toBe('function');
  });

  it('should return default value when key not found (void 0)', function () {
    const fn = getDataFromKey({test: 'me'});
    const result = fn('nothing');
    expect(result).toBe('');
  });

  it('should return default value when key not found (defined value)', function () {
    const fn = getDataFromKey({test: 'me'});
    const result = fn('nothing', 'default');
    expect(result).toBe('default');
  });

  it('should not fail on null or void 0 dataset', function () {
    const result1 = getDataFromKey(void 0)('something', 'default');
    expect(result1).toBe('default');

    const result2 = getDataFromKey(null)('something', 'default');
    expect(result2).toBe('default');
  });

  it('should return correct value when key is found', function () {
    const fn = getDataFromKey({test: 'me'});
    const result = fn('test');
    expect(result).toBe('me');
  });
});

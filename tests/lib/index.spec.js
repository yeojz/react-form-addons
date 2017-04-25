import * as exposed from 'src/lib/index';

describe('lib/index', function () {
  it('total number of exports', function () {
    expect(Object.keys(exposed)).toHaveLength(11)
  });

  [
    ['SyntheticFormEvent', 'function'],
    ['branch', 'function'],
    ['collection', 'function'],
    ['compose', 'function'],
    ['constants', 'object'],
    ['formControl', 'function'],
    ['list', 'function'],
    ['withSideEffects', 'function'],
    ['withState', 'function'],
    ['withValidation', 'function']
  ].forEach(([fn, type]) => {
    it(`exports ${fn}`, function () {
      expect(typeof exposed[fn]).toBe(type);
    });
  });
});

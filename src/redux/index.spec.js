import * as exposed from 'src/redux/index';

describe('redux/index', function () {
  it('total number of exports', function () {
    expect(Object.keys(exposed)).toHaveLength(4)
  });

  [
    'constants',
    'formActions',
    'formReducer',
    'withReduxState'
  ].forEach((fn) => {
    it(`exports ${fn}`, function () {
      expect(exposed[fn]).toBeDefined();
    });
  });
});

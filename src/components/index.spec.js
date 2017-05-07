import * as exposed from './index';

describe('components/index', function () {
  it('total number of exports', function () {
    expect(Object.keys(exposed)).toHaveLength(2)
  });

  [
    'Input',
    'Textarea'
  ].forEach((fn) => {
    it(`exports ${fn}`, function () {
      expect(exposed[fn]).toBeDefined();
    });
  });
});

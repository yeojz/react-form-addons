import compose from 'src/lib/compose';

describe('lib/compose', function () {
  it('compose is called in reverse order', function () {
    const fn1 = jest.fn(() => 'r1');
    const fn2 = jest.fn(() => 'r2');
    const result = compose(fn2, fn1)('start');

    expect(fn1).toHaveBeenCalledTimes(1);
    expect(fn1).toHaveBeenCalledWith('start');
    expect(fn2).toHaveBeenCalledTimes(1);
    expect(fn2).toHaveBeenCalledWith('r1');
    expect(result).toBe('r2');
  });
});

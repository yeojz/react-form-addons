import {stub} from 'sinon';
import compose from 'src/lib/compose';

describe('lib/compose', function () {
  it('compose is called in reverse order', function () {
    const fn1 = stub().returns('r1');
    const fn2 = stub().returns('r2');
    const result = compose(fn2, fn1)('start');

    expect(fn1.calledOnce).toBe(true);
    expect(fn1.calledWith('start')).toBe(true);
    expect(fn2.calledOnce).toBe(true);
    expect(fn2.calledWith('r1')).toBe(true);
    expect(result).toBe('r2');
  });
});

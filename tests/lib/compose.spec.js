import {expect} from 'chai';
import {stub} from 'sinon';
import compose from 'src/lib/compose';

describe('lib/compose', function () {
  it('compose is called in reverse order', function () {
    const fn1 = stub().returns('r1');
    const fn2 = stub().returns('r2');
    const result = compose(fn2, fn1)('start');

    expect(fn1.calledOnce).to.be.true;
    expect(fn1.calledWith('start')).to.be.true;
    expect(fn2.calledOnce).to.be.true;
    expect(fn2.calledWith('r1')).to.be.true;
    expect(result).to.equal('r2');
  });
});

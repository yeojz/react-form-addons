import {expect} from 'chai';
import * as exposed from '../../src/redux/index';

describe('redux/index', function () {
  it('total number of exports', function () {
    expect(Object.keys(exposed)).to.be.length(4)
  });

  it('exports constants', function () {
    expect(exposed.constants).to.not.be.undefined;
  });

  it('exports formActions', function () {
    expect(exposed.formActions).to.not.be.undefined;
  });

  it('exports formReducer', function () {
    expect(exposed.formReducer).to.not.be.undefined;
  });

  it('exports withReduxState', function () {
    expect(exposed.withReduxState).to.not.be.undefined;
  });
});

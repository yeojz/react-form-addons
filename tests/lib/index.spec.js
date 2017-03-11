import {expect} from 'chai';
import * as exposed from 'src/lib/index';

describe('lib/index', function () {
  it('total number of exports', function () {
    expect(Object.keys(exposed)).to.be.length(10)
  });

  it('exports SyntheticFormEvent', function () {
    expect(exposed.SyntheticFormEvent).to.a.class;
  });

  it('exports branch', function () {
    expect(exposed.branch).to.a.function;
  });

  it('exports collection', function () {
    expect(exposed.collection).to.a.function;
  });

  it('exports compose', function () {
    expect(exposed.compose).to.a.function;
  });

  it('exports constants', function () {
    expect(exposed.constants).to.an.object;
  });

  it('exports formControl', function () {
    expect(exposed.formControl).to.a.function;
  });

  it('exports withProps', function () {
    expect(exposed.withProps).to.a.function;
  });

  it('exports withSideEffects', function () {
    expect(exposed.withSideEffects).to.a.function;
  });

  it('exports withState', function () {
    expect(exposed.withState).to.a.function;
  });

  it('exports withValidation', function () {
    expect(exposed.withValidation).to.a.function;
  });
});

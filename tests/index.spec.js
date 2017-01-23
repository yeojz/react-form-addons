import {expect} from 'chai';
import * as exposed from '../src/index';

describe('index', function () {
  it('total number of exports', function () {
    expect(Object.keys(exposed)).to.be.length(8)
  });

  it('exports SyntheticFormEvent', function () {
    expect(exposed.SyntheticFormEvent).to.not.be.undefined;
  });

  it('exports branch', function () {
    expect(exposed.connect).to.not.be.undefined;
  });

  it('exports collection', function () {
    expect(exposed.collection).to.not.be.undefined;
  });

  it('exports compose', function () {
    expect(exposed.compose).to.not.be.undefined;
  });

  it('exports withProps', function () {
    expect(exposed.withProps).to.not.be.undefined;
  });

  it('exports withSideEffects', function () {
    expect(exposed.withSideEffects).to.not.be.undefined;
  });

  it('exports withState', function () {
    expect(exposed.withState).to.not.be.undefined;
  });

  it('exports withValidation', function () {
    expect(exposed.withValidation).to.not.be.undefined;
  });
});

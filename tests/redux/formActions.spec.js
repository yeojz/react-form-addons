import {expect} from 'chai';
import constants from 'src/redux/constants';
import formActions from 'src/redux/formActions';

describe('redux/formActions', function () {
  it('update should return expected action', function () {
    const result = formActions.update('test', {
      formData: 'fd',
      formMeta: 'fm'
    });

    expect(result.type).to.equal(constants.UPDATE);
    expect(result.payload).to.be.an.object;
    expect(result.payload.name).to.equal('test');
    expect(result.payload.formData).to.equal('fd');
    expect(result.payload.formMeta).to.equal('fm');
  });

  it('reset should return expected action', function () {
    const result = formActions.reset('test');

    expect(result.type).to.equal(constants.RESET);
    expect(result.payload).to.be.an.object;
    expect(result.payload.name).to.equal('test');
  });
});

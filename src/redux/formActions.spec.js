import constants from './constants';
import formActions from './formActions';

describe('redux/formActions', function () {
  it('update should return expected action', function () {
    const result = formActions.update('test', {
      formData: 'fd',
      formMeta: 'fm'
    });

    expect(result.type).toBe(constants.UPDATE);
    expect(typeof result.payload).toBe('object');
    expect(result.payload.name).toBe('test');
    expect(result.payload.formData).toBe('fd');
    expect(result.payload.formMeta).toBe('fm');
  });

  it('reset should return expected action', function () {
    const result = formActions.reset('test');

    expect(result.type).toBe(constants.RESET);
    expect(typeof result.payload).toBe('object');
    expect(result.payload.name).toBe('test');
  });
});

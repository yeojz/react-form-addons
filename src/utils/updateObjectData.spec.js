import updateObjectData from './updateObjectData';
import SyntheticFormEvent from './SyntheticFormEvent';

describe('utils/updateObjectData', function () {
  it('should update boolean data with boolean value', function () {
    const evt = new SyntheticFormEvent({
      target: {name: 'test', value: 'me2'}
    });

    const current = {
      test: true
    };

    const result = updateObjectData(current, evt, true);
    expect(typeof result.test).toBe('boolean');
    expect(result.test).toBe(false);
  });

  it('should update boolean data with string value', function () {
    const evt = new SyntheticFormEvent({
      target: {name: 'test', value: 'me2'}
    });

    const current = {
      test: 'me'
    };

    const result = updateObjectData(current, evt, false);
    expect(typeof result.test).toBe('string');
    expect(result.test).toBe('me2');
  });
});

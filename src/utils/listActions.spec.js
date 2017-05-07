import listActions from './listActions';
import SyntheticFormEvent from './SyntheticFormEvent';

describe('utils/listActions', function () {
  it('should generate add before action', function () {
    const props = {
      formData: {
        test: [{}]
      },
      formMeta: {
        test: [{}, {}]
      }
    }
    const evt = new SyntheticFormEvent();
    const result = listActions.add('before', 'test', props, evt);
    expect(result.formData.test.length).toBe(2);
    expect(result.formMeta.test.length).toBe(3);
    expect(result.target.name).toBe('test');
    expect(result.target.value).toBe(result.formData.test);
  });

});

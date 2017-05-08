import listActions from './listActions';
import SyntheticFormEvent from './SyntheticFormEvent';

describe('utils/listActions', function () {
  it('should generate add before action', function () {
    const props = {
      formData: {
        test: [{a: 1}]
      },
      formMeta: {
        test: [{a: 1}, {b: 2}]
      }
    }
    const evt = new SyntheticFormEvent();
    const result = listActions.add('before', 'test', props, evt);
    expect(result.formData.test.length).toBe(2);
    expect(result.formMeta.test.length).toBe(3);
    expect(Object.keys(result.formData.test[0]).length).toBe(0);
    expect(Object.keys(result.formData.test[1]).length).toBe(1);
    expect(result.target.name).toBe('test');
    expect(result.target.value).toBe(result.formData.test);
  });

  it('should generate add after action', function () {
    const props = {
      formData: {
        test: [{a: 1}]
      },
      formMeta: {
        test: [{a: 1}, {b: 2}]
      }
    }
    const evt = new SyntheticFormEvent();
    const result = listActions.add('after', 'test', props, evt);
    expect(result.formData.test.length).toBe(2);
    expect(result.formMeta.test.length).toBe(3);
    expect(Object.keys(result.formData.test[0]).length).toBe(1);
    expect(Object.keys(result.formData.test[1]).length).toBe(0);
    expect(result.target.name).toBe('test');
    expect(result.target.value).toBe(result.formData.test);
  });

  it('should should not fail add action when no existing value', function () {
    const props = {
      formData: {},
      formMeta: {}
    }
    const evt = new SyntheticFormEvent();
    const result = listActions.add('before', 'test', props, evt);
    expect(result.formData.test.length).toBe(1);
    expect(result.formMeta.test.length).toBe(1);
  });

  it('should change values in event', function () {
    const props = {
      formData: {
        test: [{a: 1}]
      },
      formMeta: {
        test: [{a: 1}]
      }
    }
    const evt = new SyntheticFormEvent();
    evt.formData = {b: 1}
    const result = listActions.change(0, 'test', props, evt);
    expect(result.formData.test.length).toBe(1);
    expect(result.formMeta.test.length).toBe(1);
    expect(Object.keys(result.formData.test[0]).length).toBe(1);
    expect(Object.keys(result.formData.test[0]).length).toBe(1);
    expect(result.target.name).toBe('test');
    expect(result.target.value).toBe(result.formData.test);
    expect(result.target.value[0]).toEqual({b: 1});
  });

  it('should remove values from event', function () {
    const props = {
      formData: {
        test: [{a: 1}]
      },
      formMeta: {
        test: [{a: 1}]
      }
    }
    const evt = new SyntheticFormEvent();
    const result = listActions.remove(0, 'test', props, evt);
    expect(result.formData.test.length).toBe(0);
    expect(result.formMeta.test.length).toBe(0);
    expect(result.target.name).toBe('test');
    expect(result.target.value).toBe(result.formData.test);
  });
});

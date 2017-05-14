import SyntheticFormEvent from './SyntheticFormEvent';

describe('utils/SyntheticFormEvent', function () {

  it('should init a new event object', function () {
    const evt = new SyntheticFormEvent();
    expect(evt instanceof SyntheticFormEvent).toBe(true);
  });

  it('should have event interfaces', function () {
    const evt = new SyntheticFormEvent();

    expect(evt.target).toBeDefined();
    expect(evt.target.hasOwnProperty('name')).toBe(true);
    expect(evt.target.hasOwnProperty('value')).toBe(true);

    expect(evt.preventDefault).toBeInstanceOf(Function);
    expect(evt.stopPropagation).toBeInstanceOf(Function);
  });

  it('should have custom interfaces', function () {
    const evt = new SyntheticFormEvent();

    expect(evt.formData).toBeDefined();
    expect(evt.formMeta).toBeDefined();
    expect(evt.isSyntheticFormEvent).toBe(true);

    expect(evt.event).toBeDefined();
    expect(evt.event.target).toBeDefined();
    expect(evt.event.preventDefault).toBeDefined();
    expect(evt.event.stopPropagation).toBeDefined();
  });

  it('should remove event actions', function () {
    const prevEvent = {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn()
    }
    const evt = new SyntheticFormEvent(prevEvent);
    evt.preventDefault();
    evt.stopPropagation();
    evt.removeEventActions();
    evt.preventDefault();
    evt.stopPropagation();

    expect(prevEvent.preventDefault.mock.calls.length).toBe(1);
    expect(prevEvent.stopPropagation.mock.calls.length).toBe(1);
  });

  it('should set target', function () {
    const evt = new SyntheticFormEvent();
    expect(evt.target.name).not.toBeDefined();
    expect(evt.target.value).not.toBeDefined();

    evt.target = {
      name: 'test',
      value: 1
    }

    expect(evt.target.name).toBe('test');
    expect(evt.target.value).toBe(1);
  });

  it('should set formData', function () {
    const evt = new SyntheticFormEvent();
    expect(Object.keys(evt.formData).length).toBe(0);

    evt.formData = {
      input: 'test'
    }

    expect(Object.keys(evt.formData).length).toBe(1);
  });

  it('should set formMeta', function () {
    const evt = new SyntheticFormEvent();
    expect(Object.keys(evt.formMeta).length).toBe(0);

    evt.formMeta = {
      input: 'test'
    }

    expect(Object.keys(evt.formMeta).length).toBe(1);
  });
});

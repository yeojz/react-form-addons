import createSyntheticFormEvent from './createSyntheticFormEvent';
import SyntheticFormEvent from './SyntheticFormEvent';

describe('utils/createSyntheticFormEvent', function () {
  it('should return a SyntheticFormEvent when event is null', function () {
    const result = createSyntheticFormEvent(void 0);
    expect(result.isSyntheticFormEvent).toBe(true);
  });

  it('should return a SyntheticFormEvent when a event-like object is provided', function () {
    const result = createSyntheticFormEvent({
      target: {
        name: 'test',
        value: 'testValue'
      }
    });
    expect(result.isSyntheticFormEvent).toBe(true);
  });

  it('should return a same object when SyntheticFormEvent object is provided', function () {
    let evt = new SyntheticFormEvent();
    evt.test = true;
    const result = createSyntheticFormEvent(evt);
    expect(result.isSyntheticFormEvent).toBe(true);
    expect(result.test).toBe(true);
  });
});

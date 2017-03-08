import {expect} from 'chai';
import constants from 'src/redux/constants';
import formReducer, {defaultState} from 'src/redux/formReducer';

describe('redux/formReducer', function () {

  it('should return default state', function () {
    const state = formReducer();

    expect(state).to.deep.equal({
      lastFormName: '',
      lastActionType: '',
      data: {}
    });
  });

  it('should return current state when unknown action (void 0)', function () {
    const state = formReducer({test: 'me'}, void 0);
    expect(state).to.deep.equal({test: 'me'});
  });

  it('should return current state when unknown action (obj)', function () {
    const state = formReducer({test: 'me'}, {type: 'thisisjustatest'});
    expect(state).to.deep.equal({test: 'me'});
  });

  it('should return new state on update action', function () {
    const action = createAction(constants.UPDATE);
    const expected = createStateFromAction(constants.UPDATE, action);
    const prevState = defaultState();
    const state = formReducer(prevState, action);

    expect(state).to.deep.equal(expected);
  });

  it('should return new state on reset action', function () {
    const action = createAction(constants.RESET);
    const prevState = createStateFromAction(constants.UPDATE, action);
    const state = formReducer(prevState, action);
    const expected = {
      lastFormName: action.payload.name,
      lastActionType: constants.RESET,
      data: {
        [action.payload.name]: {}
      }
    };
    expect(state).to.deep.equal(expected);
  });

  function createAction(type) {
    return {
      type,
      payload: {
        name: 'test-action',
        formData: {fd: 'test'},
        formMeta: {fm: 'test'}
      }
    };
  }

  function createStateFromAction(type, action) {
    const data = {
      [action.payload.name]: {
        formData: action.payload.formData,
        formMeta: action.payload.formMeta
      }
    }

    return {
      lastFormName: action.payload.name,
      lastActionType: type,
      data
    };
  }
});

import constants from './constants';
import update from 'immutability-helper';

const defaultState = () => ({
  lastActionName: '',
  lastActionType: '',
  data: {}
});

const getDelta = (type, name, data) => ({
  lastActionName: {
    $set: name
  },
  lastActionType: {
    $set: type
  },
  data: {
    [name]: {
      $set: data
    }
  }
});

const doUpdateAction = (state, action) => {
  const {payload} = action;

  const delta = getDelta(constants.UPDATE, payload.name, {
    formData: payload.formData,
    formMeta: payload.formMeta
  });

  return update(state, delta);
}

const doResetAction = (state, action) => {
  const {payload} = action;
  const delta = getDelta(constants.RESET, payload.name, {});
  return update(state, delta);
}

function reducer(state = defaultState(), action = {}) {
  if (action.type === constants.UPDATE) {
    return doUpdateAction(state, action);
  }

  if (action.type === constants.RESET) {
    return doResetAction(state, action);
  }

	return state;
}

export default reducer;

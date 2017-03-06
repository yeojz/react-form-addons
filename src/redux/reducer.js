import actionTypes from './actionTypes';
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

  const delta = getDelta('update', payload.name, {
    formData: payload.formData,
    formMeta: payload.formMeta
  });

  return update(state, delta);
}

const doUnsetAction = (state, action) => {
  const {payload} = action;
  const delta = getDelta('unset', payload.name, {});
  return update(state, delta);
}

function reducer(state = defaultState(), action = {}) {
  if (action.type === actionTypes.UPDATE) {
    return doUpdateAction(state, action);
  }

  if (action.type === actionTypes.UNSET) {
    return doUnsetAction(state, action);
  }

	return state;
}

export default reducer;

// @flow
import constants from './constants';
import update from 'immutability-helper';

type ActionType = constants.UPDATE | constants.RESET;

type ReducerState = {
  lastFormName: string;
  lastActionType: string;
  data: Object
}

const defaultState = (): ReducerState => ({
  lastFormName: '',
  lastActionType: '',
  data: {}
});

const getDelta = (type: ActionType, name: string, data: Object): Object => ({
  lastFormName: {
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

const doUpdateAction = (state: ReducerState, action: Object): ReducerState => {
  const {payload} = action;

  const delta = getDelta(constants.UPDATE, payload.name, {
    formData: payload.formData,
    formMeta: payload.formMeta
  });

  return update(state, delta);
}

const doResetAction = (state: ReducerState, action: Object): ReducerState => {
  const {payload} = action;
  const delta = getDelta(constants.RESET, payload.name, {});
  return update(state, delta);
}

function reducer(state: ReducerState = defaultState(), action: Object = {}): ReducerState {
  if (action.type === constants.UPDATE) {
    return doUpdateAction(state, action);
  }

  if (action.type === constants.RESET) {
    return doResetAction(state, action);
  }

	return state;
}

export {defaultState};
export default reducer;

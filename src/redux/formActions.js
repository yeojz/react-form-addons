// @flow
import constants from './constants';

const update = (name: string, syntheticFormEvent: SyntheticFormEvent): ReduxAction => ({
  type: constants.UPDATE,
  payload: {
    name,
    formData: syntheticFormEvent.formData,
    formMeta: syntheticFormEvent.formMeta
  }
});

const reset = (name: string): ReduxAction => ({
  type: constants.RESET,
  payload: {
    name
  }
});

export default {
  update,
  reset
};

import constants from './constants';

const update = (name, syntheticFormEvent) => ({
  type: constants.UPDATE,
  payload: {
    name,
    formData: syntheticFormEvent.formData,
    formMeta: syntheticFormEvent.formMeta
  }
});

const reset = (name) => ({
  type: constants.RESET,
  payload: {
    name
  }
});

export default {
  update,
  reset
};

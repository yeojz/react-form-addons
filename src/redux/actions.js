import actionTypes from './actionTypes';

const update = (name, syntheticFormEvent) => ({
  type: actionTypes.UPDATE,
  payload: {
    name,
    formData: syntheticFormEvent.formData,
    formMeta: syntheticFormEvent.formMeta
  }
});

const unset = (name) => ({
  type: actionTypes.UNSET,
  payload: {
    name
  }
});

export default {
  update,
  unset
};

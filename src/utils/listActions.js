import update from 'immutability-helper';
import get from 'lodash/get';

const getTarget = (name, value) => ({
  name,
  value: get(value, name, [])
});

const getAddAction = (position) => {
  if (position === 'before') {
    return '$unshift';
  }
  return '$push';
}

const addDelta = (name, action) => ({
  [name]: {
    $apply: (item) => {
      return item ? item : [];
    },
    [action]: [{}]
  }
});

const add = (position, name, props, event) => {
  const delta = addDelta(name, getAddAction(position));
  event.formData = update(props.formData, delta);
  event.formMeta = update(props.formMeta, delta);
  event.target = getTarget(name, event.formData);
  return event;
}

const changeDelta = (name, idx) => (value) => ({
  [name]: {
    [idx]: {
      $set: value
    }
  }
});

const change = (idx, name, props, event) => {
  const delta = changeDelta(name, idx);
  event.formData = update(props.formData, delta(event.formData));
  event.formMeta = update(props.formMeta, delta(event.formMeta));
  event.target = getTarget(name, event.formData);
  return event;
};

const removeDelta = (name, idx) => ({
  [name]: {
    $splice: [[idx, 1]]
  }
});

const remove = (idx, name, props, event) => {
  const delta = removeDelta(name, idx);
  event.formData = update(props.formData, delta);
  event.formMeta = update(props.formMeta, delta);
  event.target = getTarget(name, event.formData);
  return event;
};

export default {
  add,
  change,
  remove
};

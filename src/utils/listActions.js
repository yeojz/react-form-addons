// @flow
import update from 'immutability-helper';
import get from 'lodash/get';

type Props = Object;

const getTarget = (name: string, value: any): Object => ({
  name,
  value: get(value, name, [])
});

const getAddAction = (position: "before" | "after"): string => {
  if (position === 'before') {
    return '$unshift';
  }
  return '$push';
}

const addDelta = (name: string, action: string): Object => ({
  [name]: {
    $apply: (item) => {
      return item ? item : [];
    },
    [action]: [{}]
  }
});

const add = (position: "before" | "after", name: string, props: Props, event: SyntheticFormEvent): SyntheticFormEvent => {
  const delta = addDelta(name, getAddAction(position));
  event.formData = update(props.formData, delta);
  event.formMeta = update(props.formMeta, delta);
  event.target = getTarget(name, event.formData);
  return event;
}

const changeDelta = (name: string, idx: number) => (value: any): Object => ({
  [name]: {
    [idx]: {
      $set: value
    }
  }
});

const change = (idx: number, name: string, props: Props, event: SyntheticFormEvent): SyntheticFormEvent => {
  const delta = changeDelta(name, idx);
  event.formData = update(props.formData, delta(event.formData));
  event.formMeta = update(props.formMeta, delta(event.formMeta));
  event.target = getTarget(name, event.formData);
  return event;
};

const removeDelta = (name: string, idx: number): Object => ({
  [name]: {
    $splice: [[idx, 1]]
  }
});

const remove = (idx: number, name: string, props: Props, event: SyntheticFormEvent): SyntheticFormEvent => {
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

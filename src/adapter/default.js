import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import update from 'react-addons-update';

export const updateFormData = (formData, name, value) => {
  const delta = {
    $merge: {
      [name]: value
    }
  }
  return update(formData, delta);
}

export const onChange = (evt, formData) => {
  const name = get(evt, 'target.name');
  const value = get(evt, 'target.value');
  return updateFormData(formData, name, value);
}

export const onToggle = (evt, formData) => {
  const name = get(evt, 'target.name');
  const value = get(formData, name) ? false : true;
  return updateFormData(formData, name, value);
}

export const shouldApplyFormDataFromProps = (props, nextProps) => {
  const nextFormData = get(nextProps, 'formData');
  const currentformData = get(props, 'formData');

  if (isEqual(nextFormData, currentformData)) {
    return false;
  }
  return true;
}

export default {
  onChange,
  onToggle,
  shouldApplyFormDataFromProps,
  updateFormData
}

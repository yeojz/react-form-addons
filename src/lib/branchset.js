import React, {PropTypes} from 'react';
import get from 'lodash/get';
import update from 'immutability-helper';
import createSyntheticFormEvent from './utils/createSyntheticFormEvent';
import FormComponent from './utils/FormComponent';

const propTypes = {
  name: PropTypes.string,
  formData: PropTypes.object,
  formMeta: PropTypes.object,
  onChange: PropTypes.func
};

const getTarget = (name, value) => ({
  name,
  value
});

const updateData = (name, data, action) => {
  const delta = {
    [name]: action
  }
  return update(data, delta);
}

const handleChange = (name, props) => (idx) => (evt) => {
  let event = createSyntheticFormEvent(evt);
  event.formData = updateData(name, props.formData, {
    [idx]: {$set: event.formData}
  });
  event.formMeta = updateData(name, props.formMeta, {
    [idx]: {$set: event.formMeta}
  });
  event.target = getTarget(name, event.formData);
  return props.onChange(event);
};

const handleAdd = (name, props) => () => {
  let event = createSyntheticFormEvent();
  event.formData = updateData(name, props.formData, {
    $push: [{}]
  });
  event.formMeta = updateData(name, props.formMeta, {
    $push: [{}]
  });
  event.target = getTarget(name, event.formData);
  return props.onChange(event);
}

const handleRemove = (name, props) => (idx) => {
  let event = createSyntheticFormEvent();
  event.formData = updateData(name, props.formData, {
    $splice: [[idx, 1]]
  });
  event.formMeta = updateData(name, props.formMeta, {
    $splice: [[idx, 1]]
  });
  return props.onChange(event);
}

const branchset = (defaultName = 'default', Container = FormComponent) => (Component) => {

  const defaultProps = {
    name: defaultName,
    formData: {},
    formMeta: {}
  };

  class BranchSetForm extends React.component {

    getBranchData = (key) => (
      get(this, ['props', key, this.props.name], [])
    )

    renderSet = (onAddHandler, onChangeHandler, onRemoveHandler) => {
      const formData = this.getBranchData('formData');
      const formMeta = this.getBranchData('formMeta');

      return formData.map((entry, idx) => (
        <Component
          key={idx}
          name={idx}
          formData={get(formData, idx, {})}
          formMeta={get(formMeta, idx, {})}
          onChange={onChangeHandler(idx)}
          onRemove={onRemoveHandler(idx)}
        />
      ))
    }

    render() {
      const onAddHandler = handleAdd(this.props.name, this.props);
      const onChangeHandler = handleChange(this.props.name, this.props);
      const onRemoveHandler = handleRemove(this.props.name, this.props);

      return (
        <Container onAdd={onAddHandler}>
          {this.renderSet(onAddHandler, onChangeHandler, onRemoveHandler)}
        </Container>
      );
    }
  }

  BranchSetForm.propTypes = propTypes;
  BranchSetForm.defaultProps = defaultProps;
  return BranchSetForm;
}

export default branchset;

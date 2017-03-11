import React, {PropTypes} from 'react';
import get from 'lodash/get';
import createSyntheticFormEvent from './utils/createSyntheticFormEvent';
import FormContainer from './utils/FormContainer';
import listActions from './utils/listActions';

const propTypes = {
  name: PropTypes.string,
  formData: PropTypes.object,
  formMeta: PropTypes.object,
  onChange: PropTypes.func
};

const handleChange = (name, props) => (idx) => (evt) => {
  let event = createSyntheticFormEvent(evt);
  event = listActions.change(idx, name, props, event);
  return props.onChange(event);
};

const handleAdd = (name, props) => () => {
  let event = createSyntheticFormEvent();
  event = listActions.add(name, props, event);
  return props.onChange(event);
}

const handleRemove = (name, props) => (idx) => () => {
  let event = createSyntheticFormEvent();
  event = listActions.remove(idx, name, props, event);
  return props.onChange(event);
}

const list = (defaultName = 'default', Container = FormContainer) => (Component) => {

  const defaultProps = {
    name: defaultName,
    formData: {},
    formMeta: {}
  };

  class ListForm extends React.component {

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

  ListForm.propTypes = propTypes;
  ListForm.defaultProps = defaultProps;
  return ListForm;
}

export default list;

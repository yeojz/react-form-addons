import React from 'react'; 
import PropTypes from 'prop-types';
import get from 'lodash/get';
import createSyntheticFormEvent from '../utils/createSyntheticFormEvent';
import FormContainer from '../utils/FormContainer';
import listActions from '../utils/listActions';

const propTypes = {
  name: PropTypes.string.isRequired,
  formData: PropTypes.object,
  formMeta: PropTypes.object,
  onChange: PropTypes.func
};

const handleChange = (name, props) => (idx) => (evt) => {
  let event = createSyntheticFormEvent(evt);
  event = listActions.change(idx, name, props, event);
  return props.onChange(event);
};

const handleAdd = (name, props) => (position = 'after') => () => {
  let event = createSyntheticFormEvent();
  event = listActions.add(position, name, props, event);
  return props.onChange(event);
}

const handleRemove = (name, props) => (idx) => () => {
  let event = createSyntheticFormEvent();
  event = listActions.remove(idx, name, props, event);
  return props.onChange(event);
}

const list = (Container = FormContainer) => (Component) => {

  const defaultProps = {
    formData: {},
    formMeta: {}
  };

  class ListForm extends React.Component {

    static propTypes = propTypes;
    static defaultProps = defaultProps;

    getListData = (key) => (
      get(this, ['props', key, this.props.name], [])
    )

    renderList = (onAddHandler, onChangeHandler, onRemoveHandler) => {
      const formData = this.getListData('formData');
      const formMeta = this.getListData('formMeta');

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
        <Container
          onAdd={onAddHandler}
          onRemove={onRemoveHandler}
        >
          {this.renderList(
            onAddHandler,
            onChangeHandler,
            onRemoveHandler
          )}
        </Container>
      );
    }
  }

  return ListForm;
}

export default list;

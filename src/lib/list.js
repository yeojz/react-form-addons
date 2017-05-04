// @flow
import React from 'react';
import get from 'lodash/get';
import createSyntheticFormEvent from '../utils/createSyntheticFormEvent';
import FormContainer from '../utils/FormContainer';
import listActions from '../utils/listActions';

type Props = {
  name: string,
  formData: Object,
  formMeta: Object,
  onChange: Function
}

const handleChange = (name: string, props: Props) => (idx: number) => (evt: DefaultEvent): any => {
  let event = createSyntheticFormEvent(evt);
  event = listActions.change(idx, name, props, event);
  return props.onChange(event);
};

const handleAdd = (name: string, props: Props) => (position: "before" | "after" = 'after') => (): any => {
  let event = createSyntheticFormEvent();
  event = listActions.add(position, name, props, event);
  return props.onChange(event);
}

const handleRemove = (name: string, props: Props) => (idx: number) => () => {
  let event = createSyntheticFormEvent();
  event = listActions.remove(idx, name, props, event);
  return props.onChange(event);
}

const list = (Container: RComponent = FormContainer) => (Component: RComponent) => {

  class ListForm extends React.Component {
    props: Props

    static defaultProps = {
      formData: {},
      formMeta: {}
    }

    getListData = (key: string) => (
      get(this, ['props', key, this.props.name], [])
    )

    renderList = (onAddHandler: Function, onChangeHandler: Function, onRemoveHandler: Function): Array<RComponent> => {
      const formData = this.getListData('formData');
      const formMeta = this.getListData('formMeta');

      return formData.map((entry: any, idx: number) => (
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

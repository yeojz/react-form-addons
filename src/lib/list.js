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

const handleChange = (name: string, props: Props) => (idx: number) => (evt: PseudoEvent): void => {
  let event = createSyntheticFormEvent(evt);
  event = listActions.change(idx, name, props, event);
  props.onChange(event);
};

const handleAdd = (name: string, props: Props) => (position: "before" | "after" = 'after') => (): void => {
  let event: SyntheticFormEvent = createSyntheticFormEvent();
  event = listActions.add(position, name, props, event);
  props.onChange(event);
}

const handleRemove = (name: string, props: Props) => (idx: number) => (): void => {
  let event: SyntheticFormEvent = createSyntheticFormEvent();
  event = listActions.remove(idx, name, props, event);
  props.onChange(event);
}

const list = (Container: ReactClass<any> = FormContainer) => (Component: ReactClass<any>): ReactClass<any> => {

  class ListForm extends React.Component {
    props: Props

    static defaultProps = {
      formData: {},
      formMeta: {}
    }

    getListData = (key: string): Array<any> => (
      get(this.props, [key, this.props.name], [])
    )

    renderList = (onAddHandler: Function, onChangeHandler: Function, onRemoveHandler: Function): Array<React$Element<any>> => {
      const formData: Array<any> = this.getListData('formData');
      const formMeta: Array<any> = this.getListData('formMeta');

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
      const onAddHandler: Function = handleAdd(this.props.name, this.props);
      const onChangeHandler: Function = handleChange(this.props.name, this.props);
      const onRemoveHandler: Function = handleRemove(this.props.name, this.props);

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

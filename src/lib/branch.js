// @flow
import React from 'react';
import get from 'lodash/get';
import createSyntheticFormEvent from '../utils/createSyntheticFormEvent';
import updateObjectData from '../utils/updateObjectData';

type Props = {
  name: string,
  formData: Object,
  formMeta: Object,
  onChange: Function
};

const getTarget = (name: string, value: any) => ({
  name,
  value
});

const updateData = (name: string, data: Object, value: any) => (
  updateObjectData(
    data,
    {
      target: getTarget(name, value)
    }
  )
);

const handleChange = (name: string, props: Props) => (evt: DefaultEvent) => {
  let event = createSyntheticFormEvent(evt);
  event.formData = updateData(name, props.formData, event.formData);
  event.formMeta = updateData(name, props.formMeta, event.formMeta);
  event.target = getTarget(name, get(event.formData, name));
  return props.onChange(event);
};

const branch = () => (Component: RComponent): RComponent => {

  class BranchedForm extends React.Component {
    props: Props

    static defaultProps = {
      formData: {},
      formMeta: {}
    };

    getBranchData = (key: string) => (
      get(this, ['props', key, this.props.name], {})
    )

    render() {
      const formData = this.getBranchData('formData');
      const formMeta = this.getBranchData('formMeta');

      return (
        <Component
          {...this.props}
          formData={formData}
          formMeta={formMeta}
          onChange={handleChange(this.props.name, this.props)}
        />
      );
    }
  }

  return BranchedForm;
};

export default branch;

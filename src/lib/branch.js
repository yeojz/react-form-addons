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

const getTarget = (name: string, value: any): Object => ({
  name,
  value
});

const updateData = (name: string, data: Object, value: Object): Object => (
  updateObjectData(
    data,
    {
      target: getTarget(name, value)
    }
  )
);

const handleChange = (name: string, props: Props) => (evt: PseudoEvent): void => {
  let event: SyntheticFormEvent = createSyntheticFormEvent(evt);
  event.formData = updateData(name, props.formData, event.formData);
  event.formMeta = updateData(name, props.formMeta, event.formMeta);
  event.target = getTarget(name, get(event.formData, name));
  props.onChange(event);
};

const branch = () => (Component: ReactClass<any>): ReactClass<any> => {

  class BranchedForm extends React.Component {
    props: Props

    static defaultProps = {
      formData: {},
      formMeta: {}
    };

    getBranchData = (key: string): Object => (
      get(this.props, [key, this.props.name], {})
    )

    render() {
      const formData: Object = this.getBranchData('formData');
      const formMeta: Object = this.getBranchData('formMeta');

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

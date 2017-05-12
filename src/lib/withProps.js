// @flow
import React from 'react';
import createSyntheticFormEvent from '../utils/createSyntheticFormEvent';
import getDataFromKey from '../utils/getDataFromKey';
import updateObjectData from '../utils/updateObjectData';

type Props = {
  formData: Object,
  formMeta: Object,
  onChange: Function
};

const handleToggle = (props: Props) => (evt: PseudoEvent): any => {
  let event = createSyntheticFormEvent(evt, props.formData, props.formMeta);
  event.formData = updateObjectData(props.formData, evt, true);
  return props.onChange(event);
};

const handleChange = (props: Props) => (evt: PseudoEvent): any => {
  let event = createSyntheticFormEvent(evt, props.formData, props.formMeta);
  event.formData = updateObjectData(props.formData, evt);
  return props.onChange(event);
};

const withProps = () => (Component: ReactClass<any>): ReactClass<any> => {

  class FormWithProps extends React.Component {
    props: Props

    static defaultProps = {
      formData: {},
      formMeta: {}
    }

    render() {
      return (
        <Component
          {...this.props}
          formData={this.props.formData}
          formMeta={this.props.formMeta}
          getFormData={getDataFromKey(this.props.formData)}
          getFormMeta={getDataFromKey(this.props.formMeta)}
          onChange={handleChange(this.props)}
          onToggle={handleToggle(this.props)}
        />
      );
    }
  }

  return FormWithProps;
};

export default withProps;

// @flow
import React from 'react';
import PropTypes from 'prop-types';

type Props = {
  formData: Object;
  formMeta: Object;
};

type ChildContextType = {
  formData: Object;
  formMeta: Object;
}

const withContext = () => (Component: ReactClass<any>): ReactClass<any> => {

  class ComponentWithContext extends React.Component {
    props: Props

    static childContextTypes: ChildContextType = {
      formData: PropTypes.object,
      formMeta: PropTypes.object
    }

    getChildContext = (): ChildContextType => ({
      formData: this.props.formData,
      formMeta: this.props.formMeta
    })

    render() {
      return (
        <Component {...this.props} />
      );
    }
  }

  return ComponentWithContext;
};

export default withContext;

import React from 'react';

const createExample = (Component) => {
  class Example extends React.Component {
    state = {
      formData: {},
      formMeta: {}
    }

    handleChange = (syntheticFormEvent) => {
      this.setState({
        formData: syntheticFormEvent.formData,
        formMeta: syntheticFormEvent.formMeta
      });
    }
    render() {
      return (
        <Component
          formData={this.state.formData}
          formMeta={this.state.formMeta}
          onChange={this.handleChange}
        />
      );
    }
  }

  return Example;
}

export default createExample;

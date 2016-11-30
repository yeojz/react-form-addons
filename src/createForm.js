import React from 'react';
import defaults from 'lodash/defaults';
import get from 'lodash/get';
import map from 'lodash/map';
import createField from './createField';

const getFormProps = (options, props) => {
  let obj = {}
  if (options.type === 'form') {
    obj.onSubmit = props.onSubmit;
  }
  return obj;
}

export const createForm = (model = [], opt = {}) => {
  const options = defaults({}, opt, {
    className: '',
    mutateProps: (obj) => obj,
    prefix: '',
    toggleTypes: ['checkbox'],
    type: 'div'
  });

  const FormType = get(options, 'type');
  const renderers = map(model, (entry) => createField(entry, options))

  function Form(props) {
    const classes = `rfa-form ${options.className} ${props.className}`;
    const fields = map(renderers, (Renderer, idx) => <Renderer {...props} key={idx} />);
    const formProps = getFormProps(options, props);

    return (
      <FormType {...formProps} className={classes}>
        {fields}
      </FormType>
    );
  }

  return Form;
}

export default createForm;

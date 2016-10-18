import React, {PropTypes} from 'react';
import get from 'lodash/get';
import noop from 'lodash/noop';
import omit from 'lodash/omit';

const propTypes = {
  className: PropTypes.string,
  formData: PropTypes.object,
  formError: PropTypes.object,
  onChange: PropTypes.func,
  onToggle: PropTypes.func
}

const defaultProps = {
  className: '',
  onChange: noop,
  onToggle: noop
}

const propKeys = Object.keys(propTypes);

const handleEvent = (name, callback) => (evt, formData, formError) => {
  const target = {
    formError,
    name,
    value: formData
  }
  callback({target});
}

export const collection = (name) => (ConnectedForm) => {
  function CollectionForm(props) {
    const propPass = omit(props, propKeys);
    const formData = get(props, ['formData', name], {});
    const formError= get(props, ['formError', name], {});

    return (
      <div className={`rfa-collection ${props.className}`}>
        <ConnectedForm
          {...propPass}
          formData={formData}
          formError={formError}
          onChange={handleEvent(name, props.onChange)}
          onToggle={handleEvent(name, props.onToggle)} />
      </div>
    );
  }

  CollectionForm.propTypes = propTypes;
  CollectionForm.defaultProps = defaultProps;
  return CollectionForm;
}

export default collection;

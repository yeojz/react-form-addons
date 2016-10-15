import React, {PropTypes} from 'react';
import map from 'lodash/map';
import noop from 'lodash/noop';

const propTypes = {
  onChange: PropTypes.func,
  onToggle: PropTypes.func
}

const defaultProps = {
  onChange: noop,
  onToggle: noop
}

export const collection = (name, components = []) => {

  const handleEvent = (callback) => (evt, formData) => {
    const target = {
      name,
      value: formData
    }
    callback({...evt, target});
  }

  const getComponents = (props) => {
    return map(components, (Component, idx) => {
      return (
        <Component
          {...props}
          key={`${name}-collection-${idx}`}
          onChange={handleEvent(props.onChange)}
          onToggle={handleEvent(props.onToggle)} />
      )
    })
  }

  const CollectionForm = (props) => {
    return (
      <div className='rfa-collection'>
        {getComponents(props)}
      </div>
    )
  }

  CollectionForm.propTypes = propTypes;
  return CollectionForm;
}

export default collection

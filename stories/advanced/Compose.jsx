import React from 'react';

const text = `
  const Inputs = (props) => (
    <div className='input-group'>
      <Input {...props} />
      <Input {...props} />
    </div>
  );

  const Form = compose(
    withValidation(validationFn)
    withState(),
    withSideEffect(sideEffectFn)
  )(Inputs)
`;

const Compose = (props) => {
  return (
    <div className='advanced-compose'>
      <div className='box inverse'>
        <h3>compose</h3>
        <p>
          Helper method that applies multiple form effects onto a single form.
        </p>
      </div>

      <div className='box'>
        <pre>{text}</pre>
      </div>
    </div>
  )
}

export default Compose;

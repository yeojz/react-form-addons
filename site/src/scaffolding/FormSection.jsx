import React, {PropTypes} from 'react';

const propTypes = {
  children: PropTypes.any,
  className: PropTypes.string
}

const FormSection = (props) => (
  <section className={`is-one-third column form-section ${props.className || ''}`}>
    <h4>Form</h4>
    <div className='form-section__content'>
      {props.children}
    </div>
  </section>
);

FormSection.propTypes = propTypes;
export default FormSection;

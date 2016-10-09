import reduceRight from 'lodash/reduceRight';

export const compose = (...decorators) => (component) => {
    return reduceRight(
      decorators,
      (wrapped, fn) => fn(wrapped),
      component
    );
}

export default compose;

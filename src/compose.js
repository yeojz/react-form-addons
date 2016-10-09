import reduceRight from 'lodash/reduceRight';

export default function compose(...decorators) {
    return (component) => {
        return reduceRight(
            decorators,
            (wrapped, fn) => fn(wrapped),
            component
        )
    }
}

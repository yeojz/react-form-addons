import reduceRight from 'lodash.reduceright';

export default function compose(...decorators) {
    return (component) => {
        return reduceRight(
            decorators,
            (wrapped, fn) => fn(wrapped),
            component
        )
    }
}

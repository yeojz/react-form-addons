import reduceRight from 'lodash/reduceRight';

export default function compose(...functionList) {
    return (component) => {
        return reduceRight(
            functionList,
            (wrapped, fn) => fn(wrapped),
            component
        )
    }
}

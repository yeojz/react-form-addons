// @flow
const compose = (...decorators: Array<Function>): Function => {
  const reversed = decorators.reverse();

  return (Component: RComponent): RComponent => (
    reversed.reduce(
      (wrapped, fn) => fn(wrapped),
      Component
    )
  );
}


export default compose;

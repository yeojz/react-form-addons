// @flow
const compose = (...decorators: Array<Function>): Function => {
  const reversed = decorators.reverse();

  return (Component: ReactClass<any>): ReactClass<any> => (
    reversed.reduce(
      (wrapped: ReactClass<any>, fn: Function) => fn(wrapped),
      Component
    )
  );
}


export default compose;

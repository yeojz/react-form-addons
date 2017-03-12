const compose = (...decorators) => {
  const reversed = decorators.reverse();

  return (Component) => (
    reversed.reduce(
      (wrapped, fn) => fn(wrapped),
      Component
    )
  );
}


export default compose;

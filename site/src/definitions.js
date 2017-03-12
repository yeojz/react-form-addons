const methods = {
  compose: `
    A helper method that helps apply the Higher-Order Components to the base component.
    It essentially behaves like how a decorator would
    i.e. the argument (last) that is closest, to the component will be applied first.
  `,
  withProps: `
    Provides a set of standardised props to connect your form component.
    This is needed to normalise some of the events that are bubbled up the compose chain.
  `,
  withState: `
    Gives a stateless form component a _standard form state_.
    All inputs are expected to call an "onChange" with a single object argument
    consisting of \`target.name\` and \`target.value\`
  `,
  withSideEffects: `
    Side effects are data changes that will trigger or cause an update to other data.
    In this example, input 1 and 2 will update simultaneously upon input, and count will increment by keystroke.
  `,
  withValidation: `
    Provides the mechanism for validation (does not provide the actual validation logic).
    You can easily plug in your own validation engine like validate.js / joi or any other frameworks.
    If validation fails, the error resultset is expected to be an object.
  `,
  branch: `
    Allows the grouping of data sets into a virtual input.
    This helps you break down a massive form with nested keys into smaller components / validation parts.
  `,
  list: `
    Allows a form portion that can be replicated in a list.
    Example use case would be a key-value section which can have any amount of a predefined set of data.
  `,
  collection: `
    Allows creation of complex forms which consist of various sub-sections
    that may be dependent on the status of other fields

    __Note:__ Toggling of form sections do not modify the form data.
    If you want to clear the data of a hidden section, you can use \`withSideEffect\` to do so.
  `
}

const extensions = {
  withReduxState: `
    Propagates form state into a reducer instead of keeping in component state
  `
}

const utils = {
  SyntheticFormEvent: `
    It is __Proxy Event__ object similar to React's [__SyntheticEvent__](https://facebook.github.io/react/docs/events.html).
    All events bubbling up via the components will be converted to a SyntheticFormEvent
    This allows the library to standarise the API and pass formData and formMeta up the chain easily.
  `
}

export default {
  extensions,
  methods,
  utils
}

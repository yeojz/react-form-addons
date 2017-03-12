const methods = {
  compose: `
    A helper method that helps apply the Higher-Order Components to the base component.
    It essentially behaves like how a decorator would
    i.e. the argument (last) that is closest, to the component will be applied first.
  `,
  formControl: `
    A helper for state controlled input elements.

    This is needed for controlled inputs as React updates the component with old data especially during async
    updates, before re-rendering the input element again with new data, resulting in a cursor jump.
    For more details on the issue, take a look at the following github issues: [react#955](//github.com/facebook/react/issues/955) [react#5625](//github.com/facebook/react/issues/5265) [react-redux#525](//github.com/reactjs/react-redux/issues/525)

    This may not be necessary if you're not using native elements as your UI library may already
    have some form of update control.

    Convenience components for "input" and "textarea" are provided.
    You can import them via \`import {Input, Textarea} from 'react-form-addons/components'\`;
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

    Each SideEffect function takes in \`event, props\` arguments and can return \`Promises\`,
    but they must resolve to an \`event\`. i.e. \`(event, props) => modified event\`
  `,
  withValidation: `
    Provides the mechanism for validation (does not provide the actual validation logic).
    You can easily plug in your own validation engine like validate.js / joi or any other frameworks.

    Each valiation function is provided with \`err, formData\`, where \`err\` is the result from the previous
    function. Each validation function should return a new or previous \`err\`. Like \`withSideEffects\`,
    the validation functions can return a \`Promise\`, but must resolve to an \`err\`.

    \`err\` can be \`void 0\` or an object.
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

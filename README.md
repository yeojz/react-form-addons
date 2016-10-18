# react-form-addons

A set of higher-order components for composing forms in React

## Table of Contents

1. [About](#about)
1. [Usage](#usage)
1. [Example](https://yeojz.github.io/react-form-addons)
1. API
	- [Notes](#api-notes)

## About
This library aims to help keep form input components as pure stateless components by abstracting the state and various other utilities out into Higher Order methods.

The API attempts to be unobtrusive, so that you can plug and play.

## Usage

Install via [npm](https://www.npmjs.com/):

    $ npm install --save react-form-addons

Example:

```js
import React, {PropTypes} from 'react';
import {withState} from 'react-form-addons';

const Form = (props) => {
    return (
        <form onSubmit={props.onSubmit}>
            <input
                name='user'
                onChange={props.onChange}
                value={props.formData.user || ''} />

            <input
                name='email'
                onChange={props.onChange}
                value={props.formData.email || ''} />
        </form>
    )
}

Form.propTypes = {
    onChange: PropTypes.func,
    onSubmit: PropTypes.func
}

// Decorate your component
export default withState()(Form)
```

You may also compose multiple form decorators together using `compose`:

```js
export default compose(
	withState(),
	withSideEffect()
)(Form)

```

If you have multiple form components that should share the same state, you can pass it to group them first:

```js
const Form = connect([
	CustomerBasic,
	CustomerAdvanced,
	[CustomerPayment, 'payment_allowed']
	FormSubmit
])

export default compose(
	withState(),
	withSideEffect()
)(Form)
```

More samples can be found in this package's storybook. You can run it by:

```
git clone git@github.com:yeojz/react-form-addons
cd react-form-addons
npm i
npm run storybook

# Access storybook via http://localhost:6006
```

## API Notes

Below is a list of props that the components will propagate down

| Props   | Description
|:--------|:--------
| `props.formData` | the form state which contains all your keys (`withState`)
| `props.formError`| the error state (`withValidation`)
| `props.onChange` | value change callback
| `props.onToggle` | like onChange, but for checkboxes
| `props.onSubmit` | for submitting the form.

**Notes**

* All event handlers passed down do not have `event.preventDefault()` called.
	* As such, if you don't want the `onSubmit` to perform the default action, you have to call `preventDefault` manually in your handlers
* All event handlers propagate upwards.
	* **Example**: if you provide your an `onChange` prop to component that has been wrapped with `withState`, your `onChange` will be fired after the manipulation of state within `withState`
* `formData` is a flat structure.
	* i.e. if 2 inputs have the same name, then it'll be pointing to the same key.

## License

MIT [`License`](/LICENSE) © Gerald Yeo

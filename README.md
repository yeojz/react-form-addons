#<img src="https://yeojz.github.io/react-form-addons/react-form-addons-with-text.svg" alt="react-form-addons" height="100" />

[![Build Status][build-badge]][build-link]
[![npm package][npm-badge]][npm-link]
[![PRs Welcome][pr-welcome-badge]][pr-welcome-badge]

## About

`react-form-addons` provides a set of methods and components for composing forms in React. Conceptually it adopts on the style of `decorators` or `higher-order components`, allowing you to keep your actual declaration of forms as Functional Components.

## Motivation

During the course of my work which involves building an internal admin panel and Content Management System, the amount of forms that the team have to build was bordering ridiculous. Every single form had it's own set of rules and side-effects, and having to declare and manage state all the time, be it via redux or even component state was getting insane. 

Furthermore, there was a need to ensure a standard interface for forms since they may be reused across the modules and we would like it to drop-in without more work. However, existing solutions didn't quite fit the customizability that I needed for my project, which lead me to this library.

## Links

 - [Documentation][doc-link]
 - [Documentation Source](https://github.com/yeojz/react-form-addons/tree/master/site)

## Installation

Install the library:

```
npm install react-form-addons --save
```

## Quick Look

```js
import React from 'react';
import {compose, withProps, withState} from 'react-form-addons';

const Form = (props) => {
	<div>
		<input
			name='input1'
	      onChange={props.onChange}
	      value={props.getFormData('input1')}
	   />
	   // ...other inputs
	</div>
};

export default compose(
	withState(),
	withProps()
)(Form);
```

For more examples, check out the [documentation site][doc-link]

## v2 Upgrade

This library has been totally reworked for v2. As such there are some breaking changes in the way the higher-order components (hoc) work. The biggest change is that Component properties are now decoupled to a `withProps` hoc and `withState` only handles keeping of state and not any of the state manipulations.

**The following are temporarily deprecated.**
It may make a comeback in a future release.

 - createField
 - createForm

**Method renames:**

 -  what used to be `collection()` is now `branch()`
 -  what used to be `connect()` is now `collection()`

Checkout the [v2.0.0 release notes](https://github.com/yeojz/react-form-addons/releases/tag/v2.0.0)


## Form Event Normalization

Your event handlers will be passed instances of [SyntheticFormEvent](https://yeojz.github.io/react-form-addons#SyntheticFormEvent) when it's piped through `withProps` onChange handler.

It inherits `target.name`, `target.value`, `stopPropagation()` and `preventDefault()` from React's Event System and adds on 2 sub-properties `formData` and `formMeta`. 

The 2 sub-properties are heavily used to calculate and update the current state of the form within the compose pipeline.

## Extending Usage

While the focus on v2 rewrite still hinges on Component State, we can easily extend this to other state management utilities.

For example, in it's simplest form:

```js
 export default compose(
    withState(),
    withProps()
  )(Form);
```

can become

```js
 export default compose(
    withReduxState(),
    withProps()
  )(Form);
```

For now, this library does not provide the `redux` connector, but it is highly possible that it'll be sheduled for a future release. PRs are welcome! :)

## Prior Art

The implementation of a `compose` methodology was highly inspired by [react-reformed](https://github.com/davezuko/react-reformed).


## License

`react-form-addons` is [MIT licensed](./LICENSE)

[doc-link]: https://yeojz.github.io/react-form-addons

[npm-badge]: https://img.shields.io/npm/v/react-form-addons.svg?style=flat-square
[npm-link]: https://www.npmjs.com/package/react-form-addons

[build-badge]: https://img.shields.io/circleci/project/github/yeojz/react-form-addons.svg?style=flat-square
[build-link]: https://circleci.com/gh/yeojz/react-form-addons.svg

[pr-welcome-badge]: https://img.shields.io/badge/PRs-Welcome-ff69b4.svg?style=flat-square
[pr-welcome-link]: https://github.com/yeojz/redux-intl-connect/blob/master/CONTRIBUTING.md

// @flow
/* eslint-disable no-undef */

declare type WrappedComponent = Class<React$Component<*, *, *>>

declare type FormEventTarget = {
  name: string;
  value: Object | string | boolean | Array<*> | void | null
}

declare type FormEvent = {
  stopPropagation: Function;
  preventDefault: Function;
  target: FormEventTarget
}

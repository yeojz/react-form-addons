// @flow
/* eslint-disable no-undef,no-unused-vars */

import type SyntheticFormEvent from './utils/SyntheticFormEvent';

declare type RComponent = Class<React$Component<*, *, *>>

declare type DefaultEvent = Event & {target: EventTarget};

declare type FormEventTarget = {
  name: string;
  value: Object | string | boolean | Array<*> | void | null
}

declare type FormEvent = {
  stopPropagation: Function;
  preventDefault: Function;
  target: FormEventTarget;
}

declare type ReduxAction = {
  type: string;
  payload: Object
}

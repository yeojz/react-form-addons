// @flow
/* eslint-disable no-undef,no-unused-vars */
import type SyntheticFormEvent from '../src/utils/SyntheticFormEvent';

declare type PseudoTarget = {
  name: string;
  value: Object | string | boolean | Array<*> | void | null
}

declare type PseudoEvent = {
  stopPropagation: Function;
  preventDefault: Function;
  target: PseudoTarget;
}

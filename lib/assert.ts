import {
  type True,
} from './boolean';
import {
  type Exception,
} from './exception';

export type Assert<T extends True> = T;

export type Assert$<T> = T extends True ? T : Exception<'Truth assertion failed', T>;

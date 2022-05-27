import {
  type False,
  type True,
} from './boolean';
import {
  type And,
  type Not,
} from './conditional';

/**
 * Returns {@link True} if {@link T} extends {@link U}, otherwise returns {@link False}.
 *
 * This is a wrapper around Typescript's `T extends U ? true : false` statement.
 *
 * @template T - Maybe the "child" type.
 * @template U - Maybe the "base" type.
 * @returns - {@link True} or {@link False}
 */
export type IsExtensionOf<T, U> = T extends U ? True : False;

/**
 * Returns {@link True} if {@link T} is a parent type of {@link U}, otherwise returns {@link False}.
 *
 * A "parent type" means that {@link U} extends {@link T}, and {@link T} does not extend {@link U} (i.e. strict).
 *
 * @template T - Maybe the "Parent" type.
 * @template U - Maybe the "Child" type.
 * @returns - {@link True} or {@link False}
 */
export type IsParentOf<T, U> = And<IsExtensionOf<U, T>, Not<IsExtensionOf<T, U>>>;

// type Child = {
//   a: string,
//   b: boolean,
//   c: number,
// };

// type Sibling = {
//   a: string,
//   b: boolean,
//   c: number,
// };

// type Parent = {
//   a: string,
//   b: boolean,
// };

// type t1 = Assert<Not<IsParentOf<Child, Parent>>>;
// type t2 = Assert<Not<IsParentOf<Sibling, Parent>>>;
// type t3 = Assert<Not<IsParentOf<Sibling, Child>>>;
// type t4 = Assert<Not<IsParentOf<Child, Sibling>>>;
// type t5 = Assert<IsParentOf<Parent, Child>>;

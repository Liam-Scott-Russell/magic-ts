import {
  type False,
  type True,
  type Boolean,
} from './boolean';

/**
 * Returns {@link Then} if {@link Condition} extends {@link True}, otherwise returns {@link Else}.
 *
 * Functions similar to a ternary statement:
 * - `condition ? then : else`
 *
 * @template Condition - The condition to check.
 * @template Then - The type to return if {@link Condition} is {@link True}.
 * @template Else - The type to return if {@link Condition} is {@link False}
 */
export type If<Condition extends Boolean, Then, Else> = Condition extends True ? Then : Else;
export type Or<A extends Boolean, B extends Boolean> = If<A, True, If<B, True, False>>;
export type And<A extends Boolean, B extends Boolean> = If<A, If<B, True, False>, False>;
export type Not<A extends Boolean> = A extends True ? False : True;
export type Nand<A extends Boolean, B extends Boolean> = Not<And<A, B>>;
export type Xor<A extends Boolean, B extends Boolean> = Or<And<A, Not<B>>, And<Not<A>, B>>;

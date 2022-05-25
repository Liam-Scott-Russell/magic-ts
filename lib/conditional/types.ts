import { type Boolean } from '..';

/**
 * Returns {@link Then} if {@link Condition} extends {@link Boolean.True}, otherwise returns {@link Else}.
 *
 * Functions similar to a ternary statement:
 * - `condition ? then : else`
 *
 * @template Condition - The condition to check.
 * @template Then - The type to return if {@link Condition} is {@link Boolean.True}.
 * @template Else - The type to return if {@link Condition} is {@link Boolean.False}
 */
export type If<Condition extends Boolean.Boolean, Then, Else> = Condition extends Boolean.True ? Then : Else;
export type Or<A extends Boolean.Boolean, B extends Boolean.Boolean> = If<A, Boolean.True, If<B, Boolean.True, Boolean.False>>;
export type And<A extends Boolean.Boolean, B extends Boolean.Boolean> = If<A, If<B, Boolean.True, Boolean.False>, Boolean.False>;
export type Not<A extends Boolean.Boolean> = A extends Boolean.True ? Boolean.False : Boolean.True;
export type Nand<A extends Boolean.Boolean, B extends Boolean.Boolean> = Not<And<A, B>>;
export type Xor<A extends Boolean.Boolean, B extends Boolean.Boolean> = Or<And<A, Not<B>>, And<Not<A>, B>>;

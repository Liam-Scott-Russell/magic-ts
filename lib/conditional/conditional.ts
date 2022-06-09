import { type Boolean, type Inheritance } from "@magic-ts";

/**
 * Returns {@link Then} if {@link Condition} is {@link Boolean.True}, otherwise returns {@link Else}.
 *
 * Functions similar to a ternary statement:
 * - `condition ? then : else`
 *
 * @template Condition - The condition to check.
 * @template Then - The type to return if {@link Condition} is {@link Boolean.True}.
 * @template Else - The type to return if {@link Condition} is {@link Boolean.False}
 */
export type If<Condition extends Boolean.Any, Then, Else> = Inheritance.Equals<
  Condition,
  Boolean.True,
  Then,
  Else
>;
export type Or<A extends Boolean.Any, B extends Boolean.Any> = If<
  A,
  Boolean.True,
  If<B, Boolean.True, Boolean.False>
>;
export type And<A extends Boolean.Any, B extends Boolean.Any> = If<
  A,
  If<B, Boolean.True, Boolean.False>,
  Boolean.False
>;
export type Not<A extends Boolean.Any> = Inheritance.Equals<
  A,
  Boolean.True,
  Boolean.False,
  Boolean.True
>;
export type Nand<A extends Boolean.Any, B extends Boolean.Any> = Not<And<A, B>>;
export type Xor<A extends Boolean.Any, B extends Boolean.Any> = Or<
  And<A, Not<B>>,
  And<Not<A>, B>
>;

import { type Boolean, type Inheritance } from "..";

/**
 * Returns {@link OnTrue} if {@link Condition} is {@link Boolean.True}, otherwise returns {@link OnFalse}.
 *
 * Functions similar to a ternary statement: `Condition ? OnTrue : OnFalse`.
 *
 * @template Condition - The condition to check.
 * @template OnTrue - The type to return if {@link Condition} is {@link Boolean.True}.
 * @template OnFalse - The type to return if {@link Condition} is {@link Boolean.False}.
 */
export type If<
  Condition extends Boolean.Any,
  OnTrue,
  OnFalse
> = Inheritance.IsEqual<Condition, Boolean.True, OnTrue, OnFalse>;

export type Or<A extends Boolean.Any, B extends Boolean.Any> = If<
  A,
  Boolean.True,
  If<B, Boolean.True, Boolean.False>
>;

export type And<
  A extends Boolean.Any,
  B extends Boolean.Any,
  OnTrue = Boolean.True,
  OnFalse = Boolean.False
> = If<A, If<B, OnTrue, OnFalse>, OnFalse>;

export type Not<A extends Boolean.Any> = Inheritance.IsEqual<
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

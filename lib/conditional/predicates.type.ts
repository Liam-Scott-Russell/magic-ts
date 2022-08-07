import { type Inheritance, type Conditional } from "..";

/**
 * Returns {@link OnTrue} if {@link Condition} is {@link Conditional.True}, otherwise returns {@link OnFalse}.
 *
 * Functions similar to a ternary statement: `Condition ? OnTrue : OnFalse`.
 *
 * @template Condition - The condition to check.
 * @template OnTrue - The type to return if {@link Condition} is {@link Conditional.True}.
 * @template OnFalse - The type to return if {@link Condition} is {@link Conditional.False}.
 */
type Conditional__If<
  Condition extends Conditional.Any,
  OnTrue = Conditional.True,
  OnFalse = Conditional.False
> = Inheritance.IsExtensionOf<Condition, Conditional.True, OnTrue, OnFalse>;

type Conditional__Or<
  Condition1 extends Conditional.Any,
  Condition2 extends Conditional.Any,
  OnTrue = Conditional.True,
  OnFalse = Conditional.False
> = Conditional.If<
  Condition1,
  OnTrue,
  Conditional.If<Condition2, OnTrue, OnFalse>
>;

type Conditional__And<
  Condition1 extends Conditional.Any,
  Condition2 extends Conditional.Any,
  OnTrue = Conditional.True,
  OnFalse = Conditional.False
> = Conditional.If<
  Condition1,
  Conditional.If<Condition2, OnTrue, OnFalse>,
  OnFalse
>;

type Conditional__Not<
  Condition extends Conditional.Any,
  OnTrue = Conditional.True,
  OnFalse = Conditional.False
> = Conditional.If<Condition, OnFalse, OnTrue>;

type Conditional__Nand<
  Condition1 extends Conditional.Any,
  Condition2 extends Conditional.Any,
  OnTrue = Conditional.True,
  OnFalse = Conditional.False
> = Conditional.Not<Conditional.And<Condition1, Condition2>, OnTrue, OnFalse>;
type Conditional__Xor<
  Condition1 extends Conditional.Any,
  Condition2 extends Conditional.Any,
  OnTrue = Conditional.True,
  OnFalse = Conditional.False
> = Conditional.Or<
  Conditional.And<Condition1, Conditional.Not<Condition2>>,
  Conditional.And<Conditional.Not<Condition1>, Condition2>,
  OnTrue,
  OnFalse
>;

export type {
  Conditional__If as If,
  Conditional__Or as Or,
  Conditional__And as And,
  Conditional__Not as Not,
  Conditional__Nand as Nand,
  Conditional__Xor as Xor,
};

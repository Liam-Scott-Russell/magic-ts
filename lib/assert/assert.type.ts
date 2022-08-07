import { type Inheritance, type Conditional } from "..";

export type IsTrue<
  Test extends Conditional.True,
  OnTrue = Conditional.True,
  OnFalse = Conditional.False
> = Inheritance.IsEqual<Test, Conditional.True, OnTrue, OnFalse>;

export type IsFalse<
  Test extends Conditional.False,
  OnTrue = Conditional.True,
  OnFalse = Conditional.False
> = Inheritance.IsEqual<Test, Conditional.False, OnTrue, OnFalse>;

import { type Inheritance, type Conditional } from "..";

type Assert__IsTrue<
  Test extends Conditional.True,
  OnTrue = Conditional.True,
  OnFalse = Conditional.False
> = Inheritance.IsEqual<Test, Conditional.True, OnTrue, OnFalse>;

type Assert__IsFalse<
  Test extends Conditional.False,
  OnTrue = Conditional.True,
  OnFalse = Conditional.False
> = Inheritance.IsEqual<Test, Conditional.False, OnTrue, OnFalse>;

export type { Assert__IsTrue as IsTrue,
Assert__IsFalse as IsFalse };

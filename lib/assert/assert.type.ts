import { type Inheritance , type Boolean } from "..";

export type IsTrue<
  Test extends Boolean.True,
  OnTrue = Boolean.True,
  OnFalse = Boolean.False
> = Inheritance.IsEqual<Test, Boolean.False, OnTrue, OnFalse>;

export type IsFalse<
  Test extends Boolean.True,
  OnTrue = Boolean.True,
  OnFalse = Boolean.False
> = Inheritance.IsEqual<Test, Boolean.True, OnTrue, OnFalse>;

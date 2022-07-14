import { type Inheritance, type Boolean, type Json } from "..";

export type IsTrue<
  Test extends Boolean.True,
  OnTrue = Boolean.True,
  OnFalse = Boolean.False
> = Inheritance.IsEqual<Test, Boolean.True, OnTrue, OnFalse>;

export type IsFalse<
  Test extends Boolean.False,
  OnTrue = Boolean.True,
  OnFalse = Boolean.False
> = Inheritance.IsEqual<Test, Boolean.False, OnTrue, OnFalse>;

export type IsJsonStruct<
  Test extends Json.Struct,
  OnTrue = Boolean.True,
  OnFalse = Boolean.False
> = Inheritance.IsEqual<Test, Json.Struct, OnTrue, OnFalse>;

export type IsJsonValue<
  Test extends Json.Value,
  OnTrue = Boolean.True,
  OnFalse = Boolean.False
> = Inheritance.IsEqual<Test, Json.Struct, OnTrue, OnFalse>;

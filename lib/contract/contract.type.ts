import {
  type Boolean,
  type Inheritance,
  type Struct,
} from "..";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions, @typescript-eslint/no-empty-interface
export interface Interface {}

export type Type = {};

/**
 * An `interface` cannot extend this type, but a `type` can.
 *
 * @example
 * ```typescript
 * interface I {
 *     a: number;
 *     b: string;
 *     c: boolean;
 *     d: number;
 * }
 *
 * type InterfaceCannotExtend = Assert.IsFalse<Inheritance.IsExtensionOf<I, CannotExtend>>
 * ```
 * @example
 * ```typescript
 * type T = {
 *     a: number;
 *     b: string;
 *     c: boolean;
 *     d: number;
 * }
 *
 * type TypeCanExtend = Assert.IsTrue<Inheritance.IsExtensionOf<T, CannotExtend>>
 * ```
 * @example
 * {@exampleCaseName Any typing defined inline is a `type`, not an `interface`}
 * ```typescript
 * type TypeCanExtend = Assert.IsTrue<Inheritance.IsExtensionOf<{ inline: true, isType: true }, CannotExtend>>
 * ```
 */
export type InterfaceTypeDiscriminant = {
  [key: Struct.KeysAllowed]: unknown;
};

/**
 * Returns {@link OnTrue} if {@link T} is an `interface`, otherwise returns {@link OnFalse} (if it is a `type`).
 *
 * @template T - The type to test.
 * @template OnTrue - The type to return if {@link T} is an `interface`.
 * @template OnFalse - The type to return if {@link T} is a `type`.
 * @returns Returns {OnTrue} if {@link T} is an `interface`, otherwise returns {@link OnFalse} (if it is a `type`).
 * @example
 * ```typescript
 * type InterfaceIsInterface = Assert.IsTrue<Contract.IsInterface<Contract.Interface>>;
 * type InterfaceIsNotType = Assert.IsFalse<Contract.IsType<Contract.Interface>>;
 * ```
 */
export type IsInterface<
  T,
  OnTrue = Boolean.True,
  OnFalse = Boolean.False
> = Inheritance.IsExtensionOf<T, InterfaceTypeDiscriminant, OnFalse, OnTrue>;

/**
 * Returns {@link OnTrue} if {@link T} is an `type`, otherwise returns {@link OnFalse} (if it is a `interface`).
 *
 * @template T - The type to test.
 * @template OnTrue - The type to return if {@link T} is a `type`.
 * @template OnFalse - The type to return if {@link T} is an `interface`.
 * @returns Returns {OnTrue} if {@link T} is a `type`, otherwise returns {@link OnFalse} (if it is a `interface`).
 * @example
 * ```typescript
 * type TypeIsType = Assert.IsTrue<Contract.IsType<Contract.Type>>;
 * type TypeIsNotInterface = Assert.IsFalse<Contract.IsInterface<Contract.Type>>;
 * ```
 */
export type IsType<
  T,
  OnTrue = Boolean.True,
  OnFalse = Boolean.False
> = Inheritance.IsExtensionOf<T, InterfaceTypeDiscriminant, OnTrue, OnFalse>;

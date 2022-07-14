import {
  type Contract,
  type Inspect,
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
> = Inheritance.IsExtensionOf<
  T,
  Contract.InterfaceTypeDiscriminant,
  OnFalse,
  OnTrue
>;

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
> = Inheritance.IsExtensionOf<
  T,
  Contract.InterfaceTypeDiscriminant,
  OnTrue,
  OnFalse
>;

/**
 * Turns a {@link Contract.Type} into an {@link Contract.Interface}.
 *
 * You **cannot** achieve this by extending the {@link Contract.Interface} type, or assigning it to a type.
 *
 * @example
 * ```typescript
 * interface TestInterface {
 *   a: number;
 *   b: string;
 *   c: boolean;
 * }
 * type IsInterfaceTest = Assert.IsTrue<Contract.IsInterface<TestInterface>>;
 *
 * type AssignedType = TestInterface;
 * type DoesNotWorkWhenAssigningToType = Assert.IsFalse<Contract.IsType<AssignedType>>;
 *
 * type EmptyExtendedType = TestInterface & {};
 * type DoesNotWorkWhenExtendingWithEmptyType = Assert.IsFalse<Contract.IsType<EmptyExtendedType>>;
 *
 * // `a` is already a key in `TestInterface`, but we can "add" it again
 * type ExtendedWithSameKeyType = TestInterface & { a: number; };
 * type DoesNotWorkWhenExtendingWithSameKey = Assert.IsFalse<Contract.IsType<ExtendedWithSameKeyType>>;
 *
 * type ExtendedWithNewKeyType = TestInterface & { d: bigint; };
 * type DoesNotWorkWhenExtendingWithNewKey = Assert.IsFalse<Contract.IsType<ExtendedWithNewKeyType>>;
 *
 * type MappedToType = Contract.ToType<TestInterface>;
 * type IsTypeTest = Assert.IsTrue<Contract.IsType<MappedToType>>;
 * ```
 */
export type ToType<T extends Contract.Interface> = Inspect<T>;

/**
 * Converts {@link T} from a {@link Contract.Type} to a {@link Contract.Interface}.
 *
 * @template T - The {@link Contract.Type} to convert.
 * @example
 * ```typescript
 * type TestType = {
 *   a: number;
 *   b: string;
 *   c: boolean;
 * };
 *
 * type IsTypeTest = Assert.IsTrue<Contract.IsType<TestType>>;
 *
 * type EmptyExtendedInterface = TestType & {};
 * type DoesNotWorkWhenExtendingTypeWithoutKeys = Assert.IsFalse<
 *   Contract.IsInterface<EmptyExtendedInterface>
 * >;
 *
 * type ExtendedWithSameKeyInterface = TestType & {
 *   a: number;
 * };
 * type DoesNotWorkWhenExtendingTypeWithSameKey = Assert.IsFalse<
 *   Contract.IsInterface<ExtendedWithSameKeyInterface>
 * >;
 *
 * type ExtendedWithNewKeyInterface = TestType & {
 *   d: bigint;
 * };
 * type DoesNotWorkWhenExtendingTypeWithNewKey = Assert.IsFalse<
 *   Contract.IsInterface<ExtendedWithNewKeyInterface>
 * >;
 *
 * type IsInterfaceTest = Assert.IsTrue<
 *   Contract.IsInterface<Contract.ToInterface<TestType>>
 * >;
 * ```
 */
export type ToInterface<T extends Contract.Type> = T & {};

import { type Boolean, type Conditional } from "..";

/**
 * Returns {@link Boolean.True} if {@link T} extends {@link U}, otherwise returns {@link Boolean.False}.
 *
 * This is a wrapper around Typescript's `T extends U ? true : false` statement.
 *
 * @template T - Maybe the "child" type.
 * @template U - Maybe the "base" type.
 * @returns - {@link Boolean.True} or {@link Boolean.False}
 * @example <caption>Union types have some interesting properties.</caption>
 *
 * type A = { a: string };
 * type B = { b: number };
 * type C = A | B;
 *
 * // A member of a union always extends the union itself.
 * type A_Extends_A = IsExtensionOf<A, A>; // Boolean.True
 * type A_Extends_B = IsExtensionOf<A, B>; // Boolean.False
 * type A_Extends_C = IsExtensionOf<A, C>; // Boolean.True
 *
 * // A member of a union always extends the union itself.
 * type B_Extends_A = IsExtensionOf<B, A>; // Boolean.False
 * type B_Extends_B = IsExtensionOf<B, B>; // Boolean.True
 * type B_Extends_C = IsExtensionOf<B, C>; // Boolean.True
 *
 * // A union could extend a specific member of itself, or it could not, hence the return type is a union.
 * type C_Extends_A = IsExtensionOf<C, A>; // Boolean.True | Boolean.False
 * type C_Extends_B = IsExtensionOf<C, B>; // Boolean.True | Boolean.False
 * type C_Extends_C = IsExtensionOf<C, C>; // Boolean.True
 */
export type IsExtensionOf<T, U> = T extends U ? Boolean.True : Boolean.False;

/**
 * Returns {@link Boolean.True} if {@link T} is a parent type of {@link U}, otherwise returns {@link Boolean.False}.
 *
 * A "parent type" means that {@link U} extends {@link T}, and {@link T} does not extend {@link U} (i.e. strict).
 *
 * The opposite of {@link IsChildOf}.
 *
 * @template T - Maybe the "Parent" type.
 * @template U - Maybe the "Child" type.
 * @returns - {@link Boolean.True} or {@link Boolean.False}
 * @example <caption>Union types are never parents/children of their members.</caption>
 * type A = { a: string };
 * type B = { b: number };
 * type C = A | B;
 *
 * // A type can never be a parent or child of itself.
 * type A_Extends_A = IsParentOf<A, A>; // Boolean.False
 * type A_Extends_B = IsParentOf<A, B>; // Boolean.False
 * type A_Extends_C = IsParentOf<A, C>; // Boolean.False
 *
 * // A type can never be a parent or child of itself.
 * type B_Extends_A = IsParentOf<B, A>; // Boolean.False
 * type B_Extends_B = IsParentOf<B, B>; // Boolean.False
 * type B_Extends_C = IsParentOf<B, C>; // Boolean.False
 *
 * // A union will never be a parent or child of any of its members.
 * type C_Extends_A = IsParentOf<C, A>; // Boolean.False
 * type C_Extends_B = IsParentOf<C, B>; // Boolean.False
 * type C_Extends_C = IsParentOf<C, C>; // Boolean.False
 */
export type IsParentOf<T, U> = Conditional.And<
  IsExtensionOf<U, T>,
  Conditional.Not<IsExtensionOf<T, U>>
>;

/**
 * Returns {@link Boolean.True} if {@link T} is a child type of {@link U}, otherwise returns {@link Boolean.False}.
 *
 * A "child type" means that {@link T} extends {@link U}, and {@link U} does not extend {@link T} (i.e. strict).
 *
 * The opposite of {@link IsParentOf}.
 *
 * @template T - Maybe the "Child" type.
 * @template U - Maybe the "Parent" type.
 * @returns - {@link Boolean.True} or {@link Boolean.False}
 */
export type IsChildOf<T, U> = IsParentOf<U, T>;

/**
 * Returns {@link OnYes} if {@link T} exactly matches {@link U}, otherwise returns {@link OnNo}.
 *
 * {@link OnYes} and {@link OnNo} are optional, and can be omitted if not needed.
 *
 * Specifying {@link OnYes} and {@link OnNo} is useful for mapping between types, and can replace the following common snippet:
 *
 * @example <caption>You don't need `If` and `Equals` if you're mapping between types:</caption>
 *
 * type TypeGuard = If<Equals<T, U>, T, Exception<'T and U do not match'>>
 * type SimpleTypeGuard = Equals<T, U, T, Exception<'T and U do not match'>>
 * @template T The type to check.
 * @template U The type to check against.
 * @template OnYes The type to return if {@link T} exactly matches {@link U}. Defaults to {@link Boolean.True}.
 * @template OnNo The type to return if {@link T} does not exactly match {@link U}. Defaults to {@link Boolean.False}.
 */
export type Equals<T, U, OnYes = Boolean.True, OnNo = Boolean.False> = (<
  G
>() => G extends T ? 1 : 2) extends <G>() => G extends U ? 1 : 2
  ? OnYes
  : OnNo;

import { type Conditional, type Inheritance, type Struct } from "..";

/**
 * Return a union of the types of the values of {@link T}.
 *
 * Works like {@link KeysOf}, but for the values of {@link T}.
 *
 * For an {@link Struct.Empty} struct, returns {@link None}.
 *
 * @template T - The struct to get the properties of.
 */
export type ValuesOf<T extends Struct.Any> = T[Struct.KeysOf<T>];

/**
 * Return a union of the types of the values of {@link T} and {@link U}.
 *
 * Works like {@link KeysUnion}, but for the values of {@link T} and {@link U}.
 *
 * @template T - The first struct to get the values of.
 * @template U - The second struct to get the values of.
 */
export type ValuesUnion<T extends Struct.Any, U extends Struct.Any> =
  | ValuesOf<T>
  | ValuesOf<U>;

/**
 * Return an intersection of the types of the values of {@link T} and {@link U}.
 *
 * Works like {@link KeysIntersection}, but for the values of {@link T} and {@link U}.
 *
 * @template T - The first struct to get the values of.
 * @template U - The second struct to get the values of.
 */
export type ValuesIntersection<
  T extends Struct.Any,
  U extends Struct.Any
> = T[Struct.KeysIntersectionStrict<T, U>];

/**
 * Returns {@link True} if {@link T} is a "leaf value", otherwise return {@link False}.
 *
 * A leaf value is a value that is not a struct (e.g. String, number, boolean, function etc.).
 *
 * Additionally, a leaf value is defined as not being a {@link Empty} struct.
 */
export type IsLeafValue<T> = Conditional.And<
  Inheritance.IsExtensionOf<T, Struct.Any>,
  Conditional.Not<Inheritance.IsEqual<T, Struct.Empty>>
>;

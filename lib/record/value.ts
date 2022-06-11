import { type Conditional, type Inheritance, type None, type Record } from "..";

/**
 * Return a union of the types of the values of {@link T}.
 *
 * Works like {@link KeysOf}, but for the values of {@link T}.
 *
 * For an {@link Record.Empty} record, returns {@link None}.
 *
 * @template T - The record to get the properties of.
 */
export type ValuesOf<T extends Record.Any> = None.FromNever<
  T[Record.KeysOf<T>]
>;

/**
 * Return a union of the types of the values of {@link T} and {@link U}.
 *
 * Works like {@link KeysUnion}, but for the values of {@link T} and {@link U}.
 *
 * @template T - The first record to get the values of.
 * @template U - The second record to get the values of.
 */
export type ValuesUnion<T extends Record.Any, U extends Record.Any> =
  | ValuesOf<T>
  | ValuesOf<U>;

/**
 * Return an intersection of the types of the values of {@link T} and {@link U}.
 *
 * Works like {@link KeysIntersection}, but for the values of {@link T} and {@link U}.
 *
 * @template T - The first record to get the values of.
 * @template U - The second record to get the values of.
 */
export type ValuesIntersection<
  T extends Record.Any,
  U extends Record.Any
> = T[Record.KeysIntersectionStrict<T, U>];

/**
 * Returns {@link True} if {@link T} is a "leaf value", otherwise return {@link False}.
 *
 * A leaf value is a value that is not a record (e.g. string, number, boolean, function etc.)
 *
 * Additionally, a leaf value is defined as not being a {@link Empty} record.
 */
export type IsLeafValue<T> = Conditional.And<
  Inheritance.IsExtensionOf<T, Record.Any>,
  Conditional.Not<Inheritance.Equals<T, Record.Empty>>
>;

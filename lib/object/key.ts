import { type Not, type If, type And } from "../conditional";
import { type Equals, type IsExtensionOf } from "../inheritance";
import { type Any } from "./base";

/**
 * The possible types that are allowed to index an Object.
 *
 * Useful instead of naively assuming a `string`.
 *
 * In modern Typescript, this is `string | number | symbol`.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type KeysAllowed = keyof any;

/**
 * The keys of an object.
 *
 * Essentially an alias for `keyof T`, but with a type guard to {@link Any}.
 *
 * @param T - The object to get the keys of.
 */
export type KeysOf<T extends Any> = keyof T;

export type KeyExists<T extends Any, K extends KeysAllowed> = IsExtensionOf<
  K,
  KeysOf<T>
>;

/**
 * Return the keys of {@link T} that map to a value of type {@link U}.
 *
 * @template T - The object to get the keys of.
 * @template U - The type to filter the keys by.
 */
export type KeysThatMapToField<T extends Any, U> = {
  [K in KeysOf<T>]: Equals<T[K], U, K, never>;
}[KeysOf<T>];

/**
 * Given a {@link T}, a {@link U}, and a union of {@link KeysAllowed} {@link Keys}, return the keys that
 * are present in {@link T} and are present in {@link U}, and that have the same type.
 *
 * i.e. where T[K] === U[K] (for valid `K`).
 *
 * Used to make "strict" versions of various key selectors.
 *
 * @template T - The first object to get the keys of.
 * @template U - The second object to get the keys of.
 * @template Keys - The keys to filter.
 */
export type KeysFilterToSameType<
  T extends Any,
  U extends Any,
  Keys extends KeysAllowed
> = {
  [K in Keys]: If<
    KeyExists<T, K>,
    If<KeyExists<U, K>, Equals<T[K], U[K], K, never>, never>,
    never
  >;
}[Keys];

/**
 * The keys that are present either in {@link T} or {@link U}.
 *
 * Does not check that the types are the same, see {@link KeysUnionStrict} for that.
 *
 * @template T - The first object to get the keys of.
 * @template U - The second object to get the keys of.
 */
export type KeysUnion<T extends Any, U extends Any> = KeysOf<T> | KeysOf<U>;

/**
 * The keys that are present in both {@link T} and {@link U}, where the types are the same.
 *
 * The strict version of {@link KeysUnion}.
 *
 * @template T - The first object to get the keys of.
 * @template U - The second object to get the keys of.
 */
export type KeysUnionStrict<
  T extends Any,
  U extends Any
> = KeysFilterToSameType<T, U, KeysUnion<T, U>>;

/**
 * The keys that are present in both {@link T} and {@link U}.
 *
 * Does not check that the types are the same, see {@link KeysIntersectionStrict} for that.
 *
 * @template T - The first object to get the keys of.
 * @template U - The second object to get the keys of.
 */
export type KeysIntersection<T extends Any, U extends Any> = {
  [K in KeysUnion<T, U>]: If<And<KeyExists<T, K>, KeyExists<U, K>>, K, never>;
}[KeysUnion<T, U>];

/**
 * The keys that are present in {@link T} but not in {@link U}, where the types are the same.
 *
 * The strict version of {@link KeysIntersection}.
 *
 * @template T - The first object to get the keys of.
 * @template U - The second object to get the keys of.
 */
export type KeysIntersectionStrict<
  T extends Any,
  U extends Any
> = KeysFilterToSameType<T, U, KeysIntersection<T, U>>;

/**
 * The keys that are present in {@link T} but not in {@link U}.
 *
 * Does not check that the types are the same, see {@link KeysDifferenceStrict} for that.
 *
 * @template T - The first object to get the keys of.
 * @template U - The second object to get the keys of.
 */
export type KeysDifference<T extends Any, U extends Any> = {
  [K in KeysUnion<T, U>]: If<
    And<KeyExists<T, K>, Not<KeyExists<U, K>>>,
    K,
    never
  >;
}[KeysUnion<T, U>];

/**
 * The keys that are present in {@link T} but not in {@link U}, where the types are the same.
 *
 * The strict version of {@link KeysDifference}.
 *
 * @template T - The first object to get the keys of.
 * @template U - The second object to get the keys of.
 */
export type KeysDifferenceStrict<
  T extends Any,
  U extends Any
> = KeysFilterToSameType<T, U, KeysDifference<T, U>>;

import {
  type Struct,
  type Boolean,
  type Conditional,
  type Inheritance,
} from "..";

/**
 * The possible types that are allowed to index a struct.
 *
 * Useful instead of naively assuming a `string`.
 *
 * In modern Typescript, this is `string | number | symbol`.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type KeysAllowed = keyof any;

/**
 * The keys of a struct.
 *
 * Essentially a alias for `keyof T`, but with a type guard to {@link Struct.Any}.
 *
 * @param T - The struct to get the keys of.
 */
export type KeysOf<T extends Struct.Any> = keyof T;

export type KeyExists<
  T extends Struct.Any,
  K extends KeysAllowed,
  OnTrue = Boolean.True,
  OnFalse = Boolean.False
> = K extends KeysOf<T> ? OnTrue : OnFalse;

/**
 * Return the keys of {@link T} that map to a value of type {@link U}.
 *
 * @template T - The struct to get the keys of.
 * @template U - The type to filter the keys by.
 */
export type KeysThatMapToField<T extends Struct.Any, U> = {
  [K in KeysOf<T>]: Inheritance.IsEqual<T[K], U, K, never>;
}[KeysOf<T>];

/**
 * Given a {@link T}, a {@link U}, and a union of {@link KeysAllowed} {@link Keys}, return the keys that
 * are present in {@link T} and are present in {@link U}, and that have the same type.
 *
 * I.e. Where T[K] === U[K] (for valid `K`).
 *
 * Used to make "strict" versions of various key selectors.
 *
 * @template T - The first struct to get the keys of.
 * @template U - The second struct to get the keys of.
 * @template Keys - The keys to filter.
 */
export type KeysFilterToSameType<
  T extends Struct.Any,
  U extends Struct.Any,
  Keys extends KeysOf<T> | KeysOf<U>
> = {
  [K in Keys]: K extends keyof T
    ? K extends keyof U
      ? Inheritance.IsEqual<T[K], U[K], K, never>
      : never
    : never;
}[Keys];

/**
 * The keys that are present either in {@link T} or {@link U}.
 *
 * Does not check that the types are the same, see {@link KeysUnionStrict} for that.
 *
 * @template T - The first struct to get the keys of.
 * @template U - The second struct to get the keys of.
 */
export type KeysUnion<T extends Struct.Any, U extends Struct.Any> =
  | KeysOf<T>
  | KeysOf<U>;

/**
 * The keys that are present in both {@link T} and {@link U}, where the types are the same.
 *
 * The strict version of {@link KeysUnion}.
 *
 * @template T - The first struct to get the keys of.
 * @template U - The second struct to get the keys of.
 */
export type KeysUnionStrict<
  T extends Struct.Any,
  U extends Struct.Any
> = KeysFilterToSameType<T, U, KeysUnion<T, U>>;

/**
 * The keys that are present in both {@link T} and {@link U}.
 *
 * Does not check that the types are the same, see {@link KeysIntersectionStrict} for that.
 *
 * @template T - The first struct to get the keys of.
 * @template U - The second struct to get the keys of.
 */
export type KeysIntersection<T extends Struct.Any, U extends Struct.Any> = {
  [K in KeysUnion<T, U>]: K extends keyof T
    ? K extends keyof U
      ? K
      : never
    : never;
}[KeysUnion<T, U>];

/**
 * The keys that are present in {@link T} but not in {@link U}, where the types are the same.
 *
 * The strict version of {@link KeysIntersection}.
 *
 * @template T - The first struct to get the keys of.
 * @template U - The second struct to get the keys of.
 */
export type KeysIntersectionStrict<
  T extends Struct.Any,
  U extends Struct.Any
> = KeysFilterToSameType<T, U, KeysIntersection<T, U>>;

/**
 * The keys that are present in {@link T} but not in {@link U}.
 *
 * Does not check that the types are the same, see {@link KeysDifferenceStrict} for that.
 *
 * @template T - The first struct to get the keys of.
 * @template U - The second struct to get the keys of.
 */
export type KeysDifference<T extends Struct.Any, U extends Struct.Any> = {
  [K in KeysUnion<T, U>]: Conditional.If<
    Conditional.And<KeyExists<T, K>, Conditional.Not<KeyExists<U, K>>>,
    K,
    never
  >;
}[KeysUnion<T, U>];

/**
 * The keys that are present in {@link T} but not in {@link U}, where the types are the same.
 *
 * The strict version of {@link KeysDifference}.
 *
 * @template T - The first struct to get the keys of.
 * @template U - The second struct to get the keys of.
 */

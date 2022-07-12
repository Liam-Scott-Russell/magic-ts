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
 * Essentially a alias for `keyof T`, but with a type guard to {@link TStruct.Any}.
 *
 * @param T - The struct to get the keys of.
 */
export type KeysOf<TStruct extends Struct.Any> = keyof TStruct;

/**
 * Checks if a key is allowed to index a struct.
 *
 * @template TStruct - The struct to check the keys of.
 * @template Key - The key to check.
 * @returns Returns {@link Boolean.True} if {@link Key} is a valid key of {@link TStruct}.
 *
 * **NOTE** Unfortunately, this is not a type guard, so you must use {@link Struct.Get} to index {@link TStruct}.
 * @example
 * ```typescript
 * // @ts-expect-error Error: "2536: Type 'K' cannot be used to index type 'T'".
 * Type MapIfKey<T extends Struct.Any, K extends Struct.KeysAllowed> = Struct.IsKeyOf<T, K, T[K], never>.
 *
 * Type MapIfKey<T extends Struct.Any, K extends Struct.KeysAllowed> = Struct.Get<T, K>
 * ```
 */
export type IsKeyOf<
  TStruct extends Struct.Any,
  Key extends KeysAllowed,
  OnTrue = Boolean.True,
  OnFalse = Boolean.False
> = Inheritance.IsExtensionOf<Key, Struct.KeysOf<TStruct>, OnTrue, OnFalse>;

/**
 * Return the keys of {@link TStruct} that map to a value of type {@link Value}.
 *
 * This is not a strict check, so any value that extends {@link Value} will be returned.
 *
 * @template TStruct - The struct to get the keys of.
 * @template Value - The type to filter the keys by.
 */
export type KeysThatMapToValue<TStruct extends Struct.Any, Value> = {
  [Key in Struct.KeysOf<TStruct>]: Inheritance.IsExtensionOf<
    Struct.Get<TStruct, Key>,
    Value,
    Key,
    never
  >;
}[Struct.KeysOf<TStruct>];

/**
 * Return the keys of {@link TStruct} that map to a value of type {@link Value}.
 *
 * This is a strict version of {@link KeysThatMapToValue}, so only values that exactly equal {@link Value} will be returned.
 *
 * @template TStruct - The struct to get the keys of.
 * @template Value - The type to filter the keys by.
 */
export type KeysThatMapToValueStrict<TStruct extends Struct.Any, Value> = {
  [Key in Struct.KeysOf<TStruct>]: Inheritance.IsEqual<
    Struct.Get<TStruct, Key>,
    Value,
    Key,
    never
  >;
}[Struct.KeysOf<TStruct>];

/**
 * Given a {@link TStruct1}, a {@link TStruct2}, and a union of {@link KeysAllowed} {@link Keys}, return the keys that are present in {@link TStruct1} and are present in {@link TStruct2}, and that have the same type.
 *
 * **Note:** This is a strict check, i.e. Where T[K] === U[K] (for valid `K`).
 *
 * Used to make "strict" versions of various key selectors.
 *
 * @template TStruct1 - The first struct to get the keys of.
 * @template TStruct2 - The second struct to get the keys of.
 * @template Keys - The keys to filter.
 * @example
 * ```typescript
 * // A complex matching struct
 * type A = {
 *   a: string;
 *   b: number;
 *   c: boolean;
 *   d: {
 *     e: string;
 *     f: number;
 *   }
 * }
 *
 * type B = {
 *   a: string;
 *   b: number;
 *   c: boolean;
 *   d: {
 *     e: string;
 *     f: number;
 *   }
 * }
 *
 * type Expected = "a" | "b" | "c" | "d";
 * type KeyUnion = "a" | "b" | "c" | "d";
 * type Actual = Struct.KeysFilterToSameType<A, B, KeyUnion>;
 * type Flipped = Struct.KeysFilterToSameType<B, A, KeyUnion>;
 * type AssertActual = Assert.IsTrue<Inheritance.IsEqual<Expected, Actual>>
 * type AssertFlipped = Assert.IsTrue<Inheritance.IsEqual<Expected, Flipped>>
 * ```
 * @example
 * ```typescript
 * // A complex extending struct
 * type A = {
 *   a: string;
 *   b: number;
 *   c: boolean;
 *   d: {
 *     e: string;
 *     f: number;
 *   }
 * }
 *
 * type B = {
 *   a: string;
 *   b: number;
 *   c: boolean;
 *   d: {
 *     f: number;
 *   }
 * }
 *
 * type A_Does_Extend_B = Assert.IsTrue<Inheritance.IsExtensionOf<A, B>>
 * type B_Doesnt_Extend_A = Assert.IsFalse<Inheritance.IsExtensionOf<B, A>>
 *
 * type Expected = "a" | "b" | "c";
 * type KeyUnion = "a" | "b" | "c" | "d";
 * type Actual = Struct.KeysFilterToSameType<A, B, KeyUnion>;
 * type Flipped = Struct.KeysFilterToSameType<B, A, KeyUnion>;
 *
 * type AssertActual = Assert.IsTrue<Inheritance.IsEqual<Expected, Actual>>
 * type AssertFlipped = Assert.IsTrue<Inheritance.IsEqual<Expected, Flipped>>
 * ```
 * @example
 * ```typescript
 * // an empty type
 * type A = {
 *   a: string;
 * }
 *
 * type B = {}
 *
 * type Expected = never
 * type KeyUnion = "a"
 * type Actual = Struct.KeysFilterToSameType<A, B, KeyUnion>;
 * type Flipped = Struct.KeysFilterToSameType<B, A, KeyUnion>;
 * type AssertActual = Assert.IsTrue<Inheritance.IsEqual<Expected, Actual>>
 * type AssertFlipped = Assert.IsTrue<Inheritance.IsEqual<Expected, Flipped>>
 * ```
 */
export type KeysFilterToSameType<
  TStruct1 extends Struct.Any,
  TStruct2 extends Struct.Any,
  Keys extends Struct.KeysUnion<TStruct1, TStruct2> = Struct.KeysUnion<
    TStruct1,
    TStruct2
  >
> = {
  [Key in Keys]: Inheritance.IsEqual<
    Struct.Get<TStruct1, Key>,
    Struct.Get<TStruct2, Key>,
    Key,
    never
  >;
}[Keys];

/**
 * The keys that are present either in {@link TStruct} or {@link U}.
 *
 * Does not check that the types are the same, see {@link KeysUnionStrict} for that.
 *
 * @template TStruct - The first struct to get the keys of.
 * @template U - The second struct to get the keys of.
 */
export type KeysUnion<TStruct extends Struct.Any, U extends Struct.Any> =
  | Struct.KeysOf<TStruct>
  | Struct.KeysOf<U>;

/**
 * The keys that are present in both {@link TStruct} and {@link U}, where the types are the same.
 *
 * The strict version of {@link KeysUnion}.
 *
 * @template TStruct - The first struct to get the keys of.
 * @template U - The second struct to get the keys of.
 */
export type KeysUnionStrict<
  TStruct extends Struct.Any,
  U extends Struct.Any
> = Struct.KeysFilterToSameType<TStruct, U, Struct.KeysUnion<TStruct, U>>;

/**
 * The keys that are present in both {@link TStruct1} and {@link TStruct2}.
 *
 * Does not check that the types are the same, see {@link KeysIntersectionStrict} for that.
 *
 * // TODO: needs porting.
 *
 * @template TStruct1 - The first struct to get the keys of.
 * @template TStruct2 - The second struct to get the keys of.
 */
export type KeysIntersection<
  TStruct1 extends Struct.Any,
  TStruct2 extends Struct.Any
> = {
  [Key in KeysUnion<TStruct1, TStruct2>]: Key extends keyof TStruct1
    ? Key extends keyof TStruct2
      ? Key
      : never
    : never;
}[Struct.KeysUnion<TStruct1, TStruct2>];

/**
 * The keys that are present in {@link TStruct1} but not in {@link TStruct2}, where the types are the same.
 *
 * The strict version of {@link KeysIntersection}.
 *
 * @template TStruct1 - The first struct to get the keys of.
 * @template TStruct2 - The second struct to get the keys of.
 */
export type KeysIntersectionStrict<
  TStruct1 extends Struct.Any,
  TStruct2 extends Struct.Any
> = Struct.KeysFilterToSameType<
  TStruct1,
  TStruct2,
  Struct.KeysIntersection<TStruct1, TStruct2>
>;

/**
 * The keys that are present in {@link TStruct} but not in {@link U}.
 *
 * Does not check that the types are the same, see {@link KeysDifferenceStrict} for that.
 *
 * @template TStruct - The first struct to get the keys of.
 * @template U - The second struct to get the keys of.
 */
export type KeysDifference<TStruct extends Struct.Any, U extends Struct.Any> = {
  [K in KeysUnion<TStruct, U>]: Conditional.And<
    IsKeyOf<TStruct, K>,
    Conditional.Not<IsKeyOf<U, K>>,
    K,
    never
  >;
}[KeysUnion<TStruct, U>];

/**
 * The keys that are present in {@link T} but not in {@link U}, where the types are the same.
 *
 * The strict version of {@link KeysDifference}.
 *
 * @template T - The first struct to get the keys of.
 * @template U - The second struct to get the keys of.
 */

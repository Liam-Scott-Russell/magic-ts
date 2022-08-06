import { type Tuple, type Boolean, type HKT } from "..";

/**
 * Any tuple type.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Tuple__Any = readonly any[];

type Tuple__Length<T extends Tuple.Any> = T["length"];

type Tuple__Head<T extends Tuple.Any, Default = never> = T extends [
  infer Head,
  ...infer _Tail
]
  ? Head
  : Default;

type Tuple__Tail<T extends Tuple.Any, Default = never> = T extends [
  infer _Head,
  ...infer Tail
]
  ? Tail
  : Default;

type Tuple__HasHead<
  T extends Tuple.Any,
  OnTrue = Boolean.True,
  OnFalse = Boolean.False
> = T extends [infer _Head] ? OnTrue : OnFalse;

type Tuple__HasTail<
  T extends Tuple.Any,
  OnTrue = Boolean.True,
  OnFalse = Boolean.False
> = T extends [infer _Head, ...infer _Tail] ? OnTrue : OnFalse;

type Tuple__Last<T extends Tuple.Any, Default = never> = T extends [
  infer _Head,
  ...infer Tail
]
  ? Tuple__Last<Tail, Default>
  : Tuple.Head<T, Default>;

type Tuple__Map1<
  TOperation extends HKT.Operation1,
  T extends Tuple.Any
> = T extends [infer Head, ...infer Tail]
  ? [HKT.Apply1<TOperation, Head>, ...Tuple__Map1<TOperation, Tail>]
  : readonly [];

/**
 * Combine two tuples by appending one element from {@link T1}, followed by one element from {@link T2}, until either:
 * 1. {@link T1} Has no more elements.
 * 2. {@link T2} Has no more elements.
 *
 * If one tuple is longer than the other, the extra elements are appended to the end.
 *
 * @template T1 The first tuple.
 * @template T2 The second tuple.
 * @returns The zipped tuple.
 * @example
 * ```typescript
 * type WorksWhenEqualLength = Assert.IsTrue<
 *   Inheritance.IsEqual<Tuple.Zip<[1, 3, 5], [2, 4, 6]>, [1, 2, 3, 4, 5, 6]>
 * >;
 * type WorksWhenLeftIsShorter = Assert.IsTrue<
 *   Inheritance.IsEqual<Tuple.Zip<[1, 3], [2, 4, 5, 6]>, [1, 2, 3, 4, 5, 6]>
 * >;
 * type WorksWhenRightIsShorter = Assert.IsTrue<
 *   Inheritance.IsEqual<Tuple.Zip<[1, 3, 5, 6], [2, 4]>, [1, 2, 3, 4, 5, 6]>
 * >;
 * type WorksWhenLeftEmptyAndRightNonEmpty = Assert.IsTrue<
 *   Inheritance.IsEqual<Tuple.Zip<[], [1, 2, 4, 5, 6]>, [1, 2, 4, 5, 6]>
 * >;
 * type WorksWhenRightEmptyAndLeftNonEmpty = Assert.IsTrue<
 *   Inheritance.IsEqual<Tuple.Zip<[1, 2, 4, 5, 6], []>, [1, 2, 4, 5, 6]>
 * >;
 * type WorksWhenBothEmpty = Assert.IsTrue<
 *   Inheritance.IsEqual<Tuple.Zip<[], []>, []>
 * >;
 * ```
 */
type Tuple__Zip<T1 extends Tuple.Any, T2 extends Tuple.Any> = T1 extends [
  infer Head1,
  ...infer Tail1
]
  ? T2 extends [infer Head2, ...infer Tail2]
    ? [Head1, Head2, ...Tuple__Zip<Tail1, Tail2>]
    : [Head1, ...Tuple__Zip<Tail1, T2>]
  : T2 extends [infer Head2, ...infer Tail2]
  ? [Head2, ...Tuple__Zip<T1, Tail2>]
  : [];

/**
 * Combine two tuples by creating a tuple of tuples, where each tuple in the result has two elements,
 * the first element is from {@link T1}, and the second element is from {@link T2}.
 *
 * @template T1 The first tuple.
 * @template T2 The second tuple.
 * @returns The paired tuple of tuples.
 * @example
 * ```typescript
 * type WorksWhenEqualLength = Assert.IsTrue<
 *   Inheritance.IsEqual<
 *     Tuple.Pair<[1, 3, 5], [2, 4, 6]>,
 *     [[1, 2], [3, 4], [5, 6]]
 *   >
 * >;
 *
 * type ShrinksWhenLeftIsShorter = Assert.IsTrue<
 *   Inheritance.IsEqual<
 *     Tuple.Pair<[1, 3], [2, 4, 5, 6]>,
 *     [[1, 2], [3, 4]]
 *   >
 * >
 *
 * type ShrinksWhenRightIsShorter = Assert.IsTrue<
 *   Inheritance.IsEqual<
 *     Tuple.Pair<[1, 3, 5, 6], [2, 4]>,
 *     [[1, 2], [3, 4]]
 *   >
 * >
 *
 * type ReturnsEmptyWhenLeftEmptyAndRightNonEmpty = Assert.IsTrue<
 *   Inheritance.IsEqual<
 *     Tuple.Pair<[], [1, 2, 4, 5, 6]>,
 *     []
 *   >
 * >
 *
 * type ReturnsEmptyWhenRightEmptyAndLeftNonEmpty = Assert.IsTrue<
 *   Inheritance.IsEqual<
 *     Tuple.Pair<[1, 2, 4, 5, 6], []>,
 *     []
 *   >
 * >
 *
 * type ReturnsEmptyWhenBothEmpty = Assert.IsTrue<
 *   Inheritance.IsEqual<
 *     Tuple.Pair<[], []>,
 *     []
 *   >
 * >
 * ```
 */
type Tuple__Pair<T1 extends Tuple.Any, T2 extends Tuple.Any> = T1 extends [
  infer Head1,
  ...infer Tail1
]
  ? T2 extends [infer Head2, ...infer Tail2]
    ? [[Head1, Head2], ...Tuple__Pair<Tail1, Tail2>]
    : []
  : [];

export type Tuple__Concat<T1 extends Tuple.Any, T2 extends Tuple.Any> = [
  ...T1,
  ...T2
];

declare module "../hkt" {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  export interface Free1<T1> {
    "Tuple.FromAny": [T1];
    "Tuple.HasHead": Tuple.HasHead<HKT.Constrain<Tuple.Any, T1>>;
    "Tuple.HasTail": Tuple.HasTail<HKT.Constrain<Tuple.Any, T1>>;
    "Tuple.Head": Tuple.Head<HKT.Constrain<Tuple.Any, T1>>;
    "Tuple.Last": Tuple.Last<HKT.Constrain<Tuple.Any, T1>>;
    "Tuple.Length": Tuple.Length<HKT.Constrain<Tuple.Any, T1>>;
    "Tuple.Tail": Tuple.Tail<HKT.Constrain<Tuple.Any, T1>>;
  }
}

export type {
  Tuple__Any as Any,
  Tuple__Head as Head,
  Tuple__Length as Length,
  Tuple__Tail as Tail,
  Tuple__HasHead as HasHead,
  Tuple__HasTail as HasTail,
  Tuple__Last as Last,
  Tuple__Map1 as Map1,
  Tuple__Zip as Zip,
  Tuple__Pair as Pair,
};

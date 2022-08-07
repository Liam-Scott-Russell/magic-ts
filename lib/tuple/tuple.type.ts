import { type Inheritance, type Tuple, type Conditional, type HKT } from "..";

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

/**
 * Returns {@link OnTrue} if the tuple {@link T} has at least one element, otherwise returns {@link OnFalse}.
 *
 * @template T - The tuple to check.
 * @template OnTrue - Return value if the {@link T} has at least one element. Defaults to {@link Conditional.True}.
 * @template OnFalse - Return value if the {@link T} has no elements. Defaults to {@link Conditional.False}.
 * @returns Either {@link OnTrue} or {@link OnFalse}.
 * @example
 * ```typescript
 * type ShouldReturnFalseWhenGivenEmpty = Assert.IsFalse<Tuple.HasHead<[]>>;
 * type ShouldReturnTrueWhenGivenOneElement = Assert.IsTrue<Tuple.HasHead<[1]>>;
 * type ShouldReturnTrueWhenGivenMultipleElements = Assert.IsTrue<Tuple.HasHead<[1, 2, 3]>>;
 * type ShouldReturnTrueWhenGivenMixedElements = Assert.IsTrue<Tuple.HasHead<[1, "2", { four: 4 }]>>;
 * ```
 */
type Tuple__HasHead<
  T extends Tuple.Any,
  OnTrue = Conditional.True,
  OnFalse = Conditional.False
> = T extends [infer _Head]
  ? OnTrue
  : T extends [infer _Head, ...infer _Tail]
  ? OnTrue
  : OnFalse;

type Tuple__HasTail<
  T extends Tuple.Any,
  OnTrue = Conditional.True,
  OnFalse = Conditional.False
> = T extends [infer _Head, ...infer _Tail] ? OnTrue : OnFalse;

type Tuple__Last<T extends Tuple.Any, Default = never> = T extends [
  infer _Head,
  ...infer Tail
]
  ? Tuple__Last<Tail, Default>
  : Tuple.Head<T, Default>;

type Tuple__Map<
  TOperation extends HKT.Operation1,
  T extends Tuple.Any
> = T extends [infer Head, ...infer Tail]
  ? [HKT.Apply1<TOperation, Head>, ...Tuple__Map<TOperation, Tail>]
  : readonly [];

type Tuple__Filter<
  TOperation extends HKT.Operation1,
  T extends Tuple.Any
> = T extends [infer Head, ...infer Tail]
  ? Inheritance.IsEqual<
      HKT.Apply1<TOperation, Head>,
      Conditional.True,
      [Head, ...Tuple__Filter<TOperation, Tail>],
      [...Tuple__Filter<TOperation, Tail>]
    >
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

type Tuple__Concat<T1 extends Tuple.Any, T2 extends Tuple.Any> = [...T1, ...T2];

export type {
  Tuple__Any as Any,
  Tuple__Head as Head,
  Tuple__Length as Length,
  Tuple__Tail as Tail,
  Tuple__HasHead as HasHead,
  Tuple__HasTail as HasTail,
  Tuple__Last as Last,
  Tuple__Map,
  Tuple__Filter,
  Tuple__Zip as Zip,
  Tuple__Pair as Pair,
  Tuple__Concat as Concat,
};

import { type Brand, type Inheritance } from "..";

/**
 * A different "nullable" object, as an alternative to `null`, `unknown`, `undefined`, or `never`.
 */
export type None = Brand.Brand<{}, "None">;

/**
 * The nil types from raw JavaScript/Typescript. All replaced with {@link None}.
 *
 * The various values that represent some kind of undefined/error state.
 */
export type NilTypes = never | null | undefined;

/**
 * Transforms {@link T} into {@link None} if {@link T} == `null`, otherwise returns {@link Default}.
 */
export type FromNull<T, Default = never> = Inheritance.IsEqual<
  T,
  null,
  None,
  Default
>;

/**
 * Transforms {@link T} into {@link None} if {@link T} == `undefined`, otherwise returns {@link Default}.
 */
export type FromUndefined<T, Default = never> = Inheritance.IsEqual<
  T,
  undefined,
  None,
  Default
>;

/**
 * Transforms {@link T} into {@link None} if {@link T} == `never`, otherwise returns {@link Default}.
 */
export type FromNever<T, Default> = Inheritance.IsEqual<
  T,
  never,
  None,
  Default
>;

export type FromNilType<
  T extends NilTypes,
  Default = never
> = Inheritance.IsEqual<
  T,
  null,
  None,
  Inheritance.IsEqual<
    T,
    undefined,
    None,
    Inheritance.IsEqual<T, never, None, Default>
  >
>;

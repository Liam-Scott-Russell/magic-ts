import { type Brand, type Exception, type Inheritance } from "..";

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
 * Transforms {@link T} into {@link None} if {@link T} == `null`, otherwise @throws {@link Exception.Exception}.
 */
export type FromNull$<T> = Inheritance.IsEqual<
  T,
  null,
  None,
  Exception.Exception<"T does not equal `null`", T>
>;

/**
 * Transforms {@link T} into {@link None} if {@link T} == `undefined`, otherwise @throws {@link Exception.Exception}.
 */
export type FromUndefined$<T> = Inheritance.IsEqual<
  T,
  undefined,
  None,
  Exception.Exception<"T does not equal `undefined`", T>
>;

/**
 * Transforms {@link T} into {@link None} if {@link T} == `never`, otherwise @throws {@link Exception.Exception}.
 */
export type FromNever$<T> = Inheritance.IsEqual<
  T,
  never,
  None,
  Exception.Exception<"T does not equal `never`", T>
>;

export type FromNever<T> = Inheritance.IsEqual<T, never, None, T>;

export type FromNilType<T extends NilTypes> = Inheritance.IsEqual<
  T,
  null,
  None,
  Inheritance.IsEqual<
    T,
    undefined,
    None,
    Inheritance.IsEqual<
      T,
      never,
      None,
      Exception.Exception<"T does not equal `null`, `undefined`, or `never`", T>
    >
  >
>;

export type GetOrDefault<T, Default extends T> = Inheritance.IsEqual<
  T,
  None,
  Default,
  T
>;
export type GetOrDefaultW<T, Default> = Inheritance.IsEqual<T, None, Default, T>;

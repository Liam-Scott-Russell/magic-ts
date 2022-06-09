import { type Brand } from "./brand";
import { type Exception } from "./exception";
import { type Equals } from "./inheritance";
import { type Object } from ".";

/**
 * A different "nullable" object, as an alternative to `null`, `unknown`, `undefined`, or `never`.
 */
export type None = Brand<Object.Any, "None">;

/**
 * The nil types from raw JavaScript/Typescript. All replaced with {@link None}.
 *
 * The various values that represent some kind of undefined/error state.
 */
export type NilTypes = never | null | undefined;

/**
 * Transforms {@link T} into {@link None} if {@link T} == `null`, otherwise @throws {@link Exception}.
 */
export type FromNull$<T> = Equals<
  T,
  null,
  None,
  Exception<"T does not equal `null`", T>
>;

/**
 * Transforms {@link T} into {@link None} if {@link T} == `undefined`, otherwise @throws {@link Exception}.
 */
export type FromUndefined$<T> = Equals<
  T,
  undefined,
  None,
  Exception<"T does not equal `undefined`", T>
>;

/**
 * Transforms {@link T} into {@link None} if {@link T} == `never`, otherwise @throws {@link Exception}.
 */
export type FromNever$<T> = Equals<
  T,
  never,
  None,
  Exception<"T does not equal `never`", T>
>;

export type FromNever<T> = Equals<T, never, None, T>;

export type FromNilType<T extends NilTypes> = Equals<
  T,
  null,
  None,
  Equals<
    T,
    undefined,
    None,
    Equals<
      T,
      never,
      None,
      Exception<"T does not equal `null`, `undefined`, or `never`", T>
    >
  >
>;

export type GetOrDefault<T, Default extends T> = Equals<T, None, Default, T>;
export type GetOrDefaultW<T, Default> = Equals<T, None, Default, T>;

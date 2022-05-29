import { type False, type True } from "./boolean";
import { type And, type Not } from "./conditional";

/**
 * Returns {@link True} if {@link T} extends {@link U}, otherwise returns {@link False}.
 *
 * This is a wrapper around Typescript's `T extends U ? true : false` statement.
 *
 * @template T - Maybe the "child" type.
 * @template U - Maybe the "base" type.
 * @returns - {@link True} or {@link False}
 */
export type IsExtensionOf<T, U> = T extends U ? True : False;

/**
 * Returns {@link True} if {@link T} is a parent type of {@link U}, otherwise returns {@link False}.
 *
 * A "parent type" means that {@link U} extends {@link T}, and {@link T} does not extend {@link U} (i.e. strict).
 *
 * @template T - Maybe the "Parent" type.
 * @template U - Maybe the "Child" type.
 * @returns - {@link True} or {@link False}
 */
export type IsParentOf<T, U> = And<
  IsExtensionOf<U, T>,
  Not<IsExtensionOf<T, U>>
>;

/**
 * Returns {@link OnYes} if {@link T} exactly matches {@link U}, otherwise returns {@link OnNo}.
 *
 * {@link OnYes} and {@link OnNo} are optional, and can be omitted if not needed.
 *
 * Specifying {@link OnYes} and {@link OnNo} is useful for mapping between types, and can replace the following common snippet:
 *
 * @example <caption>You don't need `If` and `Equals` if you're mapping between types:</caption>
 *
 * type TypeGuard = If<Equals<T, U>, T, Exception<'T and U do not match'>>
 * type SimpleTypeGuard = Equals<T, U, T, Exception<'T and U do not match'>>
 * @template T The type to check.
 * @template U The type to check against.
 * @template OnYes The type to return if {@link T} exactly matches {@link U}. Defaults to {@link True}.
 * @template OnNo The type to return if {@link T} does not exactly match {@link U}. Defaults to {@link False}.
 */
export type Equals<T, U, OnYes = True, OnNo = False> = (<G>() => G extends T
  ? 1
  : 2) extends <G>() => G extends U ? 1 : 2
  ? OnYes
  : OnNo;

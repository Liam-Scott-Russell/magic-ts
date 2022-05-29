import { type None } from "..";
import { type And, type Not } from "../conditional";
import { type IsExtensionOf, type Equals } from "../inheritance";
import {
  type Empty,
  type KeysIntersectionStrict,
  type KeysOf,
  type Any,
} from ".";

/**
 * Return a union of the types of the values of {@link T}.
 *
 * Works like {@link KeysOf}, but for the values of {@link T}.
 *
 * For an {@link Object.Empty} object, returns {@link None}.
 *
 * @template T - The object to get the properties of.
 */
export type ValuesOf<T extends Any> = None.FromNever<T[KeysOf<T>]>;

/**
 * Return a union of the types of the values of {@link T} and {@link U}.
 *
 * Works like {@link KeysUnion}, but for the values of {@link T} and {@link U}.
 *
 * @template T - The first object to get the values of.
 * @template U - The second object to get the values of.
 */
export type ValuesUnion<T extends Any, U extends Any> =
  | ValuesOf<T>
  | ValuesOf<U>;

/**
 * Return an intersection of the types of the values of {@link T} and {@link U}.
 *
 * Works like {@link KeysIntersection}, but for the values of {@link T} and {@link U}.
 *
 * @template T - The first object to get the values of.
 * @template U - The second object to get the values of.
 */
export type ValuesIntersection<
  T extends Any,
  U extends Any
> = T[KeysIntersectionStrict<T, U>];

/**
 * Returns {@link True} if {@link T} is a "leaf value", otherwise return {@link False}.
 *
 * A leaf value is a value that is not an object (e.g. string, number, boolean, function etc.)
 *
 * Additionally, a leaf value is defined as not being a {@link Empty} object.
 */
export type IsLeafValue<T> = And<IsExtensionOf<T, Any>, Not<Equals<T, Empty>>>;

import { type Tuple, type Method } from "..";

/**
 * The base for any methods argument array.
 */
export type ArgumentsBase = Tuple.Any;

/**
 * .
 * A method is a function that can be called with a set of arguments (i.e. A function).
 *
 * @template Arguments - The type of the arguments that the method accepts.
 * @template Return - The type of the return value of the method.
 */
export type Method<Arguments extends Method.ArgumentsBase, Return> = (
    ...args: Arguments
) => Return;

export type Any<R = any> = (...args: Method.ArgumentsBase) => R;

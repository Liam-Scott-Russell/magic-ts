import { type Tuple } from "..";

/**
 * The base for any methods argument array.
 */
export type ArgumentsBase = Tuple.Any;

/**
 * The base for any methods argument array.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ReturnTypeBase = any;

/**
 * .
 * A method is a function that can be called with a set of arguments (i.e. A function).
 *
 * @template Arguments - The type of the arguments that the method accepts.
 * @template ReturnType - The type of the return value of the method.
 */
export type Method<
  Arguments extends ArgumentsBase,
  ReturnType extends ReturnTypeBase
> = (...args: Arguments) => ReturnType;

/**
 * Any method, with default arguments and return type.
 *
 * @template Arguments - The type of the arguments that the method accepts. Defaults to {@link ArgumentsBase}.
 * @template ReturnType - The type of the return value of the method. Defaults to {@link ReturnTypeBase}.
 */
export type Any<
  Arguments extends ArgumentsBase = ArgumentsBase,
  ReturnType extends ReturnTypeBase = ReturnTypeBase
> = Method<Arguments, ReturnType>;

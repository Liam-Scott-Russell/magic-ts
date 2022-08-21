import { type Method, type Tuple } from "..";

/**
 * The base for any methods argument array.
 */
type Method__ArgumentsBase = Tuple.Any;

/**
 * The base for any methods argument array.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Method__ReturnTypeBase = any;

/**
 * .
 * A method is a function that can be called with a set of arguments (i.e. A function).
 *
 * @template Arguments - The type of the arguments that the method accepts.
 * @template ReturnType - The type of the return value of the method.
 */
type Method__Method<
  Arguments extends Method.ArgumentsBase,
  ReturnType extends Method.ReturnTypeBase
> = (...args: Arguments) => ReturnType;

/**
 * Any method, with default arguments and return type.
 *
 * @template Arguments - The type of the arguments that the method accepts. Defaults to {@link ArgumentsBase}.
 * @template ReturnType - The type of the return value of the method. Defaults to {@link ReturnTypeBase}.
 */
type Method__Any<
  Arguments extends Method.ArgumentsBase = Method.ArgumentsBase,
  ReturnType extends Method.ReturnTypeBase = Method.ReturnTypeBase
> = Method.Method<Arguments, ReturnType>;

/**
 * Get the type of the arguments of a {@link Method} as a {@link Tuple.Any}.
 *
 * Similar to the builtin {@link Parameters} type.
 *
 * @template Method - The method to get the arguments type of.
 * @returns - The type of the arguments.
 */
type Method__ArgumentsOf<TMethod extends Method.Any> =
  TMethod extends Method.Method<infer Arguments, infer _ReturnType>
    ? Arguments
    : never;

/**
 * Get the return type of a {@link Method} as a {@link Tuple.Any}.
 *
 * Similar to the builtin {@link ReturnType} type.
 *
 * @template Method - The method to get the return type of.
 * @returns - The return type.
 */
type Method__ReturnTypeOf<TMethod extends Method.Any> =
  TMethod extends Method.Method<infer _Arguments, infer ReturnType>
    ? ReturnType
    : never;

export type {
  Method__ArgumentsBase as ArgumentsBase,
  Method__ReturnTypeBase as ReturnTypeBase,
  Method__Method as Method,
  Method__Any as Any,
  Method__ArgumentsOf as ArgumentsOf,
  Method__ReturnTypeOf as ReturnTypeOf,
};

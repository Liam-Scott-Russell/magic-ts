import { type False, type True } from "./boolean";

/**
 * An error of some kind.
 *
 * @template Message - A string explaining the exception.
 * @template Context - An optional type that provides additional context about the exception.
 */
export type Exception<Message extends string, Context = unknown> = {
  __message: `Exception: ${Message}`;
  // eslint-disable-next-line typescript-sort-keys/interface
  __context: Context;
};

export type IsException<T> = T extends Exception<infer _Message, infer _Context>
  ? True
  : False;

export type TryCatch<Operation, OnException> = Operation extends Exception<
  infer _Message,
  infer _Context
>
  ? OnException
  : Operation;

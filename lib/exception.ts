import { type Boolean } from '.';

/**
 * An error of some kind.
 *
 * @template Message - A string explaining the exception.
 * @template Context - An optional type that provides additional context about the exception.
 */
export type Exception<Message extends string, Context = unknown> =
  | `Exception!`
  | {
      __message: Message;
      // eslint-disable-next-line typescript-sort-keys/interface
      __context: Context;
    };

/**
 * Type alias for {@link Exception}.
 */
export type New<Message extends string, Context = unknown> = Exception<Message, Context>;

export type IsException<T> = T extends Exception<infer _Message, infer _Context> ? Boolean.True : Boolean.False;

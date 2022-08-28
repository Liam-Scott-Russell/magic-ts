import { type Class } from "..";

/**
 * A type guard that returns true if {@link T} is a constructable type.
 *
 * Does not actually call the constructor.
 *
 * Source {@see https://stackoverflow.com/a/70810697/7010618}.
 *
 * @param value - The value to check.
 * @template T - The type of {@link value}.
 * @returns True if {@link T} is a constructable type.
 */
export function isConstructable<T>(
  value: T
): value is Class.AnyConstructable & T {
  return (
    value instanceof Function &&
    Boolean(value.prototype) &&
    Boolean(value.prototype.constructor)
  );
}

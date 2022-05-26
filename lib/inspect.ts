/**
 * Recursively expands the type {@link T} to render it properly in the editor for inspection.
 *
 * Useful for debugging and testing.
 *
 * @template T - The type to inspect.
 */
export type Inspect<T> = T extends (...args: infer P) => infer R
  ? (...args: Inspect<P>) => Inspect<R>
  : T extends object
    ? T extends infer O
      ? { [K in keyof O]: Inspect<O[K]> }
      : never
    : T;

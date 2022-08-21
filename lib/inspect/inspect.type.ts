/**
 * Recursively expands the type {@link T} to render it properly in the editor for inspection.
 *
 * Useful for debugging and testing.
 *
 * @template T - The type to inspect.
 */
type Inspect__Inspect<T> = T extends (...args: infer P) => infer R
  ? (...args: Inspect__Inspect<P>) => Inspect__Inspect<R>
  : T extends object
  ? T extends infer O
    ? { [K in keyof O]: Inspect__Inspect<O[K]> }
    : never
  : T;

export type { Inspect__Inspect as Inspect };

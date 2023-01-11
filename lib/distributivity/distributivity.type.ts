/**
 * Enable distributivity over unions for a given type.
 *
 * @template T - The type to enable distributivity over.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Enable<T> = T extends any ? T : never;

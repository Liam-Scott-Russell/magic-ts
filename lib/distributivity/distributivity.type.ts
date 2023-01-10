/**
 * Enable distributivity over unions for a given type.
 *
 * @template T - The type to enable distributivity over.
 */
export type Enable<T> = T extends never ? T : never;

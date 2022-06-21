import { type Inspect, type Record } from "..";

/**
 * An empty class declaration.
 *
 * **Not** to be used as a replacement for {@link Record.Empty}.
 *
 * Equivalent to the constructable:
 * ```typescript
 * type EmptyConstructable = Constructable.Constructable<{"prototype": {}}, [], {}>
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export abstract class Empty { }

/**
 *
 */
export type StaticBase = Inspect<typeof Empty>;

/**
 * All the static keys of a class.
 *
 * Sourced from {@link StaticBase}.
 *
 * This should be `"prototype"`.
 */
export type StaticBaseKeys = Record.KeysOf<StaticBase>;

/**
 * All the static values of a class.
 *
 * Sourced from {@link StaticBase}.
 *
 * This should be `{}` i.e. {@link Record.Empty}.
 */
export type StaticBaseValues = Record.ValuesOf<StaticBase>;

import { type Inspect, type Struct } from "..";

/**
 * An empty class declaration.
 *
 * **Not** to be used as a replacement for {@link Struct.Empty}.
 *
 * Equivalent to the constructable:
 * ```typescript
 * type EmptyConstructable = Constructable.Constructable<{"prototype": {}}, [], {}>
 * ```.
 */
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export abstract class Empty {}

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
export type StaticBaseKeys = Struct.KeysOf<StaticBase>;

/**
 * All the static values of a class.
 *
 * Sourced from {@link StaticBase}.
 *
 * This should be `{}` i.e. {@link Struct.Empty}.
 */
export type StaticBaseValues = Struct.ValuesOf<StaticBase>;

import { type Class, type Inspect, type Struct } from "..";

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
abstract class Class__Empty {}

/**
 *
 */
type Class__StaticBase = Inspect<typeof Class.Empty>;

/**
 * All the static keys of a class.
 *
 * Sourced from {@link StaticBase}.
 *
 * This should be `"prototype"`.
 */
type Class__StaticBaseKeys = Struct.KeysOf<Class.StaticBase>;

/**
 * All the static values of a class.
 *
 * Sourced from {@link StaticBase}.
 *
 * This should be `{}` i.e. {@link Struct.Empty}.
 */
type Class__StaticBaseValues = Struct.ValuesOf<Class.StaticBase>;

export {
  Class__Empty as Empty,
  type Class__StaticBase as StaticBase,
  type Class__StaticBaseKeys as StaticBaseKeys,
  type Class__StaticBaseValues as StaticBaseValues,
};

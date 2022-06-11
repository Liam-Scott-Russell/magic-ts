import { type Inspect, type Record } from "..";

/**
 * The base type for a class's constructor parameters.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AllowedConstructorParameters = any[];

/**
 * The constructor function for a class with instance type {@link InstanceType} and constructor parameters {@link AllowedConstructorParameters}.
 *
 * Takes in the constructor parameters and returns an instance of {@link InstanceType}.
 *
 * This is not returned via the {@link Class.StaticTypeof} type function, even though under the hood this is a static property of an {@link Class.Constructible}.
 *
 * @param InstanceType The type of the class's instance.
 * @param AllowedConstructorParameters The constructor parameters for the class.
 * @returns The constructor function for the class.
 */
export type Constructor<
  InstanceType,
  Args extends AllowedConstructorParameters = AllowedConstructorParameters
> = (...args: Args) => InstanceType;

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
abstract class _Base {}

/**
 * An empty class, used as a base for all other classes.
 */
export type StaticBase = Inspect<typeof _Base>;

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

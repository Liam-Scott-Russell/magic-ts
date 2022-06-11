import {
  type Assert,
  type Inspect,
  type Record,
  type Class,
  type Inheritance,
} from "..";

/**
 * A class type that can be instantiated with the {@link Class.Constructor} function by calling `new <ClassName>`.
 *
 * **NOTE**: When a type function excpets this type, a class must be passed using the `typeof` operator on the class's name.
 *
 * @param InstanceType The type of the class's instance.
 * @param Args The constructor parameters for the class.
 * @returns A constructible type that can be instantiated with the {@link Constructor} function by calling `new <ClassName>`.
 */
export type Constructible<
  InstanceType = Record.Any,
  Args extends Class.AllowedConstructorParameters = Class.AllowedConstructorParameters
> = new (...args: Args) => InstanceType;

/**
 * The constructor parameters of a {@link Constructible} type.
 *
 * Very similar to the {@link ConstructorParameters} builtin.
 *
 * @param T A {@link Constructible} type.
 * @returns The constructor parameters of {@link T}.
 */
export type ConstructorParametersOf<T extends Constructible> =
  T extends Class.Constructible<infer _InstanceType, infer Args> ? Args : never;

/**
 * The instance type of a {@link Constructible} type.
 *
 * Very similar to the {@link InstanceType} builtin.
 *
 * @param T A {@link Constructible} type.
 * @returns The constructor parameters of {@link T}.
 */
export type InstanceTypeOf<T extends Constructible> =
  T extends Class.Constructible<infer InstanceType, infer _Args>
    ? InstanceType
    : never;

/**
 * The {@link Class.Constructor} function of a {@link Constructible} type.
 *
 * @param T A {@link Constructible} type.
 * @returns The {@link Class.Constructor} function of {@link T}.
 */
export type ConstructorOf<T extends Constructible> = Class.Constructor<
  InstanceTypeOf<T>,
  ConstructorParametersOf<T>
>;

/**
 * All of the static properties of a {@link Constructible} type.
 *
 * This includes the ones from {@link Class.StaticBase}.
 *
 * @param T A {@link Constructible} type.
 * @returns All the static properties of {@link T}.
 */
export type StaticTypeOf<T extends Constructible> = T;

/**
 * The static properties of a {@link Constructible} type, excluding the ones from {@link Class.StaticBase}.
 *
 * @param T A {@link Constructible} type.
 * @returns The uniquely defined static properties of {@link T}.
 */
export type StaticTypeOfStrict<T extends Constructible> = Omit<
  T,
  Class.StaticBaseKeys
>;

class MyTestClass {
  public readonly name: string;

  public static readonly staticProperty: string = "staticProperty";

  public static staticMethod(): string {
    return "staticMethod";
  }

  public constructor() {
    this.name = "MyTestClass";
  }
}

type ExpectedStaticProperties = {
  staticMethod: () => string;
  readonly staticProperty: string;
};

type ActualStaticProperties = Inspect<StaticTypeOf<typeof MyTestClass>>;
type _t = Assert.Assert<
  Inheritance.Equals<ExpectedStaticProperties, ActualStaticProperties>
>;

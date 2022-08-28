import { type Inspect, type Struct, type Class, type Tuple } from "..";

/**
 * Any {@link Constructor}'s parameters must extend this.
 *
 * Essentially any array of objects.
 *
 * Note that even if following the Receive-Object-Return-Object (RORO) pattern, the {@link Constructor} will be an array of length one.
 */
type Class__ConstructorParametersBase = Tuple.Any;

/**
 * A constructible is a static struct {@link S} that has a {@link Constructor} which returns an instance struct {@link I}.
 *
 * The most common constructible is a `class`'s constructible. To get the constructible type from a class do `type ClassConstructable = typeof ClassName`.
 *
 * The values of the static struct {@link S} are accessable via `ConstructableObject.keyName`.
 *
 * @template S The static type of this constructible.
 * @template C The parameter array for this constructible's {@link Constructor} function.
 * @template I The instance type returned by this constructible's {@link Constructor} function.
 * @example
 * ```typescript
 * type StaticStruct = {
 *   staticMethod: () => string;
 *   readonly staticProperty: string;
 * };
 *
 * type InstanceStruct = {
 *   hello: (otherPerson: string) => string;
 *   name: string;
 * };
 *
 * type ConstructorParameters = [name: string, _unusedField: number];
 *
 * class MyTestClass {
 *   public readonly name: string;
 *
 *   public hello(otherPerson: string) {
 *     return `hello ${otherPerson}`;
 *   }
 *
 *   public static readonly staticProperty: string = "staticProperty";
 *
 *   public static staticMethod(): string {
 *     return "staticMethod";
 *   }
 *
 *   public constructor(name: string, _unusedField: number) {
 *     this.name = name;
 *   }
 * }
 *
 * // A constructable is instantiated just like a class
 * const parameters: ConstructorParameters = ["someName", 123]
 * const instanceOfMyTestClass: InstanceStruct = new MyTestClass(...parameters)
 *
 * //The `MyTestClass` does extends a `Constructable`
 * type MatchingConstructable = Constructable.Constructable<
 *   StaticStruct,
 *   ConstructorParameters,
 *   InstanceStruct
 * >;
 * type ExtendsConstructable = Assert.IsTrue<
 *   Inheritance.IsExtensionOf<typeof MyTestClass, MatchingConstructable>
 * >;
 *
 * // The static type must be extended by the constructable instance
 * type ConstructableWithDifferentStaticType = Constructable.Constructable<
 *   { not: "defined" },
 *   ConstructorParameters,
 *   InstanceStruct
 * >;
 * type StaticTypeMismatch = Assert.IsFalse<
 *   Inheritance.IsExtensionOf<
 *     typeof MyTestClass,
 *     ConstructableWithDifferentStaticType
 *   >
 * >;
 *
 * // A constructable can extend the static type
 * type SubTypeOfStaticStruct = { staticMethod: () => string }
 * type IsSubTypeOfStaticStruct = Assert.IsTrue<
 *   Inheritance.IsExtensionOf<StaticStruct, SubTypeOfStaticStruct>
 * >;
 * type ConstructableWithStaticSubType = Constructable.Constructable<
 *   SubTypeOfStaticStruct,
 *   ConstructorParameters,
 *   InstanceStruct
 * >;
 * type ExtendsStaticSubTypeConstructable = Assert.IsTrue<
 *   Inheritance.IsExtensionOf<
 *     typeof MyTestClass,
 *     ConstructableWithStaticSubType
 *   >
 * >;
 *
 * // A constructable can extend the instance type
 * type SubTypeOfInstanceStruct = Omit<InstanceStruct, "name">;
 * type IsSubtypeOfInstanceStruct = Assert.IsTrue<
 *   Inheritance.IsExtensionOf<InstanceStruct, SubTypeOfInstanceStruct>
 * >;
 * type ConstructableWithInstanceSubType = Constructable.Constructable<
 *   StaticStruct,
 *   ConstructorParameters,
 *   SubTypeOfInstanceStruct
 * >;
 * type ExtendsInstanceSubTypeConstructable = Assert.IsTrue<
 *   Inheritance.IsExtensionOf<typeof MyTestClass, ConstructableWithInstanceSubType>
 * >
 *
 * type ConstructableWithDifferentInstanceType = Constructable.Constructable<
 *   StaticStruct,
 *   ConstructorParameters,
 *   { not: "defined" }
 * >;
 * type InstanceTypeMismatch = Assert.IsFalse<
 *   Inheritance.IsExtensionOf<
 *     typeof MyTestClass,
 *     ConstructableWithDifferentInstanceType
 *   >
 * >;
 *
 *
 * // A constructable can use arbitrary names for the constructor parameters
 * type RenamedConstructorParameters = [renamedName: string, stillAnUnusedFiled: number]
 * type _isParentOfConstructorParameters = Assert.IsTrue<
 *   Inheritance.IsExtensionOf<ConstructorParameters, RenamedConstructorParameters>
 * >
 * type ConstructableWithRenamedConstructorParameters = Constructable.Constructable<
 *   StaticStruct,
 *   RenamedConstructorParameters,
 *   InstanceStruct
 * >
 * type ExtendsConstructableWithRenamedConstructorParameters = Assert.IsTrue<
 *   Inheritance.IsExtensionOf<
 *     typeof MyTestClass,
 *     ConstructableWithRenamedConstructorParameters
 *   >
 * >
 *
 * // A  constructable must have the same number, and type of constructor parameters
 * type ConstructableWithDifferentConstructorParametersType = Constructable.Constructable<
 *   StaticStruct,
 *   ["not", "defined"],
 *   InstanceStruct
 * >;
 * type ConstructorParametersTypeMismatch = Assert.IsFalse<
 *   Inheritance.IsExtensionOf<
 *     typeof MyTestClass,
 *     ConstructableWithDifferentConstructorParametersType
 *   >
 * >;
 * ```
 */
type Class__Constructable<
  S extends Struct.Any,
  C extends Class.ConstructorParametersBase,
  I extends Struct.Any
> = Class.Constructor<C, I> & S;

/**
 * A {@link Constructable} with default parameters, meaning it represents all possible constructables.
 *
 * Prefer {@link Constructable} with specified parameters whenever the types are actually known.
 *
 * Mostly used as a type guard for type functions.
 *
 * Can't use {@link Struct.Any} because it yields type errors.
 */
type Class__AnyConstructable = Class.Constructable<
  {},
  Class.ConstructorParametersBase,
  {}
>;

/**
 * A {@link Constructable} with an empty static struct, no constructor parameters, and an empty instance type.
 */
type Class__EmptyConstructable = Class.Constructable<
  Struct.Empty,
  [],
  Struct.Empty
>;

/**
 * The base constructable, representing an empty class.
 *
 */
type Class__BaseConstructable = Class.Constructable<{ prototype: {} }, [], {}>;

/**
 * A constructor is a function that takes a parameter array {@link ConstructorParameters} and returns an instance type {@link Instance}.
 *
 * @template ConstructorParameters The parameters used to create the instance type {@link Instance}.
 * @template Instance The type returned by this constructor.
 */
// TODO: need an abstract version
type Class__Constructor<
  ConstructorParameters extends Class.ConstructorParametersBase,
  Instance extends Struct.Any
> = new (...parameters: ConstructorParameters) => Instance;

/**
 * The constructor parameters of a {@link Constructable} type.
 *
 * Very similar to the {@link ConstructorParameters} builtin.
 *
 * @example
 * ```typescript
 * // class MyTestClass {
 * //   public readonly name: string;
 *
 * //   public hello(otherPerson: string) {
 * //     return `hello ${otherPerson}`;
 * //   }
 *
 * //   public static readonly staticProperty: string = "staticProperty";
 *
 * //   public static staticMethod(): string {
 * //     return "staticMethod";
 * //   }
 *
 * //   public constructor(name: string, _unusedField: number) {
 * //     this.name = name;
 * //   }
 * // }
 *
 * // type CanGetMultipleConstructorParameters = Assert.IsTrue<
 * //   Inheritance.IsEqual<
 * //     [name: string, _unusedField: number],
 * //     ConstructorParametersOf$<typeof MyTestClass>
 * //   >
 * // >
 * ```
 * @example
 * ```typescript
 * // class EmptyClass { }
 *
 * // type CanGetNoConstructorParameters = Assert.IsTrue<
 * //   Inheritance.IsEqual<
 * //     [],
 * //     ConstructorParametersOf$<typeof EmptyClass>
 * //   >
 * // >
 * ```
 * @example
 * ```typescript
 * // class WithInferredProperties {
 * //   constructor(
 * //     public readonly name: string,
 * //     public readonly age: number,
 * //     private readonly birthday: Date,
 * //   ) { }
 * // }
 *
 * // type CanGetInferredPropertyConstructorParameters = Assert.IsTrue<
 * //   Inheritance.IsEqual<
 * //     [name: string, age: number, birthday: Date],
 * //     ConstructorParametersOf$<typeof WithInferredProperties>
 * //   >
 * // >
 * ```
 */
type Class__GetConstructorParameters<
  TConstructable extends Class.AnyConstructable,
  Default = never
> = TConstructable extends Class.Constructable<infer _S, infer C, infer _I>
  ? C
  : Default;

/**
 * The instance type of a {@link Constructable} type.
 *
 * Very similar to the {@link InstanceType} builtin.
 */
type Class__GetInstance<
  TConstructable extends Class.AnyConstructable,
  Default = never
> = TConstructable extends Class.Constructable<infer _S, infer _C, infer I>
  ? I
  : Default;

/**
 * The {@link Class.Constructor} function of a {@link Constructable} type.
 */
type Class__GetConstructor<
  TConstructor extends Class.AnyConstructable,
  Default = never
> = Class.Constructor<
  Class.GetConstructorParameters<TConstructor, Default>,
  Class.GetInstance<TConstructor, Default>
>;

/**
 * All of the static properties of a {@link Constructable} type.
 *
 * This includes the ones from {@link Class.StaticBase}.
 *
 */
// TODO: Using Inspect here will strip off the constructor object, but this is a hack
type Class__GetStatic<
  TConstructable extends Class.AnyConstructable,
  Default = never
> = TConstructable extends Class.Constructable<
  infer StaticStruct,
  infer _ConstructorParameters,
  infer _InstanceStruct
>
  ? Inspect<StaticStruct>
  : Default;

/**
 * The static properties of a {@link Constructable} type, excluding the ones from {@link Class.StaticBase}.
 */
type Class__GetStaticStrict<
  TConstructable extends Class.AnyConstructable,
  Default = never
> = Omit<Class.GetStatic<TConstructable, Default>, Class.StaticBaseKeys>;

type Class__AnyConstructableForInstance<TInstance extends Struct.Any> =
  Class.Constructable<Struct.Any, Class.ConstructorParametersBase, TInstance>;

// TODO: EXAMPLE
// class MyTestClass {
//   public readonly name: string;

//   public hello(otherPerson: string) {
//     return `hello ${otherPerson}`;
//   }

//   public static readonly staticProperty: string = "staticProperty";

//   public static staticMethod(): string {
//     return "staticMethod";
//   }

//   public constructor(name: string, _unusedField: number) {
//     this.name = name;
//   }
// }

// type MultipleMemberInstanceStruct = {
//   hello: (otherPerson: string) => string;
//   readonly name: string;
// };

// type CanGetInstanceStructWithMultipleMembers = Assert.IsTrue<
//   Inheritance.IsEqual<
//     MultipleMemberInstanceStruct,
//     InstanceStructOf$<typeof MyTestClass>
//   >
// >;

// class EmptyClass {}

// type CanGetNoInstanceStruct = Assert.IsTrue<
//   Inheritance.IsEqual<{}, InstanceStructOf$<typeof EmptyClass>>
// >;

// class WithInferredProperties {
//   constructor(
//     public readonly name: string,
//     public readonly age: number,
//     private readonly birthday: Date
//   ) {}
// }

// type t1 = InstanceStructOf$<typeof WithInferredProperties>;
// type t2 = Inspect<WithInferredProperties>;

// type InferredPropertyInstanceStruct = {
//   readonly age: number;
//   readonly name: string;
// };

// type t1_eq_t2 = Inheritance.IsEqual<t1, t2>;

// type t1_eq_inferred = Inheritance.IsEqual<t1, InferredPropertyInstanceStruct>;
// type t2_eqt_inferred = Inheritance.IsEqual<t2, InferredPropertyInstanceStruct>;

// type CanGetInferredPropertyInstanceStruct = Assert.IsTrue<
//   Inheritance.IsEqual<
//     InferredPropertyInstanceStruct,
//     InstanceStructOf$<typeof WithInferredProperties>
//   >
// >;

export type {
  Class__GetConstructorParameters as GetConstructorParameters,
  Class__AnyConstructable as AnyConstructable,
  Class__Constructable as Constructable,
  Class__Constructor as Constructor,
  Class__BaseConstructable as BaseConstructable,
  Class__ConstructorParametersBase as ConstructorParametersBase,
  Class__EmptyConstructable as EmptyConstructable,
  Class__GetConstructor as GetConstructor,
  Class__GetInstance as GetInstance,
  Class__GetStatic as GetStatic,
  Class__GetStaticStrict as GetStaticStrict,
  Class__AnyConstructableForInstance as AnyConstructableForInstance,
};

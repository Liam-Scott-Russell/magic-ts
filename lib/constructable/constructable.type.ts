import { type Inspect, type Exception, type Struct, type Class } from "..";

/**
 * Any {@link Constructor}'s parameters must extend this.
 *
 * Essentially any array of objects.
 *
 * Note that even if following the Receive-Object-Return-Object (RORO) pattern, the {@link Constructor} will be an array of length one.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ConstructorParametersBase = any[];

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
 * type ExtendsConstructable = Assert.True<
 *   Inheritance.IsExtensionOf<typeof MyTestClass, MatchingConstructable>
 * >;
 *
 * // The static type must be extended by the constructable instance
 * type ConstructableWithDifferentStaticType = Constructable.Constructable<
 *   { not: "defined" },
 *   ConstructorParameters,
 *   InstanceStruct
 * >;
 * type StaticTypeMismatch = Assert.False<
 *   Inheritance.IsExtensionOf<
 *     typeof MyTestClass,
 *     ConstructableWithDifferentStaticType
 *   >
 * >;
 *
 * // A constructable can extend the static type
 * type SubTypeOfStaticStruct = { staticMethod: () => string }
 * type IsSubTypeOfStaticStruct = Assert.True<
 *   Inheritance.IsExtensionOf<StaticStruct, SubTypeOfStaticStruct>
 * >;
 * type ConstructableWithStaticSubType = Constructable.Constructable<
 *   SubTypeOfStaticStruct,
 *   ConstructorParameters,
 *   InstanceStruct
 * >;
 * type ExtendsStaticSubTypeConstructable = Assert.True<
 *   Inheritance.IsExtensionOf<
 *     typeof MyTestClass,
 *     ConstructableWithStaticSubType
 *   >
 * >;
 *
 * // A constructable can extend the instance type
 * type SubTypeOfInstanceStruct = Omit<InstanceStruct, "name">;
 * type IsSubtypeOfInstanceStruct = Assert.True<
 *   Inheritance.IsExtensionOf<InstanceStruct, SubTypeOfInstanceStruct>
 * >;
 * type ConstructableWithInstanceSubType = Constructable.Constructable<
 *   StaticStruct,
 *   ConstructorParameters,
 *   SubTypeOfInstanceStruct
 * >;
 * type ExtendsInstanceSubTypeConstructable = Assert.True<
 *   Inheritance.IsExtensionOf<typeof MyTestClass, ConstructableWithInstanceSubType>
 * >
 *
 * type ConstructableWithDifferentInstanceType = Constructable.Constructable<
 *   StaticStruct,
 *   ConstructorParameters,
 *   { not: "defined" }
 * >;
 * type InstanceTypeMismatch = Assert.False<
 *   Inheritance.IsExtensionOf<
 *     typeof MyTestClass,
 *     ConstructableWithDifferentInstanceType
 *   >
 * >;
 *
 *
 * // A constructable can use arbitrary names for the constructor parameters
 * type RenamedConstructorParameters = [renamedName: string, stillAnUnusedFiled: number]
 * type _isParentOfConstructorParameters = Assert.True<
 *   Inheritance.IsExtensionOf<ConstructorParameters, RenamedConstructorParameters>
 * >
 * type ConstructableWithRenamedConstructorParameters = Constructable.Constructable<
 *   StaticStruct,
 *   RenamedConstructorParameters,
 *   InstanceStruct
 * >
 * type ExtendsConstructableWithRenamedConstructorParameters = Assert.True<
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
 * type ConstructorParametersTypeMismatch = Assert.False<
 *   Inheritance.IsExtensionOf<
 *     typeof MyTestClass,
 *     ConstructableWithDifferentConstructorParametersType
 *   >
 * >;
 * ```
 */
export type Constructable<
  S extends Struct.Any,
  C extends ConstructorParametersBase,
  I extends Struct.Any
> = Constructor<C, I> & S;

/**
 * A {@link Constructable} with default parameters, meaning it represents all possible constructables.
 *
 * Prefer {@link Constructable} with specified parameters whenever the types are actually known.
 *
 * Mostly used as a type guard for type functions.
 *
 * Can't use {@link Struct.Any} because it yields type errors.
 */
export type Any = Constructable<{}, ConstructorParametersBase, {}>;

/**
 * A {@link Constructable} with an empty static struct, no constructor parameters, and an empty instance type.
 */
export type Empty = Constructable<Struct.Empty, [], Struct.Empty>;

/**
 * The base constructable, representing an empty class.
 *
 */
export type Base = Constructable<{ prototype: {} }, [], {}>;

/**
 * A constructor is a function that takes a parameter array {@link C} and returns an instance type {@link I}.
 *
 * @template C The parameters used to create the instance type {@link I}.
 * @template I The type returned by this constructor.
 */
export type Constructor<
  C extends ConstructorParametersBase,
  I extends Struct.Any
> = abstract new (...parameters: C) => I;

/**
 * The constructor parameters of a {@link Constructable} type.
 *
 * Very similar to the {@link ConstructorParameters} builtin.
 *
 * @example
 * ```typescript
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
 * type CanGetMultipleConstructorParameters = Assert.True<
 *   Inheritance.IsEqual<
 *     [name: string, _unusedField: number],
 *     ConstructorParametersOf$<typeof MyTestClass>
 *   >
 * >
 * ```
 * @example
 * ```typescript
 * class EmptyClass { }
 *
 * type CanGetNoConstructorParameters = Assert.True<
 *   Inheritance.IsEqual<
 *     [],
 *     ConstructorParametersOf$<typeof EmptyClass>
 *   >
 * >
 * ```
 * @example
 * ```typescript
 * class WithInferredProperties {
 *   constructor(
 *     public readonly name: string,
 *     public readonly age: number,
 *     private readonly birthday: Date,
 *   ) { }
 * }
 *
 * type CanGetInferredPropertyConstructorParameters = Assert.True<
 *   Inheritance.IsEqual<
 *     [name: string, age: number, birthday: Date],
 *     ConstructorParametersOf$<typeof WithInferredProperties>
 *   >
 * >
 * ```
 */
export type ConstructorParametersOf$<TConstructable extends Any> =
  TConstructable extends Constructable<infer _S, infer C, infer _I>
    ? C
    : Exception.Exception<
        "ConstructorParametersOf: Could not determine the constructor parameters.",
        TConstructable
      >;

/**
 * The instance type of a {@link Constructable} type.
 *
 * Very similar to the {@link InstanceType} builtin.
 */
export type InstanceStructOf$<TConstructable extends Any> =
  TConstructable extends Constructable<infer _S, infer _C, infer I>
    ? I
    : Exception.Exception<
        "InstanceStructOf$: Could not determine the constructor parameters.",
        TConstructable
      >;

/**
 * The {@link Class.Constructor} function of a {@link Constructable} type.
 */
export type ConstructorOf<TConstructor extends Any> = Constructor<
  ConstructorParametersOf$<TConstructor>,
  InstanceStructOf$<TConstructor>
>;

/**
 * All of the static properties of a {@link Constructable} type.
 *
 * This includes the ones from {@link Class.StaticBase}.
 *
 * TODO: Using Inspect here will strip off the constructor object.
 */
export type StaticStructOf$<TConstructable extends Any> =
  TConstructable extends Constructable<
    infer StaticStruct,
    infer _ConstructorParameters,
    infer _InstanceStruct
  >
    ? Inspect<StaticStruct>
    : Exception.Exception<
        "StaticStructOf$: Could not determine the static struct.",
        TConstructable
      >;

/**
 * The static properties of a {@link Constructable} type, excluding the ones from {@link Class.StaticBase}.
 */
export type StaticStructOfStrict<TConstructable extends Any> = Omit<
  StaticStructOf$<TConstructable>,
  Class.StaticBaseKeys
>;

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

// type CanGetInstanceStructWithMultipleMembers = Assert.True<
//   Inheritance.IsEqual<
//     MultipleMemberInstanceStruct,
//     InstanceStructOf$<typeof MyTestClass>
//   >
// >;

// class EmptyClass {}

// type CanGetNoInstanceStruct = Assert.True<
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

// type CanGetInferredPropertyInstanceStruct = Assert.True<
//   Inheritance.IsEqual<
//     InferredPropertyInstanceStruct,
//     InstanceStructOf$<typeof WithInferredProperties>
//   >
// >;

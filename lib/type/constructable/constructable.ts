import { type Inspect, type Exception, type Record, type Class } from "..";

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
 * A constructible is a static record {@link S} that has a {@link Constructor} which returns an instance record {@link I}.
 *
 * The most common constructible is a `class`'s constructible. To get the constructible type from a class do `type ClassConstructable = typeof ClassName`.
 *
 * The values of the static record {@link S} are accessable via `ConstructableObject.keyName`.
 *
 * @template S The static type of this constructible.
 * @template C The parameter array for this constructible's {@link Constructor} function.
 * @template I The instance type returned by this constructible's {@link Constructor} function.
 * @example
 * ```typescript
 * type StaticRecord = {
 *   staticMethod: () => string;
 *   readonly staticProperty: string;
 * };
 *
 * type InstanceRecord = {
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
 * const instanceOfMyTestClass: InstanceRecord = new MyTestClass(...parameters)
 *
 * //The `MyTestClass` does extends a `Constructable`
 * type MatchingConstructable = Constructable.Constructable<
 *   StaticRecord,
 *   ConstructorParameters,
 *   InstanceRecord
 * >;
 * type ExtendsConstructable = Assert.True<
 *   Inheritance.IsExtensionOf<typeof MyTestClass, MatchingConstructable>
 * >;
 *
 * // The static type must be extended by the constructable instance
 * type ConstructableWithDifferentStaticType = Constructable.Constructable<
 *   { not: "defined" },
 *   ConstructorParameters,
 *   InstanceRecord
 * >;
 * type StaticTypeMismatch = Assert.False<
 *   Inheritance.IsExtensionOf<
 *     typeof MyTestClass,
 *     ConstructableWithDifferentStaticType
 *   >
 * >;
 *
 * // A constructable can extend the static type
 * type SubTypeOfStaticRecord = { staticMethod: () => string }
 * type IsSubTypeOfStaticRecord = Assert.True<
 *   Inheritance.IsExtensionOf<StaticRecord, SubTypeOfStaticRecord>
 * >;
 * type ConstructableWithStaticSubType = Constructable.Constructable<
 *   SubTypeOfStaticRecord,
 *   ConstructorParameters,
 *   InstanceRecord
 * >;
 * type ExtendsStaticSubTypeConstructable = Assert.True<
 *   Inheritance.IsExtensionOf<
 *     typeof MyTestClass,
 *     ConstructableWithStaticSubType
 *   >
 * >;
 *
 * // A constructable can extend the instance type
 * type SubTypeOfInstanceRecord = Omit<InstanceRecord, "name">;
 * type IsSubtypeOfInstanceRecord = Assert.True<
 *   Inheritance.IsExtensionOf<InstanceRecord, SubTypeOfInstanceRecord>
 * >;
 * type ConstructableWithInstanceSubType = Constructable.Constructable<
 *   StaticRecord,
 *   ConstructorParameters,
 *   SubTypeOfInstanceRecord
 * >;
 * type ExtendsInstanceSubTypeConstructable = Assert.True<
 *   Inheritance.IsExtensionOf<typeof MyTestClass, ConstructableWithInstanceSubType>
 * >
 *
 * type ConstructableWithDifferentInstanceType = Constructable.Constructable<
 *   StaticRecord,
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
 *   StaticRecord,
 *   RenamedConstructorParameters,
 *   InstanceRecord
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
 *   StaticRecord,
 *   ["not", "defined"],
 *   InstanceRecord
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
  S extends Record.Any,
  C extends ConstructorParametersBase,
  I extends Record.Any
> = Constructor<C, I> & S;

/**
 * A {@link Constructable} with default parameters, meaning it represents all possible constructables.
 *
 * Prefer {@link Constructable} with specified parameters whenever the types are actually known.
 *
 * Mostly used as a type guard for type functions.
 *
 * Can't use {@link Record.Any} because it yields type errors.
 */
export type Any = Constructable<{}, ConstructorParametersBase, {}>;

/**
 * A {@link Constructable} with an empty static record, no constructor parameters, and an empty instance type.
 */
export type Empty = Constructable<Record.Empty, [], Record.Empty>;

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
  I extends Record.Any
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
export type InstanceRecordOf$<TConstructable extends Any> =
  TConstructable extends Constructable<infer _S, infer _C, infer I>
    ? I
    : Exception.Exception<
        "InstanceRecordOf$: Could not determine the constructor parameters.",
        TConstructable
      >;

/**
 * The {@link Class.Constructor} function of a {@link Constructable} type.
 */
export type ConstructorOf<TConstructor extends Any> = Constructor<
  ConstructorParametersOf$<TConstructor>,
  InstanceRecordOf$<TConstructor>
>;

/**
 * All of the static properties of a {@link Constructable} type.
 *
 * This includes the ones from {@link Class.StaticBase}.
 *
 * HACK: Using Inspect here will strip off the constructor object
 */
export type StaticRecordOf$<TConstructable extends Any> =
  TConstructable extends Constructable<
    infer StaticRecord,
    infer _ConstructorParameters,
    infer _InstanceRecord
  >
    ? Inspect<StaticRecord>
    : Exception.Exception<
        "StaticRecordOf$: Could not determine the static record.",
        TConstructable
      >;

/**
 * The static properties of a {@link Constructable} type, excluding the ones from {@link Class.StaticBase}.
 */
export type StaticRecordOfStrict<TConstructable extends Any> = Omit<
  StaticRecordOf$<TConstructable>,
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

// type MultipleMemberInstanceRecord = {
//   hello: (otherPerson: string) => string;
//   readonly name: string;
// };

// type CanGetInstanceRecordWithMultipleMembers = Assert.True<
//   Inheritance.IsEqual<
//     MultipleMemberInstanceRecord,
//     InstanceRecordOf$<typeof MyTestClass>
//   >
// >;

// class EmptyClass {}

// type CanGetNoInstanceRecord = Assert.True<
//   Inheritance.IsEqual<{}, InstanceRecordOf$<typeof EmptyClass>>
// >;

// class WithInferredProperties {
//   constructor(
//     public readonly name: string,
//     public readonly age: number,
//     private readonly birthday: Date
//   ) {}
// }

// type t1 = InstanceRecordOf$<typeof WithInferredProperties>;
// type t2 = Inspect<WithInferredProperties>;

// type InferredPropertyInstanceRecord = {
//   readonly age: number;
//   readonly name: string;
// };

// type t1_eq_t2 = Inheritance.IsEqual<t1, t2>;

// type t1_eq_inferred = Inheritance.IsEqual<t1, InferredPropertyInstanceRecord>;
// type t2_eqt_inferred = Inheritance.IsEqual<t2, InferredPropertyInstanceRecord>;

// type CanGetInferredPropertyInstanceRecord = Assert.True<
//   Inheritance.IsEqual<
//     InferredPropertyInstanceRecord,
//     InstanceRecordOf$<typeof WithInferredProperties>
//   >
// >;

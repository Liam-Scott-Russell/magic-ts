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
 * A constructible is a {@link StaticRecord} that has a {@link Constructor} which returns an {@link InstanceRecord}.
 *
 * The most common constructible is a `class`'s constructible. To get the constructible type from a class do `type ClassConstructable = typeof ClassName`.
 *
 * The values of the {@link StaticRecord} are accessable via `ConstructableObject.keyName`.
 *
 * @template StaticRecord The static type of this constructible.
 * @template InstanceType The instace type returned by this constructible's {@link Constructor} function.
 * @template ConstructorParameters The parameter array for this constructible's {@link Constructor} function.
 */
export type Constructable<
  StaticRecord extends Record.Any,
  ConstructorParameters extends ConstructorParametersBase,
  InstanceRecord extends Record.Any
> = Constructor<ConstructorParameters, InstanceRecord> & StaticRecord;

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
 * A constructor is a function that takes a parameter array {@link ConstructorParameters} and returns an {@link InstanceRecord}.
 *
 * @template InstanceRecord The type returned by this constructor.
 * @template ConstructorParameters The parameters used to create the {@link InstanceRecord}.
 */
export type Constructor<
  ConstructorParameters extends ConstructorParametersBase,
  InstanceRecord extends Record.Any
> = new (...parameters: ConstructorParameters) => InstanceRecord;

/**
 * The constructor parameters of a {@link Constructable} type.
 *
 * Very similar to the {@link ConstructorParameters} builtin.
 */
export type ConstructorParametersOf$<TConstructable extends Any> =
  TConstructable extends Constructable<
    infer _StaticRecord,
    infer ConstructorParameters,
    infer _InstanceRecord
  >
    ? ConstructorParameters
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
  TConstructable extends Constructable<
    infer _StaticRecord,
    infer _ConstructorParameters,
    infer InstanceRecord
  >
    ? InstanceRecord
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
// type StaticRecord = {
//     staticMethod: () => string;
//     readonly staticProperty: string;
// };

// type InstanceRecord = {
//     hello: (otherPerson: string) => string;
//     name: string;
// };

// type ConstructorParameters = [name: string, _unusedField: number];

// const MyTestClassConstructable: Constructable<StaticRecord, ConstructorParameters, InstanceRecord> = class {
//     public readonly name: string;

//     public hello(otherPerson: string) {
//         return `hello ${otherPerson}`;
//     }

//     public static readonly staticProperty: string = "staticProperty";

//     public static staticMethod(): string {
//         return "staticMethod";
//     }

//     public constructor(name: string, _unusedField: number) {
//         this.name = name;
//     }
// }

// //we can instantiate a constructable just like a class
// const parameters: ConstructorParameters = ["someName", 123]
// const _instanceOfMyTestClass: InstanceRecord = new MyTestClassConstructable(...parameters)

// //The `MyTestClassConstructable` does extends a `Constructable`
// type MatchingConstructable = Constructable<
//     StaticRecord,
//     ConstructorParameters,
//     InstanceRecord
// >;
// type _ShouldMatch = Assert.True<
//     Inheritance.IsExtensionOf<typeof MyTestClassConstructable, MatchingConstructable>
// >;

// //The static type must be extended by the constructable instance

// type ConstructableWithDifferentStaticType = Constructable<
//     { not: "defined" },
//     ConstructorParameters,
//     InstanceRecord
// >;
// type _StaticTypeMismatch = Assert.False<
//     Inheritance.IsExtensionOf<
//         typeof MyTestClassConstructable,
//         ConstructableWithDifferentStaticType
//     >
// >;

// type SubTypeOfStaticRecord = { staticMethod: () => string }
// type _isSubTypeOfStaticRecord = Assert.True<
//     Inheritance.IsExtensionOf<StaticRecord, SubTypeOfStaticRecord>
// >;
// type ConstructableWithStaticSubType = Constructable<
//     SubTypeOfStaticRecord,
//     ConstructorParameters,
//     InstanceRecord
// >;
// type _StaticSubTypeMatches = Assert.True<
//     Inheritance.IsExtensionOf<
//         typeof MyTestClassConstructable,
//         ConstructableWithStaticSubType
//     >
// >;

// type ParentOfInstanceRecord = Omit<InstanceRecord, "name">;
// type _isParentOfInstanceRecord = Assert.True<
//     Inheritance.IsExtensionOf<InstanceRecord, ParentOfInstanceRecord>
// >;
// type ConstructableWithParentInstanceType = Constructable<
//     StaticRecord,
//     ConstructorParameters,
//     ParentOfInstanceRecord,
//     >;

// type ConstructableWithDifferentInstanceType = Constructable<
//     StaticRecord,
//     ConstructorParameters,
//     { not: "defined" }
// >;
// type _InstanceTypeMismatch = Assert.False<
//     Inheritance.IsExtensionOf<
//         typeof MyTestClassConstructable,
//         ConstructableWithDifferentInstanceType
//     >
// >;

// type RenamedConstructorParameters = [renamedName: string, stillAnUnusedFiled: number]
// type _isParentOfConstructorParameters = Assert.True<
//     Inheritance.IsExtensionOf<ConstructorParameters, RenamedConstructorParameters>
// >
// type ConstructableWithRenamedConstructorParameters = Constructable<
//     StaticRecord,
//     RenamedConstructorParameters,
//     InstanceRecord
// >

// type ConstructableWithDifferentConstructorParametersType = Constructable<
//     StaticRecord,
//     ["not", "defined"],
//     InstanceRecord
// >;
// type _ConstructorParametersTypeMismatch = Assert.False<
//     Inheritance.IsExtensionOf<
//         typeof MyTestClassConstructable,
//         ConstructableWithDifferentConstructorParametersType
//     >
// >;

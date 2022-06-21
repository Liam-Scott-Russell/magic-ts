import { Assert, type Inheritance, type Record } from "..";
import { KeysAllowed } from "./key";

/**
 * Represents a strictly empty record.
 *
 * See the assignment table on {@link Any} for the list of types that are considered empty.
 *
 * Note that you cannot reliably extend this type (except with `{}`).
 */
export type Empty = Record<Record.KeysAllowed, never>;

/**
 * Represents any unknown record.
 *
 * Use this type instead of `{}` or `object` to avoid edge cases.
 *
 * This table outlines which types can be assigned to the different ways of expressing objects/records.
 *
 * Whether a particular type passes a `T extends U` check, where `U` is one of `{}`, `object`, {@link Empty}, {@link Any}
 * | Type               | Example                | `{}` | `object` | {@link Empty} | {@link Any} |
 * | ----               | ----                   | ---- | ----     | ----          | ----        |
 * | String             | `'foo'`                | Yes  | No       | No            | No          |
 * | True               | `true`                 | Yes  | No       | No            | No          |
 * | False              | `false`                | Yes  | No       | No            | No          |
 * | Number             | `42`                   | Yes  | No       | No            | No          |
 * | Big Int            | `42n`                  | Yes  | No       | No            | No          |
 * | Symbol             | `Symbol('foo')`        | Yes  | No       | No            | No          |
 * | Null               | `null`                 | No   | No       | No            | No          |
 * | Undefined          | `undefined`            | No   | No       | No            | No          |
 * | Empty Function     | `() => {}`             | Yes  | Yes      | No            | No          |
 * | Populated Function | `() => { foo: 'bar' }` | Yes  | Yes      | No            | No          |
 * | Populated Array    | `[1, 2, 3]`            | Yes  | Yes      | No            | No          |
 * | Empty Array        | `[]`                   | Yes  | Yes      | No            | No          |
 * | Populated Object   | `{ foo: 'bar' }`       | Yes  | Yes      | No            | Yes         |
 * | Empty Object       | `{}`                   | Yes  | Yes      | Yes           | Yes         |
 * | Never              | `never`                | Yes  | Yes      | Yes           | Yes         |
 * | Empty Class        | `class { }`            | Yes  | Yes      | No            | No          |
 *
 * These inconsistencies are why Typescript will warn you when you use `{}` or `object`.
 *
 * @example Types that extend `{}`
 * ```typescript
 * type EmptyRecord = typeof {};
 *
 * type Null_Extends_EmptyRecord              = Assert.False<Inheritance.IsExtensionOf<null                 , EmptyRecord>>;
 * type Undefined_Extends_EmptyRecord         = Assert.False<Inheritance.IsExtensionOf<undefined            , EmptyRecord>>;
 * ```
 *
 * @example Types that do not extend `{}`
 * ```typescript
 * type EmptyRecord = typeof {};
 * const symbol = Symbol("foo");
 *
 * type String_Extends_EmptyRecord            = Assert.True<Inheritance.IsExtensionOf<'foo'                 , EmptyRecord>>;
 * type True_Extends_EmptyRecord              = Assert.True<Inheritance.IsExtensionOf<true                  , EmptyRecord>>;
 * type False_Extends_EmptyRecord             = Assert.True<Inheritance.IsExtensionOf<false                 , EmptyRecord>>;
 * type Number_Extends_EmptyRecord            = Assert.True<Inheritance.IsExtensionOf<42                    , EmptyRecord>>;
 * type BigInt_Extends_EmptyRecord            = Assert.True<Inheritance.IsExtensionOf<42n                   , EmptyRecord>>;
 * type Symbol_Extends_EmptyRecord            = Assert.True<Inheritance.IsExtensionOf<typeof symbol         , EmptyRecord>>;
 * type EmptyFunction_Extends_EmptyRecord     = Assert.True<Inheritance.IsExtensionOf<()  => {}             , EmptyRecord>>;
 * type PopulatedFunction_Extends_EmptyRecord = Assert.True<Inheritance.IsExtensionOf<()  => { foo: 'bar' } , EmptyRecord>>;
 * type PopulatedArray_Extends_EmptyRecord    = Assert.True<Inheritance.IsExtensionOf<[1, 2, 3]             , EmptyRecord>>;
 * type EmptyArray_Extends_EmptyRecord        = Assert.True<Inheritance.IsExtensionOf<[]                    , EmptyRecord>>;
 * type PopulatedObject_Extends_EmptyRecord   = Assert.True<Inheritance.IsExtensionOf<{ foo: 'bar' }        , EmptyRecord>>;
 * type EmptyRecord_Extends_EmptyRecord       = Assert.True<Inheritance.IsExtensionOf<EmptyRecord           , EmptyRecord>>;
 * type Never_Extends_EmptyRecord             = Assert.True<Inheritance.IsExtensionOf<never                 , EmptyRecord>>;
 * type EmptyClass_Extends_EmptyRecord        = Assert.True<Inheritance.IsExtensionOf<EmptyClass            , EmptyRecord>>;
 * ```
 *
 * @example Types that extend `object`
 * ```typescript
 * const symbol = Symbol("foo");
 *
 * type String_Extends_Object                 = Assert.False<Inheritance.IsExtensionOf<'foo'                , object>>;
 * type True_Extends_Object                   = Assert.False<Inheritance.IsExtensionOf<true                 , object>>;
 * type False_Extends_Object                  = Assert.False<Inheritance.IsExtensionOf<false                , object>>;
 * type Number_Extends_Object                 = Assert.False<Inheritance.IsExtensionOf<42                   , object>>;
 * type BigInt_Extends_Object                 = Assert.False<Inheritance.IsExtensionOf<42n                  , object>>;
 * type Symbol_Extends_Object                 = Assert.False<Inheritance.IsExtensionOf<typeof symbol        , object>>;
 * type Null_Extends_Object                   = Assert.False<Inheritance.IsExtensionOf<null                 , object>>;
 * type Undefined_Extends_Object              = Assert.False<Inheritance.IsExtensionOf<undefined            , object>>;
 * ```
 *
 * @example Types that do not extend `object`
 * ```typescript
 * type EmptyRecord = typeof {};
 *
 * type EmptyFunction_Extends_Object          = Assert.True<Inheritance.IsExtensionOf<()  => {}             , object>>;
 * type PopulatedFunction_Extends_Object      = Assert.True<Inheritance.IsExtensionOf<()  => { foo: 'bar' } , object>>;
 * type PopulatedArray_Extends_Object         = Assert.True<Inheritance.IsExtensionOf<[1, 2, 3]             , object>>;
 * type EmptyArray_Extends_Object             = Assert.True<Inheritance.IsExtensionOf<[]                    , object>>;
 * type PopulatedObject_Extends_Object        = Assert.True<Inheritance.IsExtensionOf<{ foo: 'bar' }        , object>>;
 * type EmptyRecord_Extends_Object            = Assert.True<Inheritance.IsExtensionOf<EmptyRecord           , object>>;
 * type Never_Extends_Object                  = Assert.True<Inheritance.IsExtensionOf<never                 , object>>;
 * type EmptyClass_Extends_Object             = Assert.True<Inheritance.IsExtensionOf<EmptyClass            , object>>;
 * ```
 *
 * @example Types that extend {@link Empty}.
 * ```typescript
 * type String_Extends_Empty                  = Assert.False<Inheritance.IsExtensionOf<'foo'                , Empty>>;
 * type True_Extends_Empty                    = Assert.False<Inheritance.IsExtensionOf<true                 , Empty>>;
 * type False_Extends_Empty                   = Assert.False<Inheritance.IsExtensionOf<false                , Empty>>;
 * type Number_Extends_Empty                  = Assert.False<Inheritance.IsExtensionOf<42                   , Empty>>;
 * type BigInt_Extends_Empty                  = Assert.False<Inheritance.IsExtensionOf<42n                  , Empty>>;
 * type Symbol_Extends_Empty                  = Assert.False<Inheritance.IsExtensionOf<typeof symbol        , Empty>>;
 * type Null_Extends_Empty                    = Assert.False<Inheritance.IsExtensionOf<null                 , Empty>>;
 * type Undefined_Extends_Empty               = Assert.False<Inheritance.IsExtensionOf<undefined            , Empty>>;
 * type EmptyFunction_Extends_Empty           = Assert.False<Inheritance.IsExtensionOf<() => {}             , Empty>>;
 * type PopulatedFunction_Extends_Empty       = Assert.False<Inheritance.IsExtensionOf<() => { foo: 'bar' } , Empty>>;
 * type PopulatedArray_Extends_Empty          = Assert.False<Inheritance.IsExtensionOf<[1, 2, 3]            , Empty>>;
 * type EmptyArray_Extends_Empty              = Assert.False<Inheritance.IsExtensionOf<[]                   , Empty>>;
 * type PopulatedObject_Extends_Empty         = Assert.False<Inheritance.IsExtensionOf<{ foo: 'bar' }       , Empty>>;
 * type EmptyClass_Extends_Empty              = Assert.False<Inheritance.IsExtensionOf<EmptyClass           , Empty>>;
 * ```
 *
 * @example Types that do not extend {@link Empty}.
 * ```typescript
 * type EmptyRecord_Extends_Empty             = Assert.True<Inheritance.IsExtensionOf<EmptyRecord           , Empty>>;
 * type Never_Extends_Empty                   = Assert.True<Inheritance.IsExtensionOf<never                 , Empty>>;
 * ```
 *
 * @example Types that extend {@link Any}.
 * ```typescript
 * type String_Extends_Any                    = Assert.False<Inheritance.IsExtensionOf<'foo'                , Any>>;
 * type True_Extends_Any                      = Assert.False<Inheritance.IsExtensionOf<true                 , Any>>;
 * type False_Extends_Any                     = Assert.False<Inheritance.IsExtensionOf<false                , Any>>;
 * type Number_Extends_Any                    = Assert.False<Inheritance.IsExtensionOf<42                   , Any>>;
 * type BigInt_Extends_Any                    = Assert.False<Inheritance.IsExtensionOf<42n                  , Any>>;
 * type Symbol_Extends_Any                    = Assert.False<Inheritance.IsExtensionOf<typeof symbol        , Any>>;
 * type Null_Extends_Any                      = Assert.False<Inheritance.IsExtensionOf<null                 , Any>>;
 * type Undefined_Extends_Any                 = Assert.False<Inheritance.IsExtensionOf<undefined            , Any>>;
 * type EmptyFunction_Extends_Any             = Assert.False<Inheritance.IsExtensionOf<() => {}             , Any>>;
 * type PopulatedFunction_Extends_Any         = Assert.False<Inheritance.IsExtensionOf<() => { foo: 'bar' } , Any>>;
 * type PopulatedArray_Extends_Any            = Assert.False<Inheritance.IsExtensionOf<[1, 2, 3]            , Any>>;
 * type EmptyArray_Extends_Any                = Assert.False<Inheritance.IsExtensionOf<[]                   , Any>>;
 * type EmptyClass_Extends_Any                = Assert.False<Inheritance.IsExtensionOf<EmptyClass           , Any>>;
 * ```
 *
 * @example Types that do not extend {@link Any}.
 * ```typescript
 * type PopulatedObject_Extends_Any           = Assert.True<Inheritance.IsExtensionOf<{ foo: 'bar' }        , Any>>;
 * type EmptyRecord_Extends_Any               = Assert.True<Inheritance.IsExtensionOf<EmptyRecord           , Any>>;
 * type Never_Extends_Any                     = Assert.True<Inheritance.IsExtensionOf<never                 , Any>>;
 * ```
 */
export type Any = {};
// export type Any = Record<string, unknown>;

// /**
//  * @example
//  * Name for example:
//  * ```typescript
//  * console.log("hello world")
//  * ```
//  */
// const symbol = Symbol('foo');
// const emptyRecord = {};
// type EmptyRecord = typeof emptyRecord;
// const emptyClass = class { }
// type EmptyClass = typeof emptyClass;

// // Does not extend {}
// type Null_Extends_EmptyRecord = Assert.False<Inheritance.IsExtensionOf<null, EmptyRecord>>;
// type Undefined_Extends_EmptyRecord = Assert.False<Inheritance.IsExtensionOf<undefined, EmptyRecord>>;

// // Does extend {}
// type String_Extends_EmptyRecord = Assert.True<Inheritance.IsExtensionOf<'foo', EmptyRecord>>;
// type True_Extends_EmptyRecord = Assert.True<Inheritance.IsExtensionOf<true, EmptyRecord>>;
// type False_Extends_EmptyRecord = Assert.True<Inheritance.IsExtensionOf<false, EmptyRecord>>;
// type Number_Extends_EmptyRecord = Assert.True<Inheritance.IsExtensionOf<42, EmptyRecord>>;
// type BigInt_Extends_EmptyRecord = Assert.True<Inheritance.IsExtensionOf<42n, EmptyRecord>>;
// type Symbol_Extends_EmptyRecord = Assert.True<Inheritance.IsExtensionOf<typeof symbol, EmptyRecord>>;
// type EmptyFunction_Extends_EmptyRecord = Assert.True<Inheritance.IsExtensionOf<() => {}, EmptyRecord>>;
// type PopulatedFunction_Extends_EmptyRecord = Assert.True<Inheritance.IsExtensionOf<() => { foo: 'bar', }, EmptyRecord>>;
// type PopulatedArray_Extends_EmptyRecord = Assert.True<Inheritance.IsExtensionOf<[1, 2, 3], EmptyRecord>>;
// type EmptyArray_Extends_EmptyRecord = Assert.True<Inheritance.IsExtensionOf<[], EmptyRecord>>;
// type PopulatedObject_Extends_EmptyRecord = Assert.True<Inheritance.IsExtensionOf<{ foo: 'bar', }, EmptyRecord>>;
// type EmptyRecord_Extends_EmptyRecord = Assert.True<Inheritance.IsExtensionOf<EmptyRecord, EmptyRecord>>;
// type Never_Extends_EmptyRecord = Assert.True<Inheritance.IsExtensionOf<never, EmptyRecord>>;
// type EmptyClass_Extends_EmptyRecord = Assert.True<Inheritance.IsExtensionOf<EmptyClass, EmptyRecord>>;

// // Does not extend object
// type String_Extends_Object = Assert.False<Inheritance.IsExtensionOf<'foo', object>>;
// type True_Extends_Object = Assert.False<Inheritance.IsExtensionOf<true, object>>;
// type False_Extends_Object = Assert.False<Inheritance.IsExtensionOf<false, object>>;
// type Number_Extends_Object = Assert.False<Inheritance.IsExtensionOf<42, object>>;
// type BigInt_Extends_Object = Assert.False<Inheritance.IsExtensionOf<42n, object>>;
// type Symbol_Extends_Object = Assert.False<Inheritance.IsExtensionOf<typeof symbol, object>>;
// type Null_Extends_Object = Assert.False<Inheritance.IsExtensionOf<null, object>>;
// type Undefined_Extends_Object = Assert.False<Inheritance.IsExtensionOf<undefined, object>>;

// // Does extend object
// type EmptyFunction_Extends_Object = Assert.True<Inheritance.IsExtensionOf<() => {}, object>>;
// type PopulatedFunction_Extends_Object = Assert.True<Inheritance.IsExtensionOf<() => { foo: 'bar', }, object>>;
// type PopulatedArray_Extends_Object = Assert.True<Inheritance.IsExtensionOf<[1, 2, 3], object>>;
// type EmptyArray_Extends_Object = Assert.True<Inheritance.IsExtensionOf<[], object>>;
// type PopulatedObject_Extends_Object = Assert.True<Inheritance.IsExtensionOf<{ foo: 'bar', }, object>>;
// type EmptyRecord_Extends_Object = Assert.True<Inheritance.IsExtensionOf<EmptyRecord, object>>;
// type Never_Extends_Object = Assert.True<Inheritance.IsExtensionOf<never, object>>;
// type EmptyClass_Extends_Object = Assert.True<Inheritance.IsExtensionOf<EmptyClass, object>>;

// // Does not extend Empty
// type String_Extends_Empty = Assert.False<Inheritance.IsExtensionOf<'foo', Empty>>;
// type True_Extends_Empty = Assert.False<Inheritance.IsExtensionOf<true, Empty>>;
// type False_Extends_Empty = Assert.False<Inheritance.IsExtensionOf<false, Empty>>;
// type Number_Extends_Empty = Assert.False<Inheritance.IsExtensionOf<42, Empty>>;
// type BigInt_Extends_Empty = Assert.False<Inheritance.IsExtensionOf<42n, Empty>>;
// type Symbol_Extends_Empty = Assert.False<Inheritance.IsExtensionOf<typeof symbol, Empty>>;
// type Null_Extends_Empty = Assert.False<Inheritance.IsExtensionOf<null, Empty>>;
// type Undefined_Extends_Empty = Assert.False<Inheritance.IsExtensionOf<undefined, Empty>>;
// type EmptyFunction_Extends_Empty = Assert.False<Inheritance.IsExtensionOf<() => {}, Empty>>;
// type PopulatedFunction_Extends_Empty = Assert.False<Inheritance.IsExtensionOf<() => { foo: 'bar', }, Empty>>;
// type PopulatedArray_Extends_Empty = Assert.False<Inheritance.IsExtensionOf<[1, 2, 3], Empty>>;
// type EmptyArray_Extends_Empty = Assert.False<Inheritance.IsExtensionOf<[], Empty>>;
// type PopulatedObject_Extends_Empty = Assert.False<Inheritance.IsExtensionOf<{ foo: 'bar', }, Empty>>;
// type EmptyClass_Extends_Empty = Assert.False<Inheritance.IsExtensionOf<EmptyClass, Empty>>;

// // Does Extend Empty
// type EmptyRecord_Extends_Empty = Assert.True<Inheritance.IsExtensionOf<EmptyRecord, Empty>>;
// type Never_Extends_Empty = Assert.True<Inheritance.IsExtensionOf<never, Empty>>;

// // Does not extend Any
// type String_Extends_Any = Assert.False<Inheritance.IsExtensionOf<'foo', Any>>;
// type True_Extends_Any = Assert.False<Inheritance.IsExtensionOf<true, Any>>;
// type False_Extends_Any = Assert.False<Inheritance.IsExtensionOf<false, Any>>;
// type Number_Extends_Any = Assert.False<Inheritance.IsExtensionOf<42, Any>>;
// type BigInt_Extends_Any = Assert.False<Inheritance.IsExtensionOf<42n, Any>>;
// type Symbol_Extends_Any = Assert.False<Inheritance.IsExtensionOf<typeof symbol, Any>>;
// type Null_Extends_Any = Assert.False<Inheritance.IsExtensionOf<null, Any>>;
// type Undefined_Extends_Any = Assert.False<Inheritance.IsExtensionOf<undefined, Any>>;
// type EmptyFunction_Extends_Any = Assert.False<Inheritance.IsExtensionOf<() => {}, Any>>;
// type PopulatedFunction_Extends_Any = Assert.False<Inheritance.IsExtensionOf<() => { foo: 'bar', }, Any>>;
// type PopulatedArray_Extends_Any = Assert.False<Inheritance.IsExtensionOf<[1, 2, 3], Any>>;
// type EmptyArray_Extends_Any = Assert.False<Inheritance.IsExtensionOf<[], Any>>;
// type EmptyClass_Extends_Any = Assert.False<Inheritance.IsExtensionOf<EmptyClass, Any>>;

// // Does extend Any
// type PopulatedObject_Extends_Any = Assert.True<Inheritance.IsExtensionOf<{ foo: 'bar', }, Any>>;
// type EmptyRecord_Extends_Any = Assert.True<Inheritance.IsExtensionOf<EmptyRecord, Any>>;
// type Never_Extends_Any = Assert.True<Inheritance.IsExtensionOf<never, Any>>;

// export type IsEmpty<T> = Inheritance.IsEqual<T, Empty>;

// export type IsRecord<T> = Inheritance.IsEqual<T, Any>;

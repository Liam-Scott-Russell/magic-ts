import { type Struct } from "..";

/**
 * Represents a strictly empty struct.
 *
 * See the assignment table on {@link Any} for the list of types that are considered empty.
 *
 * Note that you cannot reliably extend this type (except with `{}`).
 */
type Struct__Empty = Record<Struct.KeysAllowed, never>;

/**
 * Represents any unknown struct.
 *
 * Use this type instead of `{}` or `object` to avoid edge cases.
 *
 * This table outlines which types can be assigned to the different ways of expressing objects.
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
 * // type EmptyStruct = typeof {};
 *
 * // type Null_Extends_EmptyStruct              = Assert.IsFalse<Inheritance.IsExtensionOf<null                 , EmptyStruct>>;
 * // type Undefined_Extends_EmptyStruct         = Assert.IsFalse<Inheritance.IsExtensionOf<undefined            , EmptyStruct>>;
 * ```
 * @example Types that do not extend `{}`
 * ```typescript
 * // type EmptyStruct = typeof {};
 * // const symbol = Symbol("foo");
 *
 * // type String_Extends_EmptyStruct            = Assert.IsTrue<Inheritance.IsExtensionOf<'foo'                 , EmptyStruct>>;
 * // type True_Extends_EmptyStruct              = Assert.IsTrue<Inheritance.IsExtensionOf<true                  , EmptyStruct>>;
 * // type False_Extends_EmptyStruct             = Assert.IsTrue<Inheritance.IsExtensionOf<false                 , EmptyStruct>>;
 * // type Number_Extends_EmptyStruct            = Assert.IsTrue<Inheritance.IsExtensionOf<42                    , EmptyStruct>>;
 * // type BigInt_Extends_EmptyStruct            = Assert.IsTrue<Inheritance.IsExtensionOf<42n                   , EmptyStruct>>;
 * // type Symbol_Extends_EmptyStruct            = Assert.IsTrue<Inheritance.IsExtensionOf<typeof symbol         , EmptyStruct>>;
 * // type EmptyFunction_Extends_EmptyStruct     = Assert.IsTrue<Inheritance.IsExtensionOf<()  => {}             , EmptyStruct>>;
 * // type PopulatedFunction_Extends_EmptyStruct = Assert.IsTrue<Inheritance.IsExtensionOf<()  => { foo: 'bar' } , EmptyStruct>>;
 * // type PopulatedArray_Extends_EmptyStruct    = Assert.IsTrue<Inheritance.IsExtensionOf<[1, 2, 3]             , EmptyStruct>>;
 * // type EmptyArray_Extends_EmptyStruct        = Assert.IsTrue<Inheritance.IsExtensionOf<[]                    , EmptyStruct>>;
 * // type PopulatedObject_Extends_EmptyStruct   = Assert.IsTrue<Inheritance.IsExtensionOf<{ foo: 'bar' }        , EmptyStruct>>;
 * // type EmptyStruct_Extends_EmptyStruct       = Assert.IsTrue<Inheritance.IsExtensionOf<EmptyStruct           , EmptyStruct>>;
 * // type Never_Extends_EmptyStruct             = Assert.IsTrue<Inheritance.IsExtensionOf<never                 , EmptyStruct>>;
 * // type EmptyClass_Extends_EmptyStruct        = Assert.IsTrue<Inheritance.IsExtensionOf<EmptyClass            , EmptyStruct>>;
 * ```
 * @example Types that extend `object`
 * ```typescript
 * // const symbol = Symbol("foo");
 *
 * // type String_Extends_Object                 = Assert.IsFalse<Inheritance.IsExtensionOf<'foo'                , object>>;
 * // type True_Extends_Object                   = Assert.IsFalse<Inheritance.IsExtensionOf<true                 , object>>;
 * // type False_Extends_Object                  = Assert.IsFalse<Inheritance.IsExtensionOf<false                , object>>;
 * // type Number_Extends_Object                 = Assert.IsFalse<Inheritance.IsExtensionOf<42                   , object>>;
 * // type BigInt_Extends_Object                 = Assert.IsFalse<Inheritance.IsExtensionOf<42n                  , object>>;
 * // type Symbol_Extends_Object                 = Assert.IsFalse<Inheritance.IsExtensionOf<typeof symbol        , object>>;
 * // type Null_Extends_Object                   = Assert.IsFalse<Inheritance.IsExtensionOf<null                 , object>>;
 * // type Undefined_Extends_Object              = Assert.IsFalse<Inheritance.IsExtensionOf<undefined            , object>>;
 * ```
 * @example Types that do not extend `object`
 * ```typescript
 * // type EmptyStruct = typeof {};
 *
 * // type EmptyFunction_Extends_Object          = Assert.IsTrue<Inheritance.IsExtensionOf<()  => {}             , object>>;
 * // type PopulatedFunction_Extends_Object      = Assert.IsTrue<Inheritance.IsExtensionOf<()  => { foo: 'bar' } , object>>;
 * // type PopulatedArray_Extends_Object         = Assert.IsTrue<Inheritance.IsExtensionOf<[1, 2, 3]             , object>>;
 * // type EmptyArray_Extends_Object             = Assert.IsTrue<Inheritance.IsExtensionOf<[]                    , object>>;
 * // type PopulatedObject_Extends_Object        = Assert.IsTrue<Inheritance.IsExtensionOf<{ foo: 'bar' }        , object>>;
 * // type EmptyStruct_Extends_Object            = Assert.IsTrue<Inheritance.IsExtensionOf<EmptyStruct           , object>>;
 * // type Never_Extends_Object                  = Assert.IsTrue<Inheritance.IsExtensionOf<never                 , object>>;
 * // type EmptyClass_Extends_Object             = Assert.IsTrue<Inheritance.IsExtensionOf<EmptyClass            , object>>;
 * ```
 * @example Types that extend {@link Empty}.
 * ```typescript
 * // type String_Extends_Empty                  = Assert.IsFalse<Inheritance.IsExtensionOf<'foo'                , Empty>>;
 * // type True_Extends_Empty                    = Assert.IsFalse<Inheritance.IsExtensionOf<true                 , Empty>>;
 * // type False_Extends_Empty                   = Assert.IsFalse<Inheritance.IsExtensionOf<false                , Empty>>;
 * // type Number_Extends_Empty                  = Assert.IsFalse<Inheritance.IsExtensionOf<42                   , Empty>>;
 * // type BigInt_Extends_Empty                  = Assert.IsFalse<Inheritance.IsExtensionOf<42n                  , Empty>>;
 * // type Symbol_Extends_Empty                  = Assert.IsFalse<Inheritance.IsExtensionOf<typeof symbol        , Empty>>;
 * // type Null_Extends_Empty                    = Assert.IsFalse<Inheritance.IsExtensionOf<null                 , Empty>>;
 * // type Undefined_Extends_Empty               = Assert.IsFalse<Inheritance.IsExtensionOf<undefined            , Empty>>;
 * // type EmptyFunction_Extends_Empty           = Assert.IsFalse<Inheritance.IsExtensionOf<() => {}             , Empty>>;
 * // type PopulatedFunction_Extends_Empty       = Assert.IsFalse<Inheritance.IsExtensionOf<() => { foo: 'bar' } , Empty>>;
 * // type PopulatedArray_Extends_Empty          = Assert.IsFalse<Inheritance.IsExtensionOf<[1, 2, 3]            , Empty>>;
 * // type EmptyArray_Extends_Empty              = Assert.IsFalse<Inheritance.IsExtensionOf<[]                   , Empty>>;
 * // type PopulatedObject_Extends_Empty         = Assert.IsFalse<Inheritance.IsExtensionOf<{ foo: 'bar' }       , Empty>>;
 * // type EmptyClass_Extends_Empty              = Assert.IsFalse<Inheritance.IsExtensionOf<EmptyClass           , Empty>>;
 * ```
 * @example Types that do not extend {@link Empty}.
 * ```typescript
 * // type EmptyStruct_Extends_Empty             = Assert.IsTrue<Inheritance.IsExtensionOf<EmptyStruct           , Empty>>;
 * // type Never_Extends_Empty                   = Assert.IsTrue<Inheritance.IsExtensionOf<never                 , Empty>>;
 * ```
 * @example Types that extend {@link Any}.
 * ```typescript
 * // type String_Extends_Any                    = Assert.IsFalse<Inheritance.IsExtensionOf<'foo'                , Any>>;
 * // type True_Extends_Any                      = Assert.IsFalse<Inheritance.IsExtensionOf<true                 , Any>>;
 * // type False_Extends_Any                     = Assert.IsFalse<Inheritance.IsExtensionOf<false                , Any>>;
 * // type Number_Extends_Any                    = Assert.IsFalse<Inheritance.IsExtensionOf<42                   , Any>>;
 * // type BigInt_Extends_Any                    = Assert.IsFalse<Inheritance.IsExtensionOf<42n                  , Any>>;
 * // type Symbol_Extends_Any                    = Assert.IsFalse<Inheritance.IsExtensionOf<typeof symbol        , Any>>;
 * // type Null_Extends_Any                      = Assert.IsFalse<Inheritance.IsExtensionOf<null                 , Any>>;
 * // type Undefined_Extends_Any                 = Assert.IsFalse<Inheritance.IsExtensionOf<undefined            , Any>>;
 * // type EmptyFunction_Extends_Any             = Assert.IsFalse<Inheritance.IsExtensionOf<() => {}             , Any>>;
 * // type PopulatedFunction_Extends_Any         = Assert.IsFalse<Inheritance.IsExtensionOf<() => { foo: 'bar' } , Any>>;
 * // type PopulatedArray_Extends_Any            = Assert.IsFalse<Inheritance.IsExtensionOf<[1, 2, 3]            , Any>>;
 * // type EmptyArray_Extends_Any                = Assert.IsFalse<Inheritance.IsExtensionOf<[]                   , Any>>;
 * // type EmptyClass_Extends_Any                = Assert.IsFalse<Inheritance.IsExtensionOf<EmptyClass           , Any>>;
 * ```
 * @example Types that do not extend {@link Any}.
 * ```typescript
 * // type PopulatedObject_Extends_Any           = Assert.IsTrue<Inheritance.IsExtensionOf<{ foo: 'bar' }        , Any>>;
 * // type EmptyStruct_Extends_Any               = Assert.IsTrue<Inheritance.IsExtensionOf<EmptyStruct           , Any>>;
 * // type Never_Extends_Any                     = Assert.IsTrue<Inheritance.IsExtensionOf<never                 , Any>>;
 * ```
 */
type Struct__Any = {};

// type Any = Struct<string, unknown>;

// /**
//  * @example
//  * Name for example:
//  * ```typescript
//  * console.log("hello world")
//  * ```
//  */
// const symbol = Symbol('foo');
// const emptyStruct = {};
// type EmptyStruct = typeof emptyStruct;
// const emptyClass = class { }
// type EmptyClass = typeof emptyClass;

// // Does not extend {}
// type Null_Extends_EmptyStruct = Assert.IsFalse<Inheritance.IsExtensionOf<null, EmptyStruct>>;
// type Undefined_Extends_EmptyStruct = Assert.IsFalse<Inheritance.IsExtensionOf<undefined, EmptyStruct>>;

// // Does extend {}
// type String_Extends_EmptyStruct = Assert.IsTrue<Inheritance.IsExtensionOf<'foo', EmptyStruct>>;
// type True_Extends_EmptyStruct = Assert.IsTrue<Inheritance.IsExtensionOf<true, EmptyStruct>>;
// type False_Extends_EmptyStruct = Assert.IsTrue<Inheritance.IsExtensionOf<false, EmptyStruct>>;
// type Number_Extends_EmptyStruct = Assert.IsTrue<Inheritance.IsExtensionOf<42, EmptyStruct>>;
// type BigInt_Extends_EmptyStruct = Assert.IsTrue<Inheritance.IsExtensionOf<42n, EmptyStruct>>;
// type Symbol_Extends_EmptyStruct = Assert.IsTrue<Inheritance.IsExtensionOf<typeof symbol, EmptyStruct>>;
// type EmptyFunction_Extends_EmptyStruct = Assert.IsTrue<Inheritance.IsExtensionOf<() => {}, EmptyStruct>>;
// type PopulatedFunction_Extends_EmptyStruct = Assert.IsTrue<Inheritance.IsExtensionOf<() => { foo: 'bar', }, EmptyStruct>>;
// type PopulatedArray_Extends_EmptyStruct = Assert.IsTrue<Inheritance.IsExtensionOf<[1, 2, 3], EmptyStruct>>;
// type EmptyArray_Extends_EmptyStruct = Assert.IsTrue<Inheritance.IsExtensionOf<[], EmptyStruct>>;
// type PopulatedObject_Extends_EmptyStruct = Assert.IsTrue<Inheritance.IsExtensionOf<{ foo: 'bar', }, EmptyStruct>>;
// type EmptyStruct_Extends_EmptyStruct = Assert.IsTrue<Inheritance.IsExtensionOf<EmptyStruct, EmptyStruct>>;
// type Never_Extends_EmptyStruct = Assert.IsTrue<Inheritance.IsExtensionOf<never, EmptyStruct>>;
// type EmptyClass_Extends_EmptyStruct = Assert.IsTrue<Inheritance.IsExtensionOf<EmptyClass, EmptyStruct>>;

// // Does not extend object
// type String_Extends_Object = Assert.IsFalse<Inheritance.IsExtensionOf<'foo', object>>;
// type True_Extends_Object = Assert.IsFalse<Inheritance.IsExtensionOf<true, object>>;
// type False_Extends_Object = Assert.IsFalse<Inheritance.IsExtensionOf<false, object>>;
// type Number_Extends_Object = Assert.IsFalse<Inheritance.IsExtensionOf<42, object>>;
// type BigInt_Extends_Object = Assert.IsFalse<Inheritance.IsExtensionOf<42n, object>>;
// type Symbol_Extends_Object = Assert.IsFalse<Inheritance.IsExtensionOf<typeof symbol, object>>;
// type Null_Extends_Object = Assert.IsFalse<Inheritance.IsExtensionOf<null, object>>;
// type Undefined_Extends_Object = Assert.IsFalse<Inheritance.IsExtensionOf<undefined, object>>;

// // Does extend object
// type EmptyFunction_Extends_Object = Assert.IsTrue<Inheritance.IsExtensionOf<() => {}, object>>;
// type PopulatedFunction_Extends_Object = Assert.IsTrue<Inheritance.IsExtensionOf<() => { foo: 'bar', }, object>>;
// type PopulatedArray_Extends_Object = Assert.IsTrue<Inheritance.IsExtensionOf<[1, 2, 3], object>>;
// type EmptyArray_Extends_Object = Assert.IsTrue<Inheritance.IsExtensionOf<[], object>>;
// type PopulatedObject_Extends_Object = Assert.IsTrue<Inheritance.IsExtensionOf<{ foo: 'bar', }, object>>;
// type EmptyStruct_Extends_Object = Assert.IsTrue<Inheritance.IsExtensionOf<EmptyStruct, object>>;
// type Never_Extends_Object = Assert.IsTrue<Inheritance.IsExtensionOf<never, object>>;
// type EmptyClass_Extends_Object = Assert.IsTrue<Inheritance.IsExtensionOf<EmptyClass, object>>;

// // Does not extend Empty
// type String_Extends_Empty = Assert.IsFalse<Inheritance.IsExtensionOf<'foo', Empty>>;
// type True_Extends_Empty = Assert.IsFalse<Inheritance.IsExtensionOf<true, Empty>>;
// type False_Extends_Empty = Assert.IsFalse<Inheritance.IsExtensionOf<false, Empty>>;
// type Number_Extends_Empty = Assert.IsFalse<Inheritance.IsExtensionOf<42, Empty>>;
// type BigInt_Extends_Empty = Assert.IsFalse<Inheritance.IsExtensionOf<42n, Empty>>;
// type Symbol_Extends_Empty = Assert.IsFalse<Inheritance.IsExtensionOf<typeof symbol, Empty>>;
// type Null_Extends_Empty = Assert.IsFalse<Inheritance.IsExtensionOf<null, Empty>>;
// type Undefined_Extends_Empty = Assert.IsFalse<Inheritance.IsExtensionOf<undefined, Empty>>;
// type EmptyFunction_Extends_Empty = Assert.IsFalse<Inheritance.IsExtensionOf<() => {}, Empty>>;
// type PopulatedFunction_Extends_Empty = Assert.IsFalse<Inheritance.IsExtensionOf<() => { foo: 'bar', }, Empty>>;
// type PopulatedArray_Extends_Empty = Assert.IsFalse<Inheritance.IsExtensionOf<[1, 2, 3], Empty>>;
// type EmptyArray_Extends_Empty = Assert.IsFalse<Inheritance.IsExtensionOf<[], Empty>>;
// type PopulatedObject_Extends_Empty = Assert.IsFalse<Inheritance.IsExtensionOf<{ foo: 'bar', }, Empty>>;
// type EmptyClass_Extends_Empty = Assert.IsFalse<Inheritance.IsExtensionOf<EmptyClass, Empty>>;

// // Does Extend Empty
// type EmptyStruct_Extends_Empty = Assert.IsTrue<Inheritance.IsExtensionOf<EmptyStruct, Empty>>;
// type Never_Extends_Empty = Assert.IsTrue<Inheritance.IsExtensionOf<never, Empty>>;

// // Does not extend Any
// type String_Extends_Any = Assert.IsFalse<Inheritance.IsExtensionOf<'foo', Any>>;
// type True_Extends_Any = Assert.IsFalse<Inheritance.IsExtensionOf<true, Any>>;
// type False_Extends_Any = Assert.IsFalse<Inheritance.IsExtensionOf<false, Any>>;
// type Number_Extends_Any = Assert.IsFalse<Inheritance.IsExtensionOf<42, Any>>;
// type BigInt_Extends_Any = Assert.IsFalse<Inheritance.IsExtensionOf<42n, Any>>;
// type Symbol_Extends_Any = Assert.IsFalse<Inheritance.IsExtensionOf<typeof symbol, Any>>;
// type Null_Extends_Any = Assert.IsFalse<Inheritance.IsExtensionOf<null, Any>>;
// type Undefined_Extends_Any = Assert.IsFalse<Inheritance.IsExtensionOf<undefined, Any>>;
// type EmptyFunction_Extends_Any = Assert.IsFalse<Inheritance.IsExtensionOf<() => {}, Any>>;
// type PopulatedFunction_Extends_Any = Assert.IsFalse<Inheritance.IsExtensionOf<() => { foo: 'bar', }, Any>>;
// type PopulatedArray_Extends_Any = Assert.IsFalse<Inheritance.IsExtensionOf<[1, 2, 3], Any>>;
// type EmptyArray_Extends_Any = Assert.IsFalse<Inheritance.IsExtensionOf<[], Any>>;
// type EmptyClass_Extends_Any = Assert.IsFalse<Inheritance.IsExtensionOf<EmptyClass, Any>>;

// // Does extend Any
// type PopulatedObject_Extends_Any = Assert.IsTrue<Inheritance.IsExtensionOf<{ foo: 'bar', }, Any>>;
// type EmptyStruct_Extends_Any = Assert.IsTrue<Inheritance.IsExtensionOf<EmptyStruct, Any>>;
// type Never_Extends_Any = Assert.IsTrue<Inheritance.IsExtensionOf<never, Any>>;

// type IsEmpty<T> = Inheritance.IsEqual<T, Empty>;

// type IsStruct<T> = Inheritance.IsEqual<T, Any>;

export type { Struct__Any as Any,
Struct__Empty as Empty };

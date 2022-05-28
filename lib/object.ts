/**
 * Represents a strictly empty object.
 *
 * See the assignment table on {@link Any} for the list of types that are considered empty.
 *
 * Note that you cannot reliably extend this type (except with `{}`).
 */
export type Empty = Record<PropertyKeys, never>;

/**
 * The possible types that are allowed to index an Object.
 *
 * Equivalent to `keyof any`.
 */
export type PropertyKeys = number | string | symbol;

/**
 * Represents any unknown object.
 *
 * Use this type instead of `{}` or `object` to avoid edge cases.
 *
 * This table outlines which types can be assigned to the different ways of expressing objects.
 *
 * | Type | Example | `{}` | `object` | {@link Empty} | {@link Any} |
 * | ---- | ---- | ---- | ---- | ---- | ---- |
 * | String | `'foo'` | Yes | No | No | No |
 * | True | `true` | Yes | No | No | No |
 * | False | `false` | Yes | No | No | No |
 * | Number | `42` | Yes | No | No | No |
 * | Big Int | `42n` | Yes | No | No | No |
 * | Symbol | `Symbol('foo')` | Yes | No | No | No |
 * | Null | `null` | No | No | No | No |
 * | Undefined | `undefined` | No | No | No | No |
 * | Empty Function | `() => {}` | Yes | Yes | No | No |
 * | Populated Function | `() => { foo: 'bar' }` | Yes | Yes | No | No |
 * | Populated Array | `[1, 2, 3]` | Yes | Yes | No | No |
 * | Empty Array | `[]` | Yes | Yes | No | No |
 * | Populated Object | `{ foo: 'bar' }` | Yes | Yes | No | Yes |
 * | Empty Object | `{}` | Yes | Yes | Yes | Yes |
 *
 * @example Generating the table above. Will throw a compiler error when the types cannot be assigned.
 *
 * type TargetType = Any;
 * type Tester<TestingType extends TargetType> = TestingType;
 *
 * type testString = Tester<'foo'>;
 * type testTrue = Tester<true>;
 * type testFalse = Tester<false>;
 * type testNumber = Tester<42>;
 * type testBigInt = Tester<42n>;
 * const sym = Symbol('foo');
 * type testSymbol = Tester<typeof sym>;
 * type testNull = Tester<null>;
 * type testUndefined = Tester<undefined>;
 * type testEmptyFunction = Tester<() => {}>;
 * type testPopulatedFunction = Tester<() => { foo: 'bar', }>;
 * type testPopulatedArray = Tester<[1, 2, 3]>;
 * type testEmptyArray = Tester<[]>;
 * type testPopulatedObject = Tester<{ foo: 'bar', }>;
 * type testEmptyObject = Tester<{}>;
 */
export type Any = Record<PropertyKeys, unknown>;

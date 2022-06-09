import { type Exception, type Record } from "@magic-ts";

/**
 * Uniquely marks a type {@link T} using {@link Name} so that is distinct from other types {@link T}.
 *
 * Uses {@link Key} as the object key to brand the type, which defaults to `__brand`.
 *
 * @template T - The type to mark.
 * @template Name - The name to use for the type.
 * @template Key - The optional key to use for the brand. Defaults to `__brand`.
 * @example
 * type MyType = { a: string; b: number };
 *
 * // type SimpleBrandedType = {
 * //     a: string;
 * //     b: number;
 * //     __brand: "MyBrandedType";
 * // }
 * type SimpleBrandedType = Inspect<Brand<MyType, 'SimpleBrandedType'>>;
 *
 * //type CustomBrandedType = {
 * //     a: string;
 * //     b: number;
 * //     __CustomKey: "CustomBrandedType";
 * // }
 * type CustomBrandedType = Inspect<Brand<MyType, `CustomBrandedType`, `__CustomKey`>>;
 */
export type Brand<
  T extends Record.Any,
  Name extends string,
  Key extends string = "__brand"
> = T & {
  [K in Key]: Name;
};

export type Unbrand<
  T extends Record.Any,
  Key extends string = "__brand"
> = T extends Brand<infer U, infer _Name, Key> ? U : T;
export type UnBrand$<
  T extends Record.Any,
  Key extends string = "__brand"
> = T extends Brand<infer U, infer _Name, Key>
  ? U
  : Exception.Exception<`Type was not branded with Key ${Key}`, T>;

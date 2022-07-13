import { type Json } from "..";

export type Primitive = boolean | number | string | null;

export type Struct = { [key: string]: Json.Value };

export type List = Json.Value[];

/**
 * Any value that can be represented in JSON.
 *
 * Note that an `interface` cannot extend this type, due to limitations in the `interface` specification.
 * Convert all interfaces to `type`s using {@link Contract.ToType} first.
 *
 * @see https://tools.ietf.org/html/rfc7159
 * @see https://www.json.org/json-en.html
 */
export type Value = List | Primitive | Struct | null;

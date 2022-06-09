import { type Brand } from "@magic-ts";

/**
 * The key to use to brand a type's truthhood.
 */
export type TruthhoodBrandKey = "__truthhood";

/**
 * Strict truth.
 */
export type True = Brand.Brand<{}, "true", TruthhoodBrandKey>;

/**
 * Strict falsehood.
 */
export type False = Brand.Brand<{}, "false", TruthhoodBrandKey>;

/**
 * A boolean value.
 *
 * Either {@link True} or {@link False}.
 */
export type Any = False | True;

export type IsTrue<T> = T extends True ? True : False;

export type IsFalse<T> = T extends False ? True : False;

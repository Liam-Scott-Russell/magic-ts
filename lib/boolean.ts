import { type Brand } from '.';

/**
 * The key to use to brand a type's truthhood.
 */
export type TruthhoodBrandKey = `__truthhood`;

/**
 * Strict truth.
 */
export type True = Brand.New<{}, `true`, TruthhoodBrandKey>;

/**
 * Strict falsehood.
 */
export type False = Brand.New<{}, `false`, TruthhoodBrandKey>;

/**
 * A boolean value.
 *
 * Either {@link True} or {@link False}.
 */
export type Boolean = Brand.New<{}, `false` | `true`, TruthhoodBrandKey>;

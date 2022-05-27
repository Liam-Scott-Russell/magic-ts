import {
  type Brand,
} from './brand';

/**
 * The key to use to brand a type's truthhood.
 */
export type TruthhoodBrandKey = '__truthhood';

/**
 * Strict truth.
 */
export type True = Brand<{}, 'true', TruthhoodBrandKey>;

/**
 * Strict falsehood.
 */
export type False = Brand<{}, 'false', TruthhoodBrandKey>;

/**
 * A boolean value.
 *
 * Either {@link True} or {@link False}.
 */
export type Boolean = Brand<{}, 'false' | 'true', TruthhoodBrandKey>;

export type IsTrue<T> = T extends True ? True : False;

export type IsFalse<T> = T extends False ? True : False;

import {
  type Brand,
} from './brand';
import {
  type Object,
} from '.';

/**
 * The key to use to brand a type's truthhood.
 */
export type TruthhoodBrandKey = '__truthhood';

/**
 * Strict truth.
 */
export type True = Brand<Object.Any, 'true', TruthhoodBrandKey>;

/**
 * Strict falsehood.
 */
export type False = Brand<Object.Any, 'false', TruthhoodBrandKey>;

/**
 * A boolean value.
 *
 * Either {@link True} or {@link False}.
 */
export type Boolean = False | True;

export type IsTrue<T> = T extends True ? True : False;

export type IsFalse<T> = T extends False ? True : False;

import { type Boolean, type Conditional } from "..";

/**
 * Returns {@link Boolean.True} if {@link ExtendedType} extends {@link BaseType}, otherwise returns {@link Boolean.False}.
 *
 * This is a wrapper around Typescript's `ExtendedType extends BaseType ? true : false` statement.
 *
 * @template ExtendedType - Maybe the "child" type.
 * @template BaseType - Maybe the "base" type.
 * @returns - {@link Boolean.True} or {@link Boolean.False}
 * @example
 *
 * ```typescript
 * import { Assert, Inheritance } from "magic-ts"
 *
 * type A = { a: string };
 * type B = { b: number };
 * type Extension = { a: string, b: number, d: boolean };
 * type AorB = A | B;
 * type AandB = A & B;
 *
 * // A type is always an extension of itself
 * type A_Extends_A = Assert.True<Inheritance.IsExtensionOf<A, A>>;
 * type B_Extends_B = Assert.True<Inheritance.IsExtensionOf<B, B>>;
 * type Extension_Extends_Extension = Assert.True<Inheritance.IsExtensionOf<Extension, Extension>>;
 * type AorB_Extends_AorB = Assert.True<Inheritance.IsExtensionOf<AorB, AorB>>;
 * type AandB_Extends_AandB = Assert.True<Inheritance.IsExtensionOf<AandB, AandB>>;
 *
 * // Disjoint types are never an extension of each other
 * type A_Extends_B = Assert.False<Inheritance.IsExtensionOf<A, B>>
 * type B_Extends_A = Assert.False<Inheritance.IsExtensionOf<B, A>>
 *
 * // A larger type is always an extension of a smaller type
 * type Extension_Extends_A = Assert.True<Inheritance.IsExtensionOf<Extension, A>>
 * type Extension_Extends_B = Assert.True<Inheritance.IsExtensionOf<Extension, A>>
 *
 * // A smaller type is never an extension of a larger type
 * type A_Extends_Extension = Assert.False<Inheritance.IsExtensionOf<A, Extension>>
 * type B_Extends_Extension = Assert.False<Inheritance.IsExtensionOf<B, Extension>>
 *
 * // A union's members are always an extension of the union
 * type A_Extends_AorB = Assert.True<Inheritance.IsExtensionOf<A, AorB>>
 * type B_Extends_AorB = Assert.True<Inheritance.IsExtensionOf<B, AorB>>
 *
 * // A union is maybe an extension of its members (both True and False)
 * type AorB_Extends_A = Assert.True<Inheritance.IsEqual<Inheritance.IsExtensionOf<AorB, A>, Boolean.Any>>
 * type AorB_Extends_B = Assert.True<Inheritance.IsEqual<Inheritance.IsExtensionOf<AorB, B>, Boolean.Any>>
 *
 * // A union is never an extension of the intersection of its members
 * type AorB_Extends_Intersection = Assert.False<Inheritance.IsExtensionOf<AorB, AandB>>
 *
 * // An intersection of a union's members are always an extension of the union
 * type AandB_Extends_AorB = Assert.True<Inheritance.IsExtensionOf<AandB, AorB>>
 *
 * // A union of smaller types is never an extension of a larger type
 * type AorB_Extends_Extension = Assert.False<Inheritance.IsExtensionOf<AorB, Extension>>
 *
 * // A larger type is always an extension of a union of smaller types
 * type Extension_Extends_AorB = Assert.True<Inheritance.IsExtensionOf<Extension, AorB>>
 * ```
 */
export type IsExtensionOf<ExtendedType, BaseType> =
  ExtendedType extends BaseType ? Boolean.True : Boolean.False;

/**
 * A strict version of {@link IsExtensionOf} that ensures that strictly either {@link Boolean.True} or {@link Boolean.False} are returned, but not both.
 *
 * This is important for when checking whether a union extends a particular member.
 * Typescript will attempt to keep the type as wide as possible, and return {@link Boolean.Any}.
 * This stricter version will return {@link Boolean.False} in all situations where {@link IsExtensionOf} would return {@link Boolean.Any}.
 *
 * @template ExtendedType - Maybe the larger type.
 * @template BaseType - Maybe the smaller type.
 * @example
 * ```typescript
 * import { Assert, Inheritance } from "magic-ts";
 *
 * type A = { a: string };
 * type B = { b: number };
 * type AorB = A | B;
 *
 * // The unstrict version returns Boolean.True | Boolean.False
 * type AorB_Extends_A = Assert.True<Inheritance.IsEqual<Inheritance.IsExtensionOf<AorB, A>, Boolean.Any>>
 *
 * // The strict version returns Boolean.False
 * type AorB_StrictlyExtends_A = Assert.False<Inheritance.IsExtensionOfStrict<AorB, A>>
 *
 * ```
 *
 * ## An equivalent function
 *
 * ```typescript
 * function IsExtensionOfString(ExtendedType: any, BaseType: any): Boolean {
 *     const unstrict = ExtendedType extends BaseType ? true : false;
 *     return unstrict === true;
 * }
 * ```
 */
export type IsExtensionOfStrict<ExtendedType, BaseType> = IsEqual<
  IsExtensionOf<ExtendedType, BaseType>,
  Boolean.True
>;

/**
 * Returns {@link Boolean.True} if {@link MaybeSubType} is a sub type of {@link MaybeSuperType}, otherwise returns {@link Boolean.False}.
 *
 * A "sub type" means that {@link MaybeSubType} does not extend {@link MaybeSuperType}, and {@link MaybeSuperType} does extend {@link MaybeSubType}.
 *
 * So {@link MaybeSubType} will have strictly fewer fields than {@link MaybeSuperType}, and is a strict subset.
 *
 * The opposite of {@link IsSuperTypeOf}.
 *
 * @template MaybeSubType - Maybe the "sub" type.
 * @template MaybeSuperType - Maybe the "super" type.
 * @template OnTrue - Type to return if the expression is true. Defaults to {@link Boolean.True}.
 * @template OnFalse - Type to return if the expression is false. Defaults to {@link Boolean.False}.
 * @returns - {@link Boolean.True} or {@link Boolean.False} by default, overridden by {@link OnTrue} or {@link OnFalse}.
 * @example
 * ```typescript
 * import { Inheritance, Assert } from "magic-ts";
 *
 * type A = { a: string };
 * type B = { b: number };
 * type Extension = { a: string, b: number, d: boolean };
 * type AorB = A | B;
 * type AandB = A & B;
 *
 * // A type is never a sub type of itself
 * type A_SubTypes_A = Assert.False<IsSubTypeOf<A, A>>;
 * type B_SubTypes_B = Assert.False<IsSubTypeOf<B, B>>;
 * type Extension_SubTypes_Extension = Assert.False<IsSubTypeOf<Extension, Extension>>;
 * type AorB_SubTypes_AorB = Assert.False<IsSubTypeOf<AorB, AorB>>;
 * type AandB_SubTypes_AandB = Assert.False<IsSubTypeOf<AandB, AandB>>;
 *
 * // Disjoint types are never a sub type of each other
 * type A_SubTypes_B = Assert.False<IsSubTypeOf<A, B>>
 * type B_SubTypes_A = Assert.False<IsSubTypeOf<B, A>>
 *
 * // A larger type is never a sub type of a smaller type
 * type Extension_SubTypes_A = Assert.False<IsSubTypeOf<Extension, A>>
 * type Extension_SubTypes_B = Assert.False<IsSubTypeOf<Extension, A>>
 *
 * // A smaller type is always a sub type of a larger type
 * type A_SubTypes_Extension = Assert.True<IsSubTypeOf<A, Extension>>
 * type B_SubTypes_Extension = Assert.True<IsSubTypeOf<B, Extension>>
 *
 * // A union's members are always a subtype of the union
 * type A_SubTypes_AorB = Assert.True<IsSubTypeOf<A, AorB>>
 * type B_SubTypes_AorB = Assert.True<IsSubTypeOf<B, AorB>>
 *
 * // A union is never a sub type of its members
 * type AorB_SubTypes_A = Assert.False<IsSubTypeOf<AorB, A>>
 * type AorB_SubTypes_B = Assert.False<IsSubTypeOf<AorB, B>>
 *
 * // A union is always a sub type of the intersection of its members
 * type Extension_Subtypes_Intersection = Assert.True<IsSubTypeOf<AorB, AandB>>
 *
 * // An intersection of a union's members are never a sub type of the union
 * type AandB_Subtypes_AorB = Assert.False<IsSubTypeOf<AandB, AorB>>
 *
 * // A union of smaller types is always a subtype of a larger type
 * type AorB_Subtypes_Extension = Assert.True<IsSubTypeOf<AorB, Extension>>
 *
 * // A larger type is never a subtype for a union of smaller types
 * type Extension_SubTypes_AorB = Assert.False<IsSubTypeOf<Extension, AorB>>
 * ```
 */
export type IsSubTypeOf<
  MaybeSubType,
  MaybeSuperType,
  OnTrue = Boolean.True,
  OnFalse = Boolean.False
> = Conditional.And<
  Conditional.Not<IsExtensionOf<MaybeSubType, MaybeSuperType>>,
  IsExtensionOf<MaybeSuperType, MaybeSubType>,
  OnTrue,
  OnFalse
>;

/**
 * Returns {@link Boolean.True} if {@link MaybeSuperType} is a super type of {@link MaybeSubType}, otherwise returns {@link Boolean.False}.
 *
 * A "super type" means that {@link MaybeSuperType} does extend {@link MaybeSubType}, and {@link MaybeSubType} does not extend {@link MaybeSuperType}.
 *
 * So {@link MaybeSuperType} will have strictly more fields than {@link MaybeSubType}, and is a strict superset.
 *
 * The opposite of {@link IsSubTypeOf}.
 *
 * @template MaybeSuperType - Maybe the "super" type.
 * @template MaybeSubType - Maybe the "sub" type.
 * @template OnTrue - Type to return if the expression is true. Defaults to {@link Boolean.True}.
 * @template OnFalse - Type to return if the expression is false. Defaults to {@link Boolean.False}.
 * @returns - {@link Boolean.True} or {@link Boolean.False}
 */
export type IsSuperTypeOf<
  MaybeSuperType,
  MaybeSubType,
  OnTrue = Boolean.True,
  OnFalse = Boolean.False
> = Conditional.And<
  Conditional.Not<IsExtensionOf<MaybeSuperType, MaybeSubType>>,
  IsExtensionOf<MaybeSubType, MaybeSuperType>,
  OnTrue,
  OnFalse
>;

/**
 * Returns {@link OnTrue} if {@link T} exactly matches {@link U}, otherwise returns {@link OnFalse}.
 *
 * {@link OnTrue} and {@link OnFalse} are optional, and can be omitted if not needed.
 *
 * Specifying {@link OnTrue} and {@link OnFalse} is useful for mapping between types, and can replace the following common snippet:
 *
 * @example <caption>You don't need `If` and `Equals` if you're mapping between types:</caption>
 *
 * type TypeGuard = If<Equals<T, U>, T, Exception<'T and U do not match'>>
 * type SimpleTypeGuard = Equals<T, U, T, Exception<'T and U do not match'>>
 * @template T The type to check.
 * @template U The type to check against.
 * @template OnTrue The type to return if {@link T} exactly matches {@link U}. Defaults to {@link Boolean.True}.
 * @template OnFalse The type to return if {@link T} does not exactly match {@link U}. Defaults to {@link Boolean.False}.
 */
export type IsEqual<T, U, OnTrue = Boolean.True, OnFalse = Boolean.False> = (<
  G
>() => G extends T ? 1 : 2) extends <G>() => G extends U ? 1 : 2
  ? OnTrue
  : OnFalse;

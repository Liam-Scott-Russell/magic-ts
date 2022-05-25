/**
 * Checks if {@link T1} and {@link T2} are exactly equal, and if they are, returns {@link IfYes}, otherwise returns {@link IfNo}.
 *
 * @template T1 - The first type to check.
 * @template T2 - The second type to check.
 * @template IfYes - The type to return if the two types are equal.
 * @template IfNo - The type to return if the two types are not equal.
 */
export type IfEqualElse<T1, T2, IfYes = unknown, IfNo = never> = (<U1>() => U1 extends T1 ? 1 : 2) extends <U2>() => U2 extends T2 ? 1 : 2
  ? IfYes
  : IfNo;

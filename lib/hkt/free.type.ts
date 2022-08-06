export type Constrain<Constraint, T1> = T1 extends Constraint ? T1 : never;

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface Free1<T1> {
  Identity: T1;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface Free2<T1, T2> {
  Apply1: Apply1<Constrain<Operation1, T1>, T2>;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface Free3<T1, T2, T3> {
  Apply2: Apply2<Constrain<Operation2, T1>, T2, T3>;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface Free4<T1, T2, T3, T4> {
  Apply3: Apply3<Constrain<Operation3, T1>, T2, T3, T4>;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface Free5<T1, T2, T3, T4, T5> {
  Apply4: Apply4<Constrain<Operation4, T1>, T2, T3, T4, T5>;
}

export type Operation1 = keyof Free1<never>;
export type Operation2 = keyof Free2<never, never>;
export type Operation3 = keyof Free3<never, never, never>;
export type Operation4 = keyof Free4<never, never, never, never>;
export type Operation5 = keyof Free5<never, never, never, never, never>;

export type Apply1<TOperation extends Operation1, T1> = Free1<T1>[TOperation];
export type Apply2<TOperation extends Operation2, T1, T2> = Free2<
  T1,
  T2
>[TOperation];
export type Apply3<TOperation extends Operation3, T1, T2, T3> = Free3<
  T1,
  T2,
  T3
>[TOperation];
export type Apply4<TOperation extends Operation4, T1, T2, T3, T4> = Free4<
  T1,
  T2,
  T3,
  T4
>[TOperation];
export type Apply5<TOperation extends Operation5, T1, T2, T3, T4, T5> = Free5<
  T1,
  T2,
  T3,
  T4,
  T5
>[TOperation];

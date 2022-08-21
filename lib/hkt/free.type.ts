import { type Contract, type HKT } from "..";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
interface Free1<T1> {
  Identity: T1;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
interface Free2<T1, T2> {
  Apply1: HKT.Apply1<Contract.Constrain<HKT.Operation1, T1>, T2>;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
interface Free3<T1, T2, T3> {
  Apply2: HKT.Apply2<Contract.Constrain<HKT.Operation2, T1>, T2, T3>;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
interface Free4<T1, T2, T3, T4> {
  Apply3: HKT.Apply3<Contract.Constrain<HKT.Operation3, T1>, T2, T3, T4>;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
interface Free5<T1, T2, T3, T4, T5> {
  Apply4: HKT.Apply4<Contract.Constrain<HKT.Operation4, T1>, T2, T3, T4, T5>;
}

export type { Free1,
Free2,
Free3,
Free4,
Free5 };

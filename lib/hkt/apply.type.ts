import { type HKT } from "..";

type HKT__Apply1<
  TOperation extends HKT.Operation1,
  T1
> = HKT.Free1<T1>[TOperation];
type HKT__Apply2<TOperation extends HKT.Operation2, T1, T2> = HKT.Free2<
  T1,
  T2
>[TOperation];
type HKT__Apply3<TOperation extends HKT.Operation3, T1, T2, T3> = HKT.Free3<
  T1,
  T2,
  T3
>[TOperation];
type HKT__Apply4<TOperation extends HKT.Operation4, T1, T2, T3, T4> = HKT.Free4<
  T1,
  T2,
  T3,
  T4
>[TOperation];
type HKT__Apply5<
  TOperation extends HKT.Operation5,
  T1,
  T2,
  T3,
  T4,
  T5
> = HKT.Free5<T1, T2, T3, T4, T5>[TOperation];

export type {
  HKT__Apply1 as Apply1,
  HKT__Apply2 as Apply2,
  HKT__Apply3 as Apply3,
  HKT__Apply4 as Apply4,
  HKT__Apply5 as Apply5,
};

import { type HKT } from "..";

type HKT__Operation1 = keyof HKT.Free1<never>;
type HKT__Operation2 = keyof HKT.Free2<never, never>;
type HKT__Operation3 = keyof HKT.Free3<never, never, never>;
type HKT__Operation4 = keyof HKT.Free4<never, never, never, never>;
type HKT__Operation5 = keyof HKT.Free5<never, never, never, never, never>;

export type {
  HKT__Operation1 as Operation1,
  HKT__Operation2 as Operation2,
  HKT__Operation3 as Operation3,
  HKT__Operation4 as Operation4,
  HKT__Operation5 as Operation5,
};

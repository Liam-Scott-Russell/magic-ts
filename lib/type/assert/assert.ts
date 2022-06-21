import { type Exception, type Boolean } from "..";

export type True<T extends Boolean.True> = T;

export type False<T extends Boolean.False> = T;

export type Assert$<T> = T extends Boolean.True
  ? T
  : Exception.Exception<"Truth assertion failed", T>;

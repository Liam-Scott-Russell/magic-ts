import { type Exception, type Boolean } from "..";

export type Assert<T extends Boolean.True> = T;

export type Assert$<T> = T extends Boolean.True
  ? T
  : Exception.Exception<"Truth assertion failed", T>;

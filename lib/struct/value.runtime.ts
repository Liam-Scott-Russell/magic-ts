import { type Struct } from "..";

/**
 * Given a {@struct}, remove all keys not contained in {@link keys} and return this new sub-struct.
 *
 * The runtime equivalent to {@link Pick | Pick<Struct, Keys>}.
 *
 * @param struct The struct to pick from.
 * @param keys An array of keys to pick from.
 * @returns A new struct with only the keys in {@link keys} and their values.
 */
export function pick<TStruct extends Struct.Any, TKeys extends keyof TStruct>(
  struct: TStruct,
  ...keys: TKeys[]
): Pick<TStruct, TKeys> {
  const subStruct = {} as Pick<TStruct, TKeys>;
  for (const key of keys) subStruct[key] = struct[key];
  return subStruct;
}

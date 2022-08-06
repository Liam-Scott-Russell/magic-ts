import { type Struct } from "..";

/**
 *
 * @param struct The struct to get the keys from.
 * @returns The keys of the struct.
 */
export function keysOf<TStruct extends Struct.Any>(
  struct: TStruct
): Array<Struct.KeysOf<TStruct>> {
  return Object.keys(struct) as Array<Struct.KeysOf<TStruct>>;
}

import { type Record } from '../..';

/**
 *
 * @param record
 * @returns The keys of the record.
 */
export function keysOf<TRecord extends Record.Any>(
    record: Record.Any
): Array<Record.KeysOf<TRecord>> {
    return Object.keys(record) as Array<Record.KeysOf<TRecord>>;
}

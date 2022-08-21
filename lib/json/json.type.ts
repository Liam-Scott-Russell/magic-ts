import { type Contract, type Inheritance, type Struct, type Json } from "..";

type Json__Primitive = boolean | number | string | null;

type Json__List = Json.Value[];

/**
 * A JSON object.
 *
 * Unlike {@link Json.Struct$}, this type does not throw an {@link}
 * This means that this type can be used as `type TypeName<TGeneric extends Struct$<TGeneric>>` to guarantee that `TGeneric` is a JSON object.
 *
 * @template T - Optionally, a type to convert to JSON.
 */
type Json__Struct<T = Contract.Type> = {
  [Key in keyof T]: Inheritance.IsExtensionOf<
    Key,
    String,
    Inheritance.IsExtensionOf<
      T[Key],
      Json.Value<T[Key]>,
      Struct.GetValue<T, Key>,
      never
    >,
    never
  >;
};

type Json__Value<T = Contract.Type> =
  | Array<Json.Value<T>>
  | Json.Primitive
  | Json.Struct<T>
  | null;

export type {
  Json__Primitive as Primitive,
  Json__List as List,
  Json__Struct as Struct,
  Json__Value as Value,
};

// TESTING
// type TUser = {
//   age: number;
//   isAdmin: boolean;
//   name: string;
// };

// type TypeIsJsonValue = Assert.IsJsonValue<TUser>;
// type TypeIsJsonStruct = Assert.IsJsonStruct<TUser>;

// type IUser = {
//   age: number;
//   isAdmin: boolean;
//   name: string;
// };

// type InterfaceIsJsonValue = Assert.IsJsonValue<IUser>;
// type InterfaceIsJsonStruct = Assert.IsJsonStruct<IUser>;

// class CUser implements IUser {
//   public name!: string;

//   public age!: number;

//   public isAdmin!: boolean;
// }

// type ClassIsJsonValue = Assert.IsJsonValue<CUser>;
// type ClassIsJsonStruct = Assert.IsJsonStruct<CUser>;

// class CUserNonJson implements IUser {
//   public name!: string;

//   public age!: number;

//   public isAdmin!: boolean;

//   public greet(other: IUser): string {
//     return `Hello, ${other.name}`;
//   }

//   public 1: "one";
// }

// type ClassIsNotJsonValue = Assert.IsFalse<
//   Inheritance.IsExtensionOf<CUserNonJson, Json.Value$<CUserNonJson>>
// >;
// type ClassIsNotJsonStruct = Assert.IsFalse<
//   Inheritance.IsExtensionOf<CUserNonJson, Json.Struct$<CUserNonJson>>
// >;

// type ToArray<T> = T[];

// type FromArray<T extends any[]> = T[number];

// type IsArray<T> = T extends Array<infer _U> ? true : false;

// type Free1<T1> = {
//   FromArray: FromArray<ConstrainGeneric1<any[], T1>>;
//   IsArray: IsArray<T1>;
//   ToArray: ToArray<T1>;
//   Unbrand: Brand.Unbrand<T1>;
// };

// type Operation1 = keyof Free1<never>;

// type ConstrainGeneric1<Constraint, T> = T extends Constraint ? T : never;

// type Map1<Operation extends Operation1, T> = Free1<T>[Operation];

// type Foreach1<Operation extends Operation1, T extends Tuple.AnyTuple> = Free1<
//   T[number]
// >[Operation];

// type Free2<T1, T2> = {
//   IsEqual: Inheritance.IsEqual<T1, T2>;
// };

// type Operation2 = keyof Free2<never, never>;

// type Map2<Operation extends Operation2, T1, T2> = Free2<T1, T2>[Operation];

// type Free<T1 extends Operation1, T2> = Free1<T1> & Free2<T1, T2> & {};

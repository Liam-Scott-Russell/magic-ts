import { type Conditional } from "..";

type Conditional__True = true;

type Conditional__False = false;

type Conditional__Any = Conditional.False | Conditional.True;

export {
  type Conditional__True as True,
  type Conditional__False as False,
  type Conditional__Any as Any,
};

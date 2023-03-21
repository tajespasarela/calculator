import { Numeric, type BinaryOperation } from './operations';

export function isBinaryOperation(
  operation?: BinaryOperation | Numeric
): operation is BinaryOperation {
  return !(operation instanceof Numeric);
}
export function isNumeric(operation?: BinaryOperation | Numeric): operation is Numeric {
  return operation instanceof Numeric;
}

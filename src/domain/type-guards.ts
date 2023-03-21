import { BinaryOperation, Numeric } from '@/domain/entities';

export function isBinaryOperation(
  operation?: BinaryOperation | Numeric
): operation is BinaryOperation {
  return operation instanceof BinaryOperation;
}
export function isNumeric(operation?: BinaryOperation | Numeric): operation is Numeric {
  return operation instanceof Numeric;
}

import type { BinaryOperator, Numeric } from './operations.types';

export function isOperator(item: BinaryOperator | Numeric): item is BinaryOperator {
  return (item as any).calculate !== undefined;
}

import { BinaryOperation, Numeric } from '@/domain/entities';

export const additionOperation = new BinaryOperation(
  '+',
  1,
  (operand1: Numeric, operand2: Numeric) => operand1.value + operand2.value,
  '+'
);

export const subtractionOperation = new BinaryOperation(
  '-',
  1,
  (operand1: Numeric, operand2: Numeric) => operand1.value - operand2.value,
  '-'
);

export const multiplicationOperation = new BinaryOperation(
  '×',
  2,
  (operand1: Numeric, operand2: Numeric) => operand1.value * operand2.value,
  '*'
);

export const divisionOperation = new BinaryOperation(
  '÷',
  3,
  (operand1: Numeric, operand2: Numeric) => operand1.value / operand2.value,
  '/'
);

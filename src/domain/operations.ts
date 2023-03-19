import type { BinaryOperator } from './operations.types';

export const additionOperator: BinaryOperator = {
  priority: 1,
  displaySymbol: '+',
  calculate(operand1, operand2) {
    return operand1.value + operand2.value;
  }
};

export const substractionOperator: BinaryOperator = {
  priority: 1,
  displaySymbol: '-',
  calculate(operand1, operand2) {
    return operand1.value - operand2.value;
  }
};

export const multiplicationOperator: BinaryOperator = {
  priority: 2,
  displaySymbol: '×',
  calculate(operand1, operand2) {
    return operand1.value * operand2.value;
  }
};

export const divisionOperator: BinaryOperator = {
  priority: 3,
  displaySymbol: '÷',
  calculate(operand1, operand2) {
    return operand1.value / operand2.value;
  }
};

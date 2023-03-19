export interface BinaryOperator extends Displayable {
  calculate(operand1: Numeric, operand2: Numeric): number;
  priority: number;
}

export interface UnaryOperator extends Displayable {
  calculate(operand: Numeric): number;
}

export interface Numeric extends Displayable {
  value: number;
}

export interface Displayable {
  displaySymbol: string;
}

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

export const DivisionOperator: BinaryOperator = {
  priority: 3,
  displaySymbol: '÷',
  calculate(operand1, operand2) {
    return operand1.value / operand2.value;
  }
};

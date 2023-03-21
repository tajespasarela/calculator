import { CalculatorMachine } from './calculator-machine';
import { isBinaryOperation, isNumeric } from './type-guards';

export type ArithmeticExpression = Array<BinaryOperation | Numeric>;

export interface Operation {
  displaySymbol: string;
  modifyExpression(expression: ArithmeticExpression): ArithmeticExpression;
}

export class BinaryOperation implements Operation {
  constructor(
    public displaySymbol: string,
    public priority: number,
    public operate: (operand1: Numeric, operand2: Numeric) => number
  ) {}
  modifyExpression(expression: ArithmeticExpression): ArithmeticExpression {
    if (isBinaryOperation(expression.at(-1))) {
      expression.pop();
    }
    expression.push(this);
    return expression;
  }
}

export const additionOperation = new BinaryOperation(
  '+',
  1,
  (operand1: Numeric, operand2: Numeric) => operand1.value + operand2.value
);

export const substractionOperation = new BinaryOperation(
  '-',
  1,
  (operand1: Numeric, operand2: Numeric) => operand1.value - operand2.value
);

export const multiplicationOperation = new BinaryOperation(
  '×',
  2,
  (operand1: Numeric, operand2: Numeric) => operand1.value * operand2.value
);

export const divisionOperation = new BinaryOperation(
  '÷',
  3,
  (operand1: Numeric, operand2: Numeric) => operand1.value / operand2.value
);

export class Numeric implements Operation {
  constructor(public displaySymbol: string) {}

  get value(): number {
    return parseFloat(this.displaySymbol);
  }

  modifyExpression(expression: ArithmeticExpression): ArithmeticExpression {
    const lastElement = expression.at(-1);
    if (isNumeric(lastElement)) {
      const newValue =
        lastElement.displaySymbol === '0'
          ? this.displaySymbol
          : lastElement.displaySymbol + this.displaySymbol;
      expression.pop();
      expression.push(new Numeric(newValue));
    } else {
      expression.push(this);
    }
    return expression;
  }
}

export const number0 = new Numeric('0');
export const number1 = new Numeric('1');
export const number2 = new Numeric('2');
export const number3 = new Numeric('3');
export const number4 = new Numeric('4');
export const number5 = new Numeric('5');
export const number6 = new Numeric('6');
export const number7 = new Numeric('7');
export const number8 = new Numeric('8');
export const number9 = new Numeric('9');

export const decimalPoint: Operation = {
  displaySymbol: '.',
  modifyExpression(expression: ArithmeticExpression): ArithmeticExpression {
    const lastElement = expression.at(-1);
    if (isNumeric(lastElement) && !lastElement.displaySymbol.includes('.')) {
      expression.pop();
      expression.push(new Numeric(lastElement.displaySymbol + '.'));
    }
    return expression;
  }
};

const calculatorMachine = new CalculatorMachine();
export const equals = {
  displaySymbol: '=',
  modifyExpression(expression: ArithmeticExpression): ArithmeticExpression {
    return calculatorMachine.resolve(expression);
  }
};

export const clear: Operation = {
  displaySymbol: 'C',
  modifyExpression(_: ArithmeticExpression): ArithmeticExpression {
    return [number0];
  }
};

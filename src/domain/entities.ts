import { isBinaryOperation, isNumeric } from '@/domain/type-guards';

export type ArithmeticExpression = Array<BinaryOperation | Numeric>;

export interface Operation {
  displaySymbol: string;
  keyboardBinding?: string;
  modifyExpression(expression: ArithmeticExpression): ArithmeticExpression;
}

export class BinaryOperation implements Operation {
  constructor(
    public displaySymbol: string,
    public priority: number,
    public operate: (operand1: Numeric, operand2: Numeric) => number,
    public keyboardBinding?: string
  ) {}
  modifyExpression(expression: ArithmeticExpression): ArithmeticExpression {
    if (isBinaryOperation(expression.at(-1))) {
      expression.pop();
    }
    expression.push(this);
    return expression;
  }
}

export class Numeric implements Operation {
  public keyboardBinding?: string;
  constructor(public displaySymbol: string, public isResult = false) {
    this.keyboardBinding = displaySymbol;
  }

  get value(): number {
    return parseFloat(this.displaySymbol);
  }

  modifyExpression(expression: ArithmeticExpression): ArithmeticExpression {
    const lastElement = expression.at(-1);
    if (isNumeric(lastElement)) {
      if (lastElement.displaySymbol.length < 16) {
        const newValue =
          lastElement.displaySymbol === '0' || lastElement.isResult
            ? this.displaySymbol
            : lastElement.displaySymbol + this.displaySymbol;
        expression.pop();
        expression.push(new Numeric(newValue));
      }
    } else {
      expression.push(this);
    }
    return expression;
  }
}

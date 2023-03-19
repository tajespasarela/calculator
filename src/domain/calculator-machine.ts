import { isOperator } from './type-guards';

export class CalculatorMachine {
  private output: Array<string | number> = [];
  private operators: Array<string> = [];
  private precedence = ['+-', '*', '/'];

  private get lastOperator(): string | undefined {
    return this.operators.at(-1);
  }

  private parseExpression(expression: Array<string | number>) {
    expression.forEach((item) => {
      if (isOperator(item)) {
        if (!this.lastOperator || this.isHigherPrecedence(item, this.lastOperator)) {
          this.operators.push(item);
        } else {
          const removedLastOperator = this.operators.pop();
          if (removedLastOperator) {
            this.output.push(removedLastOperator);
          }
          this.operators.push(item);
        }
      } else {
        this.output.push(item);
      }
    });
  }

  resolve(expression: Array<string | number>): number {
    this.parseExpression(expression);
    this.output.push(...this.operators.reverse());
    this.operators.length = 0;

    while (this.output.length !== 1) {
      const firstOperatorIndex = this.output.findIndex(isOperator);
      const leftOperand = this.output[firstOperatorIndex - 2] as number;
      const rightOperand = this.output[firstOperatorIndex - 1] as number;
      const opeartor = this.output[firstOperatorIndex] as string;

      this.output.splice(
        firstOperatorIndex - 2,
        3,
        this.operate(opeartor, leftOperand, rightOperand)
      );
    }
    const result = this.output[0] as number;
    this.output.length = 0;
    return result;
  }

  private isHigherPrecedence(operator1: string, operator2: string): boolean {
    const precedence1 = this.precedence.findIndex((precedence) => precedence.includes(operator1));
    const precedence2 = this.precedence.findIndex((precedence) => precedence.includes(operator2));
    return precedence1 > precedence2;
  }

  private operate(opeartor: string, operandLeft: number, operandRight: number): number {
    switch (opeartor) {
      case '+':
        return operandLeft + operandRight;
      case '-':
        return operandLeft - operandRight;
      case '*':
        return operandLeft * operandRight;
      case '/':
        return operandLeft / operandRight;
      default:
        throw new Error('Unknown operator');
    }
  }
}

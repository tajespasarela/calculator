import { type ArithmeticExpression, BinaryOperation, Numeric } from './operations';
import { isBinaryOperation } from './type-guards';

export class CalculatorMachine {
  private output: ArithmeticExpression = [];
  private operators: Array<BinaryOperation> = [];

  private get lastOperator(): BinaryOperation | undefined {
    return this.operators.at(-1);
  }

  private parseExpression(expression: ArithmeticExpression) {
    expression.forEach((operation) => {
      if (isBinaryOperation(operation)) {
        if (!this.lastOperator || operation.priority > this.lastOperator.priority) {
          this.operators.push(operation);
        } else {
          const removedLastOperator = this.operators.pop();
          if (removedLastOperator) {
            this.output.push(removedLastOperator);
          }
          this.operators.push(operation);
        }
      } else {
        this.output.push(operation);
      }
    });
  }

  resolve(expression: ArithmeticExpression): ArithmeticExpression {
    this.parseExpression(expression);
    this.output.push(...this.operators.reverse());
    this.operators.length = 0;

    while (this.output.length !== 1) {
      const firstOperatorIndex = this.output.findIndex(isBinaryOperation);
      const leftOperand = this.output[firstOperatorIndex - 2] as Numeric;
      const rightOperand = this.output[firstOperatorIndex - 1] as Numeric;
      const operator = this.output[firstOperatorIndex] as BinaryOperation;

      this.output.splice(
        firstOperatorIndex - 2,
        3,
        new Numeric(String(operator.operate(leftOperand, rightOperand)))
      );
    }
    const result = this.output[0] as Numeric;
    this.output.length = 0;
    return [result];
  }
}

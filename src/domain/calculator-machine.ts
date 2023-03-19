export class CalculatorMachine {
  private output: Array<string | number> = [];
  private operators: Array<string> = [];
  private precedence = ['+-', '*', '/'];

  get lastOperator(): string | undefined {
    return this.operators[this.operators.length - 1];
  }

  addExpresion(expression: string | number) {
    if (this.isOperator(expression)) {
      if (!this.lastOperator || this.isHigherPrecedence(expression, this.lastOperator)) {
        this.operators.push(expression);
      } else {
        const removedLastOperator = this.operators.pop();
        if (removedLastOperator) {
          this.output.push(removedLastOperator);
        }
        this.operators.push(expression);
      }
    } else {
      this.output.push(expression);
    }
  }

  resolve(): number {
    this.output.push(...this.operators.reverse());
    this.operators.length = 0;

    while (this.output.length !== 1) {
      const firstOperatorIndex = this.output.findIndex(this.isOperator);
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

  private isOperator(expression: string | number): expression is string {
    return typeof expression === 'string';
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

import { type ArithmeticExpression, BinaryOperation, Numeric } from '@/domain/entities';
import { isBinaryOperation, isNumeric } from '@/domain/type-guards';

/**
 * A service that provides calculation of arithmetic expressions using
 * [Shunting yard algorithm]{@link https://en.wikipedia.org/wiki/Shunting_yard_algorithm}.
 * This algorithm converts from an Infix notation (operators between a left and right operands)
 * to a Postfix notation (operators after operands) also known as Reverse Polish Notation (RPN):
 *   infix = 1 + 2 - (5 + 2 * 4)
 *   rpn = 1 2 + 5 2 4 * + -
 *
 * [Here you have a helpful article]{@link https://dev.to/quantumsheep/how-calculators-read-mathematical-expression-with-operator-precedence-4n9h}
 */
export class CalculatorService {
  resolve(expression: ArithmeticExpression): ArithmeticExpression {
    const rpnNotationExpression = this.toRpnNotation(expression);
    return this.calculate(rpnNotationExpression);
  }

  private toRpnNotation(expression: ArithmeticExpression): ArithmeticExpression {
    const output: ArithmeticExpression = [];
    const operators: Array<BinaryOperation> = [];

    expression.forEach((operation) => {
      if (isNumeric(operation)) {
        // literals always goes to the output stack
        output.push(operation);
      } else {
        /* when an operator with lower or equal precedence than the last element of the operators
        stack is coming, pop the last element of the operators stack to the output stack. */
        const lastOperator = operators.at(-1);
        if (lastOperator && lastOperator.priority > operation.priority) {
          operators.pop();
          output.push(lastOperator);
        }
        operators.push(operation);
      }
    });
    output.push(...operators.reverse());
    return output;
  }

  private calculate(rpnNotationExpression: ArithmeticExpression): ArithmeticExpression {
    while (rpnNotationExpression.length !== 1) {
      // we need to find the first operator in the stack
      const firstOperatorIndex = rpnNotationExpression.findIndex(isBinaryOperation);
      const operator = rpnNotationExpression[firstOperatorIndex] as BinaryOperation;
      // Once we found it, we'll fetch the literal before and the one before the one before
      const leftOperand = rpnNotationExpression[firstOperatorIndex - 2] as Numeric;
      const rightOperand = rpnNotationExpression[firstOperatorIndex - 1] as Numeric;

      // Then we apply the operator and just put it in replacement for the left, right and operator.
      rpnNotationExpression.splice(
        firstOperatorIndex - 2,
        3,
        new Numeric(String(operator.operate(leftOperand, rightOperand)), true)
      );
    }
    return rpnNotationExpression;
  }
}

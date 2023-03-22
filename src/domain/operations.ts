import { type Operation, type ArithmeticExpression, Numeric } from '@/domain/entities';
import { number0 } from '@/domain/numerics';
import { CalculatorService } from '@/services/calculator.service';
import { ref } from 'vue';
import { isBinaryOperation, isNumeric } from './type-guards';

export const decimalPoint: Operation = {
  displaySymbol: '.',
  keyboardBinding: '.',
  modifyExpression(expression: ArithmeticExpression): ArithmeticExpression {
    const lastElement = expression.at(-1);
    if (isNumeric(lastElement) && !lastElement.displaySymbol.includes('.')) {
      expression.pop();
      expression.push(new Numeric(lastElement.displaySymbol + '.'));
    }
    return expression;
  }
};

const calculatorService = new CalculatorService();
export const equals = {
  displaySymbol: '=',
  keyboardBinding: 'Enter',
  modifyExpression(expression: ArithmeticExpression): ArithmeticExpression {
    const lastOperation = expression.at(-1);
    if (isBinaryOperation(lastOperation)) {
      expression.pop();
    }
    const resultExpression = calculatorService.resolve(expression);
    const result = resultExpression[0];
    if (
      isNumeric(result) &&
      (isNaN(result.value) || Math.abs(result.value) === Number.POSITIVE_INFINITY)
    ) {
      throw new Error('Error');
    }
    return resultExpression;
  }
};

export const clearAll: Operation = {
  displaySymbol: 'AC',
  keyboardBinding: 'Delete',
  modifyExpression(_: ArithmeticExpression): ArithmeticExpression {
    return [number0];
  }
};
export const clear: Operation = {
  displaySymbol: 'C',
  keyboardBinding: 'Backspace',
  modifyExpression(expression: ArithmeticExpression): ArithmeticExpression {
    expression.pop();
    if (expression.length === 0) {
      expression.push(number0);
    }
    return expression;
  }
};

export const negative: Operation = {
  displaySymbol: '+/-',
  keyboardBinding: 'i',
  modifyExpression(expression: ArithmeticExpression): ArithmeticExpression {
    const lastElement = expression.at(-1);
    if (isNumeric(lastElement)) {
      expression.pop();
      expression.push(new Numeric(String(lastElement.value * -1)));
    }
    return expression;
  }
};

export const squareRoot: Operation = {
  displaySymbol: '√ ',
  keyboardBinding: 'r',
  modifyExpression(expression: ArithmeticExpression): ArithmeticExpression {
    const lastElement = expression.at(-1);
    if (isNumeric(lastElement)) {
      if (lastElement.value < 0) {
        throw Error('Error');
      }
      expression.pop();
      expression.push(new Numeric(String(Math.sqrt(lastElement.value))));
    }
    return expression;
  }
};

export const memory = ref(0);
export const memoryAdd: Operation = {
  displaySymbol: 'M+',
  keyboardBinding: 'a',
  modifyExpression(expression: ArithmeticExpression): ArithmeticExpression {
    const lastElement = expression.at(-1);
    if (isNumeric(lastElement)) {
      memory.value += lastElement.value;
    }
    return expression;
  }
};
export const memorySubtract: Operation = {
  displaySymbol: 'M-',
  keyboardBinding: 's',
  modifyExpression(expression: ArithmeticExpression): ArithmeticExpression {
    const lastElement = expression.at(-1);
    if (isNumeric(lastElement)) {
      memory.value -= lastElement.value;
    }
    return expression;
  }
};
export const memoryReturn: Operation = {
  displaySymbol: 'MRC',
  keyboardBinding: 'm',
  modifyExpression(expression: ArithmeticExpression): ArithmeticExpression {
    const lastElement = expression.at(-1);
    if (isNumeric(lastElement)) {
      expression.pop();
    }
    expression.push(new Numeric(String(memory.value)));
    return expression;
  }
};

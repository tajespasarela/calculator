import { describe, it, expect } from 'vitest';
import { CalculatorMachine } from './calculator-machine';
import {
  Numeric,
  additionOperation,
  multiplicationOperation,
  number2,
  number3,
  number5
} from './operations';

describe('Testing calculatorMachine', () => {
  it('Keeps the operators precedence', () => {
    const calculator = new CalculatorMachine();

    expect(
      (
        calculator.resolve([
          number2,
          additionOperation,
          number5,
          multiplicationOperation,
          number3
        ])[0] as Numeric
      ).value
    ).toBe(17);

    //expect(calculator.resolve([2, '*', 5, '+', 9, '/', 3])).toBe(13);

    //expect(calculator.resolve([2, '+', 5, '*', 9, '/', 3])).toBe(17);
  });
});

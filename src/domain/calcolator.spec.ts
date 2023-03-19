import { describe, it, expect } from 'vitest';
import { CalculatorMachine } from './calculator-machine';

describe('Testing calculatorMachine', () => {
  it('Keeps the operators precedence', () => {
    const calculator = new CalculatorMachine();

    expect(calculator.resolve([2, '+', 5, '*', 3])).toBe(17);

    expect(calculator.resolve([2, '*', 5, '+', 9, '/', 3])).toBe(13);

    expect(calculator.resolve([2, '+', 5, '*', 9, '/', 3])).toBe(17);
  });
});

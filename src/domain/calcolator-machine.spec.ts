import { describe, it, expect } from 'vitest';
import { CalculatorMachine } from './calculator-machine';

describe('Testing calculatorMachine', () => {
  it('Keeps the operators precedence', () => {
    const calculator = new CalculatorMachine();

    [2, '+', 5, '*', 3].forEach((expression) => calculator.addExpresion(expression));
    expect(calculator.resolve()).toBe(17);

    [2, '*', 5, '+', 9, '/', 3].forEach((expression) => calculator.addExpresion(expression));
    expect(calculator.resolve()).toBe(13);

    [2, '+', 5, '*', 9, '/', 3].forEach((expression) => calculator.addExpresion(expression));
    expect(calculator.resolve()).toBe(17);
  });
});

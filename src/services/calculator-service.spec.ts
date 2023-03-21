import { number2, number3, number5, number9 } from '@/domain/numerics';
import {
  additionOperation,
  divisionOperation,
  multiplicationOperation
} from '@/domain/binary-operations';
import type { Numeric } from '@/domain/entities';
import { describe, it, expect } from 'vitest';
import { CalculatorService } from './calculator.service';

describe('Testing calculatorMachine', () => {
  it('Keeps the operators precedence', () => {
    const calculatorService = new CalculatorService();

    expect(
      (
        calculatorService.resolve([
          number2,
          additionOperation,
          number5,
          multiplicationOperation,
          number3
        ])[0] as Numeric
      ).value
    ).toBe(17);

    expect(
      (
        calculatorService.resolve([
          number2,
          multiplicationOperation,
          number5,
          additionOperation,
          number9,
          divisionOperation,
          number3
        ])[0] as Numeric
      ).value
    ).toBe(13);

    expect(
      (
        calculatorService.resolve([
          number2,
          additionOperation,
          number5,
          multiplicationOperation,
          number9,
          divisionOperation,
          number3
        ])[0] as Numeric
      ).value
    ).toBe(17);
  });
});

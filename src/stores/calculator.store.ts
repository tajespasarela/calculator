import type { ArithmeticExpression, Operation } from '@/domain/entities';
import { number0 } from '@/domain/numerics';
import { isNumeric } from '@/domain/type-guards';
import { defineStore } from 'pinia';

export const MAX_SCREEN_CHARACTERS = 16;
export const useCalculatorStore = defineStore('calculatorStore', {
  state() {
    return <CalculatorStoreState>{
      expression: [number0],
      error: ''
    };
  },
  getters: {
    screenValue: ({ expression }) => {
      const lastElement = expression.at(-1);
      if (isNumeric(lastElement)) {
        if (lastElement.displaySymbol.length > MAX_SCREEN_CHARACTERS) {
          return lastElement.value.toExponential(MAX_SCREEN_CHARACTERS - 5);
        } else {
          return lastElement.displaySymbol;
        }
      } else {
        return lastElement?.displaySymbol;
      }
    },
    stringExpression: ({ expression }) => expression.map((item) => item.displaySymbol).join(' ')
  },
  actions: {
    addOperation(operation: Operation): void {
      try {
        this.error = '';
        this.expression = operation.modifyExpression(this.expression);
      } catch (err) {
        this.$reset();
        this.error = (err as Error).message;
      }
    }
  }
});

export interface CalculatorStoreState {
  expression: ArithmeticExpression;
  error: string;
}

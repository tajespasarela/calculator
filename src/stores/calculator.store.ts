import type { ArithmeticExpression, Operation } from '@/domain/entities';
import { number0 } from '@/domain/numerics';
import { defineStore } from 'pinia';

export const useCalculatorStore = defineStore('calculatorStore', {
  state() {
    return <CalculatorStoreState>{
      expression: [number0],
      error: ''
    };
  },
  getters: {
    screenValue: ({ expression }) => expression.at(-1)?.displaySymbol,
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

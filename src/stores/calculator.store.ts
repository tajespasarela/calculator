import type { ArithmeticExpression, Operation } from '@/domain/entities';
import { number0 } from '@/domain/numerics';
import { defineStore } from 'pinia';

export const useCalculatorStore = defineStore('calculatorStore', {
  state() {
    return <CalculatorStoreState>{
      expression: [number0]
    };
  },
  getters: {
    screenValue: ({ expression }) => expression.at(-1)?.displaySymbol,
    stringExpression: ({ expression }) => expression.map((item) => item.displaySymbol)
  },
  actions: {
    addOperation(operation: Operation): void {
      this.expression = operation.modifyExpression(this.expression);
    }
  }
});

export interface CalculatorStoreState {
  expression: ArithmeticExpression;
}

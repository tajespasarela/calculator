import { defineStore } from 'pinia';
import { isNumeric } from '@/domain/type-guards';
import type { ArithmeticExpression, Operation } from '@/domain/operations';
import { number0 } from '@/domain/operations';

export const useCalculatorStore = defineStore('calculatorStore', {
  state() {
    return <CaculatorStoreState>{
      expression: [number0]
    };
  },
  getters: {
    screenValue: ({ expression }) =>
      expression.filter((item) => isNumeric(item)).at(-1)?.displaySymbol
  },
  actions: {
    addOperation(operation: Operation): void {
      this.expression = operation.modifyExpression(this.expression);
    }
  }
});

export interface CaculatorStoreState {
  expression: ArithmeticExpression;
}

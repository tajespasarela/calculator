import { defineStore } from 'pinia';
import { isOperator } from '@/domain/type-guards';
import { CalculatorMachine } from '@/domain/calculator-machine';

const calculatorMachine = new CalculatorMachine();

export const useCalculatorStore = defineStore('calculatorStore', {
  state() {
    return {
      expression: [0],
      inputState: 'number'
    } as CaculatorStoreState;
  },
  getters: {
    screenValue: ({ expression }) => expression.filter((item) => !isOperator(item)).at(-1) ?? 0
  },
  actions: {
    runOperation(item: string | number): void {
      if (isOperator(item)) {
        this.expression.push(item);
        this.inputState = 'operator';
      } else {
        if (this.inputState === 'operator') {
          this.expression.push(item);
        } else {
          this.expression[this.expression.length - 1] = parseFloat(
            `${this.expression.at(-1)}${item}`
          );
        }
        this.inputState = 'number';
      }
    },
    resolve() {
      this.expression.splice(0, this.expression.length, calculatorMachine.resolve(this.expression));
    }
  }
});

export interface CaculatorStoreState {
  expression: Array<number | string>;
  inputState: 'number' | 'operator';
}

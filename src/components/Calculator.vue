<script lang="ts">
import { Vue, Component } from 'vue-facing-decorator';
import Button from './Button.vue';
import Screen from './Screen.vue';
import {
  additionOperation,
  divisionOperation,
  multiplicationOperation,
  subtractionOperation
} from '@/domain/binary-operations';
import type { Operation } from '@/domain/entities';
import {
  number0,
  number1,
  number2,
  number3,
  number4,
  number5,
  number6,
  number7,
  number8,
  number9
} from '@/domain/numerics';
import {
  decimalPoint,
  equals,
  clear,
  clearAll,
  negative,
  squareRoot,
  memoryReturn,
  memoryAdd,
  memorySubtract,
  percentage
} from '@/domain/operations';

@Component({
  components: {
    Button,
    Screen
  }
})
export default class Calculator extends Vue {
  buttons: Array<Operation | undefined> = [
    memoryReturn,
    memoryAdd,
    memorySubtract,
    undefined,

    clear,
    clearAll,
    negative,
    squareRoot,

    number7,
    number8,
    number9,
    multiplicationOperation,

    number4,
    number5,
    number6,
    divisionOperation,

    number1,
    number2,
    number3,
    subtractionOperation,

    decimalPoint,
    number0,
    equals,
    additionOperation
  ];
}
</script>

<template>
  <main
    class="shadow-3d flex max-w-xs flex-col gap-4 rounded-xl border-4 border-black bg-gradient-to-br from-neutral-800 to-zinc-600 p-3"
  >
    <Screen />

    <section id="buttons" class="grid grid-cols-4 items-stretch justify-items-stretch gap-4">
      <template v-for="operation in buttons" :key="operation?.displaySymbol ?? ''">
        <Button v-if="operation" :operation="operation" />
        <div v-else></div>
      </template>
    </section>
  </main>
</template>

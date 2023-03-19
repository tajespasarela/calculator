<script lang="ts">
import { Vue, Component } from 'vue-facing-decorator';
import Button from './Button.vue';
import Screen from './Screen.vue';
import {
  substractionOperator,
  type BinaryOperator,
  type Numeric,
  additionOperator
} from '@/domain/operations.types';
import { divisionOperator, multiplicationOperator } from '@/domain/operations';

@Component({
  components: {
    Button,
    Screen
  }
})
export default class Calculator extends Vue {
  buttons: Array<Numeric | BinaryOperator> = [
    { displaySymbol: '7', value: 7 },
    { displaySymbol: '8', value: 8 },
    { displaySymbol: '9', value: 9 },
    multiplicationOperator,

    { displaySymbol: '4', value: 4 },
    { displaySymbol: '5', value: 5 },
    { displaySymbol: '6', value: 6 },
    divisionOperator,

    { displaySymbol: '1', value: 1 },
    { displaySymbol: '2', value: 2 },
    { displaySymbol: '3', value: 3 },
    substractionOperator,

    { displaySymbol: '7', value: 7 },
    { displaySymbol: '7', value: 7 },
    { displaySymbol: '7', value: 7 },
    additionOperator
  ];
}
</script>

<template>
  <main
    class="shadow-3d flex max-w-xs flex-col gap-4 rounded-xl border-4 border-black bg-gradient-to-br from-neutral-800 to-zinc-600 p-3"
  >
    <Screen />

    <section id="Buttons" class="grid grid-cols-4 items-stretch justify-items-stretch gap-4">
      <Button v-for="item in buttons" :item="item" :key="item.displaySymbol" />
    </section>
  </main>
</template>

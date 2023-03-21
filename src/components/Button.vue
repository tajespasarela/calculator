<script lang="ts">
import type { Operation } from '@/domain/operations';
import { useCalculatorStore } from '@/stores/calculator-store';
import { Vue, Component, Prop } from 'vue-facing-decorator';

@Component
export default class Button extends Vue {
  @Prop({ required: true }) public operation!: Operation;

  store = useCalculatorStore();
}
</script>

<template>
  <button
    class="min-w-12 shadow-3d active:shadow-3d-pressed min-h-[3rem] flex-1 rounded-md border-4 border-black bg-gradient-to-br from-neutral-900 to-zinc-700 text-neutral-100"
    @click="store.addOperation(operation)"
  >
    {{ operation.displaySymbol }}
  </button>
</template>

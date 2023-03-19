<script lang="ts">
import type { Displayable } from '@/domain/operations.types';
import { useCalculatorStore } from '@/stores/calculator-store';
import { Vue, Component, Prop } from 'vue-facing-decorator';

@Component
export default class Button extends Vue {
  @Prop() public item!: Displayable;

  store = useCalculatorStore();
}
</script>

<template>
  <button
    class="min-w-12 shadow-3d active:shadow-3d-pressed min-h-[3rem] flex-1 rounded-md border-4 border-black bg-gradient-to-br from-neutral-900 to-zinc-700 text-neutral-100"
    @click="store.runOperation(item)"
  >
    {{ item.displaySymbol }}
  </button>
</template>

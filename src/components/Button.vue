<script lang="ts">
import type { Operation } from '@/domain/entities';
import { useCalculatorStore } from '@/stores/calculator.store';
import { Vue, Component, Prop } from 'vue-facing-decorator';

@Component
export default class Button extends Vue {
  @Prop({ required: true }) public operation!: Operation;

  store = useCalculatorStore();

  keyboardHandler(event: KeyboardEvent): void {
    if (this.operation.keyboardBinding === event.key) {
      this.store.addOperation(this.operation);
    }
  }
  mounted() {
    document.addEventListener('keydown', this.keyboardHandler.bind(this));
  }

  beforeUnmount() {
    document.removeEventListener('keydown', this.keyboardHandler);
  }
}
</script>

<template>
  <button
    class="min-w-12 shadow-3d active:shadow-3d-pressed min-h-[3rem] flex-1 rounded-md border-4 border-black bg-gradient-to-br from-neutral-900 to-zinc-700 text-neutral-100"
    @click="store.addOperation(operation)"
    :title="operation.keyboardBinding"
  >
    {{ operation.displaySymbol }}
  </button>
</template>

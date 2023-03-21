<script lang="ts">
import { memory } from '@/domain/operations';
import { useCalculatorStore } from '@/stores/calculator.store';
import { Vue, Component } from 'vue-facing-decorator';

@Component
export default class Screen extends Vue {
  store = useCalculatorStore();
  get isMemory(): boolean {
    return memory.value !== 0;
  }
}
</script>

<template>
  <div class="relative">
    <span v-if="isMemory" class="absolute top-1.5 left-1.5 text-xs text-neutral-50">M</span>
    <input
      class="shadow-3d-pressed h-14 w-full rounded-md border-4 border-black bg-neutral-800 p-5 text-right font-digital text-3xl text-neutral-50 outline-none"
      type="text"
      readonly
      :value="store.error || store.screenValue"
    />
  </div>
</template>

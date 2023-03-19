<script lang="ts">
import { useCalculatorStore } from '@/stores/calculator-store.js';
import { Vue, Component } from 'vue-facing-decorator';

@Component
export default class Screen extends Vue {
  store = useCalculatorStore();
}
</script>

<template>
  <input
    class="shadow-3d-pressed h-14 w-full rounded-md border-4 border-black bg-neutral-800 p-5 text-right font-digital text-3xl text-neutral-50 outline-none"
    type="text"
    readonly
    :value="store.screenValue"
  />
</template>

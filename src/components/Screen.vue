<script lang="ts">
import { Vue, Component } from 'vue-facing-decorator';

@Component
export default class Screen extends Vue {}
</script>

<template>
  <input
    class="shadow-3d-pressed h-14 w-full rounded-md border-4 border-black bg-neutral-800 p-5 text-right font-digital text-3xl text-neutral-50"
    type="text"
    disabled
    value="453456.3456"
  />
</template>

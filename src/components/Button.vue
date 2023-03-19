<script lang="ts">
import { Vue, Component, Prop } from 'vue-facing-decorator';

@Component
export default class Button extends Vue {
  @Prop() public operation!: string;

  get classByOperation(): string {
    return this.operation === '='
      ? 'bg-orange-500/60'
      : Number.isInteger(Number(this.operation))
      ? 'bg-slate-800'
      : 'bg-slate-900';
  }
}
</script>

<template>
  <button
    class="min-w-12 shadow-3d active:shadow-3d-pressed min-h-[3rem] flex-1 rounded-md border-4 border-black bg-gradient-to-br from-neutral-900 to-zinc-700 text-neutral-100"
  >
    {{ operation }}
  </button>
</template>

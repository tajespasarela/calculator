<script lang="ts">
import { Vue, Component, Prop } from 'vue-facing-decorator'

@Component
export default class Button extends Vue {
  @Prop({ default: false }) public operation!: Boolean
}
</script>

<template>
  <button
    class="border border-slate-400 rounded-md min-w-12 min-h-[3rem] text-neutral-100 flex-1"
    :class="operation ? 'bg-slate-800' : 'bg-slate-900'"
  >
    <slot />
  </button>
</template>

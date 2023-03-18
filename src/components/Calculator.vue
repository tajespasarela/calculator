<script lang="ts">
import { Vue, Component } from 'vue-facing-decorator'
import Button from './Button.vue'

@Component({
  components: {
    Button
  }
})
export default class Calculator extends Vue {}
</script>

<template>
  <main class="bg-slate-600 rounded-xl border border-slate-100 max-w-xs p-3 flex flex-col gap-4">
    <input
      class="p-5 bg-neutral-900 border border-neutral-500 rounded-md w-full h-14 font-digital text-neutral-50 text-right text-3xl"
      type="text"
      disabled
      value="453456.3456"
    />

    <section id="Buttons" class="grid grid-cols-4 gap-4 justify-items-stretch items-stretch">
      <Button>7</Button>
      <Button>8</Button>
      <Button>9</Button>

      <Button operation="true">*</Button>

      <Button operation>4</Button>
      <Button>5</Button>
      <Button>6</Button>

      <Button operation="true">-</Button>

      <Button>1</Button>
      <Button>2</Button>
      <Button>3</Button>

      <Button operation="true">+</Button>

      <Button operation="true">,</Button>
      <Button>0</Button>
      <Button class="bg-orange-500/60">=</Button>

      <Button operation="true">/</Button>
    </section>
  </main>
</template>

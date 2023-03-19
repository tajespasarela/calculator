<script lang="ts">
import { Vue, Component } from 'vue-facing-decorator';
import Button from './Button.vue';
import Screen from './Screen.vue';

@Component({
  components: {
    Button,
    Screen
  }
})
export default class Calculator extends Vue {}
</script>

<template>
  <main
    class="shadow-3d flex max-w-xs flex-col gap-4 rounded-xl border-4 border-black bg-gradient-to-br from-neutral-800 to-zinc-600 p-3"
  >
    <Screen />

    <section id="Buttons" class="grid grid-cols-4 items-stretch justify-items-stretch gap-4">
      <Button operation="7" />
      <Button operation="8" />
      <Button operation="9" />

      <Button operation="*" />

      <Button operation="4" />
      <Button operation="5" />
      <Button operation="6" />

      <Button operation="-" />

      <Button operation="1" />
      <Button operation="2" />
      <Button operation="3" />

      <Button operation="+" />

      <Button operation="," />
      <Button operation="0" />
      <Button operation="=" />

      <Button operation="/" />
    </section>
  </main>
</template>

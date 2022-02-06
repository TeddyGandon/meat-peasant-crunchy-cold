<template>
  <div>
    <div class="grid grid-cols-3 h-full">
      <div>
        <div class="m-2 text-4xl">Day {{ $store.state.time.day }}</div>
        <div class="m-2 text-xl" v-if="$store.state.time.timeLeft > 0">
          {{ Math.floor($store.state.time.timeLeft / 60) }}h
          {{ $store.state.time.timeLeft - (Math.floor($store.state.time.timeLeft / 60) * 60) }}m left
          </div>
      </div>
      <div class="text-center pt-6">
        <span class="text-6xl md:inline hidden">
          THE PEASANT MEAT FACTORY
        </span>
      </div>
      <div class="text-right">
        <div class="m-2 text-4xl">${{ $store.state.earnings.current }}</div>
        <div class="m-2 text-xl">Earn of the day: ${{ $store.state.earnings.today }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Cooker extends Vue {
}
</script>

<style scoped>
</style>

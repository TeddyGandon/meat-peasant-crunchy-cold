<template>
  <div>
    <div class="w-full h-full absolute top-0 left-0 fade-in">
      <div class="w-full h-full absolute top-0 left-0 bg-black opacity-90 backdrop-blur"></div>
      <div class="w-full h-full absolute top-0 left-0 text-white flex h-screen p-12">
        <div class="m-auto">
          <p class="text-center text-4xl fade-in delay-1">This little game was done in 48 hours</p>
          <p class="text-center text-2xl mt-12 fade-in delay-2">
            That prototype comes from the challenge of the week from the @LostRelicGames community with the theme "Meat Peasant Crunchy Cold".
          </p>
          <p class="text-center text-2xl mt-12 fade-in delay-3">
            This is an unfinished game, but a good piece of learning for young developers.
          </p>
          <p class="text-center mt-6 fade-in delay-4">
            <a
              class="bg-amber-500 hover:bg-amber-700 text-white font-bold pt-3 pb-2 px-4 rounded text-2xl m-2 cursor-pointer"
              v-on:click="$store.dispatch('app/resolveWarn')"
            >
              Let's start!
            </a>
            <a
              class="bg-amber-500 hover:bg-amber-700 text-white font-bold pt-3 pb-2 px-4 rounded text-2xl m-2 cursor-pointer"
              href="https://github.com/teddygandon/meat-peasant-crunchy-cold"
              target="_blank"
            >
              View source code
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Warn extends Vue {
}
</script>

<style scoped>
.fade-in {
  opacity: 0;
  animation: fadein .5s;
  animation-fill-mode: forwards;
}

.delay-1 {
  animation-delay: 1s;
}

.delay-2 {
  animation-delay: 1.5s;
}

.delay-3 {
  animation-delay: 2s;
}

.delay-4 {
  animation-delay: 2.5s;
}

.delay-5 {
  animation-delay: 3s;
}

@keyframes fadein {
  from { opacity: 0; }
  to   { opacity: 1; }
}
</style>

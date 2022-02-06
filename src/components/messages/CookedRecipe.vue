<template>
  <div>
    <div class="w-full h-full absolute top-0 left-0 fade-in">
      <div class="w-full h-full absolute top-0 left-0 bg-black opacity-90 backdrop-blur"></div>
      <div class="w-full h-full absolute top-0 left-0 text-white flex h-screen p-12">
        <div class="m-auto">
          <p class="text-center text-4xl fade-in delay-1">Yeah!</p>
          <p class="text-center text-2xl mt-12 fade-in delay-2">You cooked the {{ $store.state.app.cookedRecipe.name }}!</p>
          <p class="text-center text-2xl fade-in delay-3">
            It took you {{ $store.state.app.cookedRecipe.ingredients.length * 5 +10 }} minutes to cook that
          </p>
          <p class="text-center mt-6 fade-in delay-4">
            <a
              class="bg-amber-500 hover:bg-amber-700 text-white font-bold pt-3 pb-2 px-4 rounded text-2xl cursor-pointer"
              v-on:click="$store.dispatch('app/resolveCookedRecipe')"
            >
              Let's cook!
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
export default class CookedRecipe extends Vue {
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

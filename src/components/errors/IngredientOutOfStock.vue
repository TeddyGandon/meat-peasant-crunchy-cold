<template>
  <div>
    <div class="w-full h-full absolute top-0 left-0">
      <div class="w-full h-full absolute top-0 left-0 bg-orange-800 opacity-90 backdrop-blur"></div>
      <div class="w-full h-full absolute top-0 left-0 text-white flex h-screen p-12">
        <div class="m-auto">
          <p class="text-center text-4xl">Oooops</p>
          <p class="text-center text-2xl mt-12">One of your ingredient is out of stock.</p>
          <p class="text-center mt-6">
            <a
              class="bg-amber-500 hover:bg-amber-700 text-white font-bold pt-3 pb-2 px-4 rounded text-2xl cursor-pointer"
              v-on:click="$store.dispatch('errors/resolveIngredientOutOfStock')"
            >
              Yeah, nevermind
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
export default class IngredientOutOfStock extends Vue {
}
</script>

<style scoped>
</style>

<template>
  <div>
    <div class="m-0 p-2 w-full">
      <p class="text-center text-4xl mt-3 mb-6">It's time to buy new ingredients</p>
      <div
        v-for="(ingredient) in $store.getters['recipes/availableIngredients']"
        v-bind:key="ingredient.id"
        v-on:click="buyIngredient(ingredient.id)"
        :class="`
          inline-block
          rounded-md
          w-24 h-32
          m-1
          bg-orange-700 hover:bg-orange-400 text-white border-white
          text-center
          border-2 
          cursor-pointer`"
      >
        <img :src="`${basePath}images/${ingredient.display}.png`" class="inline-block" />
        <div class="text-xl">{{ ingredient.stock }} left</div>
        <div class="text-xl">Price: {{ ingredient.price }}$</div>
      </div>
      <p class="text-center mt-6">
        <a
          class="bg-amber-800 hover:bg-amber-700 text-white font-bold pt-3 pb-2 px-4 rounded text-2xl cursor-pointer"
          v-on:click="$router.push('/')"
        >
          Get back to the kitchen!
        </a>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Kitchen extends Vue {

  public data() {
    return {
      basePath: process.env.NODE_ENV === 'production'
        ? '/meat-peasant-crunchy-cold/'
        : '/',
    };
  }

  public buyIngredient(ingredientId: string) {
    this.$store.dispatch('recipes/buyIngredient', ingredientId);
  }

}
</script>

<style scoped>
</style>

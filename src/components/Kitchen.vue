<template>
  <div>
    <div class="m-0 p-2 w-full overflow-auto">
      <div :style="{width: ($store.getters['recipes/availableIngredients'] * 2.9) + 'em'}">
        <div
          v-for="(ingredient) in $store.getters['recipes/availableIngredients']"
          v-bind:key="ingredient.id"
          v-on:click="toggleIngredient(ingredient.id)"
          :class="`
            inline-block
            rounded-md
            w-24 h-24
            m-1
            ${
              hasSelectedIngredient(ingredient.id) ?
                'bg-orange-500 hover:bg-orange-200 text-black border-orange-200' :
                'bg-orange-700 hover:bg-orange-400 text-white border-white'
            }
            text-center
            border-2 
            cursor-pointer`"
        >
          <img :src="`${basePath}images/${ingredient.display}.png`" class="inline-block" />
          <div class="text-xl">{{ ingredient.stock }} left</div>
        </div>
      </div>
    </div>
    <div class="w-full grid md:grid-cols-3 grid-cols-2 gap-1 pt-12">
      <div class="text-center md:text-right">
        <div
          class="
            inline-block
            rounded-full
            md:w-36 md:h-36
            w-24 h-24
            bg-red-600 hover:bg-red-800 
            text-center
            border-2 border-white
            cursor-pointer
          "
          v-on:click="cookCrispy()"
        >
          <img src="./../assets/images/flame.png" class="inline-block m-0 md:mt-2" />
        </div>
      </div>
      <div class="text-white text-6xl align-middle text-center pt-12 hidden md:block">
        OR
      </div>
      <div class="text-center md:text-left">
        <div
          class="
            inline-block
            rounded-full
            md:w-36 md:h-36
            w-24 h-24
            bg-cyan-600 hover:bg-cyan-400 
            text-center
            border-2 border-white
            cursor-pointer
          "
          v-on:click="cookCold()"
        >
          <img src="./../assets/images/snow.png" class="inline-block m-0 md:mt-2" />
        </div>
      </div>
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
      selectedIngredients: [],
    };
  }

  public toggleIngredient(ingredient: string) {
    this.$data.selectedIngredients = this.$data.selectedIngredients.includes(ingredient) ?
      this.$data.selectedIngredients.filter((selectedIngredient: string) => selectedIngredient !== ingredient) :
      [...this.$data.selectedIngredients, ingredient];
  }

  public cookCrispy(): boolean {
    if (this.$data.selectedIngredients.length <= 0) {
      this.$store.dispatch('errors/triggerShouldHaveSelectedIngredient');
      return false;
    }
    this.$store.dispatch(
      'recipes/cook',
      {
        ingredients: this.$data.selectedIngredients,
        cookingMethod: 'crispy',
      });
    this.$data.selectedIngredients = [];
    return true;
  }

  public cookCold(): boolean {
    if (this.$data.selectedIngredients.length <= 0) {
      this.$store.dispatch('errors/triggerShouldHaveSelectedIngredient');
      return false;
    }
    this.$store.dispatch(
      'recipes/cook',
      {
        ingredients: this.$data.selectedIngredients,
        cookingMethod: 'cold',
      });
    this.$data.selectedIngredients = [];
    return true;
  }

  public hasSelectedIngredient(ingredient: string): boolean {
    return this.$data.selectedIngredients.includes(ingredient);
  }

}
</script>

<style scoped>
</style>

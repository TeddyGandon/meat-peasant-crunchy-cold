<template>
  <div>
    <div class="w-full h-full absolute top-0 left-0">
      <div class="w-full h-full absolute top-0 left-0 bg-black opacity-90 backdrop-blur"></div>
      <div class="w-full h-full absolute top-0 left-0 text-white flex h-screen p-12">
        <div class="m-auto">
          <p class="text-center text-4xl mb-6 fade-in delay-1">Dear peasant, it's time to rest</p>
          <div v-if="$store.getters['time/newRecipesOfTheDay'].length > 0" class="py-2 my-2 border-solid border-t border-orange-700 fade-in delay-2">
            <p class="text-center text-2xl">
              You learned {{ $store.getters['time/newRecipesOfTheDay'].length }}
              new recipe{{ $store.getters['time/newRecipesOfTheDay'].length > 1 ? 's' : '' }}!
            </p>
            <p class="text-center text-xl" v-for="recipe in $store.getters['time/newRecipesOfTheDay']" v-bind:key="recipe">
              {{ getNameFromRecipeId(recipe) }}
            </p>
          </div>
          <div class="py-2 my-2 border-solid border-t border-orange-700 fade-in delay-3">
            <p class="text-center text-2xl">
              You earned ${{ $store.state.earnings.today }} today!
            </p>
            <p class="text-center text-xl">
              You have now ${{ $store.state.earnings.current }}
            </p>
          </div>
          <div v-if="getNewIngredientsUnlocked().length > 0" class="py-2 my-2 border-solid border-t border-b border-orange-700 fade-in delay-4">
            <p class="text-center text-2xl">
              You had some new ideas...
            </p>
            <p class="text-center text-xl" v-for="ingredient in getNewIngredientsUnlocked()" v-bind:key="ingredient.id">
              You can now buy some {{ ingredient.name }}
            </p>
          </div>
          <p class="text-center mt-6 fade-in delay-5">
            <a
              class="bg-amber-500 hover:bg-amber-700 text-white font-bold pt-3 pb-2 px-4 rounded text-2xl cursor-pointer"
              v-on:click="endDay()"
            >
              Let's rest!
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
export default class DayOver extends Vue {

  public getNameFromRecipeId(recipeId: string): string {
    const foundRecipe: any = this.$store.state.recipes.recipes.find((recipe: any) => recipe.id === recipeId);
    return foundRecipe ? foundRecipe.name : 'unkown name';
  }

  public getNewIngredientsUnlocked(): string[] {
    const numberOfPreviousKnownRecipes: number = this.$store.getters['time/numberOfPreviousKnownRecipes'];
    const numberOfKnownRecipes: number = this.$store.getters['time/numberOfKnownRecipes'];
    return this.$store.state.recipes.ingredients.filter(
      (ingredient: any) => ingredient.neededRecipes > numberOfPreviousKnownRecipes && ingredient.neededRecipes <= numberOfKnownRecipes);
  }

  public endDay(): void {
    this.$store.dispatch('app/resolveDayOver');
    this.$store.dispatch('time/endDay');
    this.$router.push('/shop');
  }

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

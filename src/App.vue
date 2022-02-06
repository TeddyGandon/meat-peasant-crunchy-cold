<template>
  <div id="app">
    <router-view/>
    <should-have-selected-ingredient v-if="$store.state.errors.shouldHaveSelectedIngredient"></should-have-selected-ingredient>
    <ingredient-out-of-stock v-if="$store.state.errors.ingredientOutOfStock"></ingredient-out-of-stock>
    <failed-cooking v-if="$store.state.errors.failedCooking"></failed-cooking>
    <not-enough-money v-if="$store.state.errors.notEnoughMoney"></not-enough-money>
    <day-over v-if="$store.state.app.dayOver"></day-over>
    <out-of-stock v-if="$store.state.app.outOfStock"></out-of-stock>
    <cooked-recipe v-if="$store.state.app.cookedRecipe"></cooked-recipe>
    <warn v-if="$store.state.app.warn"></warn>
  </div>
</template>

<style>
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ShouldHaveSelectedIngredient from '@/components/errors/ShouldHaveSelectedIngredient.vue';
import IngredientOutOfStock from '@/components/errors/IngredientOutOfStock.vue';
import OutOfStock from '@/components/messages/OutOfStock.vue';
import FailedCooking from '@/components/errors/FailedCooking.vue';
import NotEnoughMoney from '@/components/errors/NotEnoughMoney.vue';
import CookedRecipe from '@/components/messages/CookedRecipe.vue';
import DayOver from '@/components/messages/DayOver.vue';
import Warn from '@/components/messages/Warn.vue';

@Component({
  components: {
    ShouldHaveSelectedIngredient,
    IngredientOutOfStock,
    FailedCooking,
    NotEnoughMoney,
    CookedRecipe,
    DayOver,
    OutOfStock,
    Warn,
  },
})
export default class App extends Vue {

  public mounted() {
    this.$router.push('/');
  }

}
</script>

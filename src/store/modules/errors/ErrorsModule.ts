export default {
  actions: {
    triggerShouldHaveSelectedIngredient(context: any) {
      context.commit('shouldHaveSelectedIngredient', {status: true});
    },
    resolveShouldHaveSelectedIngredient(context: any) {
      context.commit('shouldHaveSelectedIngredient', {status: false});
    },
    triggerIngredientOutOfStock(context: any) {
      context.commit('ingredientOutOfStock', {status: true});
    },
    resolveIngredientOutOfStock(context: any) {
      context.commit('ingredientOutOfStock', {status: false});
    },
    triggerFailedCooking(context: any) {
      context.commit('failedCooking', {status: true});
    },
    resolveFailedCooking(context: any) {
      context.commit('failedCooking', {status: false});
      if (context.rootState.time.timeLeft <= 0) {
        context.dispatch('app/triggerDayOver', null, {root: true});
        return;
      }
      const stockLeft: any[] = context.rootState.recipes.ingredients.filter((ingredient: any) => ingredient.stock > 0);
      if (stockLeft.length === 0) {
        context.dispatch('app/triggerOutOfStock', null, {root: true});
        return;
      }
    },
    triggerNotEnoughMoney(context: any) {
      context.commit('notEnoughMoney', {status: true});
    },
    resolveNotEnoughMoney(context: any) {
      context.commit('notEnoughMoney', {status: false});
    },
  },
  getters: {},
  mutations: {
    shouldHaveSelectedIngredient(state: any, payload: {status: boolean}) {
      state.shouldHaveSelectedIngredient = payload.status;
    },
    ingredientOutOfStock(state: any, payload: {status: boolean}) {
      state.ingredientOutOfStock = payload.status;
    },
    failedCooking(state: any, payload: {status: boolean}) {
      state.failedCooking = payload.status;
    },
    notEnoughMoney(state: any, payload: {status: boolean}) {
      state.notEnoughMoney = payload.status;
    },
  },
  namespaced: true,
  state: () => ({
    shouldHaveSelectedIngredient: false,
    ingredientOutOfStock: false,
    failedCooking: false,
    notEnoughMoney: false,
  }),
};

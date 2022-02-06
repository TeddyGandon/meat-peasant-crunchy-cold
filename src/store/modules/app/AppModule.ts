export default {
  actions: {
    triggerCookedRecipe(context: any, cookedRecipe: any) {
      context.commit('cookedRecipe', {cookedRecipe});
    },
    resolveCookedRecipe(context: any) {
      context.commit('cookedRecipe', {cookedRecipe: null});
      if (context.rootState.time.timeLeft <= 0) {
        context.dispatch('triggerDayOver');
        return;
      }
      const stockLeft: any[] = context.rootState.recipes.ingredients.filter((ingredient: any) => ingredient.stock > 0);
      if (stockLeft.length === 0) {
        context.dispatch('triggerOutOfStock');
        return;
      }
    },
    triggerDayOver(context: any) {
      context.commit('dayOver', {status: true});
    },
    resolveDayOver(context: any) {
      context.commit('dayOver', {status: false});
    },
    triggerOutOfStock(context: any) {
      context.commit('outOfStock', {status: true});
    },
    resolveOutOfStock(context: any) {
      context.commit('outOfStock', {status: false});
    },
    resolveWarn(context: any) {
      context.commit('warn', {status: false});
    },
  },
  getters: {},
  mutations: {
    cookedRecipe(state: any, payload: {cookedRecipe: boolean}) {
      state.cookedRecipe = payload.cookedRecipe;
    },
    dayOver(state: any, payload: {status: boolean}) {
      state.dayOver = payload.status;
    },
    warn(state: any, payload: {status: boolean}) {
      state.warn = payload.status;
    },
    outOfStock(state: any, payload: {status: boolean}) {
      state.outOfStock = payload.status;
    },
  },
  namespaced: true,
  state: () => ({
    cookedRecipe: null,
    dayOver: false,
    outOfStock: false,
    warn: true,
  }),
};

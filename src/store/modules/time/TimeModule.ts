export default {
  actions: {
    removeCookingTime(context: any, numberOfIngredients: number) {
      context.commit('removeTime', {time: numberOfIngredients * 5 + 10});
    },
    registerCookedRecipeForToday(context: any, recipe: string) {
      context.commit('addCookedRecipe', {day: context.state.day, recipe});
    },
    endDay(context: any) {
      const numberOfPreviousKnownRecipes: number = context.getters.numberOfPreviousKnownRecipes;
      const numberOfKnownRecipes: number = context.getters.numberOfKnownRecipes;
      const unlockedIngredients = context.rootState.recipes.ingredients.filter(
        (ingredient: any) => ingredient.neededRecipes > numberOfPreviousKnownRecipes && ingredient.neededRecipes <= numberOfKnownRecipes);
      unlockedIngredients.forEach((ingredient: any) => {
        context.dispatch('recipes/unlockIngredient', ingredient.id, {root: true});
      });
      context.commit('setTime', {time: context.state.timeTotal});
      context.commit('addDay', {day: 1});
      context.commit('earnings/resetToday', null, {root: true});
      context.commit('addNewStat');
    },
  },
  getters: {
    newRecipesOfTheDay(state: any): string[] {
      const newRecipesOfTheDay: string[] = [];
      const knownRecipes: string[] = state.stats.reduce(
        (acc: string[], current: any) => {
          if (current.day < state.day) {
            current.cookedRecipes.forEach((recipe: string) => {
              if (!acc.includes(recipe)) {
                acc.push(recipe);
              }
            });
          }
          return acc;
        }, []);
      state.stats[state.stats.length - 1].cookedRecipes.forEach((cookedRecipeToday: string) => {
        if (!knownRecipes.includes(cookedRecipeToday) && !newRecipesOfTheDay.includes(cookedRecipeToday)) {
          newRecipesOfTheDay.push(cookedRecipeToday);
        }
      });
      return newRecipesOfTheDay;
    },
    numberOfPreviousKnownRecipes(state: any): number {
      return state.stats.reduce(
        (acc: string[], current: any) => {
          if (current.day < state.day) {
            current.cookedRecipes.forEach((recipe: string) => {
              if (!acc.includes(recipe)) {
                acc.push(recipe);
              }
            });
          }
          return acc;
        }, []).length;
    },
    numberOfKnownRecipes(state: any): number {
      return state.stats.reduce(
        (acc: string[], current: any) => {
          current.cookedRecipes.forEach((recipe: string) => {
            if (!acc.includes(recipe)) {
              acc.push(recipe);
            }
          });
          return acc;
        }, []).length;
    },
  },
  mutations: {
    removeTime(state: any, payload: any) {
      state.timeLeft -= payload.time;
    },
    addCookedRecipe(state: any, payload: any) {
      state.stats.forEach((stat: any) => {
        if (stat.day === payload.day) {
          stat.cookedRecipes.push(payload.recipe);
        }
      });
    },
    setTime(state: any, payload: any) {
      state.timeLeft = payload.time;
    },
    addDay(state: any, payload: any) {
      state.day += payload.day;
    },
    addNewStat(state: any, payload: any) {
      state.stats.push({
        day: state.day,
        cookedRecipes: [],
      });
    },
  },
  namespaced: true,
  state: () => ({
    day: 1,
    timeTotal: 120,
    timeLeft: 30,
    stats: [
      {
        day: 1,
        cookedRecipes: [],
      },
    ],
  }),
};

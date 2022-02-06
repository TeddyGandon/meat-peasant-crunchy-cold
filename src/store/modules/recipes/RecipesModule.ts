export default {
  actions: {
    unlockIngredient(context: any, ingredient: string) {
      context.commit('addUnlockedIngredient', {ingredient});
    },
    cook(context: any, cookedRecipe: {ingredients: string[], cookingMethod: 'crispy'|'cold'}) {
      // Check out of stock ingredients
      const outOfStockIngredients: any[] = cookedRecipe.ingredients.filter(
        (ingredient: string) => {
          const foundIngredient = context.state.ingredients.find((ingredientToFind: any) => {
            return ingredientToFind.id === ingredient && ingredientToFind.stock <= 0;
          });
          return foundIngredient !== undefined;
        });
      if (outOfStockIngredients.length > 0) {
        context.dispatch('errors/triggerIngredientOutOfStock', null, {root: true});
        return;
      }

      // Look for recipe
      const foundRecipe: undefined|any = context.state.recipes.find(
        (recipeToFind: any) => {
          const intersection: any[] = recipeToFind.ingredients.filter((value: any) => cookedRecipe.ingredients.includes(value));
          return intersection.length === cookedRecipe.ingredients.length &&
            recipeToFind.cookingMethod === cookedRecipe.cookingMethod;
        });

      // Remove ingredients & time
      cookedRecipe.ingredients.forEach((ingredient: string) => context.commit('removeIngredientStock', {ingredient}));
      context.dispatch('time/removeCookingTime', cookedRecipe.ingredients.length, {root: true});

      if (foundRecipe !== undefined) {
        // Dispatch found
        context.dispatch('time/registerCookedRecipeForToday', foundRecipe.id, {root: true});
        context.dispatch('app/triggerCookedRecipe', foundRecipe, {root: true});
        context.dispatch('earnings/earnToday', foundRecipe.price, {root: true});
      } else {
        // Displatch fail
        context.dispatch('errors/triggerFailedCooking', cookedRecipe.ingredients, {root: true});
      }
    },
    buyIngredient(context: any, ingredient: string) {
      context.state.ingredients.forEach((ingredientToFind: any) => {
        if (ingredientToFind.id === ingredient) {
          if (context.rootState.earnings.current < ingredientToFind.price) {
            context.dispatch('errors/triggerNotEnoughMoney', null, {root: true});
            return;
          }
          context.commit('addIngredientToStock', {ingredient, amount: 1});
          context.commit('earnings/removeCurrent', {money: ingredientToFind.price}, {root: true});
        }
      });
    },
  },
  getters: {
    availableIngredients(state: any): [] {
      return state.ingredients.filter((ingredient: any) => {
          return state.unlockedIngredients.includes(ingredient.id);
        });
    },
  },
  mutations: {
    addIngredientToStock(state: any, payload: any) {
      state.ingredients.forEach((ingredientToFind: any) => {
        if (ingredientToFind.id === payload.ingredient) {
          ingredientToFind.stock += payload.amount;
        }
      });
    },
    addUnlockedIngredient(state: any, payload: any) {
      state.unlockedIngredients.push(payload.ingredient);
    },
    removeIngredientStock(state: any, payload: any) {
      state.ingredients.forEach((ingredient: any) => {
        if (ingredient.id === payload.ingredient) {
          ingredient.stock --;
        }
      });
    },
  },
  namespaced: true,
  state: () => ({
    ingredients: [
      {
        id: 'meat',
        name: 'Meat',
        display: 'meat_ration_new',
        stock: 2,
        price: 1,
        neededRecipes: 0,
      },
      {
        id: 'cheese',
        name: 'Cheese',
        display: 'cheese',
        stock: 0,
        price: 2,
        neededRecipes: 1,
      },
      {
        id: 'honey',
        name: 'Honey',
        display: 'honeycomb_new',
        stock: 0,
        price: 3,
        neededRecipes: 3,
      },
    ],
    recipes: [
      {
        id: 1,
        name: 'Crunchy Peasant Meat',
        ingredients: ['meat'],
        cookingMethod: 'crispy',
        price: 3,
      },
      {
        id: 2,
        name: 'Peasant Cheezy Icecream',
        ingredients: ['cheese'],
        cookingMethod: 'cold',
        price: 5,
      },
      {
        id: 3,
        name: 'Crispy Peasant Cheezy Stick',
        ingredients: ['cheese'],
        cookingMethod: 'crispy',
        price: 5,
      },
      {
        id: 4,
        name: 'Crunchy Peasant Meat & Cheese Stick',
        ingredients: ['meat', 'cheese'],
        cookingMethod: 'crispy',
        price: 6,
      },
      {
        id: 5,
        name: 'Sweet Peasant Meat',
        ingredients: ['meat', 'honey'],
        cookingMethod: 'crispy',
        price: 7,
      },
      {
        id: 6,
        name: 'Peasant Honey Icecream',
        ingredients: ['honey'],
        cookingMethod: 'cold',
        price: 6,
      },
    ],
    unlockedIngredients: ['meat'],
    availableRecipes: [],
  }),
};

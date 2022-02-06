import { createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import RecipesModule from '@/store/modules/recipes/RecipesModule';
import TimeModule from '@/store/modules/time/TimeModule';
import AppModule from '@/store/modules/app/AppModule';
import EarningsModule from '@/store/modules/earnings/EarningsModule';
import ErrorsModule from '@/store/modules/errors/ErrorsModule';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('RecipesModule.ts', () => {
  let store: any;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        recipes: RecipesModule,
        time: TimeModule,
        app: AppModule,
        earnings: EarningsModule,
        errors: ErrorsModule,
      },
    });
  });

  it('get the ingredients based on what is available at start', () => {
    expect(store.getters['recipes/availableIngredients']).toHaveLength(1);
    store.dispatch('recipes/unlockIngredient', 'cheese');
  });

  it('get the ingredients based on what is available after adding a valid ingredient', () => {
    store.dispatch('recipes/unlockIngredient', 'cheese');
    expect(store.getters['recipes/availableIngredients']).toHaveLength(2);
  });

  it('get the ingredients based on what is available after adding an invalid ingredient', () => {
    store.dispatch('recipes/unlockIngredient', 'something invalid');
    expect(store.getters['recipes/availableIngredients']).toHaveLength(1);
  });

  it('try to cook a known reciepe', () => {
    expect(store.state.recipes.ingredients[0].stock).toBe(2);
    store.dispatch('recipes/cook', {ingredients: ['meat'], cookingMethod: 'crispy'});
    expect(store.state.recipes.ingredients[0].stock).toBe(1);
    expect(store.state.time.timeLeft).toBe(15);
    expect(store.state.earnings.current).toBe(3);
    expect(store.state.earnings.today).toBe(3);
    expect(store.state.time.stats[0].cookedRecipes).toHaveLength(1);
    expect(store.state.time.stats[0].cookedRecipes[0]).toBe('crunchy-meat');
  });

  it('try to cook an unknown reciepe', () => {
    store.dispatch('recipes/cook', {ingredients: ['something invalid'], cookingMethod: 'crispy'});
    expect(store.state.time.timeLeft).toBe(15);
    expect(store.state.earnings.current).toBe(0);
    expect(store.state.earnings.today).toBe(0);
    expect(store.state.time.stats[0].cookedRecipes).toHaveLength(0);
  });

  it('try to cook two known recipes and extract new recipes cooked', () => {
    store.dispatch('recipes/cook', {ingredients: ['meat'], cookingMethod: 'crispy'});
    store.dispatch('recipes/cook', {ingredients: ['meat'], cookingMethod: 'crispy'});
    expect(store.state.time.stats[0].cookedRecipes).toHaveLength(2);
    expect(store.state.time.stats[0].cookedRecipes[0]).toBe('crunchy-meat');
    expect(store.state.time.stats[0].cookedRecipes[1]).toBe('crunchy-meat');
    expect(store.getters['time/newRecipesOfTheDay']).toHaveLength(1);
    expect(store.getters['time/newRecipesOfTheDay'][0]).toBe('crunchy-meat');
  });

  it('try to cook two known recipes and see the new ingredients unlocked', () => {
    store.dispatch('recipes/cook', {ingredients: ['meat'], cookingMethod: 'crispy'});
    store.dispatch('recipes/cook', {ingredients: ['meat'], cookingMethod: 'cold'});
    expect(store.getters['time/numberOfPreviousKnownRecipes']).toBe(0);
    expect(store.getters['time/numberOfKnownRecipes']).toBe(2);
  });
});

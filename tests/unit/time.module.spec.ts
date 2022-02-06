import { createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import RecipesModule from '@/store/modules/recipes/RecipesModule';
import TimeModule from '@/store/modules/time/TimeModule';
import AppModule from '@/store/modules/app/AppModule';
import EarningsModule from '@/store/modules/earnings/EarningsModule';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('TimeModule.ts', () => {
  let store: any;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        recipes: RecipesModule,
        time: TimeModule,
        app: AppModule,
        earnings: EarningsModule,
      },
    });
  });

  it('try to cook two known recipes and end the day', () => {
    store.dispatch('recipes/cook', {ingredients: ['meat'], cookingMethod: 'crispy'});
    store.dispatch('recipes/cook', {ingredients: ['meat'], cookingMethod: 'cold'});
    expect(store.state.time.day).toBe(1);
    expect(store.state.time.timeLeft).toBe(0);
    expect(store.state.earnings.today).toBe(6);
    expect(store.state.earnings.current).toBe(6);
    store.dispatch('time/endDay');
    expect(store.state.time.day).toBe(2);
    expect(store.state.time.timeLeft).toBe(store.state.time.timeTotal);
    expect(store.state.earnings.today).toBe(0);
    expect(store.state.earnings.current).toBe(6);
    expect(store.getters['recipes/availableIngredients']).toHaveLength(2);
  });
});

import { createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import ErrorsModule from '@/store/modules/errors/ErrorsModule';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('TimeModule.ts', () => {
  let store: any;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        errors: ErrorsModule,
      },
    });
  });

  it('test the ShouldHaveSelectedIngredient error', () => {
    expect(store.state.errors.shouldHaveSelectedIngredient).toBe(false);
    store.dispatch('errors/triggerShouldHaveSelectedIngredient');
    expect(store.state.errors.shouldHaveSelectedIngredient).toBe(true);
    store.dispatch('errors/resolveShouldHaveSelectedIngredient');
    expect(store.state.errors.shouldHaveSelectedIngredient).toBe(false);
  });

  it('test the IngredientOutOfStock error', () => {
    expect(store.state.errors.ingredientOutOfStock).toBe(false);
    store.dispatch('errors/triggerIngredientOutOfStock');
    expect(store.state.errors.ingredientOutOfStock).toBe(true);
    store.dispatch('errors/resolveIngredientOutOfStock');
    expect(store.state.errors.ingredientOutOfStock).toBe(false);
  });
});

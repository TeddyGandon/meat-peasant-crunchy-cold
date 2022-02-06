import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Kitchen from '@/components/Kitchen.vue';
import RecipesModule from '@/store/modules/recipes/RecipesModule';
import TimeModule from '@/store/modules/time/TimeModule';
import EarningsModule from '@/store/modules/earnings/EarningsModule';
import ErrorsModule from '@/store/modules/errors/ErrorsModule';
import AppModule from '@/store/modules/app/AppModule';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Kitchen.vue', () => {
  let store: any;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        recipes: RecipesModule,
        time: TimeModule,
        earnings: EarningsModule,
        errors: ErrorsModule,
        app: AppModule,
      },
    });
  });

  it('toggle ingredients and see if it is in list', () => {
    const wrapper: any = shallowMount(Kitchen, {
      store,
      localVue,
    });
    expect(wrapper.vm.hasSelectedIngredient('meat')).toBe(false);
    wrapper.vm.toggleIngredient('meat');
    expect(wrapper.vm.hasSelectedIngredient('meat')).toBe(true);
    wrapper.vm.toggleIngredient('meat');
    expect(wrapper.vm.hasSelectedIngredient('meat')).toBe(false);
  });
});

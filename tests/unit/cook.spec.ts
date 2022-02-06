import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Cook from '@/views/Cook.vue';
import RecipesModule from '@/store/modules/recipes/RecipesModule';
import TimeModule from '@/store/modules/time/TimeModule';
import EarningsModule from '@/store/modules/earnings/EarningsModule';
import ErrorsModule from '@/store/modules/errors/ErrorsModule';
import AppModule from '@/store/modules/app/AppModule';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Cook.vue', () => {
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

  it('get the amber strength based on time left', () => {
    const wrapper: any = shallowMount(Cook, {
      store,
      localVue,
    });
    expect(wrapper.vm.getColorFromTimeLeft()).toBe('bg-amber-300');
  });
});

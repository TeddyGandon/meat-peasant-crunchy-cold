import Vue from 'vue';
import Vuex from 'vuex';
import RecipesModule from './store/modules/recipes/RecipesModule';
import TimeModule from './store/modules/time/TimeModule';
import EarningsModule from './store/modules/earnings/EarningsModule';
import ErrorsModule from './store/modules/errors/ErrorsModule';
import AppModule from './store/modules/app/AppModule';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    recipes: RecipesModule,
    time: TimeModule,
    earnings: EarningsModule,
    errors: ErrorsModule,
    app: AppModule,
  },
});

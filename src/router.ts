import Vue from 'vue';
import Router from 'vue-router';
import Cook from './views/Cook.vue';
import Shop from './views/Shop.vue';

Vue.use(Router);

export default new Router({
  mode: 'abstract',
  routes: [
    {
      path: '/',
      name: 'cook',
      component: Cook,
    },
    {
      path: '/shop',
      name: 'shop',
      component: Shop,
    },
  ],
});

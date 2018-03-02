import Vue from 'vue';
import Router from 'vue-router';
import indexPage from '@/pages/indexPage';
import recommendPage from '@/pages/recommendPage';
import searchPage from '@/pages/searchPage';
import superSearchPage from '@/pages/superSearchPage';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: indexPage,
    },
    {
      path: '/recommend/',
      name: 'recommend',
      component: recommendPage,
    },
    {
      path: '/search/',
      name: 'search',
      component: searchPage,
    },
    {
      path: '/superSearch/',
      name: 'superSearch',
      component: superSearchPage,
    },
  ],
});

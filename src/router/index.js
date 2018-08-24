import Vue from 'vue';
import Router from 'vue-router';
import indexPage from '@/pages/indexPage';
import Infrastructure from '@/pages/Infrastructure';
import searchPage from '@/pages/searchPage';
import superSearchPage from '@/pages/superSearchPage';
import TicketDetailPage from '@/pages/TicketDetailPage';
import CollectionsPage from '@/pages/CollectionsPage';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'app',
      component: Infrastructure,
      children: [
        {path: "/home", name: 'home', component: indexPage},
        {path: "/superSearch", name: 'superSearch', component: superSearchPage},
      ]
    },
    {
      path: '/ticket-detail-page',
      name: 'ticket-detail',
      component: TicketDetailPage,
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
    {
      path: '/collections/',
      name: 'collections',
      component: CollectionsPage,
    },
  ],
})


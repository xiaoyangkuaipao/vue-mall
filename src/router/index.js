import Vue from 'vue';
import Router from 'vue-router';
import indexPage from '@/pages/indexPage';
import Infrastructure from '@/pages/Infrastructure';
import searchPage from '@/pages/searchPage';
import superSearchPage from '@/pages/superSearchPage';
import TicketDetailPage from '@/pages/TicketDetailPage';
import CollectionsPage from '@/pages/CollectionsPage';
import MinePage from '@/pages/MinePage';
import TopicPage from '@/pages/TopicPage';
import sharePage from '@/pages/sharePage';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'app',
      component: Infrastructure,
      redirect: '/home',
      children: [
        {path: "/home", name: 'home', component: indexPage},
        {path: "/superSearch", name: 'superSearch', component: superSearchPage},
        {path: '/collections/', name: 'collections', component: CollectionsPage},
        {path: '/mine/', name: 'mine', component: MinePage},
      ]
    },
    {
      path: '/share',
      name: 'share',
      component: sharePage,
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
      path: '/topic/',
      name: 'topic',
      component: TopicPage,
    }
  ],
})


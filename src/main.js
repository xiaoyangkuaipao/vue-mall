// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import App from './App';
import router from './router';
import store from './store';
import api from './api/api';
import './app.css';
import $ from 'jquery';

Vue.use(MintUI);
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;
Vue.prototype.api = api;

Vue.directive('scrollMore', {
  bind: function(el, binding) {
    $(window).on('scroll', function() {
      const clientHeight = $(this).height();
      const scrollTop = $(this).scrollTop();
      const scrollHeight = $(document).height();
      el.dataset.top = scrollTop;
      if(scrollTop + clientHeight == scrollHeight){
        binding.value();
      }
    })
  },
  unbind: function () {
    $(window).off('scroll');
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  watch: {
    $route(to,from){
      const superSearchInfo = {...this.$store.state.superSearchInfo};
      const searchInfo = {...this.$store.state.searchInfo};
      if(from.name === 'superSearch') {
        if(to.name === 'ticket-detail') {  // 只在查看详情时保存superSearch的搜索内容
          superSearchInfo.cache = true;
        } else {
          superSearchInfo.cache = false;
        }
      }
      if(from.name === 'search') {
        if(to.name === 'ticket-detail') {  // 只在查看详情时保存search的搜索内容
          searchInfo.cache = true;
        } else {
          searchInfo.cache = false;
        }
      }
      if(to.name === "home" || "superSearch") {
        this.$store.commit('SET_TAB', to.name);
      }
      this.$store.commit('SET_SUPERSEARCHS', superSearchInfo);
      this.$store.commit('SET_SEARCH_TICKETS', searchInfo);
    },
    deep: true
  },
});

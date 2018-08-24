/**
 * Created by oxygen on 2017/8/11.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './action';
import getters from './getters';

Vue.use(Vuex);

const state = {
  ticket: {},  // 当前优惠券
  showRedPacket: false, // 是否显示红包
  indexInfo: { // 首页所有信息
    tickets: [], // 首页所有的优惠券,
    page: 1, // 首页当前页码
    top: 0,  // 首页scrolltop
  },
  searchInfo: { // 搜索页所有信息
    tickets: [], // 搜索页所有的优惠券,
    page: 1, // 搜索页当前页码
    q: '',   // 搜索页搜索词
    top: 0,  // 搜索页scrolltop
    cache: false,    // 是否使用缓存
  },
  superSearchInfo: { // 淘口令页面所有信息
    ticket: null,    // 当前搜索券
    recommends: [],  // 淘口令所有的优惠券,
    taokouling: '',  // 淘口令
    cache: false,    // 是否使用缓存
  },
  collections: [],     // 收藏夹信息,
  collectionsTop: 0,  // 收藏夹高度
  history: [],     // 搜索历史
  tab: '',         // 下标active
};

// const state = window.sessionStorage.getItem('state') ? JSON.parse(window.sessionStorage.getItem('state')) : initState;

if(window.localStorage.getItem('history')) {
  state.history = JSON.parse(window.localStorage.getItem('history'));
}

if(window.localStorage.getItem('collections')) {
  state.collections = JSON.parse(window.localStorage.getItem('collections'));
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});



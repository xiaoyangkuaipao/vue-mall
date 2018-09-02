/**
 * Created by oxygen on 2017/8/11.
 */
import {
  SET_TICKETINFO,
  SET_INDEX_TICKETS,
  SET_RED_PACKET_STATUS,
  SET_SEARCH_TICKETS,
  SET_COLLECTIONS,
  SET_SUPERSEARCHS,
  SET_HISTORY,
  SET_TAB,
  EMPTY_HISTORY,
  SET_COLLECTIONS_TOP,
  CANCEL_COLLECTIONS,
  SET_MINE_TICKETS,
  SET_TOPIC
} from './mutation-types';

import { getCurrentDate } from '../utils/index';

export default {
  [SET_TICKETINFO](state, ticket) {
    state.ticket = ticket;
    // window.sessionStorage.setItem('state', JSON.stringify(state));
  },
  [SET_RED_PACKET_STATUS](state, status) {
    if(status) {
      state.showRedPacket = status;
    } else {
      state.showRedPacket = !state.showRedPacket;
    }
  },
  [SET_INDEX_TICKETS](state, {
    tickets,
    page,
    top
  }) {
    state.indexInfo.tickets = tickets;
    state.indexInfo.page = page;
    state.indexInfo.top = top;
    // window.sessionStorage.setItem('state', JSON.stringify(state));
  },
  [SET_SEARCH_TICKETS](state, {
    tickets,
    cache,
    page,
    top,
    q,
  }) {
    state.searchInfo.tickets = tickets;
    state.searchInfo.cache = cache;
    state.searchInfo.page = page;
    state.searchInfo.top = top;
    state.searchInfo.q = q;
  },
  [SET_COLLECTIONS](state,
    ticket,
  ) {
    const arr = state.collections.filter(c => c.num_iid !== ticket.num_iid);
    arr.push(ticket);
    state.collections = arr;
    window.localStorage.setItem('collections', JSON.stringify(state.collections));
  },
  [SET_MINE_TICKETS](state,
    ticket,
  ) {
    const date = getCurrentDate(1);
    if(state.mines.tickets.hasOwnProperty(date)) {
      const tickets = state.mines.tickets[date];
      const flag = tickets.every(t  => t.num_iid !== ticket.num_iid);
      if(flag) {
        state.mines.tickets[date].push(ticket)
        state.mines.len = Number(state.mines.len) + 1;

        state.mines.sum = Number(state.mines.sum) + Number(ticket.discountPrice);
      }
    } else {
      state.mines.tickets[date] = [];
      state.mines.tickets[date].push(ticket)
      state.mines.len = Number(state.mines.len) + 1;
      state.mines.sum = Number(state.mines.sum) + Number(ticket.discountPrice);
    }
    window.localStorage.setItem('mines', JSON.stringify(state.mines));
  },
  [CANCEL_COLLECTIONS](state,
    ticket,
  ) {
    const arr = state.collections.filter(c => c.num_iid !== ticket.num_iid);
    state.collections = arr;
    window.localStorage.setItem('collections', JSON.stringify(state.collections));
  },
  [SET_TOPIC](state, topic) {
    state.topic = topic;
    window.sessionStorage.setItem('topic', JSON.stringify(state.topic));
  },
  [SET_TAB](state, tab) {
    state.tab = tab;
  },
  [SET_COLLECTIONS_TOP](state, top) {
    state.collectionsTop = top;
  },
  [SET_SUPERSEARCHS](state, {
     ticket,
     recommends,
     taokouling,
     cache
   }
  ) {
    state.superSearchInfo.ticket = ticket;
    state.superSearchInfo.recommends = recommends;
    state.superSearchInfo.taokouling = taokouling;
    state.superSearchInfo.cache = cache;
    // window.sessionStorage.setItem('state', JSON.stringify(state));
  },
  [SET_HISTORY](state, history) {
    const arr = state.history.filter(h=> h !== history);
    if(arr.length > 20) {
      arr.shift();
    }
    arr.push(history);
    state.history = arr;
    window.localStorage.setItem('history', JSON.stringify(arr));
  },
  [EMPTY_HISTORY](state) {
    state.history = [];
    window.localStorage.setItem('history', JSON.stringify(state.history));
  }
}

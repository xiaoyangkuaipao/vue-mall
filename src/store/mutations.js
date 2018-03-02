/**
 * Created by oxygen on 2017/8/11.
 */
import {
  SET_TICKETINFO,
} from './mutation-types';

export default {
  [SET_TICKETINFO](state, {
    ticket,
  }) {
    state.ticket = ticket;
  },
}

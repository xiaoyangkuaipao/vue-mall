<template>
  <div class="mine-page">
    <header>我的淘货er</header>
    <div class="show-mine">
      <section>
        <p>共领券</p>
        <p>{{mines.len}}</p>
        <p>张</p>
      </section>
      <section>
        <p>共省钱</p>
        <p>{{mines.sum}}</p>
        <p>元</p>
      </section>
    </div>
    <h3 style="font-size: 12px; text-align: center; color: #ff9999">/\  淘货er之旅  /\</h3>
    <div>
      <timeline>
        <timeline-item bg-color="#ff9999" v-if="Object.keys($store.state.mines.tickets).length > 0" v-for="item in Object.keys($store.state.mines.tickets)">
          <p style="font-size: 12px; color: #999">{{item}}</p>
          <simple-tickets-item
            v-for="ticket in mines.tickets[item]"
            :tickets-info="ticket"
            :key="ticket.num_iid">
          </simple-tickets-item>
        </timeline-item>
        <timeline-item bg-color="#ff9999" v-if="Object.keys($store.state.mines.tickets).length === 0">
          <p style="font-size: 14px; color: #999">立即领券，开启淘货er之旅</p>
        </timeline-item>
      </timeline>
    </div>
  </div>
</template>

<script>
import { Timeline, TimelineItem, TimelineTitle } from 'vue-cute-timeline';
import simpleTicketsItem from '../components/SimpleTicketsItem';

export default {
  name: 'mine',
  data() {
    return {
      mines: {},
    };
  },
  created() {
    this.mines = this.$store.state.mines;
  },
  components: {
    Timeline,
    TimelineItem,
    TimelineTitle,
    simpleTicketsItem,
  },
};
</script>

<style rel='stylesheet/less' lang='less' scoped>
  .mine-page {
    padding-bottom: 55px;

    >header {
      height: 3rem;
      line-height: 3rem;
      text-align: center;
      font-size: 16px;
      background-color: #fff2da;
      color: #666;
      letter-spacing: 1px;
      font-weight: bolder;
    }

    .show-mine {
      width: 100vw;
      height: 29vw;
      display: flex;
      >section:first-of-type {
        border-right: 1px dotted #ff9999;
      }
      >section {
        flex: 1;
        border-bottom: 1px dotted #ff9999;
        font-weight: bolder;
        color: #ff9999;
        font-size: 14px;

        >p:nth-of-type(1) {
          height: 8vw;
          line-height: 8vw;
          padding-left: 1rem;
        }

        >p:nth-of-type(2) {
          height: 13vw;
          line-height: 13vw;
          text-align: center;
          font-size: 40px;
          font-weight: bolder;
          color: #666;
        }

        >p:nth-of-type(3) {
          height: 8vw;
          line-height: 8vw;
          text-align: right;
          padding-right: 1rem;
        }
      }
    }
  }
</style>

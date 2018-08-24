<template>
  <div class='index-page' ref="indexPage" v-scroll-more="loadMore" >
    <SearchItem style="position: fixed; top: 0; z-index: 100"/>
    <mt-swipe :auto="10000" class="swiper">
      <mt-swipe-item>
        <img src="../../static/imgs/slogan-1.jpg" class="slide-image">
      </mt-swipe-item>
      <mt-swipe-item class="slide-image">
        <img src="../../static/imgs/slogan-2.jpg" class="slide-image">
      </mt-swipe-item>
      <mt-swipe-item class="slide-image">
        <img src="../../static/imgs/slogan-3.jpg" class="slide-image">
      </mt-swipe-item>
    </mt-swipe>
    <div class="subject-block">
      <h3 style="font-size: 10px; text-align: center; color: #ff9999">/\  淘货er专区  /\</h3>
      <section>
        淘货er精选
      </section>
      <section>
        <article>
          <p>拼个团</p>
        </article>
        <article>
          <p>大牌驾到</p>
        </article>
      </section>
    </div>
    <div
      keep-alive
      class="tickets">
      <h3 style="font-size: 10px; text-align: center; color: #ff9999">/\  好券er放送  /\</h3>
      <tickets-item
        v-for='(item, index) in this.$store.state.indexInfo.tickets'
        :tickets-info='item'
        :key='index'
        >
      </tickets-item>
    </div>
    <div class="footer-text" v-if="isLast">~~是时候看到淘货er的底线了~~</div>
  </div>
</template>

<script>
import { Indicator } from 'mint-ui';
import imgWithText from '../components/img-with-text';
import ticketsItem from '../components/TicketsItem';
import SearchItem from '../components/SearchItem';
import $ from 'jquery';

export default {
  data() {
    return {
      ticketsInfo: [],
      ticket: {},
      isLast: false,
      immediate: false,
      showTicketInfo: false,
      searchPage: 1,
      q: '',
    };
  },
  created() {
    if(this.$store.state.indexInfo.tickets.length === 0) {  // 初始化的时候加载一次
      this.getTickets(this.q, this.searchPage)
    } else {
      this.ticketsInfo = this.$store.state.indexInfo.tickets;
    }
  },
  mounted() {
    if(this.$store.state.indexInfo.top) {
      window.scrollTo(0, this.$store.state.indexInfo.top);
    }
  },
  beforeDestroy() {
    const scrollTop = this.$refs['indexPage'].dataset.top;
    const indexInfo = {...this.$store.state.indexInfo};
    indexInfo.top = scrollTop;
    this.$store.commit('SET_INDEX_TICKETS', indexInfo);
  },
  methods: {
    async getTickets(q, page) {   // q: 查询内容 ； page: 查询页数
      Indicator.open({
        text: '淘货er中',
        spinnerType: 'fading-circle',
      });
      const resp = await this.api.getTickets(q, page);
      const appendTickets = resp.results.tbk_coupon;
      const len = appendTickets.length;
      if (len < 20) {
        this.isLast = true;
      }
      for (let i = 0; i < len; i += 1) {
        const discount = appendTickets[i].coupon_info ? appendTickets[i].coupon_info.match(/\d+/g) : 0;
        const discountPrice = discount[1] ? discount[1] : discount[0];
        appendTickets[i].discountPrice = discountPrice;
        appendTickets[i].discount =
          (Number(appendTickets[i].zk_final_price) - discountPrice).toFixed(2);
      }
      this.ticketsInfo = this.ticketsInfo.concat(appendTickets);
      const ticketsInfo = {...this.$store.state.indexInfo};
      ticketsInfo.tickets = this.ticketsInfo;
      ticketsInfo.page = page;
      this.$store.commit('SET_INDEX_TICKETS', ticketsInfo);
      Indicator.close();
    },

    loadMore() {
      this.searchPage = this.$store.state.indexInfo.page + 1;
      this.getTickets(this.q, this.searchPage);
    },
  },
  components: { imgWithText, ticketsItem, SearchItem },
};
</script>

<style rel='stylesheet/less' lang='less' scoped>
  .index-page{
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: auto;
    padding: 2.5rem 0 55px 0;
  }

  .tickets{
    flex: 1;
    overflow-y: auto;
  }

  .swiper{
    height: 20vh;
  }

  .slide-image{
    width: 100vw;
    height: 20vh;
    background-size: cover;
  }

  .subject-block {
    >section {
      display: flex;
      width: 95vw;
      height: 30vw;
      margin: .8rem auto;
      text-align: center;
      justify-content: space-between;

      >article {
        display: inline-block;
        width: 45vw;
        height: 100%;
        box-shadow: 2px 2px 2px 2px #DDD;
      }
    }

    >section:first-of-type {
      box-shadow: 2px 2px 2px 2px #DDD;
    }
  }

  .footer-text{
    width: 100vw;
    height: 1rem;
    text-align: center;
    font-size: .6rem;
    color: #A8725A;
  }

  .ticket-info{
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, .3);
    z-index: 10;
  }

  .ticket-info .header{
    position: relative;
    margin-top: -25vh;
    width: 80vw;
    background-color: #EEE;
    font-size: 1rem;
    height: 2rem;
    line-height: 2rem;
    color: green;
    border-radius: .6rem;
    text-align: center;
    letter-spacing: 2px;
  }

  .ticket-info .content{
    width: 70vw;
    display: flex;
    flex-direction: column;
    background-color: #EEE;
    border-radius:0 0 8px 8px;
  }

  .ticket-info .content p {
    margin: 5px 10px;
  }

  .ticket-info .content .title{
    font-size: .7rem;
    line-height: 1rem;
    text-align:justify
  }

  .ticket-info .content .zk-final-price{
    font-size: .7rem;
    text-decoration: line-through;
    color: #AAA;
  }

  .ticket-info .content .discount{
    font-size: .8rem;
  }

  .ticket-info .content .model{
    font-size: 1rem;
    color: red;
  }
</style>

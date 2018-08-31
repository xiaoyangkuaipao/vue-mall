<template>
  <div class="search-page" ref="searchPage">
    <div class="search" v-if="!this.$route.params.q">
      <i class="iconfont icon-yewutubiaosheng search-icon"></i>
      <input
        class="search-input"
        placeholder="淘货er， 最全淘宝优惠券！"
        v-model="q"
        @click="search">
      <i class="iconfont icon-sousuo sousuo-icon"></i>
      <i class="iconfont icon-shanchu3 delete-icon" v-if="q" @click="cancel"></i>
      <span style="font-size: 14px; color: #555; letter-spacing: 1px" @click="search">搜索</span>
    </div>
    <div style="margin-top: 3.5rem" v-if="!this.$route.params.q && ticketsInfo.length === 0">
      <p style="font-size: 12px; text-align: left; color: #AAA; padding-left: .5rem;" >热门搜索</p>
      <div class="history">
        <label
          class="history-item"
          v-for='item in this.hot'
          :key="item"
          @click="searchHistory(item)"
        >{{item}}</label>
      </div>
      <p class="history-title">
        <span>搜索历史</span>
        <span style="margin-right: 1rem" @click="emptyHistory">
          <i class="iconfont icon-qingkong"/>
          <span>清空历史</span>
        </span>
      </p>
      <div class="history">
        <label
          class="history-item"
          v-for='item in this.$store.state.history'
          :key="item"
          @click="searchHistory(item)"
        >{{item}}</label>
      </div>
    </div>
    <div style="margin-top: 3rem" v-if="!this.$route.params.q">
      <tickets-item
        v-for='(item, index) in ticketsInfo'
        :tickets-info='item'
        :key='index'>
      </tickets-item>
    </div>
    <header class="header" v-if="this.$route.params.name"></header>
    <img :src="this.$route.params.img" :alt="this.$route.params.name" style="width: 100vw; height: 45vw;" v-if="this.$route.params.img">
    <div v-if="this.$route.params.q" class="card-search-page">
      <card-tickets-item
        v-for='(item, index) in ticketsInfo'
        :tickets-info='item'
        :key='index'>
      </card-tickets-item>
    </div>
    <div class="footer-text" v-if="isLast">~~是时候看到淘货er的底线了~~</div>
  </div>
</template>

<script>
import { Indicator } from 'mint-ui';
import ticketsItem from '../components/TicketsItem';
import cardTicketsItem from '../components/CardTicketsItem';
import $ from 'jquery';

export default {
  data() {
    return {
      hot: ['手机', '洗衣液', '卫生纸', '时尚连衣裙', '化妆品', '男鞋', '拉杆箱', '巧克力', '内衣'],
      ticketsInfo: [],
      searchPage: 1,
      q: '',
      isLast: false,
    };
  },
  created() {
    const searchInfo = this.$store.state.searchInfo;
    if(searchInfo.cache) {
      this.ticketsInfo = searchInfo.tickets;
      this.searchPage = searchInfo.page;
      this.q = searchInfo.q;
    }
    if(this.$route.params.q) {
      this.q = this.$route.params.q;
      this.search();
    }
  },
  mounted() {
    const searchInfo = this.$store.state.searchInfo;
    if(searchInfo.cache && searchInfo.top) {
      window.scrollTo(0, searchInfo.top);
    }
    const self = this;
    $(window).on('scroll', async function() {
      const clientHeight = $(this).height();
      const scrollTop = $(this).scrollTop();
      const scrollHeight = $(document).height();
      self.$refs['searchPage'].dataset.top = scrollTop;
      if(scrollTop + clientHeight + 50 > scrollHeight){
        await self.loadMore();
      }
    })
  },
  beforeDestroy() {
    const scrollTop = this.$refs['searchPage'].dataset.top;
    const searchInfo = {...this.$store.state.searchInfo};
    searchInfo.top = scrollTop;
    this.$store.commit('SET_SEARCH_TICKETS', searchInfo);
  },
  destroyed() {
    $(window).off('scroll')
  },
  methods: {
    cancel() {
      this.q  = "";
      this.ticketsInfo = [];
    },
    searchHistory(q) {
      this.q = q;
      this.search();
    },
    async search() {
      this.searchPage = 1;
      this.ticketsInfo = [];
      if(!this.q) {
        return
      }else{
        await this.getTickets(this.q, this.searchPage);
        this.$store.commit('SET_HISTORY', this.q)
      }
    },
    loadMore() {
      if(this.q) {
        this.searchPage = this.$store.state.searchInfo.page + 1;
        this.getTickets(this.q, this.searchPage);
      }
    },
    emptyHistory() {
      this.$store.commit('EMPTY_HISTORY')
    },
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
      ticketsInfo.q = this.q;
      this.$store.commit('SET_SEARCH_TICKETS', ticketsInfo);
      Indicator.close();
    },
  },
  components: { ticketsItem, cardTicketsItem },
};
</script>

<style rel='stylesheet/less' lang='less' scoped>
  .history {
    padding: 5px 0;
  }

  .history-title {
    display: flex;
    justify-content: space-between;
    color: #AAA;
    padding-left: .5rem;
    margin-top: .5rem;
    font-size: 12px;
  }

  .history-item {
    display: inline-block;
    padding: 3px 10px;
    margin: .2rem;
    font-size: 12px;
    border-radius: 5px;
    background-color: #EEE;
  }

  .sousuo-icon {
    position: absolute;
    left: 20vw;
  }

  .delete-icon {
    position: absolute;
    left: 74vw;
  }

  .card-search-page {
    position: relative;
    margin-top: -.75rem;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    background-color: rgb(240, 240 ,240);
  }

  .search{
    width: 100vw;
    height: 3rem;
    position: fixed;
    top: 0;
    left: 0;
    line-height: 3rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: #FFF;
    background-color: #ff9999;
    z-index: 10;
  }

  .header {
    width: 100vw;
    height: 3rem;
    line-height: 3rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: #FFF;
    font-size: 16px;
    font-weight: bolder;
    background-color: #ff9999;
  }

  .search:hover {
    opacity: 1;
  }

  .search-icon{
    font-size: 1.6rem;
  }

  .search-icon:nth-of-type(1){
    color: red;
  }

  .search-icon:nth-of-type(2){
    color: red;
  }

  .search-input{
    position: relative;
    width: 55vw;
    height: 1.4rem !important;
    line-height: 1.4rem;
    padding-left: 1.5rem;
    font-size: 12px;
    letter-spacing: 2px;
    border-radius: 5px;
    border: 1px solid #FFF;
    color: #FFF;
    background-color: transparent;
    background-image: none !important;
  }

  input::-webkit-input-placeholder{
    color:#FFF;
  }
  input::-moz-placeholder{   /* Mozilla Firefox 19+ */
    color:#FFF;
  }
  input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
    color:#FFF;
  }
  input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
    color:#FFF;
  }

</style>

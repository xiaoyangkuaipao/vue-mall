<template>
  <div class="search-page" ref="topicPage">
    <img :src="topic.img" :alt="topic.q" style="width: 100vw; height: 40vw;" >
    <div class="card-search-page">
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
import cardTicketsItem from '../components/CardTicketsItem';
import $ from 'jquery';

export default {
  data() {
    return {
      ticketsInfo: [],
      searchPage: 1,
      q: '',
      isLast: false,
      topic: {},
    };
  },
  created() {
    if(this.$route.params.q) {
      this.q = this.$route.params.q;
      const topic = this.$route.params;
      this.topic = topic;
      this.search();
    } else {
      const topic = this.$store.state.topic;
      this.topic = topic.topic;
      this.q = this.topic.q;
      this.ticketsInfo = topic.tickets;
    }
  },
  mounted() {
    const topic = this.$store.state.topic;
    if(topic.top) {
      window.scrollTo(0, topic.top);
    }
    const self = this;
    $(window).on('scroll', async function() {
      const clientHeight = $(this).height();
      const scrollTop = $(this).scrollTop();
      const scrollHeight = $(document).height();
      self.$refs['topicPage'].dataset.top = scrollTop;
      if(scrollTop + clientHeight + 50 > scrollHeight){
        await self.loadMore();
      }
    })
  },
  beforeDestroy() {
    const scrollTop = this.$refs['topicPage'].dataset.top;
    const topic = {...this.$store.state.topic};
    topic.top = scrollTop;
    topic.topic = this.topic;
    this.$store.commit('SET_TOPIC', topic);
  },
  destroyed() {
    $(window).off('scroll')
  },
  methods: {
    async search() {
      this.searchPage = 1;
      this.ticketsInfo = [];
      if(!this.q) {
        return
      }else{
        await this.getTickets(this.q, this.searchPage);
      }
    },
    loadMore() {
      if(this.q) {
        this.searchPage = this.$store.state.topic.page + 1;
        this.getTickets(this.q, this.searchPage);
      }
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
      const topic = {...this.$store.state.topic};
      topic.tickets = this.ticketsInfo;
      topic.page = page;
      this.$store.commit('SET_TOPIC', topic);
      Indicator.close();
    },
  },
  components: { cardTicketsItem },
};
</script>

<style rel='stylesheet/less' lang='less' scoped>
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

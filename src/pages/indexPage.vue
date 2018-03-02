<template>
  <div class='index-page'>
    <div class="ticket-info" v-if="showTicketInfo" ref="ticket" @click="hideTicketInfo($event)">
      <div class="header">
        领券成功！
      </div>
      <div class="content">
        <p class="title">{{ticket.title}}</p>
        <p class="zk-final-price">原价：{{ticket.zk_final_price}}</p>
        <p class="discount">券后价：{{ticket.discount}}</p>
        <p class="model">优惠券码：{{ticket.model}}</p>
        <p class="title">复制上述优惠券码打开淘宝即可领券购物！</p>
      </div>
    </div>
    <div class="search">
      <i class="iconfont icon-taobao search-icon"></i>
      <i class="iconfont icon-yewutubiaosheng search-icon"></i>
      <div
        class="search-input"
        @click="search"> 淘货er， 最全淘宝优惠券！
      </div>
      <i class="iconfont icon-101 search-icon"></i>
      <i class="iconfont icon-tehui search-icon"></i>
    </div>
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
    <div class="categories">
      <div
        class="categories-item"
        v-for='(item, index) in categories'
        @click="setCategory(item.q)">
        <img-with-text
          :content='item'
          :key='index'>
        </img-with-text>
      </div>
    </div>
    <div
      keep-alive
      class="tickets"
      v-infinite-scroll="loadMore"
      infinite-scroll-immediate-check="immediate"
      infinite-scroll-distance="20">
      <tickets-item
        v-for='(item, index) in ticketsInfo'
        :tickets-info='item'
        :key='index'
        @ticket='setTicket'>
      </tickets-item>
    </div>
    <div class="footer-text" v-if="isLast">~~是时候看到淘货er的底线了~~</div>
  </div>
</template>

<script lang='babel'>
import { Indicator } from 'mint-ui';
import imgWithText from '../components/img-with-text';
import ticketsItem from '../components/tickets-item';

export default {
  data() {
    return {
      categories: [{
        name: '全部',
        q: '',
        pic: '../../static/imgs/all.jpg',
      }, {
        name: '女装',
        q: '女装',
        pic: '../../static/imgs/lady-clothes.jpg',
      }, {
        name: '男装',
        q: '男装',
        pic: '../../static/imgs/man-clothes.jpg',
      }, {
        name: '女鞋',
        q: '女鞋',
        pic: '../../static/imgs/lady-shoes.jpg',
      }, {
        name: '男鞋',
        q: '男鞋',
        pic: '../../static/imgs/man-shoes.jpg',
      }, {
        name: '美妆',
        q: '美妆',
        pic: '../../static/imgs/lips.jpg',
      }, {
        name: '零食',
        q: '零食',
        pic: '../../static/imgs/snacks.jpg',
      }, {
        name: '箱包',
        q: '旅行箱',
        pic: '../../static/imgs/bags.jpg',
      }, {
        name: '电器',
        q: '电',
        pic: '../../static/imgs/appliances.jpg',
      }, {
        name: '保健品',
        q: '保健品',
        pic: '../../static/imgs/health.jpg',
      }],
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
    const self = this;
    this.getTicketsItem();
  },
  methods: {
    search() {
      this.$router.push({
        name: 'search',
      })
    },
    hideTicketInfo(e) {
      if(e.target.className === "ticket-info"){
        this.showTicketInfo = false;
      }
    },
    setCategory(q) {
      this.q = q;
      this.searchPage = 1;
      this.ticketsInfo = [];
      this.getTicketsItem();
    },
    setTicket() {
      this.ticket = this.$store.state.ticket;
      this.showTicketInfo = true;
    },
    getTicketsItem() {
      Indicator.open({
        text: '淘货er中',
        spinnerType: 'fading-circle',
      });
      const self = this;
      this.axios.get('https://www.iamyangqi.cn/wx-new-mall/getTickets.php', {
        params: {
          q: self.q,
          page: self.searchPage,
        },
      }).then(function (resp) {
        const appendTickets = resp.data.results.tbk_coupon;
        const len = appendTickets.length;
        if (len < 20) {
          self.isLast = true;
        }
        for (let i = 0; i < len; i += 1) {
          const discount = appendTickets[i].coupon_info ? appendTickets[i].coupon_info.match(/\d+/g) : 0;
          const discountPrice = discount[1] ? discount[1] : discount[0];
          appendTickets[i].discountPrice = discountPrice;
          appendTickets[i].discount =
            (Number(appendTickets[i].zk_final_price) - discountPrice).toFixed(2);
        }
        self.ticketsInfo = self.ticketsInfo.concat(appendTickets);
        Indicator.close();
      });
    },
    loadMore() {
      this.searchPage += 1;
      this.getTicketsItem();
    },
  },
  components: { imgWithText, ticketsItem },
};
</script>

<style rel='stylesheet/less' lang='less' scoped>
  .index-page{
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }

  .categories{
    width: 100vw;
    height: 4.5rem;
    margin-top: .5rem;
    overflow-x: auto;
    display: flex;
  }

  .categories-item{
    margin:0 .5rem;
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

  .search{
    width: 100vw;
    height: 2.5rem;
    line-height: 2.5rem;
    margin-bottom: .2rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .search-icon{
    font-size: 1.6rem;
  }

  .search-icon:nth-of-type(1){
    color: orange;
  }

  .search-icon:nth-of-type(2){
    color: #F15A24;
  }

  .search-icon:nth-of-type(3){
    color: #F15A24;
  }

  .search-icon:nth-of-type(4){
    color: orange;
  }

  .search-input{
    position: relative;
    width: 13rem;
    height: 1.4rem !important;
    line-height: 1.4rem;
    padding-left: 1.5rem;
    font-size: .6rem;
    letter-spacing: 2px;
    border-radius: 5px;
    border: 1px solid #CCC;
    color: #A8725A;
  }

  .search-input::before {
    position: absolute;
    left: .14rem;
    content: "\e61e";
    font-family: "iconfont";
    font-size: 1rem;
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

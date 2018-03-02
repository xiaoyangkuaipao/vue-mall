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
      <div class="search-input-wrapper">
        <i class="iconfont icon-sousuo search-input-icon"></i>
        <input class="search-input" v-model="q" placeholder="输入淘宝标题或您想要的宝贝" />
        <i class="iconfont icon-shanchu3 search-delete" @click="cancel"></i>
      </div>
      <span class="search-btn" @click="search">搜索</span>
    </div>
    <div class="tickets-img" v-if="ticketsInfo.length===0">
      <div style="text-align: center">
        <img src="../../static/imgs/super-search-btn.gif" class="super-btn" @click="superSearch" />
      </div>
      <img src="../../static/imgs/search-bg.jpg" class="search-bg" />
    </div>
    <div
      class="tickets"
      v-infinite-scroll="loadMore"
      infinite-scroll-immediate-check="immediate"
      infinite-scroll-distance="20"
      v-if="ticketsInfo.length!==0">
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
import ticketsItem from '../components/tickets-item';

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

  },
  methods: {
    hideTicketInfo(e) {
      if(e.target.className === "ticket-info"){
        this.showTicketInfo = false;
      }
    },
    cancel() {
      this.q  = "";
    },
    search() {
      this.searchPage = 1;
      this.ticketsInfo = [];
      if(!this.q) {
        return
      }else{
        this.getTicketsItem();
      }
    },
    superSearch() {
      this.$router.push({
        name: 'superSearch',
      })
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
  components: { ticketsItem },
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

  .search-btn {
    margin-right: 1rem;
    font-size: .8rem;
    letter-spacing: 2px;
    -webkit-tap-highlight-color:transparent;
  }

  .super-btn{
    width: 150px;
    height: 45px;
    display: inline-block;
    margin: 1.2rem auto 0 auto;
  }

  .tickets{
    flex: 1;
    overflow-y: auto;
  }

  .tickets-img{
    flex: 1;
    overflow-y: hidden;
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

  .search-input-wrapper{
    position: relative;
    margin-top: -.2rem;
  }

  .search-input-icon{
    position: absolute;
    top: 0.05rem;
    left: .2rem;
    z-index: 1;
  }

  .search-delete{
    position: absolute;
    top:.1rem;
    left: 13.3rem;
    z-index: 1;
    font-size: .75rem;
    color: #CCC;
    -webkit-tap-highlight-color:transparent;
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
    padding-left: 1.3rem;
    font-size: .6rem;
    letter-spacing: 2px;
    border-radius: 5px;
    border: 1px solid #CCC;
    color: #A8725A;
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

  .search-bg{
    width: 100vw;
    height: 100%;
  }
</style>

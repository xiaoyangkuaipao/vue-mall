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
    <div class="search-text">
      <p class="tips">温馨提示：本搜索引擎支持淘口令精确搜索优惠券</p>
      <div class="token">
        <textarea cols="30" rows="7" v-model="token" placeholder="请在搜索框内粘贴淘宝令" style="background-color: #F0DEC6;"></textarea>
      </div>
    </div>
    <div class="search-btn" @click="search"></div>
    <div class="tickets-img" v-if="ticketsInfo.length===0">
      <div class="search-bg"></div>
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
  </div>
</template>

<script lang='babel'>
import { Indicator, Toast  } from 'mint-ui';
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
      token: '',
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
    search() {
      const self = this;
      if(!(/\￥(.+)\￥/g).test(this.token)) {
        Toast('淘口令不合法！');
        return
      }
      const token = this.token.match(/\￥(.+)\￥/g)[0];

      this.axios.get('https://www.iamyangqi.cn/wx-new-mall/superSearch.php', {
        params: {
          token: token
        },
      }).then(function(resp) {
        const title = resp.data.content ? resp.data.content.match(/\（(.+)\）/g)[0].replace(/\（|\）/g, "")  : "";
        const id = resp.data.url ? resp.data.url.match(/&id=(\d*)/)[1] : "";
        self.axios.get('https://www.iamyangqi.cn/wx-new-mall/getRecommends.php', {
          params: {
            q: title,
          },
        }).then(function (resp) {
          const appendTickets = resp.data.results.tbk_coupon;
          const len = appendTickets.length;
          if (len < 100) {
            self.isLast = true;
          }
          for (let i = 0; i < len; i += 1) {
            if(appendTickets[i].num_iid == id) {
              const discount = appendTickets[i].coupon_info ? appendTickets[i].coupon_info.match(/\d+/g) : 0;
              const discountPrice = discount[1] ? discount[1] : discount[0];
              appendTickets[i].discountPrice = discountPrice;
              appendTickets[i].discount =
                (Number(appendTickets[i].zk_final_price) - discountPrice).toFixed(2);
              self.ticketsInfo = [];
              self.ticketsInfo.push(appendTickets[i]);
              break;
            }
          }
          if(self.ticketsInfo.length == 0) {
            Toast('抱歉！该商品暂无优惠券！');
            this.$router.push({
              name: 'recommend',
              params:{
                title: title,
              }
            })
          }
        });
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
    background: url("../../static/imgs/super-bg.jpg") no-repeat;
    background-size: cover;
  }

  .tips{
    height: 2rem;
    line-height: 2rem;
    color: red;
    font-size: .75rem;
  }

  .token{
    display: flex;
    justify-content: center;
  }

  .search-text{
    margin:0 auto;
  }

  .tickets{
    flex: 1;
    overflow-y: auto;
  }

  .tickets-img{
    flex: 1;
    overflow-y: hidden;
  }

  .search-btn{
    width: 100px;
    height: 30px;
    background: url("../../static/imgs/search-btn.png") no-repeat;
    background-size: cover;
    margin: 10px auto;
    font-size: .8rem;
    letter-spacing: 2px;
    -webkit-tap-highlight-color:transparent;
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
    background: url("../../static/imgs/super-search-bg.gif") no-repeat;
    background-size: contain;
  }
</style>

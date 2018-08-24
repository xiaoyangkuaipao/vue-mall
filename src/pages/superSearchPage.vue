<template>
  <div class='index-page' keep-alive>
    <div style="overflow: auto; padding-bottom: 50px;">
      <div class="search-text">
        <p class="tips">温馨提示：本搜索引擎支持淘口令精确搜索优惠券</p>
        <div class="token">
          <textarea cols="35" rows="9" v-model="token" placeholder="请在搜索框内粘贴淘口令" />
        </div>
      </div>
      <div class="search-btns">
        <section class="btn" @click="reset">重新搜券</section>
        <section class="btn" @click="search">立即搜券</section>
      </div>
      <div class="search-bg" v-if="!ticketsInfo && recommends.length === 0"/>
      <div style="background-color: rgba(255, 255, 255, .7); padding: 5px 0" v-if="!(!ticketsInfo && recommends.length === 0)">
        <h3 style="font-size: 10px; text-align: center; color: #ff9999;" v-if="ticketsInfo">/\  搜券成功，奉上优惠券  /\</h3>
        <tickets-item
          v-if="ticketsInfo"
          :tickets-info='ticketsInfo' />
        <div v-if="recommends.length !== 0">
          <h3 style="font-size: 10px; text-align: center; color: #ff9999">/\  为您推荐  /\</h3>
          <tickets-item
            v-for='(item, index) in this.recommends'
            :tickets-info='item'
            :key='index'
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Indicator, Toast  } from 'mint-ui';
import ticketsItem from '../components/TicketsItem';

export default {
  data() {
    return {
      recommends: [],
      ticketsInfo: null,
      token: '',
    };
  },
  created() {
    const superSearchInfo = this.$store.state.superSearchInfo;
    if(superSearchInfo.cache) {
      this.ticketsInfo = superSearchInfo.ticket;
      this.recommends = superSearchInfo.recommends;
      this.token = superSearchInfo.taokouling;
    }
  },
  beforeDestroy() {
    this.$store.commit('SET_SUPERSEARCHS', {
      ...this.$store.state.superSearchInfo,
      ticket: this.ticketsInfo,
      recommends: this.recommends,
      taokouling: this.token,
    })
  },
  methods: {
    reset() {
      this.recommends = [];
      this.ticketsInfo = null;
      this.token = '';
    },
    async search() {
      if(!(/[\￥\€](.+)[\￥\€]/g).test(this.token)) {
        Toast('淘口令不合法！');
        return
      }
      const token = this.token.match(/[\￥\€](.+)[\￥\€]/g)[0];

      const resp = await this.api.superSearch(token);

      const title = resp.content ? resp.content : "";
      const id = resp.url ? resp.url.match(/&id=(\d*)/)[1] : "";

      const t = await this.api.getRecommend(title);
      const appendTickets = t.results.tbk_coupon;
      const len = appendTickets.length;
      for (let i = 0; i < len; i += 1) {
        const discount = appendTickets[i].coupon_info ? appendTickets[i].coupon_info.match(/\d+/g) : 0;
        const discountPrice = discount[1] ? discount[1] : discount[0];
        appendTickets[i].discountPrice = discountPrice;
        appendTickets[i].discount =
          (Number(appendTickets[i].zk_final_price) - Number(discountPrice)).toFixed(2);
        if(appendTickets[i].num_iid == id) {
          this.ticketsInfo = appendTickets[i];
        }
      }
      this.recommends = appendTickets.filter(at => at.num_iid !== id);
      if(!this.ticketsInfo) {
        Toast('抱歉！该商品暂无优惠券！');
      }
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
    background: url("../../static/imgs/super-search-bg.jpg") no-repeat;
    background-size: cover;
  }

  .tips{
    height: 3rem;
    line-height: 3rem;
    color: #FFF;
    font-size: 13px;
    text-align: center;
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

  .search-btns {
    width: 60vw;
    height: 35px;
    margin: 20px auto;
    display: flex;

    >.btn:first-of-type {
      flex: 1;
      line-height: 35px;
      background-color: #FFF;
      text-align: center;
      color: #ff6b70;
      border-radius: 35px 0 0 35px;
    }
    >.btn:last-of-type {
      flex: 1;
      line-height: 35px;
      background-color: #ff6b70;
      text-align: center;
      color: #FFF;
      border-radius: 0 35px 35px 0;
    }
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
    height: 72vw;
    background: url("../../static/imgs/super-search-bg.gif") no-repeat;
    background-size: contain;
  }
</style>

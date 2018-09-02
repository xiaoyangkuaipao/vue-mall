<template>
  <div class='index-page' keep-alive>
    <div style="overflow: auto; padding-bottom: 50px;">
      <div class="search-text">
        <p class="tips">温馨提示：本搜索引擎支持淘口令精确搜索优惠券</p>
        <div class="token">
          <textarea cols="37" rows="6" v-model="token" placeholder="请在搜索框内粘贴淘口令或商品标题" />
        </div>
      </div>
      <div class="search-btns">
        <section class="btn" @click="reset">重新搜券</section>
        <section class="btn" @click="search">立即搜券</section>
      </div>
      <div style="text-align: center">
        <span @click="showHelper">
          <i class="iconfont icon-bangzhu" style="font-size: 20px;"/>
          <span style="font-size: 14px; color: #999">点击查看使用说明</span>
        </span>
      </div>
      <mt-popup
        v-model="showResult"
        position="bottom">
        <div class="result" >
          <h3 style="margin: 0; height:2rem; line-height: 2rem; font-size: 14px; text-align: center; color: #ff9999;" v-if="ticketsInfo">/\  搜券成功，奉上优惠券  /\</h3>
          <tickets-item
            v-if="ticketsInfo"
            v-for='(item, index) in this.ticketsInfo'
            :key='index'
            :tickets-info='item' />
          <div v-if="recommends.length !== 0">
            <h3 style="font-size: 12px; text-align: center; color: #333">/\  为您推荐  /\</h3>
            <tickets-item
              v-for='(item, index) in this.recommends'
              :tickets-info='item'
              :key='index'
            />
          </div>
        </div>
      </mt-popup>
      <mt-popup
        v-model="isShowHelper"
        position="bottom">
        <div class="result" >
          <span style="padding: 5px 8px; font-size: 14px"><i class="iconfont icon-bangzhu" style="font-size: 20px;"/> 商品标题搜索</span>
          <section style="padding: 10px 8px; font-size: 12px; display: flex">
            <img src="../../static/imgs/helper-1.jpg" alt="商品标题搜索说明文档" style="width: 45vw; height: 55vw;">
            <div style="flex: 1">
              <p style="padding-left: 2vw;">第一步，打开淘宝，查看任何一件商品，如左图；</p>
              <p style="padding-left: 2vw; margin-top: 5vw;">第二步，长按图示粉框标题处，点击“拷贝”或“复制宝贝标题”；</p>
              <p style="padding-left: 2vw; margin-top: 5vw;">第三步，将“拷贝”或“复制宝贝标题”的内容粘贴到本页搜索框内，点击“立即搜券”即可；</p>
            </div>
          </section>

          <span style="padding: 5px 8px; font-size: 14px;"><i class="iconfont icon-bangzhu" style="font-size: 20px;"/> 淘口令精确搜券</span>
          <section style="padding: 10px 8px; font-size: 12px; display: flex">
            <img src="../../static/imgs/helper-2.jpg" alt="淘口令搜索说明文档" style="width: 45vw; height: 55vw;">
            <div style="flex: 1">
              <p style="padding-left: 2vw;">第一步，打开淘宝，查看任何一件商品，如左图；</p>
              <p style="padding-left: 2vw; margin-top: 5vw;">第二步，点击图示粉框分享处，点击“分享”；</p>
              <p style="padding-left: 2vw; margin-top: 5vw;">第三步，点击程序页面底部的“复制链接”；</p>
              <p style="padding-left: 2vw; margin-top: 5vw;">第四步，将复制的内容粘贴到本页搜索框内，点击“立即搜券”即可；</p>
            </div>
          </section>
        </div>
      </mt-popup>
    </div>
  </div>
</template>

<script>
import { Indicator, Toast, Popup } from 'mint-ui';
import ticketsItem from '../components/TicketsItem';
import $ from 'jquery';

export default {
  data() {
    return {
      modal: true,
      recommends: [],
      ticketsInfo: null,
      token: '',
      isShowHelper: false,
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
  mounted() {
    const self = this;
    $(document).on('click', '.v-modal', function(){
      self.ticketsInfo = null;
      self.recommends = [];
    })
  },
  computed: {
    showResult: function() {
      return !(!this.ticketsInfo && this.recommends.length === 0);
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
    showHelper() {
      this.isShowHelper = true;
    },
    async search() {
      if(!this.token) {
        return
      }
      if((/[\￥\€](.+)[\￥\€]/g).test(this.token)) {
        const token = this.token.match(/[\￥\€](.+)[\￥\€]/g)[0];

        const resp = await this.api.superSearch(token);

        const title = resp.content ? resp.content : "";

        let id = '';
        if(resp.url) {
          if(resp.url.match(/&id=(\d*)/)) {
            id = resp.url.match(/&id=(\d*)/)[1];
          } else if(resp.url.match(/(\d+)\.(html|htm)/)){
            id = resp.url.match(/(\d+)\.(html|htm)/)[1];
          }
        }

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
            this.ticketsInfo = [ appendTickets[i] ];
          }
        }
        this.recommends = appendTickets.filter(at => at.num_iid !== id);
        if(!this.ticketsInfo) {
          Toast('抱歉！该商品暂无优惠券！');
        }
      } else {
        Indicator.open({
          text: '淘货er中',
          spinnerType: 'fading-circle',
        });
        const resp = await this.api.getTickets(this.token, 1);
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
        this.ticketsInfo = appendTickets;
        Indicator.close();
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
    color: #ff6b70;
    font-size: 13px;
    text-align: center;
  }

  .result {
    width: 100vw;
    height: 66vh;
    padding: 5px 0px;
    overflow-y: auto;
    background-color: rgba(255, 255, 255, 0.7);
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

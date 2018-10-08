<template>
  <div class='index-page' ref="indexPage">
    <SearchItem style="position: fixed; top: 0; z-index: 100"/>
    <mt-swipe :auto="10000" class="swiper">
      <mt-swipe-item v-for="swipe in swipes" :key="swipe.q">
        <img :src="swipe.img" class="slide-image" @click="goTopic(swipe)">
      </mt-swipe-item>
    </mt-swipe>
    <div class="categories">
      <div class="categories-inner">
        <img-with-text
          v-for="item in this.categories"
          :content="item"
          :key="item.q"/>
      </div>
    </div>
    <div class="subject-block">
      <h3 style="font-size: 12px; text-align: center; color: #ff9999">/\  淘货er福利  /\</h3>
      <section class="zhifubao" data-clipboard-target="#zhifubao" data-clipboard-action="copy" @click="getZFB"/>
      <input style="opacity: 0; position: absolute; z-index: -1" type="text" id="zhifubao" :value="this.zfb">
      <!--<section>-->
        <!--<article>-->
          <!--<p class="xianshi" @click="goTopic(xianshi)"/>-->
        <!--</article>-->
        <!--<article>-->
          <!--<p class="dapai" @click="goTopic(dapai)"/>-->
        <!--</article>-->
      <!--</section>-->
      <!--<section class="douyin" @click="goTopic(douyin)"/>-->
    </div>
    <div
      keep-alive
      class="tickets">
      <h3 style="font-size: 12px; text-align: center; color: #ff9999">/\  什么值得买  /\</h3>
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
import { Indicator, Toast } from 'mint-ui';
import Clipboard from 'clipboard';
import imgWithText from '../components/ImgWithText';
import ticketsItem from '../components/TicketsItem';
import SearchItem from '../components/SearchItem';
import MobileDetect from 'mobile-detect';
import $ from 'jquery';

export default {
  data() {
    return {
      localeInfo: '',
      ticketsInfo: [],
      ticket: {},
      isLast: false,
      immediate: false,
      showTicketInfo: false,
      searchPage: 1,
      showZFBHB: false,
      zfb: '支付宝红包再升级，红包种类更多，金额更大！人人可领，天天可领！长按复制此消息，打开支付宝领红包！cvKTpx76gx',
      q: '',
      swipes: [{
        img: require('../../static/imgs/muying.jpg'),
        q: '母婴',
        name: '母婴'
      },{
        img: require('../../static/imgs/kaixue.jpg'),
        q: '开学',
        name: '开学'
      },{
        img: require('../../static/imgs/zhongqiu.jpg'),
        q: '中秋',
        name: '中秋'
      }],
      categories: [
        {
          pic: require('../../static/imgs/9_9.jpg'),
          img: require('../../static/imgs/9-9_topic.jpeg'),
          q: '9.9包邮',
          name: '9.9包邮'
        },
        {
          pic: require('../../static/imgs/dapai-icon.jpg'),
          img: require('../../static/imgs/dapai-topic.jpg'),
          q: '奢侈品牌',
          name: '潮流大牌'
        },
        {
          pic: require('../../static/imgs/xianshi-icon.jpg'),
          img: require('../../static/imgs/xianshi-topic.jpg'),
          q: '限时抢购',
          name: '限时抢购'
        },
        {
          pic: require('../../static/imgs/douyin-icon.jpg'),
          img: require('../../static/imgs/douyin.jpg'),
          q: '抖音',
          name: '抖音爆款'
        }
      ],
    };
  },
  created() {
    // this.getLocaleInfo();
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
    const self = this;
    $(window).on('scroll', async function() {
      const clientHeight = $(this).height();
      const scrollTop = $(this).scrollTop();
      const scrollHeight = $(document).height();
      self.$refs['indexPage'].dataset.top = scrollTop;
      if(scrollTop + clientHeight + 50 > scrollHeight){
        await self.loadMore();
      }
    })
  },
  beforeDestroy() {
    const scrollTop = this.$refs['indexPage'].dataset.top;
    const indexInfo = {...this.$store.state.indexInfo};
    indexInfo.top = scrollTop;
    this.$store.commit('SET_INDEX_TICKETS', indexInfo);
  },
  destroyed() {
    $(window).off('scroll')
  },
  methods: {
    getLocaleInfo() {
      if (returnCitySN) {
        window.sessionStorage.setItem('ip', returnCitySN['cip']);
      }
      const ip = window.sessionStorage.getItem('ip');
      const device_type = navigator.userAgent;
      const md = new MobileDetect(device_type);//初始化mobile-detect
      const ua = 'Mozilla/5.0';
      let os = md.os();
      if(os.toLowerCase() === 'ios') {
        os = 'ios';
      } else if(os.toLowerCase() === 'andriodos') {
        os = 'andriod';
      } else {
        os = 'andriod';
      }
      if(ip && os) {
        this.localeInfo = {
          ip,
          ua,
          os,
        }
      }
    },
    getZFB() {
      const clipboard = new Clipboard('.zhifubao');
      clipboard.on('success', () => {
      });
      clipboard.on('error', () => {
      });
      Toast('红包已入账！打开“支付宝”查看');
      setTimeout(() => {
        window.open(`alipay://index.html`)
      }, 800)
    },
    async getTickets(q, page) {   // q: 查询内容 ； page: 查询页数
      Indicator.open({
        text: '淘货er中',
        spinnerType: 'fading-circle',
      });
      let resp;
      // if(this.localeInfo) {
      //   const { ip, os, ua } = this.localeInfo;
      //   resp = await this.api.guess(ip, os, ua, page);
      // }
      resp = await this.api.getTickets(q, page);

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

    goTopic(topic) {
      this.$router.push({
        name: 'topic',
        params: topic
      })
    }
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
    padding: 5rem 0 55px 0;
    background-color: rgb(245, 245, 245);
  }

  .zfb-hb {
    width: 50vw;
    height: 21vw;
    position: absolute;
    margin: 65vw 25vw 0 25vw;
    background: url("../../static/imgs/zfb-hb.jpg") no-repeat;
    background-size: cover;
    z-index: 10;
    color: #FFF;
    text-align: center;
    border-radius: 10px;
  }

  .zhifubao {
    background: url("../../static/imgs/zhifubao.jpg") no-repeat;
    background-size: cover;
    height: 23.75vw;
    border-radius: 4px;
  }

  .dapai {
    background: url("../../static/imgs/dapai.jpg") no-repeat;
    background-size: cover;
    height: 30vw;
    border-radius: 4px;
  }

  .douyin {
    background: url("../../static/imgs/douyin.jpg") no-repeat;
    background-size: cover;
    height: 33vw;
    border-radius: 4px;
  }

  .xianshi {
    background: url("../../static/imgs/xianshi.jpg") no-repeat;
    background-size: cover;
    height: 30vw;
    border-radius: 4px;
  }

  .categories {
    height: 24vw;
    width: 90vw;
    margin: -1.5rem 5vw 0 5vw;
    position: relative;
    border-radius: 15%;
    background-color: rgba(255, 253, 253);
    box-shadow: 2px 5px 15px #DDD;
  }

  .categories-inner {
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
  }

  .tickets{
    flex: 1;
    overflow-y: auto;
  }

  .swiper{
    height: 40vw;
  }

  .slide-image{
    width: 100vw;
    height: 40vw;
    background-size: cover;
  }

  .subject-block {
    >section {
      display: flex;
      width: 95vw;
      margin: .8rem auto;
      text-align: center;
      justify-content: space-between;

      >article {
        display: inline-block;
        width: 45vw;
        height: 100%;
        box-shadow: 2px 2px 2px 2px #EEE;
      }
    }

    >section:first-of-type,  >section:last-of-type{
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

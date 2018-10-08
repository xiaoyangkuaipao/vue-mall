<template>
  <div class="ticket-detail">
    <div class="go-to-index" v-if="share" @click="goToIndex">返回首页</div>
    <mt-swipe :auto="10000" class="swiper" v-if="ticketInfo.small_images">
      <mt-swipe-item
        v-for="item in this.ticketInfo.small_images.string"
        :key = item
      >
        <img :src="item" class="slide-image">
      </mt-swipe-item>
    </mt-swipe>
    <img :src="ticketInfo.pict_url" :alt="ticketInfo.title" v-if="!ticketInfo.small_images" class="slide-image">
    <p class="ticket-title">{{this.ticketInfo.title}}</p>
    <section style="display: flex; height: 25px; align-items: center; padding: 0 5px">
      <p class="ticket-shop">店铺：{{this.ticketInfo.shop_title}}</p>
      <p class="ticket-volume">销量：{{this.ticketInfo.volume}}</p>
    </section>
    <p class="zkq_price">原价： {{this.ticketInfo.zk_final_price}}元</p>
    <p class="zkh_price">折后价格： {{this.ticketInfo.discount}}元 ， 优惠 {{this.ticketInfo.discountPrice}} 元</p>
    <p class="zk_time">
      折扣时间： {{this.ticketInfo.coupon_start_time}} 至 {{this.ticketInfo.coupon_end_time}}
    </p>
    <p class="ticket-description">
      商品简介：{{`${this.ticketInfo.title}，${this.ticketInfo.coupon_info}，${this.ticketInfo.item_description}`}}
    </p>
    <div style="border-top: 1px dashed #CCC; border-bottom: 1px dashed #CCC; height: 5px; margin: 15px 0;"/>
    <h3 style="font-size: 12px; text-align: center; color: #ff9999" v-if="this.recommendTickets.length !== 0">/\  同款比价  /\</h3>
    <tickets-item
      v-for='(item, index) in this.recommendTickets'
      :tickets-info='item'
      :key='index'
      @handelSetRecommend="setRecommend"
    >
    </tickets-item>
    <operate-buttons :ticket="ticketInfo"/>
  </div>
</template>

<script>
  import { Indicator } from 'mint-ui';
  import ticketsItem from '../components/TicketsItem';
  import OperateButtons from '../components/OperateButtons';

  export default {
    name: "TicketDetailPage",
    data() {
      return {
        ticketInfo: {},
        recommendTickets: [],
        share: false,
      }
    },
    created() {
      if(!this.$route.params.ticket) {
        this.$router.push({
          name: 'home',
        })
      }else {
        this.ticketInfo= this.$route.params.ticket;
        if(this.$route.params.share) {
          this.share = true;
        }
        this.getRecommend();
      }
    },
    methods: {
      goToIndex() {
        this.$router.push({
          name: 'home',
        })
      },
      async getRecommend() {
        Indicator.open({
          text: '淘货er中',
          spinnerType: 'fading-circle',
        });
        const resp = await this.api.getRecommend(this.ticketInfo.title);
        const appendTickets = resp.results.tbk_coupon.filter(t => t.num_iid !== this.ticketInfo.num_iid);
        const len = appendTickets.length;
        for (let i = 0; i < len; i += 1) {
          const discount = appendTickets[i].coupon_info ? appendTickets[i].coupon_info.match(/\d+/g) : 0;
          const discountPrice = discount[1] ? discount[1] : discount[0];
          appendTickets[i].discountPrice = discountPrice;
          appendTickets[i].discount =
            (Number(appendTickets[i].zk_final_price) - discountPrice).toFixed(2);
        }
        this.recommendTickets = this.recommendTickets.concat(appendTickets);
        Indicator.close();
      },
      setRecommend(ticket) {
        this.ticketInfo= ticket;
        this.getRecommend();
        window.scrollTo(0, 0);
      }
    },
    components: { ticketsItem, OperateButtons },
  }
</script>

<style scoped>
  .ticket-detail {
    padding-bottom: 55px;
  }

  .go-to-index {
    position: fixed;
    z-index: 100;
    top: .5rem;
    left: .5rem;
    font-size: 10px;
    text-align: center;
    width: 60px;
    height: 60px;
    line-height: 60px;
    border-radius: 100%;
    font-weight: bolder;
    background-color: rgba(255, 255, 255, .7);
  }

  .ticket-detail .swiper {
    width: 100vw;
    height: 100vw;
  }

  .ticket-detail .slide-image{
    width: 100vw;
    height: 100vw;
    background-size: cover;
  }

  .ticket-detail .ticket-title {
    background-color: #ff9999;
    color: #FFF;
    line-height: 25px;
    padding: 5px;
    font-size: 14px;
  }

  .ticket-detail .ticket-shop {
    flex: 1;
    font-size: 12px;
    color: #666;
  }

  .ticket-detail .ticket-volume {
    padding: 0 5px;
    font-size: 12px;
    color: #666;
  }

  .ticket-description {
    padding: 0 5px;
    line-height: 25px;
    font-size: 12px;
    color: #666;
  }

  .zkq_price {
    text-decoration: line-through;
    color: #BBB;
    font-size: 12px;
    padding: 0 5px;
  }

  .zkh_price {
    color: red;
    font-size: 14px;
    padding: 5px;
  }

  .zk_time {
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    padding: 5px;
  }

  .ticket-description {
    line-height: 25px;
    font-size: 13px;
  }
</style>

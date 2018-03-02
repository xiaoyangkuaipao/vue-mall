<template>
  <div class="tickets-item" @click="getRecommend($event)">
    <div class="tickets-left-info">
      <img class="tickets-image" :src="ticketsInfo.pict_url" />
      <label class="volumn">销量：{{ticketsInfo.volume}}</label>
    </div>
    <div class="flex-column-center">
      <div class="tickets-info">
        <div class="title">{{ticketsInfo.title}}</div>
        <div class="shop">{{ticketsInfo.shop_title}}</div>
        <div class="reason">推荐理由： {{ticketsInfo.item_description}}</div>
        <div class="delete-text">原价： {{ticketsInfo.zk_final_price}}</div>
        <div class="discount">优惠价： {{ticketsInfo.discount}}</div>
        <div class="zkh-price">
          {{ticketsInfo.discountPrice}}元券
        </div>
      </div>
    </div>
    <div class="get-ticket get-ticket-label" @click="getTicket(ticketsInfo)">
      <label class="get-ticket-label">立</label>
      <label class="get-ticket-label">即</label>
      <label class="get-ticket-label">领</label>
      <label class="get-ticket-label">券</label>
      <i class="iconfont icon-youhuiquan get-ticket-label"></i>
    </div>
  </div>
</template>

<script lang="babel">
export default {
  data() {
    return {
    };
  },
  methods: {
    getRecommend(e) {
      console.log(e);
      if(e.target.className.indexOf('get-ticket-label') === -1) {
        this.$router.push({
          name: 'recommend',
          params:{
            title: this.ticketsInfo.title,
          }
        })
      }
    },
    getTicket() {
      const self = this;
      this.axios.get('https://www.iamyangqi.cn/wx-new-mall/convertLink.php', {
        params: {
          url: self.ticketsInfo.coupon_click_url,
          pic: self.ticketsInfo.pict_url,
          title: self.ticketsInfo.title,
        }
      }).then(function (resp) {
        if (resp.data.data.model) {
          const ticket = {
            title: self.ticketsInfo.title,
            zk_final_price: self.ticketsInfo.zk_final_price,
            discount: self.ticketsInfo.discount,
            model: resp.data.data.model,
          };
          self.$store.commit('SET_TICKETINFO', {
            ticket: ticket,
          });
          self.$emit('ticket');
        }
      });
    },
  },
  props: ['ticketsInfo'],
};
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .tickets-item{
    display: flex;
    justify-content: space-between;
    position: relative;
    width: 96%;
    margin: .5rem 2%;
    height: 30vw;
    border: 1px solid #A8725A;
    border-radius: 10px;
  }

  .tickets-item::before {
    content: "\e61c";
    position: absolute;
    top: -.5rem;
    left: -.3rem;
    font-size: 1.2rem;
    color: #A8725A;
    font-family: "iconfont";
    transform: rotate(-45deg);
  }

  .tickets-left-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 25vw;
    height: 30vw;
  }

  .tickets-image{
    width: 25vw;
    height: 25vw;
  }

  .tickets-info{
    position: relative;
    width: 62vw;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .tickets-info .title{
    padding-left: .2rem;
    height: 2rem;
    line-height: 1rem;
    text-overflow:ellipsis;
    word-break: break-all;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    width: 97%;
    font-size: .75rem;
  }

  .tickets-info .shop{
    padding-left: .2rem;
    height: .8rem;
    line-height: .8rem;
    text-overflow:ellipsis;
    word-break: break-all;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    width: 97%;
    font-size: .55rem;
    color: #AAA;
  }

  .tickets-info .reason{
    padding-left: .2rem;
    max-height: 1.6rem;
    line-height: .8rem;
    text-overflow:ellipsis;
    word-break: break-all;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    width: 97%;
    font-size: .6rem;
  }

  .tickets-info .left-text{
    padding-left: .2rem;
    font-size: .6rem;
  }

  .tickets-info .right-text{
    padding-right: 1rem;
    font-size: .6rem;
  }

  .delete-text{
    padding-left: .2rem;
    text-decoration: line-through;
    font-size: .6rem;
    color: #BBB;
  }

  .discount{
    position:relative;
    padding-left: .2rem;
    font-size: .7rem;
    color: red;
  }

  .important-text{
    color: red;
  }

  .get-ticket{
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 12vw;
    height: 100%;
    font-size: .75rem;
    border-radius: 0 10px 10px 0;
    background-color: #A8725A;
    color: #EEE;
  }

  .volumn{
    font-size: .6rem;
    color: #AAA;
  }

  .zkh-price{
    position: absolute;
    bottom: .5rem;
    right: 2rem;
    color: red;
    padding: 2px 8px;
    border: 1px dotted red;
  }
</style>

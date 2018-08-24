<template>
  <div class="tickets-item" @click="getTicketDetail">
    <div class="tickets-left-info">
      <img class="tickets-image" :src="ticketsInfo.pict_url" />
      <p class="volumn">销量：{{ticketsInfo.volume}}</p>
    </div>
    <div class="flex-column-center" style="flex: 1">
      <div class="tickets-info">
        <div class="title">{{ticketsInfo.title}}</div>
        <div class="shop">{{ticketsInfo.shop_title}}</div>
        <div class="reason">推荐理由： {{`${ticketsInfo.item_description} 淘货er精选，好而不贵！`}} </div>
        <div class="delete-text">原价： {{ticketsInfo.zk_final_price}}元</div>
        <div class="discount">优惠价： {{ticketsInfo.discount}}元</div>
        <div class="zkh-price">
          {{ticketsInfo.discountPrice}}元券
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    getTicketDetail() {
      if(this.$router.history.current.name === "ticket-detail") {
        this.$emit('handelSetRecommend', this.ticketsInfo)
      } else {
        this.$router.push({
          name: 'ticket-detail',
          params:{
            ticket: this.ticketsInfo,
          }
        })
      }
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
    margin: .65rem 2%;
    height: 38vw;
    border: 1px solid #FFCCCC;
    border-radius: 5px;
    background-color: #FFF;
  }

  .tickets-left-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 29vw;
    height: 38vw;
    background-color: #f7f7f7;
    border-radius: 0 0 0 5px;
  }

  .tickets-image{
    width: 29vw;
    height: 29vw;
    border-radius: 5px 0 0 0;
  }

  .tickets-info{
    position: relative;
    width: 99%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 0 0 5px 0;
  }

  .tickets-info .title{
    display: -webkit-box;
    width: 100%;
    height: 10vw;
    line-height: 5vw;
    padding-left: .2rem;
    text-overflow:ellipsis;
    word-break: break-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    color: #FFF;
    font-size: 12px;
    border-radius: 0 5px 0 0;
    background-color: #ff9999;
  }

  .tickets-info .shop{
    padding-left: .2rem;
    height: 5vw;
    line-height: 5vw;
    text-overflow:ellipsis;
    word-break: break-all;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    width: 97%;
    color: #AAA;
    font-size: 12px;
  }

  .tickets-info .reason{
    padding-left: .2rem;
    max-height: 10vw;
    line-height: 5vw;
    text-overflow:ellipsis;
    word-break: break-all;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-size: 12px;
    width: 97%;
  }

  .tickets-info .left-text{
    padding-left: .2rem;
  }

  .tickets-info .right-text{
    padding-right: 1rem;
  }

  .delete-text{
    padding-left: .2rem;
    text-decoration: line-through;
    color: #BBB;
    font-size: 12px;
  }

  .discount{
    position:relative;
    padding-left: .2rem;
    color: red;
    font-size: 14px;
  }

  .volumn{
    height: 9vw;
    line-height: 11.5vw;
    font-size: 12px;
  }

  .zkh-price{
    position: absolute;
    min-width: 65px;
    bottom: 2vw;
    right: 2vw;
    color: red;
    text-align: center;
    padding: 2px 12px;
    border: 1px dotted red;
  }
</style>

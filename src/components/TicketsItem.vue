<template>
  <div class="tickets-item" @click="getTicketDetail">
    <div class="tickets-left-info">
      <img class="tickets-image" :src="ticketsInfo.pict_url" />
    </div>
    <div class="flex-column-center" style="flex: 1">
      <div class="tickets-info">
        <div class="title">{{ticketsInfo.title}}</div>
        <!--<div class="shop">店铺：{{ticketsInfo.shop_title}}</div>-->
        <div class="volumn">销量：{{ticketsInfo.volume}}</div>
        <!--<div class="reason">推荐理由： {{`${ticketsInfo.item_description} 淘货er精选，好而不贵！`}} </div>-->
        <div>
          <span class="delete-text">原价： {{ticketsInfo.zk_final_price}}元</span>
          <span class="zkh-price">
            <i class="iconfont icon-lingquan-copy"/>
            <span>{{ticketsInfo.discountPrice}} 元</span>
          </span>
        </div>
        <div class="discount">
          <span>优惠价： {{ticketsInfo.discount}} 元</span>
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
    margin: 1rem 2%;
    height: 35vw;
    border-radius: 5px 5px 2px 2px;
    background-color: #FFF;
  }

  .tickets-left-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 35vw;
    height: 35vw;
    background-color: rgba(250, 250, 250, .9);
  }

  .tickets-image{
    width: 35vw;
    height: 35vw;
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
    height: 13vw;
    line-height: 6.5vw;
    padding-left: .2rem;
    text-overflow:ellipsis;
    word-break: break-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    color: #333;
    font-size: 12px;
    font-weight: bolder;
    border-radius: 0 5px 0 0;
    background-color: rgba(250, 250, 250, .9);
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
    color: #AAA;
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
    display: flex;
    position:relative;
    padding-left: .2rem;
    color: red;
    font-size: 14px;
  }

  .volumn{
    width: 100%;
    height: 5vw;
    line-height: 5vw;
    padding-left: .2rem;
    text-overflow:ellipsis;
    word-break: break-all;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    font-size: 12px;
    color: #555
  }

  .zkh-price{
    color: #ff834e;

    i {
      padding: 0 .5rem;
    }
  }
</style>

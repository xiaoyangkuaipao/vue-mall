<template>
  <div class="tickets-item" @click="getTicketDetail">
    <img class="tickets-image" :src="ticketsInfo.pict_url" />
    <div class="flex-column-center" style="flex: 1">
      <div class="tickets-info">
        <div class="title">{{ticketsInfo.title}}</div>
        <div class="delete-text">原价： {{ticketsInfo.zk_final_price}}元</div>
        <div class="discount">优惠价： {{ticketsInfo.discount}}元</div>
        <!--<div class="zkh-price">-->
          <!--<i class="iconfont icon-lingquan-copy"/>-->
          <!--<span>{{ticketsInfo.discountPrice}} 元</span>-->
        <!--</div>-->
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
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    width: 45vw;
    margin: .75rem 2.5vw;
    height: 78vw;
    border-radius: 5px;
    background-color: #FFF;
  }


  .tickets-image{
    width: 45vw;
    height: 45vw;
    border-radius: 5px 5px 0 0;
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
    height: 18vw;
    line-height: 6vw;
    padding-left: .2rem;
    text-overflow:ellipsis;
    word-break: break-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    color: #333;
    font-size: 12px;
    font-weight: bolder;
    border-radius: 0 5px 0 0;
    background-color: rgba(250, 250, 250, .9);
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
    margin: 1vw 0;
  }

  .discount{
    position:relative;
    padding-left: .2rem;
    color: red;
    font-size: 14px;
    margin: 1vw 0;
  }

  .zkh-price{
    flex: 1;
    display: flex;
    align-items: center;
    width: 100%;
    color: #ff834e;

    i {
      font-size: 16px;
      margin-right: .5rem;
    }
  }
</style>

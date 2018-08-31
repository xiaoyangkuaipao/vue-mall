<template>
  <div class="tickets-item" @click="getTicketDetail">
    <div class="tickets-left-info">
      <img class="tickets-image" :src="ticketsInfo.pict_url" />
    </div>
    <div class="flex-column-center" style="flex: 1">
      <div class="tickets-info">
        <div class="title">{{ticketsInfo.title}}</div>
        <div class="delete-text">原价： {{ticketsInfo.zk_final_price}}元</div>
        <div class="discount">优惠价： {{ticketsInfo.discount}}元</div>
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
    margin: .75rem 2%;
    height: 25vw;
    border-radius: 5px;
    background-color: #FFF;
  }

  .tickets-left-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 25vw;
    height: 25vw;
    background-color: #ffccc2;
  }

  .tickets-image{
    width: 25vw;
    height: 25vw;
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
    color: #FFF;
    font-size: 12px;
    border-radius: 0 5px 0 0;
    background-color: #ff9999;
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

  .zkh-price{
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    color: red;
    background-color: #ffccc2;
    border-bottom: 1px dotted #FFF;

    i {
      font-size: 16px;
      margin-right: .5rem;
    }
  }
</style>

<template>
  <div class="red-packet-wrapper">
    <div class="red-packet">
      <p class="title">{{this.$store.state.ticket.title}}</p>
      <p class="zk-price">
        <span>{{parseInt(this.$store.state.ticket.zk_final_price - this.$store.state.ticket.discount)}}</span>
        元
      </p>
      <p class="tip-1">直接打开淘宝APP，即可领取优惠！</p>
      <p class="tip-2">若淘宝没有自动跳转，请重新领取！</p>
      <p class="cancel-button">
        <i class="iconfont icon-shanchu3" @click="close"></i>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RedPacket",
    methods: {
      close() {
        this.$store.commit('SET_RED_PACKET_STATUS');
      }
    }
  }
</script>

<style scoped>
  .red-packet-wrapper {
    position: fixed;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    overflow: hidden;
    background-color: rgba(255, 255, 255, .8);
  }

  .red-packet {
    width: 65vw;
    height: 97.5vw;
    position: relative;
    margin-top: -30vw;
    background: url("../../static/imgs/red-packet.png") no-repeat;
    background-size: cover;
  }

  .title {
    margin-top: 36.5vw;
    padding: 0 10px;
    color: #ffb721;
    font-size: 12px;
    line-height: 20px;
    font-weight: bolder;
  }

  .zk-price {
    margin-top: 15px;
    text-align: center;
    color: #FFF;
  }

  .zk-price >span {
    font-size: 4rem;
    font-weight: bolder;
  }

  .tip-1 {
    bottom: 25px;
    padding: 0 5px;
    position: absolute;
    width: 95%;
    height: 20px;
    line-height: 20px;
    color: #FFF;
    text-align: center;
    font-size: 12px;
  }

  .tip-2 {
    bottom: 5px;
    position: absolute;
    width: 100%;
    height: 20px;
    line-height: 20px;
    color: #FFF;
    text-align: center;
    font-size: 12px;
  }

  .cancel-button {
    position: absolute;
    width: 100%;
    bottom: -50px;
    text-align: center;
  }

  .cancel-button>i {
    font-size: 40px;
    border: 1px solid #EEE;
    color: #999;
    border-radius: 100%;
  }
</style>

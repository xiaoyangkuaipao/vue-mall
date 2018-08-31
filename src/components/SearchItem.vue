<template>
  <div class="search">
    <section>
      <img src="../../static/imgs/taohuoer.jpg" alt="淘货er"
           style="width: 3rem; height: 3rem;margin-top: 18px;">
    </section>
    <div
      class="search-input"
      @click="search"> 淘货er， 最全淘宝优惠券！
    </div>
  </div>
</template>

<script>
  export default {
    name: "SearchItem",
    methods: {
      search() {
        this.$router.push({
          name: 'search',
        })
      },
    }
  }
</script>

<style rel='stylesheet/less' lang='less' scoped>
  .search{
    width: 100vw;
    height: 3rem;
    line-height: 3rem;
    display: flex;
    align-items: center;
    background-color: #ff9999;
    box-shadow: 0px 2px 20px rgba(250, 250, 250, .9);
  }

  .search-input{
    position: relative;
    flex: 1;
    height: 1.6rem !important;
    line-height: 1.6rem;
    padding-left: 1.5rem;
    font-size: 12px;
    letter-spacing: 2px;
    border-radius: 5px;
    border: 1px solid #FFF;
    color: #FFF;
    margin: 0 .25rem;
  }

  .search-input::before {
    position: absolute;
    left: .14rem;
    content: "\e61e";
    font-family: "iconfont";
    font-size: 1rem;
  }
</style>

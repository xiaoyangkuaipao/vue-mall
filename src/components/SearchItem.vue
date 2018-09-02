<template>
  <div class="search">
    <section>
      <i
        class="iconfont icon-taobao1"
        style="margin: 0 .5rem; font-size: 25px; color: #f96c4e"></i>
    </section>
    <div
      class="search-input"
      @click="search"> 淘货er， 最全淘宝优惠券！
    </div>
    <section>
      <i
        class="iconfont icon-youhuiquan"
        style="margin: 0 .5rem; font-size: 20px; color: #f96c4e"></i>
    </section>
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
    background-color: #fff2da;
  }

  .search-input{
    position: relative;
    flex: 1;
    height: 1.6rem !important;
    line-height: 1.6rem;
    padding-left: 1.5rem;
    font-size: 12px;
    letter-spacing: 2px;
    border-radius: .8rem;
    color: #FFF;
    margin: 0 .25rem;
    background-color: #f96c4e;
  }

  .search-input::before {
    position: absolute;
    left: .25rem;
    content: "\e61e";
    font-family: "iconfont";
    font-size: 1rem;
  }
</style>

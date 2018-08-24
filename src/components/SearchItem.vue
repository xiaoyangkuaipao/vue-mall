<template>
  <div class="search">
    <i class="iconfont icon-yewutubiaosheng search-icon"></i>
    <div
      class="search-input"
      @click="search"> 淘货er， 最全淘宝优惠券！
    </div>
    <span style="font-size: 8px; color: #555; letter-spacing: 1px">类别</span>
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
    height: 2.5rem;
    line-height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: #ff9999;
    opacity: .9;
  }

  .search:hover {
    opacity: 1;
  }

  .search-icon{
    font-size: 1.6rem;
  }

  .search-icon:nth-of-type(1){
    color: red;
  }

  .search-icon:nth-of-type(2){
    color: red;
  }

  .search-input{
    position: relative;
    width: 13rem;
    height: 1.4rem !important;
    line-height: 1.4rem;
    padding-left: 1.5rem;
    font-size: .6rem;
    letter-spacing: 2px;
    border-radius: 5px;
    border: 1px solid #FFF;
    color: #FFF;
  }

  .search-input::before {
    position: absolute;
    left: .14rem;
    content: "\e61e";
    font-family: "iconfont";
    font-size: 1rem;
  }
</style>

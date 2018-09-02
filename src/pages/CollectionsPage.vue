<template>
  <div class="colletions-page" ref="colletionsPage" v-scroll-more="loadMore">
    <div class="search">
      <i class="iconfont icon-yewutubiaosheng search-icon"></i>
      <input
        class="search-input"
        placeholder="收藏夹内搜索！"
        v-model="q"
        @click="search">
      <i class="iconfont icon-sousuo sousuo-icon"></i>
      <i class="iconfont icon-shanchu3 delete-icon" v-if="q" @click="cancel"></i>
      <span style="font-size: 14px; color: #555; letter-spacing: 1px" @click="search">搜索</span>
    </div>
    <div v-if="this.ticketsInfo.length > 0">
      <tickets-item
        v-for='(item, index) in ticketsInfo'
        :tickets-info='item'
        :key='index'>
      </tickets-item>
    </div>
    <div
      v-if="this.ticketsInfo.length === 0"
      style="height: calc(100vh - 8rem); display: flex; justify-content: center;align-items: center">
      <img
        style="width: 70vw"
        src="../../static/imgs/empty-collection.png"
        alt="收藏夹为空">
    </div>
    <div style="font-size: 12px; text-align: center; margin-top:1rem; color: #CCC" v-if="this.ticketsInfo.length > 0">~~是时候看到淘货er的底线了~~</div>
  </div>
</template>

<script>
import ticketsItem from '../components/TicketsItem';
import $ from 'jquery';

export default {
  data() {
    return {
      ticketsInfo: [],
      q: '',
      isLast: false,
    };
  },
  created() {
    this.ticketsInfo = this.$store.state.collections;
  },
  mounted() {
    const collectionsTop = this.$store.state.collectionsTop;
    if(collectionsTop) {
      window.scrollTo(0, collectionsTop);
    }
    const self = this;
    $(window).on('scroll', async function() {
      const scrollTop = $(this).scrollTop();
      self.$refs['colletionsPage'].dataset.top = scrollTop;
    })
  },
  beforeDestroy() {
    const scrollTop = this.$refs['colletionsPage'].dataset.top;
    this.$store.commit('SET_COLLECTIONS_TOP', scrollTop);
  },
  destroyed() {
    $(window).off('scroll')
  },
  methods: {
    cancel() {
      this.q  = "";
      this.ticketsInfo = this.$store.state.collections;
    },
    searchHistory(q) {
      this.q = q;
      this.search();
    },
    search() {
      if(!this.q) {
        this.ticketsInfo = this.$store.state.collections
      } else {
        this.ticketsInfo = this.$store.state.collections.filter( c => c.title.search(this.q) !== -1);
      }
    },
    loadMore() {
    },
  },
  components: { ticketsItem },
};
</script>

<style rel='stylesheet/less' lang='less' scoped>
  .colletions-page {
    padding-top: 3rem;
    padding-bottom: 55px;
  }

  .sousuo-icon {
    position: absolute;
    left: 19vw;
  }

  .delete-icon {
    position: absolute;
    left: 76vw;
  }

  .search{
    width: 100vw;
    height: 3rem;
    position: fixed;
    top: 0;
    left: 0;
    line-height: 3rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: #FFF;
    background-color: #fff2da;
    z-index: 10;
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
    width: 52vw;
    height: 1.4rem !important;
    line-height: 1.4rem;
    padding-left: 1.5rem;
    padding-left: 1.5rem;
    padding-right:1.5rem;;
    font-size: 12px;
    letter-spacing: 2px;
    border-radius: .7rem;
    border: 1px solid #FFF;
    color: #FFF;
    background-color: #f96c4e;
  }

  input::-webkit-input-placeholder{
    color:#FFF;
  }
  input::-moz-placeholder{   /* Mozilla Firefox 19+ */
    color:#FFF;
  }
  input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
    color:#FFF;
  }
  input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
    color:#FFF;
  }

</style>

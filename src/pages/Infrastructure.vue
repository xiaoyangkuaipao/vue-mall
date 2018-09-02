<template>
  <div>
    <router-view/>
    <mt-tabbar
      :fixed="fixed"
      v-model="selectedTab">
      <mt-tab-item id="home">
        <div class="mint-tab-item-icon">
          <i class="iconfont icon-shouye"/>
        </div>
        <span>首页</span>
      </mt-tab-item>
      <mt-tab-item id="superSearch">
        <div class="mint-tab-item-icon">
          <i class="iconfont icon-taokouling"/>
        </div>
        <span>优惠券搜索</span>
      </mt-tab-item>
      <mt-tab-item id="collections">
        <div class="mint-tab-item-icon">
          <i class="iconfont icon-shoucangjia"/>
        </div>
        <span>收藏夹</span>
      </mt-tab-item>
      <mt-tab-item id="mine">
        <div class="mint-tab-item-icon">
          <i class="iconfont icon-wode"/>
        </div>
        <span>我的</span>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
  export default {
    name: "Infrastructure",
    data() {
      return {
        fixed: true,
        selectedTab: 'home',
      }
    },
    created() {
      this.selectedTab = !!this.$store.state.tab ? this.$store.state.tab : 'home'
    },
    mounted() {
      const name = this.$router.history.current.name ? this.$router.history.current.name : 'home';
      this.selectedTab = name;
    },
    watch: {
      selectedTab: function(val) {
        if(val) {
          this.$store.commit('SET_TAB', val)
          this.$router.push({
            name: val,
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>

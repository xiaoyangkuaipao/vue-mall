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
        首页
      </mt-tab-item>
      <mt-tab-item id="superSearch">
        <div class="mint-tab-item-icon">
          <i class="iconfont icon-taokouling"/>
        </div>
        淘口令搜索
      </mt-tab-item>
      <mt-tab-item id="collections">
        <div class="mint-tab-item-icon">
          <i class="iconfont icon-shoucangjia"/>
        </div>
        收藏夹
      </mt-tab-item>
      <mt-tab-item id="mine">
        <div class="mint-tab-item-icon">
          <i class="iconfont icon-wode"/>
        </div>
        我的
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

<template>
  <div class="bar-wrapper">
    <div style="white-space: nowrap">
      <router-link :to="link.to" v-for="link in this.links">
        <span style="padding: 0 10px">{{link.name}}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ['links'],
  methods: {
  }
};
</script>

<style rel='stylesheet/less' lang='less' scoped>
  .bar-wrapper {
    display: flex;
    align-items: center;
    width: 100vw;
    height: 2.3rem;
    line-height: 1.5rem;
    overflow: auto;
  }
</style>

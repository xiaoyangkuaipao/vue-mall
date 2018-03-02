<template>
  <div class='iwt'>
    <img :src='content.pic' :alt='content.q' class='iwt-img'>
    <p class='iwt-text'>{{content.name}}</p>
  </div>
</template>

<script lang='babel'>
export default {
  props: ['content'],
};
</script>

<style rel='stylesheet/less' lang='less' scoped>
  .iwt {
    display: flex;
    flex-direction: column;
    width: 3rem;
    height: 4.5rem;
  }

  .iwt-img{
    width: 3rem;
    height: 3rem;
    border-radius: 100%;
  }

  .iwt-text{
    width: 3rem;
    height: 1.5rem;
    line-height: 1.5rem;
    text-align: center;
    font-size: .75rem;
    letter-spacing: 2px;
  }
</style>

<template>
  <div class='iwt' @click="search">
    <img :src='content.pic' :alt='content.q' class='iwt-img'>
    <p class='iwt-text'>{{content.name}}</p>
  </div>
</template>

<script>
export default {
  props: ['content'],
  methods: {
    search() {
      this.$router.push({
        name: 'topic',
        params: {
          q: this.content.q,
          name: this.content.name,
          img: this.content.img,
        }
      })
    }
  }
};
</script>

<style rel='stylesheet/less' lang='less' scoped>
  .iwt {
    display: flex;
    flex-direction: column;
    width: 15vw;
    height: 20vw;
    margin: .3rem 2vw;
  }

  .iwt-img{
    width: 15vw;
    height: 15vw;
    border-radius: 100%;
  }

  .iwt-text{
    width: 15vw;
    height: 5vw;
    line-height: 5vw;
    text-align: center;
    font-size: 12px;
    color: #000;
  }
</style>

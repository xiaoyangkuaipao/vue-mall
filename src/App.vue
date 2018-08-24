<template>
  <div id="app">
    <red-packet v-show="this.$store.state.showRedPacket"/>
    <router-view/>
  </div>
</template>

<script>
import RedPacket from './components/RedPacket';

export default {
  name: 'App',
  components: { RedPacket }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>

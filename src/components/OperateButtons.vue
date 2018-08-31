<template>
  <div class="operate-buttons">
    <section class="button detail-button">
      <i class="iconfont icon-shangpinxiangqing"></i>
      <a :href="this.ticket.item_url" target="_blank">详情</a>
    </section>
    <section class="button collect-button" @click="collect">
      <i class="iconfont icon-shoucang" v-show="!this.isCollected"></i>
      <i class="iconfont icon-shoucang1" v-show="this.isCollected" style="color: red"></i>
      <span>收藏</span>
    </section>
    <section class="button get-ticket-button" data-clipboard-target="#taokouling" data-clipboard-action="copy" @click="getTicket">
      <i class="iconfont icon-lingquan-copy"></i>
      <input style="opacity: 0; position: absolute; z-index: -1" type="text" id="taokouling" :value="this.model">
      <span>领券</span>
    </section>
  </div>
</template>

<script>
  import Clipboard from 'clipboard';
  import { Toast, Indicator } from 'mint-ui';

  export default {
    name: "OperateButtons",
    data() {
      return {
        isCollected: false,
        model: '',
      }
    },
    props: ['ticket'],
    created() {
      const arr = this.$store.state.collections.filter(c => c.num_iid === this.ticket.num_iid);
      if(arr.length !== 0) {
        this.isCollected = true
      }
    },
    methods: {
      collect() {
        this.isCollected = !this.isCollected;
        if(this.isCollected) {
          this.$store.commit('SET_COLLECTIONS', this.ticket);
          Toast('收藏成功');
        } else {
          this.$store.commit('CANCEL_COLLECTIONS', this.ticket);
          Toast('取消收藏');
        }
      },
      async getTicket() {
        Indicator.open({
          text: '请稍后',
        });
        const resp = await this.api.getTicketLink(this.ticket.coupon_click_url, this.ticket.pict_url, this.ticket.title)
        if(resp.data.model) {
          this.model = resp.data.model
          const clipboard = new Clipboard('.get-ticket-button');
          clipboard.on('success', () => {
            this.$store.commit('SET_TICKETINFO', this.ticket);
          });
          clipboard.on('error', () => {
            this.$store.commit('SET_TICKETINFO', this.ticket);
          });
          Indicator.close();
          this.$store.commit('SET_TICKETINFO', this.ticket);
          this.$store.commit('SET_RED_PACKET_STATUS');
        } else {
          Toast('获取失败,请重新获取');
        }
        this.$store.commit('SET_MINE_TICKETS', this.ticket);
      }
    }
  }
</script>

<style scoped>
  .operate-buttons {
    display: flex;
    align-items: center;
    position: fixed;
    width: 100%;
    height: 50px;
    bottom: 0;
    z-index: 10;
    background-color: rgba(239, 239, 239, .9);
    font-size: 14px;
    font-weight: bolder;
  }

  .operate-buttons a {
    color: #ff6b70;
  }

  .operate-buttons .button {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FFF;
    letter-spacing: 2px;
  }

  .detail-button {
    flex: 3;
    height: 35px;
    margin-left: 1.5rem;
  }

  .detail-button>i {
    color: #ff6b70;
  }

  .collect-button {
    flex:4;
    height: 35px;
    border-radius: 35px 0 0 35px;
    background-color: #ff9999;
  }

  .get-ticket-button {
    flex:4;
    height: 35px;
    border-radius: 0 35px 35px 0;
    margin-right: 1.5rem;
    background-color: #ff6b70;
  }

  .operate-buttons .button>i {
    display: inline-block;
    margin-right: 8px;
    font-size: 16px !important;
  }
</style>

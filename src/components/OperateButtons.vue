<template>
  <div class="operate-buttons">
    <input style="opacity: 0; position: absolute; z-index: -1" type="text" id="taokouling" :value="this.model">
    <input style="opacity: 0; position: absolute; z-index: -1" type="text" id="share" :value="this.shareUrl">
    <section class="button detail-button">
      <i class="iconfont icon-shangpinxiangqing"></i>
      <a :href="this.ticket.item_url" target="_blank">详情</a>
    </section>
    <section class="button collect-button" @click="collect">
      <i class="iconfont icon-shoucang" v-show="!this.isCollected"></i>
      <i class="iconfont icon-shoucang1" v-show="this.isCollected" style="color: red"></i>
      <span>收藏</span>
    </section>
    <section class="button get-ticket-button" data-clipboard-target="#taokouling" data-clipboard-action="copy" @click="getModel">
      <i class="iconfont icon-lingquan-copy"></i>
      <span>领券</span>
    </section>
    <section class="button share-button" data-clipboard-target="#share" data-clipboard-action="copy" @click="share">
      <i class="iconfont icon-share"></i>
      <a>分享</a>
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
        shareUrl: '',
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
      this.getTicket();
      this.shareUrl = `https://www.iamyangqi.cn/#/share?title=${encodeURI(this.ticket.title)}&num_iid=${encodeURI(this.ticket.num_iid)}`;
    },
    methods: {
      share() {
        const clipboard = new Clipboard('.share-button');
        Toast({
          message: '成功生成分享链接',
        });
        clipboard.on('success', () => {
        });
        clipboard.on('error', () => {
        });
      },
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
      getModel() {
        if(this.model) {
          const clipboard = new Clipboard('.get-ticket-button');
          clipboard.on('success', () => {
            this.$store.commit('SET_TICKETINFO', this.ticket);
          });
          clipboard.on('error', () => {
            this.$store.commit('SET_TICKETINFO', this.ticket);
          });
          this.$store.commit('SET_TICKETINFO', this.ticket);
          this.$store.commit('SET_RED_PACKET_STATUS');

          setTimeout(() => {
            window.open(`taobao://m.taobao.com/tbopen/index.html`)
          }, 800)
        } else {
          Toast('获取失败,请重新获取');
        }
        this.$store.commit('SET_MINE_TICKETS', this.ticket);
      },
      async getTicket() {
        Indicator.open({
          text: '请稍后',
        });
        const resp = await this.api.getTicketLink(this.ticket.coupon_click_url, this.ticket.pict_url, this.ticket.title)
        if(resp.data.model) {
          this.model = resp.data.model;
          Indicator.close();
        }
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
  }

  .share-button{
    flex: 3;
    height: 35px;
  }

  .detail-button>i, .detail-button>a, .share-button>i, .share-button>a{
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
    background-color: #ff6b70;
  }

  .operate-buttons .button>i {
    display: inline-block;
    margin-right: 8px;
    font-size: 16px !important;
  }
</style>

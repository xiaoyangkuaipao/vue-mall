<template>
  <div class="share-page">
  </div>
</template>

<script>
import { Indicator, Toast } from 'mint-ui';
import ticketsItem from '../components/TicketsItem';
import cardTicketsItem from '../components/CardTicketsItem';

export default {
  name: 'sharePage',
  data() {
    return {
      q: '',
      num_iid: '',
    };
  },
  created() {
    let title = decodeURI(this.$route.query.title);
    let num_iid = decodeURI(this.$route.query.num_iid);
    if (title && num_iid) {
      this.q = title;
      this.num_iid = num_iid;
      this.search();
    } else {
      Toast('很遗憾，分享链接失效！')
    }
  },
  methods: {
    async search() {
      this.searchPage = 1;
      this.ticketsInfo = [];
      if(!this.q) {
        return
      }else{
        await this.getTickets(this.q, this.searchPage);
      }
    },
    async getTickets(q, page) {   // q: 查询内容 ； page: 查询页数
      Indicator.open({
        text: '淘货er中',
        spinnerType: 'fading-circle',
      });
      const resp = await this.api.getTickets(q, page);
      if(!resp.results) {
        setTimeout(()=> {
          Indicator.close();
          Toast('抱歉，暂无结果！');
        }, 1000)
        return;
      }
      const appendTickets = resp.results.tbk_coupon;
      const len = appendTickets.length;
      if (len < 20) {
        this.isLast = true;
      }
      for (let i = 0; i < len; i += 1) {
        const discount = appendTickets[i].coupon_info ? appendTickets[i].coupon_info.match(/\d+/g) : 0;
        const discountPrice = discount[1] ? discount[1] : discount[0];
        appendTickets[i].discountPrice = discountPrice;
        appendTickets[i].discount =
          (Number(appendTickets[i].zk_final_price) - discountPrice).toFixed(2);
      }
      this.ticketsInfo = appendTickets.filter((at) => at.num_iid == this.num_iid);
      this.$router.push({
        name: 'ticket-detail',
        params:{
          ticket: this.ticketsInfo[0],
          share: true,
        }
      })
      Indicator.close();
    },
  },
  components: { ticketsItem, cardTicketsItem },
};
</script>

<style rel='stylesheet/less' lang='less' scoped>
  .history {
    padding: 5px 0;
  }

  .history-title {
    display: flex;
    justify-content: space-between;
    color: #AAA;
    padding-left: .5rem;
    margin-top: .5rem;
    font-size: 12px;
  }

  .history-item {
    display: inline-block;
    padding: 3px 10px;
    margin: .2rem;
    font-size: 12px;
    border-radius: 5px;
    background-color: #EEE;
  }

  .sousuo-icon {
    position: absolute;
    left: 18vw;
  }

  .delete-icon {
    position: absolute;
    left: 77vw;
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
  }

  .header {
    width: 100vw;
    height: 3rem;
    line-height: 3rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: #FFF;
    font-size: 16px;
    font-weight: bolder;
    background-color: #ff9999;
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
    width: 53vw;
    height: 1.4rem !important;
    line-height: 1.4rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    font-size: 12px;
    letter-spacing: 2px;
    border-radius: .7rem;
    border: 1px solid #FFF;
    color: #FFF;
    background-color: #f96c4e;
    background-image: none !important;
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

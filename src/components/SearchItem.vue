<template>
  <div class="search-wrapper">
    <div class="search">
      <section>
        <i
          class="iconfont icon-taobao1"
          style="margin: 0 .5rem; font-size: 25px; color: #f96c4e"></i>
      </section>
      <div
        class="search-input"
        @click="search"> 淘货er， 最全淘宝优惠券！
      </div>
      <section>
        <i
          class="iconfont icon-youhuiquan"
          style="margin: 0 .5rem; font-size: 20px; color: #f96c4e"></i>
      </section>
    </div>
    <Bar :links="links" style="margin-top: -.3rem;"></Bar>
  </div>
</template>

<script>
  import Bar from '../components/Bar';

  export default {
    name: "SearchItem",
    data() {
      return {
        links: [{
          name: '男装',
          to: {
            path: 'topic',
            name: 'topic',
            params: {
              q: '男装',
              img: require('../../static/imgs/nanzhuang.jpg'),
            }
          }
        }, {
          name: '女装',
          to: {
            path: 'topic',
            name: 'topic',
            params: {
              q: '女装',
              img: require('../../static/imgs/nvzhuang.jpg'),
            }
          }
        }, {
          name: '化妆品',
          to: {
            path: 'topic',
            name: 'topic',
            params: {
              q: '化妆品',
              img: require('../../static/imgs/meizhuang-topic.jpg'),
            }
          }
        }, {
          name: '男鞋',
          to: {
            path: 'topic',
            name: 'topic',
            params: {
              q: '男鞋',
              img: require('../../static/imgs/nanxie.jpg'),
            }
          }
        }, {
          name: '女鞋',
          to: {
            path: 'topic',
            name: 'topic',
            params: {
              q: '女鞋',
              img: require('../../static/imgs/nvxie.jpg'),
            }
          }
        }, {
          name: '零食',
          to: {
            path: 'topic',
            name: 'topic',
            params: {
              q: '零食',
              img: require('../../static/imgs/lingshi.jpg'),
            }
          }
        }, {
          name: '洗护',
          to: {
            path: 'topic',
            name: 'topic',
            params: {
              q: '洗护',
              img: require('../../static/imgs/xihu.jpg'),
            }
          }
        }, {
          name: '手提包',
          to: {
            path: 'topic',
            name: 'topic',
            params: {
              q: '手提包',
              img: require('../../static/imgs/shoutibao.jpg'),
            }
          }
        }, {
          name: '电器',
          to: {
            path: 'topic',
            name: 'topic',
            params: {
              q: '电器',
              img: require('../../static/imgs/dianqi.jpg'),
            }
          }
        }, {
          name: '保健品',
          to: {
            path: 'topic',
            name: 'topic',
            params: {
              q: '保健品',
              img: require('../../static/imgs/baojianpin.jpg'),
            }
          }
        }, {
          name: '箱包',
          to: {
            path: 'topic',
            name: 'topic',
            params: {
              q: '箱包',
              img: require('../../static/imgs/xiangbao.jpg'),
            }
          }
        }, {
          name: '内衣',
          to: {
            path: 'topic',
            name: 'topic',
            params: {
              q: '内衣',
              img: require('../../static/imgs/neiyi.jpg'),
            }
          }
        }, {
          name: '纸巾',
          to: {
            path: 'topic',
            name: 'topic',
            params: {
              q: '纸巾',
              img: require('../../static/imgs/zhijin.jpg'),
            }
          }
        }, {
          name: '母婴',
          to: {
            path: 'topic',
            name: 'topic',
            params: {
              q: '母婴',
              img: require('../../static/imgs/muying.jpg'),
            }
          }
        }]
      }
    },
    methods: {
      search() {
        this.$router.push({
          name: 'search',
        })
      },
    },
    components: { Bar },
  }
</script>

<style rel='stylesheet/less' lang='less' scoped>
  .search-wrapper {
    background-color: rgba(255,255,255,.9);
  }

  .search{
    width: 100vw;
    height: 3rem;
    line-height: 3rem;
    display: flex;
    align-items: center;
  }

  .search-input{
    position: relative;
    flex: 1;
    height: 1.6rem !important;
    line-height: 1.6rem;
    padding-left: 1.5rem;
    font-size: 12px;
    letter-spacing: 2px;
    border-radius: .8rem;
    color: #FFF;
    margin: 0 .25rem;
    background-color: #f96c4e;
  }

  .search-input::before {
    position: absolute;
    left: .25rem;
    content: "\e61e";
    font-family: "iconfont";
    font-size: 1rem;
  }
</style>

<template>
  <div class="nav-box">
    <div class="top-box">
      <div class="top-top">
        <div class="top-left">
          <img :src="sellerdata.avatar" />
        </div>

        <div class="top-right">
          <h1>
            <span>品 牌</span>
            {{ sellerdata.name }}
          </h1>
          <p>{{ sellerdata.description }}</p>
          <div class="top-right-bottom">
            <span>减</span>
            <van-notice-bar
              :scrollable="false"
              background="transparent"
              color="#000"
              :text=" sellerdata.supports "
            />
            <button @click="activamsg_btn">{{supportsnum}}个 ></button>

            <!-- <p>单人精彩套餐 VC无限橙果汁全场8折 在线支付满28减5 特价饮品8折 抢购单人特色套餐</p> -->
          </div>
        </div>

        <!-- 头部蒙层 -->
        <div class="top-top-bac" :style="{'background-image': 'url('+sellerdata.avatar+')' ,}"></div>
      </div>

      <div class="top-bottom">
        <van-notice-bar
          left-icon="volume-o"
          mode="link"
          color="#fff"
          background="rgba(180, 181, 175, 0.97)"
        >{{ sellerdata.bulletin }}</van-notice-bar>
      </div>
    </div>

    <van-tabs swipeable color="#ffd300">
      <van-tab title="商品" to="/"></van-tab>
      <van-tab title="评价" to="/comment"></van-tab>
      <van-tab title="商家" to="/merchant"></van-tab>
    </van-tabs>

    <router-view></router-view>

    <div class="bottom-box">
      <div class="bottom-main">
        <div class="bottom-main-left">
          <van-icon name="smile-o" size="16" />
          <p>联系商家</p>
        </div>
        <div class="bottom-main-mid">
          <div class="bottom-mid-left">
            <van-icon name="shopping-cart-o" size="36px" :color="getoptionlist.length > 0 ? '#FFC300' : '#aaa' " />
          </div>
          <div class="bottom-mid-right" @click="shopcar_click">
            <h5>￥{{ getoptionlist.length > 0 ? allprice : '0.00' }}</h5>
            <van-notice-bar
              :scrollable="false"
              color="#aaa"
              background="#2e2f3b"
              text="另需配送费￥3元 | 支持自取"
            />
          </div>
        </div>
        <div class="bottom-main-right" v-show="getoptionlist.length == 0">￥20元起送</div>
        <div class="bottom-main-right-option" v-show="getoptionlist.length > 0">去结算</div>
      </div>
    </div>

    <transition name="slide-fade">
      <shopcar class="bottom-fixed-box" v-show="isshow_shopcar" />
    </transition>
  </div>
</template>

<script>
import { seller } from "@/api/apis";
import shopcar from "../pages/Shopcar"

export default {
  components:{
    shopcar,
  },
  data() {
    return {
      sellerdata: {
        avatar:
          "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=38373361,828594004&fm=26&gp=0.jpg", //头像+背景
        name: "丸摩堂(Siydti代理店)", //店铺名
        description: "玉团专送/33分钟送达", //简介
        supports:
          "单人精彩套餐VC无限 橙果汁全场8折 在线支付满28减5 特价饮品8折 抢购单人特色套餐", //活动
        bulletin:
          "尊敬的客官，端午攻略2:①6月1日当天在评价区分享童年趣事赠6元无门槛红包②下单时在订单备注处填写【六一儿童节快乐】随机赠送“回忆杀爆款玩具”，数量有限，送完即止。提前预祝大小宝宝节日开心。", //活动描述
      },
      supportsnum: 5,
      isshow_shopcar: false,
    };
  },
  async created() {
    var res = await seller();
    // let index = res.data.data.avatar.lastIndexOf( '/' )
    // res.data.data.avatar = ipurl+res.data.data.avatar.slice( index+1 )

    this.supportsnum = res.data.data.supports.length;
    res.data.data.supports = res.data.data.supports.join("  ");

    this.sellerdata = res.data.data;
    //   console.log( this.sellerdata )

  }, 
  methods: {
    activamsg_btn() {
      this.$router.push("/activemsg");
    },
    shopcar_click() {
      this.isshow_shopcar = !this.isshow_shopcar;
    },

  },
  computed:{
    getoptionlist() {
      return this.$store.getters.getoptionfoods
    },
    allprice() {
      let allprice = 0
       this.getoptionlist.forEach( item => {
        allprice += Number(item.price * item.num)
      } )
      return allprice.toFixed(2)
    }
  }
};
</script>

<style lang="less" scoped>
@bac2E2F3B: #2e2f3b;

.nav-box {
  height: 100%;
  display: flex;
  flex-flow: column;
  .top-box {
    display: flex;
    flex-flow: column;
    justify-content: space-around;

    .top-top {
      flex: 1;
      display: flex;
      padding-top: 20px;
      padding-bottom: 15px;
      position: relative;

      .top-left {
        width: 75px;
        height: 75px;
        padding: 10px;
        img {
          width: 75px;
          height: 75px;
        }
      }

      .top-right {
        flex: 1;
        height: 100px;
        h1 {
          font-size: 18px;
          span {
            display: inline-block;
            background-color: royalblue;
            font-size: 14px;
            padding: 3px;
            color: #fff;
          }
        }

        > p {
          font-size: 14px;
          margin: 10px 0px;
        }

        .top-right-bottom {
          display: flex;
          font-size: 14px;
          > span {
            display: inline-block;
            background-color: rgb(217, 221, 143);
            color: #fff;
            font-weight: bold;
            padding: 3px;
            margin-right: 5px;
          }
          .van-notice-bar {
            flex: 1;
            height: 27px;
            line-height: 27px;
            padding: 0;
          }
          button {
            padding: 3px 10px;
            border: none;
            background-color: rgba(180, 181, 175, 0.97);
            color: #fff;
            font-size: 12px;
            border-radius: 20px;
            margin-right: 5px;
          }
        }
      }

      .top-top-bac {
        position: absolute;
        z-index: -1;
        width: 100%;
        height: 100%;
        opacity: 0.1;
      }
    }

    .top-bottom {
      height: 25px;
      width: 100%;
      line-height: 25px;
      .van-notice-bar {
        height: 100%;
      }
    }
  }

  .bottom-box {
    width: 100%;
    height: 50px;
    position: fixed;
    bottom: 10px;
    z-index: 3;
    .bottom-main {
      height: 100%;
      margin: 0px 10px;
      color: #fff;
      display: flex;

      .bottom-main-left {
        width: 70px;
        background: @bac2E2F3B;
        margin-right: 5px;
        border-radius: 30px 0px 0px 30px;
        text-align: center;
        font-size: 12px;
        padding-top: 5px;
        color: #939393;
      }

      .bottom-main-mid {
        flex: 1;
        background: @bac2E2F3B;
        display: flex;
        padding: 3px 0px;

        .bottom-mid-left {
          background: #666666;
          border-radius: 50%;
          margin: 0px 5px;
          .van-icon {
            line-height: 44px;
            margin: 0px 4px;
          }
        }

        .bottom-mid-right {
          flex: 1;
          h5 {
            font-weight: normal;
            font-size: 16px;
            margin-top: 3px;
          }
          .van-notice-bar {
            padding: 0;
            height: 12px;
            font-size: 12px;
          }
        }

        
      }

      .bottom-main-right {
        width: 85px;
        background: @bac2E2F3B;
        border-radius: 0px 30px 30px 0px;
        text-align: center;
        line-height: 50px;
        font-size: 12px;
      }

      .bottom-main-right-option{
          width: 85px;
        color: @bac2E2F3B;
        border-radius: 0px 30px 30px 0px;
        text-align: center;
        line-height: 50px;
        font-size: 16px;
        font-weight: bold;
        background: #FFC300;
        }
    }
  }

  .bottom-fixed-box {
    width: 100%;
    max-height: 240px;
    padding-bottom: 35px;
    background: #fff;
    position: fixed;
    bottom: 30px;
    z-index: 1;
    overflow: hidden;
  }
  .slide-fade-enter-active {
    transition: all 0.6s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.6s ease;
  }
  .slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateY(10px);
    opacity: 0;
  }
}
</style>
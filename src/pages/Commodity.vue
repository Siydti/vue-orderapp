<template>
  <div class="commodity-box">
    <div class="commodity-left">
      <div>
        <van-sidebar v-model="activeKey">
          <van-sidebar-item
            :title="item.name"
            v-for="(item,index) in getgoodlist_x"
            :key="index"
            @click="leftnav_click"
          />
        </van-sidebar>
      </div>
    </div>

    <div class="commodity-right">
      <div>
        <div v-for="(item,index) in getgoodlist_x" :key="index" :id="index">
          <h3 class="type-h">{{ item.name }}</h3>

          <div class="commodity-box" v-for="(items,index) in item.foods" :key="index">
            <div class="commodity-right-left">
              <div>
                <img :src="items.imgUrl" />
              </div>
            </div>
            <div class="commodity-right-right">
              <h4>{{ items.name }}</h4>
              <span class="type_span">精选</span>
              <van-notice-bar :scrollable="false" :text="items.goodsDesc" class="sell_p" />
              <div class="price-box">
                <p class="price-p">
                  <span class="newprice_sapn">￥{{ items.price }}</span>
                  <span class="oldprice_sapn">￥{{ (items.price+5).toFixed(2) }}</span>
                </p>
                <van-stepper
                  v-model="items.num"
                  min="0"
                  theme="round"
                  button-size="22"
                  disable-input
                  v-show="items.num > 0"
                  @plus="set_btn(items.id,items.num,1)"
                  @minus="set_btn(items.id,items.num,-1)"
                />
                <div
                  class="add_btn"
                  v-show="items.num == 0"
                  @click="set_btn(items.id,items.num,1)"
                >+</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { goods_list } from "@/api/apis";
import BScroll from "better-scroll";

export default {
  data() {
    return {
      activeKey: 0,
      scrollY: 0,
    };
  },
  async created() {
    var res = await goods_list();

    res.data.goodsList.forEach((item) => {
      // console.log( item.foods )

      item.foods.forEach((items) => {
        // console.log( items )
        items.num = 0;

        //     let index = items.imgUrl.lastIndexOf("/");
        //     items.imgUrl = ipurl + items.imgUrl.slice(index + 1);
      });
    });

    // console.log(res.data.goodsList);
    this.$store.commit("initgoodlist", res.data.goodsList);
    // console.log( this.$store.state.goodlist )
  },
  mounted() {
    let left = new BScroll(document.querySelector(".commodity-left"), {
      click: true,
    });
    left;
    this.rightscroll = new BScroll(document.querySelector(".commodity-right"), {
      click: true,
      probeType: 3,
    });
    this.rightscroll.on("scroll", (obj) => {
      this.scrollY = -obj.y;
      // console.log(this.leftright);

      for (let i = 1; i < this.leftright.length; i++) {
        if (
          this.leftright[i - 1] <= this.scrollY &&
          this.scrollY < this.leftright[i]
        ) {
          // console.log(i);
          this.activeKey = i - 1;
          break;
        }
      }
    });
  },
  methods: {
    leftnav_click(index) {
      // console.log( index )
      this.rightscroll.scrollToElement(document.getElementById(index), 300);
    },
    set_btn(childid, childnum, setnum) {
      // console.log( childid )
      // console.log( childnum )
      // console.log( setnum )
      this.$store.commit("setfoodsnum", {
        optionid: childid,
        newnum: childnum + setnum,
      });
      // console.log( this.$store.state.goodlist )
    },
  },
  computed: {
    leftright() {
      let arr = [0];
      let scrollheight = 0;
      for (let i = 0; i < this.getgoodlist_x.length; i++) {
        arr.push((scrollheight += document.getElementById(i).offsetHeight));
      }
      // console.log( arr )

      return arr;
    },
    getgoodlist_x() {
      return this.$store.state.goodlist;
    },
  },
};
</script>

<style lang="less" scoped>
.commodity-box {
  flex: 1;
  display: flex;
  overflow: hidden;
  margin-top: 2px;

  .commodity-left {
    height: 100%;
    width: 70px;
    overflow: auto;

    .van-sidebar {
      width: 100%;
      .van-sidebar-item {
        padding: 10px 5px 10px 9px;
      }
      .van-sidebar-item--select::before {
        background: #ffd300;
        height: 24px;
        left: 1px;
      }
    }
  }

  .commodity-right {
    flex: 1;
    overflow-y: scroll;

    .type-h {
      font-size: 14px;
      font-weight: normal;
      line-height: 30px;
      background-color: #f4f4f4;
      padding-left: 10px;
      border-left: 2px solid #e1e1e1;
      margin-bottom: 10px;
      color: #575757;
    }

    .commodity-box {
      display: flex;
      margin-bottom: 15px;
      .commodity-right-left {
        width: 75px;
        margin: 0px 10px;
        img {
          width: 75px;
          height: 75px;
          border-radius: 10%;
        }
      }

      .commodity-right-right {
        flex: 1;

        .type_span {
          display: inline-block;
          font-size: 12px;
          color: #252525;
          background-color: #eeeeee;
          padding: 3px;
          font-weight: bold;
          margin: 5px 0px;
        }
        .sell_p {
          font-size: 12px;
          color: #9c9c9c;
          margin-bottom: 10px;
          padding: 0px 40px 0px 0px;
          height: 16px;
          background: transparent;
        }

        .price-box {
          display: flex;

          .price-p {
            flex: 1;

            .newprice_sapn {
              font-weight: bold;
              font-size: 18px;
              color: #ff4315;
              margin-right: 5px;
            }
            .oldprice_sapn {
              color: #999999;
              text-decoration: line-through;
              font-size: 14px;
            }
          }

          .van-stepper {
            margin-right: 5px;
          }

          .add_btn {
            width: 22px;
            height: 22px;
            border-radius: 50%;
            color: #fff;
            background: #ee0a24;
            text-align: center;
            font-size: 20px;
            margin-right: 15px;
          }
        }
      }
    }
  }
}
</style>
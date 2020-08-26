<template>
  <div class="shopcar-box">
    <div class="shopcar-head">
      <h2>新用户下单立减5元</h2>
    </div>
    <div class="hint-box" v-if="getoptionfoods_x.length == 0">
      <h2>购物车空空的，赶快添加商品吧···</h2>
    </div>

    <div class="chopcar-mid" v-else>
      <p>购物车</p>
      <p class="remove_p" @click="removeshopcar">
        <van-icon name="close" />清空购物车
      </p>
    </div>

    <div class="chopcar-main">
      <div v-for="(item , index ) in getoptionfoods_x" :key="index">
        <van-notice-bar :scrollable="false" :text="item.name" color='#000' background='#fff' />
        <p>￥{{ item.price }}</p>
        <van-stepper
          v-model="item.num"
          min="0"
          theme="round"
          button-size="22"
          disable-input
          @plus="set_btn"
          @minus="set_btn"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    getoptionfoods_x() {
      return this.$store.getters.getoptionfoods;
    },
  },
  methods: {
    set_btn() {
      console.log( this.getoptionfoods_x )
      console.log( this.$store.state.goodlist )
      // console.log( childid )
      // console.log( childnum )
      // console.log( childnum + setnum )
      // this.$store.commit( 'setfoodsnum' , { optionid : childid , newnum : childnum + setnum  } )
    },
    removeshopcar() {
      this.$store.commit( 'removenum' )
    }
  },
  created() {
    console.log( this.$store.state.goodlist )
  }
};
</script>

<style lang="less" scoped>
.shopcar-box {
  display: flex;
  flex-flow: column;
  .shopcar-head {
    background: #fee7c8;
    border-radius: 30px 30px 0px 0px;
    text-align: center;
    color: #fd885d;
    h2 {
      line-height: 35px;
      font-size: 14px;
      font-weight: normal;
    }
  }
  .chopcar-mid {
    display: flex;
    justify-content: space-between;
    align-content: center;
    margin: 5px;
    .remove_p {
      color: #d3d3d3;
      font-size: 14px;
      .van-icon {
        position: relative;
        top: 2px;
        left: -3px;
      }
    }
  }
  .chopcar-main {
    overflow-y: scroll;
    flex: 1;
    > div {
      display: flex;
      align-content: center;
      margin: 0px 5px;
      .van-notice-bar{
          flex: 1;
          font-size: 16px;
          padding: 0px;
          margin-right: 15px;
      }
      p{
          line-height: 40px;
          margin: 0px 5px;
          color: #FF4010;
          font-size: 18px;
      }
      .van-stepper{
          height: 22px;
          margin-top: 6px;
          margin-left: 15px;
      }
    }
  }

  .hint-box {
    h2 {
      font-size: 16px;
      text-align: center;
      line-height: 40px;
    }
  }
}
</style>
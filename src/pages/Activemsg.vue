<template>
  <div class="activemsg-box" @click="back_click">
    <div class="head-box">
      <h1>{{ this.datamsg.name }}</h1>
      <van-rate
        v-model="this.datamsg.score"
        allow-half
        color="#FF9A02"
        size="28px"
        gutter="20px"
        readonly
      />
    </div>

    <div class="mid-box">
      <van-divider :style="{ color: '#fff', borderColor: '#54575D', padding: '0 16px' , fontSize: '20px' , marginBottom : '20px'}">优惠信息</van-divider>
      <p v-for='(item,index) in datamsg.supports' :key="index">
          <span>减</span>
          {{ item }}
      </p>
    </div>

    <div class="bottom-box">
              <van-divider :style="{ color: '#fff', borderColor: '#54575D', padding: '0 16px' , fontSize: '20px' , marginBottom : '20px'}">商家公告</van-divider>
    <p> {{ this.datamsg.bulletin }} </p>
    </div>
  </div>
</template>

<script>
import { seller } from "@/api/apis";
export default {
  created() {
    seller().then((res) => {
    //   console.log(res.data.data);
      this.datamsg = res.data.data;
    });
  },
  data() {
    return {
      datamsg: {}, //数据
    };
  },
  methods:{
      back_click() {
          history.back()
      }
  }
};
</script>

<style lang="less" scoped>
.activemsg-box {
  width: 100%;
  height: 100%;
  background: #384148;
  color: #fff;
  display: flex;
  flex-flow: column;
  .head-box {
    width: 100%;
    flex: 2;
    text-align: center;
    display: flex;
    flex-flow: column;
    justify-content: center;
    h1 {
      font-size: 24px;
      font-weight: normal;
      margin-bottom: 15px;
    }
    .van-rate--readonly {
      margin: 0px auto;
    }
  }
  .mid-box {
    flex: 3;
    p{
        padding: 15px ;
        span{
            background: #fff;
            font-weight: bold;
            color: #F8AAAB;
            padding: 3px;
            margin-right: 5px;
        }
    }
  }
  .bottom-box {
    flex: 4;
    p{
        padding: 0px 15px;
        line-height: 24px;
    }
  }
}
</style>
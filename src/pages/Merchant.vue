<template>
  <div id="Merchantbox">
    <div class="head_div">
      <div class="top_div">
        <div class="left_div">
          <h2>{{ data.name }}</h2>
          <p>
            <van-rate
              v-model="value"
              allow-half
              color="#FF9A02"
              void-icon="star"
              void-color="#eee"
            />
            <span>(661) 月销{{ data.sellCount }}单</span>
          </p>
        </div>

        <div class="right_div">
          <van-rate
            v-model="value"
            icon="like"
            color="#FF3300"
            size="26"
            void-icon="like-o"
            :count="1"
          />
          <p>已收藏</p>
        </div>
      </div>

      <div class="bottom_div">
        <div class="left_div">
          <p>起送价</p>
          <h5>
            {{data.minPrice}}
            <span>元</span>
          </h5>
        </div>
        <div class="mid_div">
          <p>商家配送</p>
          <h5>
            {{data.deliveryPrice}}
            <span>元</span>
          </h5>
        </div>
        <div class="right_div">
          <p>平均配送时间</p>
          <h5>
            {{ data.deliveryTime }}
            <span>分钟</span>
          </h5>
        </div>
      </div>
    </div>

    <div style="width:100%;height:20px;background:#F4F5F7;margin-top:20px;"></div>

    <div class="active_div">
      <h3>活动与公告</h3>
      <p>{{ data.bulletin }}</p>
    </div>

    <div class="discount_div">
      <p v-for="(item,index) in data.supports" :key="index">
        <span>减</span>{{item}}
      </p>
    </div>
  </div>
</template>

<script>
import { seller } from '@/api/apis'

export default {
  data() {
    return {
      value: 5,
      data:{},//数据列表
    };
  },
  created() {
      seller().then( res => {
          this.data = res.data.data
        //   console.log( this.data )

          this.value = res.data.data.score
      } )
  }
};
</script>

<style lang="less" scoped>
#Merchantbox {
  padding: 0px 10px;
  flex: 1;
  overflow-y: scroll;
  .head_div {
    .top_div {
      margin-top: 20px;
      padding-bottom: 20px;
      border-bottom: 1px solid #cecece;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left_div {
        h2 {
          font-size: 20px;
          font-weight: normal;
          margin-bottom: 10px;
        }
        p {
          span {
            color: #cecece;
            position: relative;
            top: -2px;
            left: 10px;
          }
        }
      }
      .right_div {
        text-align: center;
        p {
          color: #cecece;
          margin-top: 2px;
        }
      }
    }

    .bottom_div {
      display: flex;
      justify-content: space-around;
      text-align: center;
      margin-top: 20px;
      p {
        font-size: 18px;
        color: #cecece;
        margin-bottom: 5px;
      }
      h5 {
        font-size: 24px;
        font-weight: normal;
        span {
          color: #cecece;
          font-size: 12px;
        }
      }
    }
  }

  .active_div {
    padding-bottom: 20px;
    border-bottom: 1px solid #cecece;
    h3 {
      font-size: 22px;
      font-weight: normal;
      margin: 16px 0px;
    }
    p {
      line-height: 26px;
      color: #ff613b;
      font-weight: bold;
    }
  }

  .discount_div {
    p {
      margin: 10px 0px;
      span {
        display: inline-block;
        background: #f01414;
        color: #fff;
        padding: 2px;
        font-weight: bold;
        border-radius: 5px;
        margin-right: 10px;
      }
    }
  }
}
</style>
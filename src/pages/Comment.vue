<template>
  <div id="Commentbox">
    <div class="head_div">
      <div class="left_div">
        <h2>{{ synscore }}</h2>
        <p>综合评分</p>
        <p>高于周边商家{{ ((synscore/5)*100).toFixed() }}%</p>
      </div>
      <div class="right_div">
        <p>
          服务态度
          <van-rate
            v-model="value"
            allow-half
            void-icon="star"
            color="#FF9A02"
            void-color="#eee"
            size="14"
            readonly
          />
          <span>4.5</span>
        </p>
        <p>
          菜品态度
          <van-rate
            v-model="value"
            allow-half
            void-icon="star"
            color="#FF9A02"
            void-color="#eee"
            size="14"
            readonly
          />
          <span>4.5</span>
        </p>
        <p>
          送达时间
          <span>30分钟</span>
        </p>
      </div>
    </div>

    <div style="width:100%;height:20px;background:#F4F5F7;margin:15px 0px"></div>

    <van-tabs type="card" color="#FFC300">
      <van-tab :title="'全部 '+datalist.length">
        <div class="person_div" v-for="(item,index) in datalist" :key="index">
          <img :src="item.avatar" />
          <div class="content_div">
            <div class="head">
              <h4>{{ item.username }}</h4>
              <p>{{ item.rateTime }}</p>
            </div>
            <p>
              <van-rate
                v-model="item.score"
                allow-half
                size="14"
                void-icon="star"
                color="#FF9A02"
                void-color="#eee"
              />
              <span>{{ item.deliveryTime ? item.deliveryTime : '30' }}分钟送达</span>
            </p>
            <p>{{ item.text === "" ? '[该用户未评价，默认好评！]' : item.text }}</p>
            <div class="type_div">
              <van-icon name="good-job-o" v-if="item.recommend.length" />
              <p>
                <span v-for="(items,index) in item.recommend" :key="index">{{ items }}</span>
              </p>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab :title="'满意 '+ happynum">
        <div class="person_div" v-for="(item,index) in happdata" :key="index">
          <img :src="item.avatar" />
          <div class="content_div">
            <div class="head">
              <h4>{{ item.username }}</h4>
              <p>{{ item.rateTime }}</p>
            </div>
            <p>
              <van-rate
                v-model="item.score"
                allow-half
                size="14"
                void-icon="star"
                color="#FF9A02"
                void-color="#eee"
              />
              <span>{{ item.deliveryTime ? item.deliveryTime : '30' }}分钟送达</span>
            </p>
            <p>{{ item.text === "" ? '[该用户未评价，默认好评！]' : item.text }}</p>
            <div class="type_div">
              <van-icon name="good-job-o" v-if="item.recommend.length" />
              <p>
                <span v-for="(items,index) in item.recommend" :key="index">{{ items }}</span>
              </p>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab :title="'不满意 '+ sadnum">
        <div class="person_div" v-for="(item,index) in saddata" :key="index">
          <img :src="item.avatar" />
          <div class="content_div">
            <div class="head">
              <h4>{{ item.username }}</h4>
              <p>{{ item.rateTime }}</p>
            </div>
            <p>
              <van-rate
                v-model="item.score"
                allow-half
                size="14"
                void-icon="star"
                color="#FF9A02"
                void-color="#eee"
              />
              <span>{{ item.deliveryTime ? item.deliveryTime : '30' }}分钟送达</span>
            </p>
            <p>{{ item.text === "" ? '[该用户未评价，默认好评！]' : item.text }}</p>
            <div class="type_div">
              <van-icon name="good-job-o" v-if="item.recommend.length" />
              <p>
                <span v-for="(items,index) in item.recommend" :key="index">{{ items }}</span>
              </p>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { ratings } from "@/api/apis";
import { gettime } from "@/utils/gettime";

export default {
  data() {
    return {
      value: 4.5,
      datalist: [], //评价数据
      happynum: 0, //满意
      sadnum: 0, //不满意
    };
  },
  async created() {
    let res = await ratings();

    res.data.data.forEach((item) => {
      item.rateTime = gettime(item.rateTime);

      if (item.score >= 3) {
        ++this.happynum;
      } else {
        ++this.sadnum;
      }
    });

    // console.log(res.data.data);
    this.datalist = res.data.data;
  },
  methods: {

  },
  computed: {
    happdata() {

        let happydata = this.datalist.filter((item) => item.score >= 3);
        return happydata
    },
    saddata() {
        let saddata =  this.datalist.filter((item) => item.score < 3);
        return saddata
    },
    synscore() {
        let allscore = 0
        this.datalist.forEach( item => {
            allscore += item.score
        } )

        return (allscore/this.datalist.length).toFixed(2)
    },
    // syntime() {
    //     let alltime = 0
    //     this.datalist.forEach( item => {
    //         alltime += item.deliveryTime
    //     } )
    // console.log( alltime )
    //     return (alltime/this.datalist.length).toFixed(2)
    // }
  },
};
</script>

<style lang="less" scoped>
#Commentbox {
  flex: 1;
  overflow-y: scroll;
  padding: 0px 10px;
  .head_div {
    height: 80px;
    display: flex;
    flex-flow: row;
    align-items: center;
    .left_div {
      text-align: center;
      padding: 0px 20px;
      border-right: 2px solid #f5f5f5;
      h2 {
        color: #ffc300;
      }
      p:nth-child(2) {
        font-size: 14px;
        font-weight: bold;
        margin: 5px 0px;
      }
      p:nth-child(3) {
        font-size: 12px;
        color: #a2a2a2;
      }
    }

    .right_div {
      font-size: 14px;
      margin-left: 20px;
      font-weight: bold;
      span {
        font-weight: normal;
      }
      .van-rate--readonly {
        margin: 0px 5px;
      }
      p:nth-child(1) > span,
      p:nth-child(2) > span {
        color: #fdc308;
      }
      p:nth-child(3) > span {
        color: #9c9c9c;
        margin-left: 5px;
      }
      p {
        line-height: 24px;
      }
    }
  }

  .person_div {
    display: flex;
    margin: 20px 20px 0px 20px;
    padding-bottom: 12px;
    border-bottom: 1px solid #f5f5f5;
    > img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 10px;
    }
    .content_div {
      flex: 1;
      .head {
        display: flex;
        justify-content: space-between;
        p {
          font-size: 12px;
          color: #9c9c9c;
        }
      }

      > p:nth-child(2) {
        font-size: 14px;
        color: #9c9c9c;
        margin: 8px 0px;
        span {
          margin-left: 10px;
        }
      }

      > p:nth-child(3) {
        font-size: 14px;
      }

      .type_div {
        display: flex;
        line-height: 20px;
        margin-top: 5px;
        .van-icon {
          font-size: 18px;
          color: #ffc300;
          margin-right: 5px;
        }

        p {
          display: flex;
          flex-wrap: wrap;
          span {
            font-size: 10px;
            color: #9c9c9c;
            padding: 3px;
            border: 1px solid #9c9c9c;
            display: block;
            margin-right: 8px;
            border-radius: 4px;
            margin-bottom: 8px;
          }
        }
      }
    }
  }
}
</style>
<template>
  <div class="out">
    <span class="big-title">全国疫情风险地区汇总</span>
    <div class="content">
      <template v-if="high.length > 0">
        <div class="title">
          <span class="glyphicon glyphicon-alert" style="color: red"></span>高风险区{{
            high.length
          }}个
        </div>
        <ul>
          <li v-for="(i, index) in high" :key="index">{{(index+1)}}.{{i}}</li>
          
        </ul>
      </template>

      <template v-if="mid.length > 0">
        <div class="title">
          <span class="glyphicon glyphicon-alert" style="color: orange"></span>中风险区{{
            midLen
          }}个
        </div>
        <ul>
          <li v-for="(i, index) in mid" :key="index">{{(index+1)}}.{{i}}</li>
          
        </ul>
      </template>
    </div>
  </div>
</template>

<script>
import api from "@/api/index.js";
export default {
  name: "CovArea",
  data() {
    return {
      high: [],
      mid: [],
      midLen: ''
    };
  },
  mounted() {
    api.getCovInfo().then((res) => {
      this.high = res.data.newslist[0].riskarea.high;
      this.mid = res.data.newslist[0].riskarea.mid.slice(0, 100);
      this.midLen = res.data.newslist[0].riskarea.mid.length
    //   console.log(this.midLen);
    });
  },
};
</script>

<style scoped lang="less">
.out {
    padding: 0.15rem;
    background-color:rgb(243, 238, 238);
    .big-title {
        display:block;
        font-size: 0.4rem;
        margin:0.2rem 0rem;
        color: cadetblue;
        border-left: 0.1rem solid rgb(20, 49, 128);
        padding-left: 0.2rem;
    }
    .content {
        background-color: white;
        padding: 0.1rem 0.2rem;
        border-radius: 0.1rem;

        .title {
            margin-bottom: 0.1rem;
            display: flex;
            align-items: center;
            font-size: 0.3rem;
            margin-top: 0.2rem;
            span {
                margin-right: 0.1rem;
                
            }
        }

        ul {
            
            
            li {
                // height: 0.7rem;
                background-color: rgb(243, 238, 238);
                margin-bottom: 0.1rem;
                padding: 0rem 0.2rem;
                line-height: 0.5rem;
                font-size: 0.1rem;
                border-radius: 0.1rem;
            }
        }
    }
}
</style>
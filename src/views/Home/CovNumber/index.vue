<template>
  <div class="out">
    <span class="total">
        截止至{{ onlyFormat(covDesc.modifyTime) }} 全国数据统计
    </span>
    <div class="inner">
      <div class="one">
        <div>
          <span class="incr" style="color: red">{{covDesc.currentConfirmedIncr}}</span>
          <span>较昨日增加</span>
          <span class="num" style="color: red">{{
              division(covDesc.currentConfirmedCount)
          }}</span>
          <span>现存确诊</span>
        </div>

        <div>
          <span class="incr" style="color: green">12</span>
          <span>较昨日增加</span>
          <span class="num" style="color: green">54</span>
          <span>境外输入</span>
        </div>

        <div>
          <span class="incr" style="color: orange">{{covDesc.suspectedIncr}}</span>
          <span>较昨日增加</span>
          <span class="num" style="color: orange">{{
              division(covDesc.suspectedCount)
          }}</span>
          <span>现存无症状</span>
        </div>
      </div>

      <div class="two">
        <div>
          <span class="incr" style="color: purple">{{covDesc.confirmedIncr}}</span>
          <span>较昨日增加</span>
          <span class="num" style="color: purple">{{
              division(covDesc.confirmedCount)
          }}</span>
          <span>累计确诊</span>
        </div>

        <div>
          <span class="incr" style="color: yellowgreen">{{covDesc.deadIncr}}</span>
          <span>较昨日增加</span>
          <span class="num" style="color: yellowgreen">{{
              division(covDesc.deadCount)
          }}</span>
          <span>累计死亡</span>
        </div>

        <div>
          <span class="incr" style="color: blue">{{covDesc.curedIncr}}</span>
          <span>较昨日增加</span>
          <span class="num" style="color: blue">{{
              division(covDesc.curedCount)
          }}</span>
          <span>累计治愈</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CovNumber",
  props: {
    covDesc: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  mounted() {
    // console.log(this.covDesc)
  },
  computed: {},
  methods: {
    onlyFormat(timeStamp) {
      var date = new Date(timeStamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var h =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      var m =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";
      var s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m + s; //时分秒可以根据自己的需求加上
    },

    division(num) {
        if (num == undefined) return '';
        return num.toLocaleString()
    }
  },
};
</script>

<style lang="less" scoped>
.out {
  margin-top: 0.2rem;
  background-color: white;
  height: 5.5rem;
  .incr {
    font-size: 0.3rem;
  }
  .total {
    font-size: 0.25rem;
    display: block;
    width: 95%;
    margin: 0.1rem auto;
  }
  span {
    font-size: 0.2rem;
  }
  .num {
    font-size: 0.45rem;
  }
  .inner {
    width: 95%;
    height: 75%;
    border: 1px solid rgb(233, 230, 230);
    border-radius: 0.1rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    .one {
      flex: 1;
      display: flex;
      border-bottom: 1px solid rgb(233, 230, 230);
      align-items: center;
      div {
        flex: 1;
        // border: 1px solid;
        display: flex;
        flex-direction: column;
        span {
          text-align: center;
        }
      }
    }

    .two {
      flex: 1;
      display: flex;
      align-items: center;
      div {
        flex: 1;
        display: flex;
        flex-direction: column;

        span {
          text-align: center;
        }
      }
    }
  }
}
</style>
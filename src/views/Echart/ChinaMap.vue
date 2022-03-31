<template>
  <div>
    <div class="title">
      <span> 国内疫情地图 </span>
    </div>
    <!-- 地图容器 -->
    <van-tabs v-model="active" animated @change="change">
      <van-tab title="当前确诊">
        <div class="map">
          <div id="nowMain" style="width: 7rem; height: 6rem"></div>
        </div>
      </van-tab>

      <van-tab title="累计确诊">
        <div class="map">
          <div id="main" style="width: 7rem; height: 6rem"></div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
// 引入echarts
// import echarts from "echarts"
// 导入地图的js文件
import "echarts/map/js/china";
import api from "@/api/index";
export default {
  mounted() {
    // 获取疫情数据
    api.getChinaData().then((res) => {
      // console.log("-----", res.data);
      // 获取省份数据
      let citys = res.data.retdata;
      let arr = [];//累计
      let nowArr = []; //现存

      for (let i = 0; i < citys.length; i++) {
        let obj = {};
        let now = {};
        obj.name = citys[i].xArea;
        obj.value = citys[i].confirm; //累计确诊  curConfirm现在确诊
        now.name = citys[i].xArea;
        now.value = citys[i].curConfirm;
        arr.push(obj);
        nowArr.push(now);
      }
      this.arr = arr;//将mounted获取到的arr放入到data里面的arr中，方便下面change() 函数调用


      // 显示地图 [{name: '内蒙古', value: 200}, {name: '北京', value: 200}]
      // Vue 延迟加载
      this.$nextTick(() => {
        this.getChinaMap('nowMain', nowArr);
      })
    });
  },
  methods: {
    getChinaMap(id, data) {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById(id));

      // 指定图表的配置项和数据
      var option = {
        tooltip: {
          //悬浮弹窗
          triggerOn: "click", //提示框触发条件
          enterable: true, //鼠标是否可以进入提示框浮层
          formatter(item) {
            return '<a href="#/citys/'+item.name+'" style="color:#fff">省份：'+item.name+'--详情</a>';
          },
        },
        visualMap: [
          {
            //配置地图颜色
            orient: "horizontal",
            type: "piecewise",
            bottom: 8,
            itemGap: 5,
            itemWidth: 16,
            itemHeight: 10,
            padding: 2,
            textStyle: {
              fontSize: 10,
            },
            pieces: [
              //配置颜色区间
              {
                min: 0,
                max: 0,
                color: "#FFFFFF",
              },
              {
                min: 1,
                max: 100,
                color: "#FDFDCF",
              },
              {
                min: 100,
                max: 1000,
                color: "#FE9E83",
              },
              {
                min: 1000,
                max: 5000,
                color: "#E55A4E",
              },
              {
                min: 5000,
                color: "#4F070D",
              },
            ],
          },
        ],
        series: [
          {
            name: "省",
            type: "map",
            map: "china",
            roam: false,
            zoom: 1.2,
            aspectScale: 0.75,
            top: 40,
            layoutCenter: ["5%", "5%"],
            label: {
              normal: {
                show: true,
                textStyle: {
                  fontSize: 8,
                },
              },
            },
            itemStyle: {
              normal: {
                areaColor: "#f5f5f5",
                borderColor: "rgba(0,0,0,0.2)",
              },
              emphasis: {
                areaColor: "rgba(255,180,0,0.8)",
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 20,
                borderWidth: 0,
              },
            },
            data,
            /* data: [
              {}
            ] */
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    change(title) {
      if (title == 1) {
        this.$nextTick(() => {
          this.getChinaMap("main", this.arr);
        })
      }
    }
  },
  data() {
    return {
      active: 0,
      arr: []
    };
  },
};
</script>

<style scoped lang="less">
.title {
  padding-left: 0.2rem;
  font-size: 0.3rem;
  span {
    display: block;
    border-left: 0.1rem solid rgb(20, 49, 128);
    padding-left: 0.1rem;
  }
}
.map {
  background-color: #f5f5f5;
  width: 100%;
  div {
    margin: 0 auto;
  }
}
</style>
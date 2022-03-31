<template>
  <div>
    <div class="title">
      <h2>{{ cityname }}</h2>
    </div>
    <div class="map">
      <div id="main" style="width: 7rem; height: 8rem"></div>
    </div>
  </div>
</template>

<script>
// 导入城市js
import "echarts/map/js/province/neimenggu";
import "echarts/map/js/province/anhui";
import "echarts/map/js/province/aomen";
import "echarts/map/js/province/anhui";
import "echarts/map/js/province/heilongjiang";
import "echarts/map/js/province/henan";
import "echarts/map/js/province/hubei";
import "echarts/map/js/province/hunan";
import "echarts/map/js/province/jiangsu";
import "echarts/map/js/province/jiangxi";
import "echarts/map/js/province/jilin";
import "echarts/map/js/province/liaoning";
import "echarts/map/js/province/beijing";
import "echarts/map/js/province/ningxia";
import "echarts/map/js/province/qinghai";
import "echarts/map/js/province/shandong";
import "echarts/map/js/province/shanghai";
import "echarts/map/js/province/shanxi";
import "echarts/map/js/province/shanxi1";
import "echarts/map/js/province/sichuan";
import "echarts/map/js/province/taiwan";
import "echarts/map/js/province/tianjin";
import "echarts/map/js/province/xianggang";
import "echarts/map/js/province/chongqing";
import "echarts/map/js/province/xinjiang";
import "echarts/map/js/province/xizang";
import "echarts/map/js/province/yunnan";
import "echarts/map/js/province/zhejiang";
import "echarts/map/js/province/fujian";
import "echarts/map/js/province/gansu";
import "echarts/map/js/province/guangdong";
import "echarts/map/js/province/guangxi";
import "echarts/map/js/province/guizhou";
import "echarts/map/js/province/hainan";

import api from "@/api/index";
export default {
  props: ["cityname"],
  mounted() {
    // 获取城市接口数据
    api.getCity(this.cityname).then((res) => {
      // console.log("----城市数据", res.data);
      let arr = res.data.retdata.subList;
      let newArr = [];
      for (let i = 0; i < arr.length; i++) {
        let qu = /(.+(?=[区]$))/
        let shi = /(.+(?=[市]$))/
        let meng = /(.+(?=[盟]$))/
        // let zhou = /(.+(?=[自治州]$))/
        
        if (qu.test(arr[i].city) || shi.test(arr[i].city) || meng.test(arr[i].city)) {
          let obj = {};
          obj.name = arr[i].city;
          obj.value = arr[i].confirm;
          newArr.push(obj);
        } else {
          let obj = {};
          obj.name = arr[i].city+'市';
          obj.value = arr[i].confirm;
          newArr.push(obj);
        }
          
      }
      console.log("城市处理完毕数据", newArr);
      this.getCityMap("main", this.cityname, newArr);
    });
  },
  methods: {
    getCityMap(id, cityname, data) {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById(id));

      // 指定图表的配置项和数据
      var option = {
        tooltip: {
          //悬浮弹窗
          triggerOn: "click", //提示框触发条件
          enterable: true, //鼠标是否可以进入提示框浮层
          formatter(data) {
            return (
              data.name+'---累计确诊人数：'+data.value
            );
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
            name: "市",
            type: "map",
            map: cityname,
            roam: false,
            zoom: 1.2,
            aspectScale: 0.75,
            top: 40,
            layoutCenter: ["5%", "5%"],
            label: {
              normal: {
                show: false,
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
  },
};
</script>

<style scoped lang="less">
.title {
  padding: 0.2rem;
  background-color: #E6EDFF;
  font-size: 0.2rem;
}
.map {
  background-color: #F7F7F7;
  #main {
    margin: 0.2rem auto;
  }
}
</style>
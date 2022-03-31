<template>
  <div>
    <div class="title">
      <span> 世界疫情地图 </span>
    </div>

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
import "echarts/map/js/world";
import api from "../../api/index";
export default {
  name: "WorldMap",
  data() {
    return {
      active: 0,
      arr: []
    }
  },
  mounted() {
    api.getWorldData().then((res) => {
      console.log("世界疫情", res.data);
      let retdata = res.data.retdata;
      let arr = [];
      let nowArr = [];

      for (let i = 0; i < retdata.length; i++) {
        let obj = {};
        let nowObj = {};
        nowObj.name = retdata[i].xArea;
        nowObj.value = retdata[i].curConfirm
        obj.name = retdata[i].xArea;
        obj.name = retdata[i].confirm
        arr.push(obj);
        nowArr.push(nowObj);
      }
      this.arr = arr;
      this.$nextTick(() => {
        this.getWorldMap("nowMain", nowArr);
      }) 
    });
    
  },
  methods: {
    getWorldMap(id, data) {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById(id));

      // 指定图表的配置项和数据
      var option = {
        tooltip: {
          //悬浮弹窗
          triggerOn: "click", //提示框触发条件
          enterable: true, //鼠标是否可以进入提示框浮层
          formatter(data) {
            return data.name + " " + data.value;
          },
        },
        visualMap: [
          {
            //配置地图颜色
            orient: "vertical",
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
                max: 10000,
                color: "#FDFDCF",
              },
              {
                min: 10000,
                max: 100000,
                color: "#FE9E83",
              },
              {
                min: 100000,
                max: 500000,
                color: "#E55A4E",
              },
              {
                min: 500000,
                color: "#4F070D",
              },
            ],
          },
        ],
        series: [
          {
            name: "国家",
            type: "map",
            map: "world",
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
    change(title) {
      if (title == 1) {
        this.$nextTick(() => {
          this.getWorldMap("main", this.arr);
        })
      }
    }
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
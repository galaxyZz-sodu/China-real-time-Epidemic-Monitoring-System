<template>
  <div class="selectCity">
    <div class="title">城市选择</div>
    <van-index-bar :index-list="indexList">
      <template v-for="(i, index) in cityList">
        <van-index-anchor :index="index" :key="index" />
        <van-cell :title="ele.name" v-for="ele in i" :key="ele.id" @click="goHome"/>
      </template>
    </van-index-bar>
  </div>
</template>

<script>
import api from "@/api/index";
export default {
  name: "SearchCity",
  data() {
    return {
      cityList: {},
      indexList:[]
    };
  },
  mounted() {
    api.getCity2().then((res) => {
        this.cityList = res.data.result.citylist;
    //Objct.keys(obj) 获取所有的键名 --[]
        this.indexList = Object.keys(this.cityList);
    });
  },
  methods: {
      goHome(event) {
        //   console.log('点击', event);
        //   console.log(event.target.innerText)
        //   1. 点击获取当前城市名称    2. 跳转首页     3.获取城市名称传递给首页
        // 本地存储传参
        localStorage.setItem('city', event.target.innerText)
        // 返回home
        this.$router.push({
            path: '/'
        }) ;
      }
  },
};
</script>

<style scoped lang="less">
.selectCity {
  background-color: #f5f5f5;
  .title {
    padding: 0.2rem;
  }
}
</style>
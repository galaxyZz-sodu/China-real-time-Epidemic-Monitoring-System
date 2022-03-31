<template>
  <div class="home">
    <!-- 疫情图片 -->
    <div class="logo">
      <img src="@/assets/images/魔方改.jpg" alt="" />
      <div class="select" @click="goSearchCity">{{city}}</div>
    </div>
    
    <!-- 病毒信息 -->
    <CovInfo :news='news'/>
    <!-- 疫情导航 -->
    <div class="list">
      <div @click="goArea">
        <span class="glyphicon glyphicon-user" style="color: orange"></span>
        <div>风险地区</div>
      </div>

      <div>
        <span class="glyphicon glyphicon-filter" style="color: aquamarine"></span>
        <div>核酸检测</div>
      </div>

      <div @click="goPrevention">
        <span class="glyphicon glyphicon-gift" style="color: blueviolet"></span>
        <div>防疫物资</div>
      </div>

      <div @click="goTravel">
        <span class="glyphicon glyphicon-road" style="color: aqua"></span>
        <div>出行政策</div>
      </div>
    </div>
    <!-- 疫情数据 -->
    <CovNumber :covDesc='covDesc'/>

    <!-- 地图 -->
    <ChinaMap/>

    <!-- 世界地图 -->
    <!-- <WorldMap/> -->

    <!-- 轮播图 -->
    <VueSwiper/>
  </div>
</template>

<script>
import CovInfo from "./CovInfo";
import CovNumber from './CovNumber'
import ChinaMap from '../Echart/ChinaMap.vue'
import WorldMap from '../Echart/WorldMap.vue'
import VueSwiper from './VueSwiper'
import api from '@/api/index.js'
export default {
  name: "Home",
  data() {
    return {
      covDesc: {},
      news: [],
      city: '城市选择',
    }
  },
  components: { CovInfo, CovNumber, ChinaMap, WorldMap, VueSwiper },
  created() {
    
  },
  mounted() {
    // 请求病毒接口
    api.getCovInfo().then(res => {
      // console.log(res.data);
      this.covDesc = res.data.newslist[0].desc;
      // console.log(this.covDesc);
      this.news = res.data.newslist[0].news;
      // console.log(this.news);
    })
    
    // 获取本地存储
    let city = localStorage.getItem('city');
    if (city) {
      this.city = city + '疫情';
    }

    // 跳转到该路由时返回顶部
    this.$router.afterEach(() => {
        window.scrollTo(0, 0)
      })
  },
  methods: {
    goArea() {
      this.$router.push({
        path: '/area'
      })
    },
    goPrevention() {
      this.$router.push({
        path: '/prevention'
      })
    },
    goTravel() {
      this.$router.push({
        path: '/travel'
      })
    },
    goSearchCity() {
      this.$router.push({
        path: '/searchCity'
      })
    }
  },
};
</script>

<style scoped lang="less">
.logo {
position: relative;
img {
  width: 100%;
}
.select {
position: absolute;
top: 0.2rem;
right: 0.2rem;
color: white;
padding: 0.1rem 0.2rem;
background-color: rgba(61,64,69,0.5);
border-radius: 0.4rem;
}
}

.home {
  padding-bottom: 0.2rem;
}
.list {
  display: flex;
  height: 1.3rem;
  
  border-bottom: 1px solid rgb(233, 230, 230);
  
  div {
    flex: 1;
    text-align: center;
    span {
      font-size: 0.5rem;
    }
  }
  
}
</style>
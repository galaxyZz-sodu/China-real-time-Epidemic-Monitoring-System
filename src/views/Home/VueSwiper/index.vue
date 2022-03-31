<template>
  <div class="swiper">
    <!-- 轮播图 -->
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="i in swiperArr" :key="i.title">
          <img :src="i.image" alt="" width="100%" />
        </div>
      </div>
    </div>

    <!-- 轮播图片按钮 -->
    <ul class="list">
      <li v-for="(item, index) in swiperArr" :key="item.title">
        <div
          class="item"
          :class="{ active: index == num }"
          @click="changeSwiper(index)"
        >
          <div class="inner">
            {{ item.title }}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Swiper from "swiper";
import api from "@/api/index.js";
export default {
  name: "newSwiper",
  data() {
    let self  = this
    return {
      arr: [
        "新增疑似/新增确诊",
        "现存确诊/现存疑似",
        "死亡/治愈",
        "病死率",
        "治愈率",
      ],
      swiperArr: [],
      num: 0,
    };
  },
  mounted() {
    var self = this
    var mySwiper = new Swiper(".swiper-container", {
      observer: true, //修改swiper自己或子元素时，自动初始化swiper
      observeParents: true, //修改swiper的父元素时，自动初始化swiper
      /* autoplay: {
        // delay: 3000,
        // stopOnLastSlide: false,
        // disableOnInteraction: true,
      }, */
      // loop: true
      on: {
        slideChange: function() {
          self.num = this.activeIndex //将swiper的真实index传给vue data的 num,实现下标随轮播图的滑动而切换
        }
      },
    });
    api.getSwiperBanner().then((res) => {
      this.swiperArr = res.data.result;
    });
  },
  methods: {
    changeSwiper(index) {
      // 高亮选中
      this.num = index;
      // 让swiper切换
      var mySwiper = document.querySelector(".swiper-container").swiper;
      mySwiper.slideTo(index, 800);
    },
  },
};
</script>

<style scoped lang="less">
.swiper {
  margin-top: 0.2rem;
}
img {
  width: 100%;
}

.list {
  display: flex;
  /* .acrtive {
      background-color: blue;
      color: aquamarine;
    } */
  li {
    flex: 1;
    align-items: center;
  }
  .active {
    background-color: #f1f5ff !important;
    color: #4169e2;
  }
  .item {
    padding: 0.1rem 0.15rem;
    border-radius: 0.06rem;
    margin: 0 auto;
    width: 90%;
    height: 0.85rem;
    background-color: #f7f7f7;
    font-size: 0.1rem;
    text-align: center;
    display: flex;
    align-items: center;

    .inner {
      margin: 0 auto;
    }
  }
}
</style>
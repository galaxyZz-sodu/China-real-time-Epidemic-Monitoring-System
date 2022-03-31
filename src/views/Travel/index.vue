<template>
  <div>
    <div class="title">
      <span class="glyphicon glyphicon-plane icon"></span
      ><span>疫情期间出行防疫政策</span>
    </div>
    <!-- van-field
          label 输入框左侧文本
          is-link 是否展示右侧箭头并开启点击反馈
          readonly 只读
     -->
    <van-field
      v-model="goCity"
      is-link
      readonly
      label="出发城市"
      placeholder="请选择所在地区"
      @click="show = true"
    />

    <!-- van-cascader
      close 点击关闭图标时触发
      finish 全部选项选择完成后触发
     -->
    <van-popup v-model="show" round position="bottom">
      <van-cascader
        v-model="cascaderValue"
        title="请选择出发城市"
        :options="options"
        @close="show = false"
        @finish="onFinish"
      />
    </van-popup>

    <van-field
      v-model="toCity"
      is-link
      readonly
      label="到达城市"
      placeholder="请选择所在地区"
      @click="show2 = true"
    />
    <van-popup v-model="show2" round position="bottom">
      <van-cascader
        v-model="cascaderValue2"
        title="请选择到达城市"
        :options="options"
        @close="show2 = false"
        @finish="toFinish"
      />
    </van-popup>

    <div class="search">
      <van-button type="info" size="large" @click="search"
        >查询疫情政策</van-button
      >
    </div>

    <!-- 政策查询结果 -->
    <div class="content" v-show="fromInfo">
      <div class="in">
        <div class="title-2" :class="{mid: this.$root.fromLevel == 2 && 3, high: this.$root.fromLevel >= 4}">{{ fromInfo.city_name }}
          <span v-if="this.$root.fromLevel <= 1">低风险</span>
          <span v-if="this.$root.fromLevel == 2 && 3">中风险</span>
          <span v-if="this.$root.fromLevel >= 4">高风险</span>
          </div>

        <div class="from">
          <div class="title-in">外出政策</div>
          {{ fromInfo.out_desc }}
        </div>

        <div class="to">
          <div class="title-in">进入政策</div>
          {{ fromInfo.low_in_desc }}
        </div>
      </div>

      <div class="in">
        <div class="title-2" :class="{mid: this.$root.toLevel == 2 && 3, high: this.$root.toLevel >= 4}">{{ toInfo.city_name }}
          <span v-if="this.$root.toLevel <= 1">低风险</span>
          <span v-if="this.$root.toLevel == 2 && 3">中风险</span>
          <span v-if="this.$root.toLevel >= 4">高风险</span>
        </div>

        <div class="from">
          <div class="title-in">外出政策</div>
          {{ toInfo.out_desc }}
        </div>

        <div class="to">
          <div class="title-in">进入政策</div>
          {{ toInfo.low_in_desc }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import api from "@/api/index.js";
export default {
  data() {
    return {
      goCity: "",
      toCity: "",
      show: false,
      show2: false,
      fieldValue: "",
      cascaderValue: "",
      cascaderValue2: "",
      from: "",
      to: "",
      fromInfo: "",
      toInfo: "",
      
      // 选项列表，children 代表子选项，支持多级嵌套
      options: [
        {
          text: "浙江省",
          value: "330000",
          children: [{ text: "杭州市", value: "330100" }],
        },
        {
          text: "江苏省",
          value: "320000",
          children: [{ text: "南京市", value: "320100" }],
        },
      ],
    };
  },
  methods: {
    // 全部选项选择完毕后，会触发 finish 事件
    onFinish({ selectedOptions, value, tabIndex }) {
      // console.log(selectedOptions, value, tabIndex);
      this.from = value;
      this.show = false;
      this.goCity = selectedOptions.map((option) => option.text).join("/");
    },
    toFinish({ selectedOptions, value }) {
      this.to = value;
      this.show2 = false;
      this.toCity = selectedOptions.map((option) => option.text).join("/");
    },
    search() {
      // console.log("城市疫情查询", this.from, this.to);
      //params={from: '', to: ''}
      api
        .getTravelQuery({
          from: this.from,
          to: this.to,
        })
        .then((res) => {
          // console.log('政策数据', res.data);
          this.fromInfo = res.data.result.from_info;
          this.toInfo = res.data.result.to_info;
          // console.log("政策", this.fromInfo, this.toInfo);
          this.$root.fromLevel = parseInt(this.fromInfo.risk_level);
          this.$root.toLevel = parseInt(this.toInfo.risk_level);
          // console.log('风险等级', this.$root.fromLevel, this.$root.toLevel)
        });
    },
  },
  mounted() {
    api.getTravel().then((res) => {
      // console.log(res.data);
      let result = res.data.result;
      // 处理数据结构：[{text: '', value: '', children: [{}]}]
      let arr = [];
      result.forEach((item) => {
        let obj = {};
        obj.text = item.province;
        obj.value = item.province_id;
        obj.children = []; //二级区域
        item.citys.forEach((ele) => {
          let child = {};
          child.text = ele.city;
          child.value = ele.city_id;
          // 追加给obj.children
          obj.children.push(child);
        });
        // 追加给arr
        arr.push(obj);
      });
      // console.log('打印后处理的数据', arr)
      this.options = arr;
    });
  },
};
</script>

<style scoped lang="less">
.title {
  display: flex;
  padding: 0.2rem;
  font-size: 0.4rem;
  align-items: center;
  .icon {
    margin-right: 0.1rem;
    color: #1989fa;
  }
}


.search {
  padding: 0.2rem;
}
.content {
  padding: 0.2rem;
  .title-in {
  font-size: 0.3rem;
  margin-bottom: 0.3rem;
}
  .from{
    background-color: rgb(243, 238, 238);
    border-radius: 0.1rem;
    font-size: 0.2rem;
    // font-weight: 800;
    line-height: 0.4rem;
    padding: 0.2rem;
    margin-bottom: 0.2rem;
  }
  .to {
    background-color: rgb(243, 238, 238);
    border-radius: 0.1rem;
    font-size: 0.2rem;
    // font-weight: 800;
    line-height: 0.4rem;
    padding: 0.2rem;
    margin-bottom: 0.2rem;
  }
  .title-2 {
    height: 0.8rem;
    background-color: darkcyan;
    border-radius: 0.1rem;
    font-size: 0.3rem;
    font-weight: 800;
    line-height: 0.8rem;
    padding: 0rem 0.2rem;
    color: white;
    margin-bottom: 0.2rem;
  }
  .mid {
    background-color: wheat!important;
  }
  .high {
    background-color: tomato!important;
  }
}
</style>
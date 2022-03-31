<template>
  <div>
    <img src="@/assets/images/防疫物资title.png" alt="" />
    <div class="back">
      <van-tabs v-model="active" animated>
        <van-tab title="洗手液"
          ><img src="@/assets/images/防疫物资洗手液.png" alt=""
        /></van-tab>
        <van-tab title="温度计"
          ><img src="@/assets/images/防疫物资温度计.png" alt=""
        /></van-tab>
        <van-tab title="口罩"
          ><img src="@/assets/images/防疫物资口罩.png" alt=""
        /></van-tab>
        <van-tab title="消毒剂"
          ><img src="@/assets/images/防疫物资消毒剂.png" alt=""
        /></van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "Prevention",
  data() {
    return {
      active: 0,
    };
  },
};
</script>

<style scoped lang="less">
img {
  width: 100%;
}
.back {
  background-color: rgb(51, 67, 255);
  width: 100%;
  height: 100%;

  .content {
      width: 90%;
      margin: 0 auto;
  }
}
</style>
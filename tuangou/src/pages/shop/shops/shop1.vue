<template>
  <div class="shop1">
    <div class="flex" style="margin:0.2rem 0;">
      <div @click="toppage">
        <svg t="1564143866822" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5699" width="35" height="35"><path d="M671.968176 911.99957c-12.287381 0-24.576482-4.67206-33.951566-14.047144L286.048434 545.984249c-18.751888-18.719204-18.751888-49.12028 0-67.872168L638.016611 126.111222c18.751888-18.751888 49.12028-18.751888 67.872168 0 18.751888 18.719204 18.751888 49.12028 0 67.872168l-318.016611 318.047574L705.888778 830.047574c18.751888 18.751888 18.751888 49.12028 0 67.872168C696.544658 907.32751 684.255557 911.99957 671.968176 911.99957z" p-id="5700"></path></svg>
      </div>
      <div style="font-size:1.5rem;">梦泉商场</div>
      <div></div>
    </div>
    <!-- 首页轮播组件 -->
    <div class="swiper-container" v-show="pic.length==0?false:true">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(p,i) in pic" :key="i">
          <img :src="p.src" />
        </div>
      </div>
      <!--分页器-->
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
// import {swiper,swiperSlide} from 'vue-awesome-swiper'
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
export default {
  name: "shop1",
  data() {
    return {
      pic: [
        { src: require("../../../common/images/1.jpg") },
        { src: require("../../../common/images/2.jpg") },
        { src: require("../../../common/images/3.jpg") },
        { src: require("../../../common/images/4.jpg") }
      ]
    };
  },
  methods:{
    toppage(){
      this.$router.go(-1);//返回上一层
    }
  },
  mounted() {
    const that = this;
    new Swiper(".swiper-container", {
      // autoplay: true,//可选选项，自动滑动
      autoplay: {
        delay: 4000 //4秒切换一次
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        spaceBetween: 10
      },
      loop: true // 循环模式选项
    });
  }
};
</script>

<style scoped>
.flex{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.swiper-container{
  /*width: 95%;*/
  width: 100%;
  height: 11rem;
  /*border-radius: .7rem;*/
}
.swiper-wrapper{
  width: 100%;
}
.swiper-slide{
  width: 100%;
}
.swiper-container img{
  /*height: 10rem;*/
  width: 100%;
}
</style>

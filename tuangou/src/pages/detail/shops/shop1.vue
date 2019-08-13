<template>
  <div class="shop1">
    <div class="flex" style="margin:0.2rem 0;">
      <div @click="toppage">
        <svg t="1564143866822" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5699" width="35" height="35"><path d="M671.968176 911.99957c-12.287381 0-24.576482-4.67206-33.951566-14.047144L286.048434 545.984249c-18.751888-18.719204-18.751888-49.12028 0-67.872168L638.016611 126.111222c18.751888-18.751888 49.12028-18.751888 67.872168 0 18.751888 18.719204 18.751888 49.12028 0 67.872168l-318.016611 318.047574L705.888778 830.047574c18.751888 18.751888 18.751888 49.12028 0 67.872168C696.544658 907.32751 684.255557 911.99957 671.968176 911.99957z" p-id="5700"></path></svg>
      </div>
<!--      <div style="font-size:1.5rem">梦泉商场</div>-->
      <div></div>
    </div>

  </div>
</template>

<script>
// import {swiper,swiperSlide} from 'vue-awesome-swiper'

export default {
  name: "shop1",
  data() {
    return {
      pic: [
      ]
    };
  },
  methods:{
    //cook相关
    setCookie(key, value, iDay) {
      var oDate = new Date();
      oDate.setDate(oDate.getDate() + iDay);
      document.cookie = key + '=' + value + ';expires=' + oDate;

    },
    getCookie(key) {
      let cookieArr = document.cookie.split('; ');
      for(let i = 0; i < cookieArr.length; i++) {
        let arr = cookieArr[i].split('=');
        if(arr[0] === key) {
          return arr[1];
        }
      }
      return false;
    },
    removeCookie(key) {
      this.setCookie(key, '', -1);//这里只需要把Cookie保质期退回一天便可以删除
    },
    toppage(){
      this.$router.replace('/home')
      this.removeCookie('id')
      this.removeCookie('openid')
    }
  },
  mounted() {
    const that = this;


  }
};
</script>

<style scoped>
  .icon{
    width: 1.5rem;
  }
.flex{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

</style>

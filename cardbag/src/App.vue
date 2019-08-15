<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data(){
    return{

    }
  },
  beforeCreate() {
    document
      .querySelector("html")
      .setAttribute("style", "background-color:#ececec");
      // .setAttribute("style", "background-color:#fff");
  },
  beforeDestroy() {
    document.querySelector("html").removeAttribute("style");
  },
};
</script>

<style>
html{
  width:100%;height:100%;
  background: #fff;
}
body{
  margin: 0;
  width:100%;height:100%;
  background: #fff;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
@font-face {
  font-family: "iconfont"; /* project id 1208028 */
  src: url("//at.alicdn.com/t/font_1208028_ygw20p1i7vo.eot");
  src: url("//at.alicdn.com/t/font_1208028_ygw20p1i7vo.eot?#iefix")
      format("embedded-opentype"),
    url("//at.alicdn.com/t/font_1208028_ygw20p1i7vo.woff2") format("woff2"),
    url("//at.alicdn.com/t/font_1208028_ygw20p1i7vo.woff") format("woff"),
    url("//at.alicdn.com/t/font_1208028_ygw20p1i7vo.ttf") format("truetype"),
    url("//at.alicdn.com/t/font_1208028_ygw20p1i7vo.svg#iconfont") format("svg");
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
</style>

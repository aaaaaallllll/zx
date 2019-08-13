<template>
  <div id="app" >
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return{
      // note: {
      //   backgroundImage: "url(" + require("../../common/images/back.png") + ")",
      //   backgroundRepeat: "no-repeat",
      // },

    }
  }
}
</script>

<style>
  @import'./common/css/style.css';
  html{
    height: 100%;
    width: 100%;
  }
  body{
    height: 100%;
    width: 100%;
  }
 #app{
   height: 100%;
   width: 100%;
 }

</style>

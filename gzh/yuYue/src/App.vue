<template>
  <div id="app">
    <Nav v-show="!$route.meta.showFooter"/>
    <router-view/>
  </div>
</template>

<script>
  import Nav from'./components/nav/nav'
  export default {
    name: 'App',
    components:{
      Nav
    }
  }
</script>

<style>
  @import'./common/css/style.css';
</style>

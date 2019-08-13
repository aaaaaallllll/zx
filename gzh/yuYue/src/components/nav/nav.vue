<template>
    <div id="nav">
      <div class="navList">
          <div class="navBox" :class="{active:this.$route.path==='/tech'||this.$route.path==='/'}" @click="myGoTo('/tech')">
            <i class="iconfont">&#xe603;</i>
            <span>技师</span>
          </div>
          <div class="navBox" :class="{active:this.$route.path==='/boxroom'}" @click="myGoTo('/boxroom')">
            <i class="iconfont" style="font-size: 21px">&#xe623;</i>
            <span>包厢</span>
          </div>
          <div class="navBox" :class="{active:this.$route.path==='/sparoom'}" @click="myGoTo('/sparoom')">
            <i class="iconfont">&#xe78f;</i>
            <span>SPA</span>
          </div>
          <div class="navBox" :class="{active:this.$route.path==='/tearoom'}" @click="myGoTo('/tearoom')">
            <i class="iconfont">&#xe601;</i>
            <span>茶房</span>
          </div>
          <div class="navBox" :class="{active:this.$route.path==='/bath'}" @click="myGoTo('/bath')">
            <i class="iconfont">&#xe648;</i>
            <span>洗浴</span>
          </div>
          <div class="navBox" :class="{active:this.$route.path==='/food'}" @click="myGoTo('/food')">
            <i class="iconfont">&#xe628;</i>
            <span>餐饮</span>
          </div>
      </div>
      <div class="box"  @click="myGoTo('/order')">
        <i class="iconfont">&#xe605;</i>
        <span>订单</span>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Nav",
      methods:{
        myGoTo(path){
          const that=this
          that.$router.replace(path)
        }
      }
    }
</script>

<style scoped>
  @import'../../common/css/style.css';
  .iconfont{
    font-family:"iconfont" !important;
    font-size:18px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;}
  .navList{
    font-size: 11px;
    width: 100%;
    height: 56px;
    /*line-height: 56px;*/
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #FFF;
    box-shadow: 0 -1px 2px #B6B6B6;
    display: flex;
    justify-content:space-around;
    align-items:center;
    padding-top: 3px;
    box-sizing: border-box;
    color: rgba(188, 188, 188, 1);
    border-radius:4px;
    z-index: 9;
  }
  .navList .navBox{
    text-align: center;
    height: 48px;
    line-height: 24px;
  }
  .navBox span,.navBox i{
    display: block;
  }
  .navBox span{
    color: #7C7C7C;
  }
  #nav .active{
    color: #FFBB2B;
  }
  #nav .active>span{
    color: #FFBB2B;
  }
  .box{
    height: 80px;
    width: 80px;
    border-radius: 40px;
    padding-top: 10px;
    line-height: 40px;
    background:rgba(254,186,0,1);
    color: #FFFFFF;
    box-shadow: 2px 2px 5px #a1a1a1;
    text-align: center;
    box-sizing: border-box;
    position: fixed;
    bottom: 134px;
    right: 5px;
    /*position: relative;*/
    z-index: 8;
  }
  .box i,.box span{
    display: block;
  }
  .box i{
    font-size: 30px;
  }
  .box span{
    text-align: center;
    width:100%;
    height:21px;
    font-size:15px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height:21px;
  }
</style>

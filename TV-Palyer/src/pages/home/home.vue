<template>
    <div id="home">
      <!--头部-->
      <div class="title">
        <div class="title-left">
          <img src="../../common/images/WechatIMG295.png">
        </div>
        <div class="title-right">
          <h4>
            TV Player Background Management System
          </h4>
          <span @click="myGoto('/login')">
            Exit
          </span>
        </div>
      </div>
      <!--内容-->
      <div class="content">
        <!--导航栏-->
        <div class="content-left">
          <!--用户信息-->
          <div class="userInfo">
            <img src="../../common/images/user.png">
            <div class="user">
              <span>
                {{userId}}
              </span>
              <p>
                Agent
              </p>
            </div>
          </div>
          <!--管理页面-->
          <div class="manage">
            <!--代理商后台-->
            <div class="box">
              <h5>Agent System</h5>
              <ul>
                <li @click="myGoto('/box')" :class="{on:this.$route.path=='/box'}">
                  <i class="iconfont">&#xe7f1;</i>
                  <span :class="{in:this.$route.path=='/box'}">Boxes</span>
                </li>
              </ul>
            </div>
            <!--系统人员后台-->
            <div class="box">
              <h5>Manager System</h5>
              <ul>
                <li @click="myGoto('/source')" :class="{on:this.$route.path=='/source'}">
                  <i class="iconfont" style="font-size: 32px">&#xe63a;</i>
                  <span :class="{in:this.$route.path=='/source'}" style="position: relative;top:-4px">Channels</span>
                </li>
                <li @click="myGoto('/agent')" :class="{on:this.$route.path=='/agent'}">
                  <i class="iconfont" style="font-size: 32px">&#xe635;</i>
                  <span :class="{in:this.$route.path=='/agent'}" style="position: relative;top:-4px">Agents</span>
                </li>
              </ul>
            </div>
            <!--系统设置-->
            <div class="box">
              <h5>System Settings</h5>
              <ul>
                <li @click="myGoto('/changepass')" :class="{on:this.$route.path=='/changepass'}">
                  <i class="iconfont">&#xe612;</i>
                  <span :class="{in:this.$route.path=='/changepass'}">Password</span>
                </li>
              </ul>
            </div>
            <!--Logo-->
            <img src="../../common/images/logo.png" class="loge">
          </div>

        </div>
        <div class="content-right">
          <router-view/>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Home",
      data(){
          return{
            userId:'',
            id:''
          }
      },
      methods:{
        setCookie(key, value, iDay) {
          var oDate = new Date();
          oDate.setDate(oDate.getDate() + iDay);
          document.cookie = key + '=' + value + ';expires=' + oDate;

        },
        getCookie(key) {
          var cookieArr = document.cookie.split('; ');
          for(var i = 0; i < cookieArr.length; i++) {
            var arr = cookieArr[i].split('=');
            if(arr[0] === key) {
              return arr[1];
            }
          }
          return false;
        },
        removeCookie(key) {
          this.setCookie(key, '', -1);//这里只需要把Cookie保质期退回一天便可以删除
        },
        myGoto(path){

          this.$router.replace(path)

        },
      },
      mounted() {
        // console.log(this.getCookie('userId'))
        this.userId=this.getCookie('userid')
        this.id=this.getCookie('id')
        // this.userId=this.$route.params.userId
      }
    }
</script>

<style scoped>
  @import'../../common/css/style.css';
  /**{*/
  /*  box-sizing: border-box;*/
  /*}*/
  #home{
    width: 100%;
    height: 100%;
  }
  /*标题*/
  .title{
    width: 100%;
    height: 90px;
    box-sizing: border-box;
    display: flex;
  }
  .title .title-left{
    flex: 0 0 360px;
    width: 360px;
    height: 90px;
    /*box-sizing: border-box;*/
    /*text-align: center;*/
    /*line-height: 100px;*/
    background-color: #2D7FE4;
  }
  .title .title-left img{
    height: 40px;
    margin-top: 25px;
    margin-left: 92px;
  }
  .title .title-right{
    width: 90%;
    height: 90px;
    background-color: #4598FF;
    line-height: 90px;
    padding-left: 69px;
    padding-right: 36px;
    display: flex;
    /*justify-content:center;*/
    align-items:center;
  }
  .title .title-right *{
    display: inline-block;
    height: 51px;
    color: #FFF;
    line-height: 51px;
  }
  .title .title-right h4{
    width: 100%;
    font-size: 26px;
    min-width: 380px;
    overflow: hidden;
  }
  .title .title-right span{
    font-size: 24px;
    width: 90px;
    margin-left: 36px;
    text-align: right;
    cursor:pointer;
  }
  .content{
    height: calc(100% - 90px);
    width: 100%;
    /*background-color: #00b7ee;*/
    display: flex;
    box-sizing: border-box;
  }
  .content .content-left{
    flex: 0 0 360px;
    width: 360px;
    height: 100%;
    /*background-color: #4598FF;*/
    box-sizing: border-box;
  }
  .content .content-left .manage{
    margin-top: -40px;
    width: 100%;
    height: calc(100% - 126px);
    box-sizing: border-box;
    padding-left: 17px;
    padding-right: 17px;
    padding-top: 40px;
  }
  /*用户信息*/
  .content .content-left .userInfo{
    width: 360px;
    height: 126px;
    /*border: 1px solid #EAF0F3;*/
    box-shadow: 0 0 7px #EAF0F3;
    display: flex;
    box-sizing: border-box;
    align-items:center;
    padding-left: 38px;
  }
  .content .content-left .userInfo img{
    width: 68px;
    /*height: 68px;*/
    /*margin: 34px 30px 30px 42px;*/
    border-radius: 34px;
    background-color: #D8D8D8;
    box-sizing: border-box;
    padding: 4px;
  }
  .content .content-left .userInfo .user{
    width: 100%;
    height: 79px;
    line-height: 30px;
    font-size: 20px;
    margin-left: 27px;
    padding-top: 19px;
  }
  .content .content-left .userInfo .user>span{
    color: #5C5C5C;
  }
  .content .content-left .userInfo .user>p{
    color: #4598FF;
    font-size: 20px;
  }
  /*导航栏*/
  .content .content-left .box{
    width: 100%;
    margin-top: 36px;
    margin-bottom: 25px;
    /*padding-left: 34px;*/
    box-sizing: border-box;
  }
  .content .content-left .box *{
    width: 100%;
    font-size: 22px;
    box-sizing: border-box;
  }
  .content .content-left .box h5{
    height: 68px;
    color: #BCBCBC;
    line-height: 68px;
    display: block;
    margin-left: 17px;
    font-size: 18px;
  }
  .content .content-left .box li{
    height: 61px;
    line-height: 61px;
    display: block;
    color: #4598FF;
    padding-left: 17px;
    padding-right: 17px;
    cursor:pointer;
    transition: background-color 0.6s;
    border-radius:27px;
    width: 252px;
    /*display: flex;*/
  }
  .content .content-left .box li i{
    margin-right: 5px;
  }
  .content .content-left .box li span{
    color: #5C5C5C;
    transition: background-color 0.6s;
  }
  .content .content-left .loge{
    height: 60px;
    margin: 32px 50px 0;
  }
  /*二级路由*/
  .content .content-right{
    width: 100%;
    height: 100%;
  }
  #home .content .content-left .box .on{
    background-color: #4598FF;
    color: #FFF;
  }
  #home .content .content-left .box .in{
    color: #FFF;
  }
</style>

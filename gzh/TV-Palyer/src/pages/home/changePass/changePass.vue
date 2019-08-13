<template>
    <div id="pass">
      <div class="title">
        Password
      </div>
      <div class="content">
        <div class="password">
          <div class="box">
            <span>Current password</span>
            <input type="text" v-model="currentPass">
            <p>
              <span style="color: #B2D7FF;">Forgot password</span>
            </p>
          </div>
          <div class="box">
            <span>New password</span>
            <input type="password" v-model="newPass">
          </div>
          <div class="box">
            <span>Confirm password</span>
            <input type="password" v-model="confirmPass">
            <p v-if="newPass===confirmPass&newPass!==''">
              <span>Consistent with the above input</span>
            </p>
          </div>
<!--          <div class="box">-->
<!--            <span style="display: inline-block">Confirm password</span>-->
<!--            <input type="text">-->
<!--            <p v-if="newPass===confirmPass">-->
<!--              <span >Consistent with the above input</span>-->
<!--            </p>-->
<!--          </div>-->
          <div class="btn" @click="gaiPass">Confirm</div>
        </div>
      </div>
      <div class="msg" v-if="showMsg">{{cmsg}}</div>
    </div>
</template>

<script>
  // const ajaxUrl='http://192.168.1.234:999/haotian/xcx.do'
  const ajaxUrl='http://47.110.228.20:89/haotian/xcx.do'
    export default {
      name: "changePass",
      data(){
          return{
            currentPass:'',
            newPass:'',
            confirmPass:'',
            cmsg:'',
            showMsg:false
          }
      },
      methods:{
        gaiPass(){
          const that=this
          const userId=that.getCookie('userid')
          const addr=that.getCookie('addr')
          const country=that.getCookie('country')
          const createtime=that.getCookie('createtime')
          const dailishangming=that.getCookie('dailishangming')
          const id=that.getCookie('id')
          const modifytime=that.getCookie('modifytime')
          const pwd=that.getCookie('pwd')
          const remark=that.getCookie('remark')
          const tel=that.getCookie('tel')
          if(pwd!=that.currentPass){
            that.altShow('Incorrect password')
          }else if(that.newPass!=that.confirmPass){
            that.altShow('password not the same')
          }else {
            // 编辑请求
            $.ajax({
              type: "POST",
              url: ajaxUrl,
              dataType: "jsonp",
              // data: "name=garfield&age=18",
              data: {
                operationType: 'shiBoDianShiTaiService',
                type:'updateAgent',
                data:JSON.stringify({
                  daiLiShangMing:dailishangming,
                  tel:tel,
                  country:country,
                  addr:addr,
                  userId:userId,
                  pwd:that.newPass,
                  id:id,
                  createTime:createtime,
                  remark:remark,
                  // agent:that.agent,
                })
              },
              success: function (data) {
                console.log(data)
                if (!data.errorDesc) {
                  that.altShow('succeed')
                } else {
                  that.altShow(data.errorDesc)
                }
              }
            });
          }
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
        // 弹窗
        altShow(err){
          const that=this
          that.showMsg=true
          that.cmsg=err
          console.log(err)
          setTimeout(()=>{
            that.showMsg=false
            that.cmsg=''
          },1500)
        }
      }
    }
</script>

<style scoped>
  .msg{
    width: 400px;
    min-height: 60px;
    background-color: rgba(0,0,0,0.6);
    border-radius: 8px;
    text-align: center;
    line-height: 60px;
    font-size: 20px;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-left: -200px;
    margin-top: -30px;
    z-index: 10;
    color: #FFF;
  }
  #pass{
    width: 100%;
    height: 100%;
  }
  .title{
    height: 126px;
    width: 100%;
    font-size: 24px;
    padding-left: 77px;
    color: #5C5C5C;
    line-height: 126px;
    box-sizing: border-box;
  }
  .content{
    height: calc(100% - 126px);
    width: 100%;
    background-color: #F3F9FE;
    box-shadow:inset 0 0 6px rgba(166,177,187,0.5);
    padding-top: 124px;
    box-sizing: border-box;
    padding-left: 96px;
    /*padding-right: 96px;*/
  }
  .password{
    width: 1050px;
    /*margin: 0 auto;*/
  }
  .password .box{
    height: 80px;
    width: 100%;
    line-height: 80px;
    margin: 10px 0;
    display: flex;
    align-items: center;
  }
  .password .box>span{
    font-size: 20px;
    margin-right: 53px;
    color: #5C5C5C;
    width: 190px;
    height: 80px;
    line-height: 80px;
    display: inline-block;
  }
  .password .box input{
    box-sizing: border-box;
    height: 60px;
    width: 392px;
    line-height: 60px;
    margin: 0;
    font-size: 20px;
    color: #777777;
    padding-left: 20px;
  }
  .password .box p{
    height: 60px;
    line-height: 30px;
  }
  .password .box p>span{
    position: relative;
    top: 30px;
    font-size: 21px;
    margin-left: 36px;
    color: #BCBCBC;
  }
  .btn{
    width: 270px;
    height: 60px;
    background-color: #4598FF;
    color: #FFF;
    margin-top: 40px;
    margin-left: 293px;
    border-radius:8px;
    line-height: 60px;
    text-align: center;
    font-size: 32px;
  }
</style>

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
          const country=decodeURI(that.getCookie('country'))
          const createtime=that.getCookie('createtime')
          const dailishangming=decodeURI(that.getCookie('dailishangming'))
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
    width: 30rem;
    min-height:4rem;
    background-color: rgba(0,0,0,0.6);
    border-radius: 0.5rem;
    text-align: center;
    line-height: 4rem;
    font-size: 1.2rem;
    position: fixed;
    top: 50%;
    left: 40%;
    z-index: 10;
    color: #FFF;
  }
  #pass{
    width: 100%;
    height: 100%;
  }
  .title{
    height:8rem;
    width: 100%;
    font-size: 24px;
    padding-left: 77px;
    color: #5C5C5C;
    line-height: 8rem;
    box-sizing: border-box;
  }
  .content{
    height: calc(100% - 8rem);
    width: 100%;
    background-color: #F3F9FE;
    box-shadow:inset 0 0 6px rgba(166,177,187,0.5);
    padding-top:10rem;
    box-sizing: border-box;
    padding-left:7rem;
    /*padding-right: 96px;*/
  }
  .password{
    width:100%;
    /*margin: 0 auto;*/
  }
  .password .box{
    height: 5rem;
    width: 100%;
    line-height: 5rem;
    margin: 0.8rem 0;
    display: flex;
    align-items: center;
  }
  .password .box>span{
    font-size: 1.2rem;
    margin-right:3.2rem;
    color: #5C5C5C;
    width: 12rem;
    height: 5rem;
    line-height: 5rem;
    display: inline-block;
  }
  .password .box input{
    box-sizing: border-box;
    height: 3.75rem;
    width: 24.5rem;
    line-height: 3.75rem;
    margin: 0;
    font-size:1.2rem;
    color: #777777;
    padding-left: 1.2rem;
  }
  .password .box p{
    height: 3.75rem;
    line-height:1.9rem;
  }
  .password .box p>span{
    position: relative;
    top: 1.9rem;
    font-size:1.2rem;
    margin-left:2.2rem;
    color: #BCBCBC;
  }
  .btn{
    width: 16.875rem;
    height: 3.75rem;
    background-color: #4598FF;
    color: #FFF;
    margin-top:2.5rem;
    margin-left: 18.3125rem;
    border-radius:0.5rem;
    line-height: 3.75rem;
    text-align: center;
    font-size:2rem;
  }
</style>

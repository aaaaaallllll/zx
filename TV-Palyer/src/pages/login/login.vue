<template>
  <div class="back" :style="note">
    <div class="login-box">
      <h3>TBACKGROUND MANAGEMENT SYSTEM</h3>
      <span>we will give you the best service</span>
      <div class="bd"></div>
      <input type="text" v-focus placeholder="Username or E-mail address" v-model="userId" />
      <input type="password" placeholder="Password" v-model="pwd" />
      <p>I forgot my password</p>
      <div class="sub" @click="sub()">SIGN IN</div>
    </div>
    <div class="msg" v-if="showMsg">{{cmsg}}</div>
    <img src="../../common/images/logo.png" class="logo" />
  </div>
</template>

<script>
// const ajaxUrl='http://192.168.1.234:999/haotian/xcx.do'
const ajaxUrl = "http://47.111.134.168:89/haotian/xcx.do";
export default {
  name: "login",
  data() {
    return {
      note: {
        backgroundImage: "url(" + require("../../common/images/back.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center"
      },
      userId: "",
      pwd: "",
      cmsg: "",
      showMsg: false
    };
  },
  mounted() {
    let that = this;
    document.onkeypress = function(e) {
      var keycode = document.all ? event.keyCode : e.which;
      if (keycode == 13) {
        that.sub(); // 登录方法名
        return false;
      }
    };
  },
  directives: {
    focus: {
      // 指令的定义
      inserted: function(el) {
        el.focus();
      }
    }
  },
  methods: {
    sub() {
      // window.localStorage.setItem("userId",this.userId);
      // console.log(localStorage.getItem("userId"))
      const that = this;
      $.ajax({
        type: "POST",
        url: ajaxUrl,
        dataType: "jsonp",
        // data: "name=garfield&age=18",
        data: {
          operationType: "shiBoLoginService",
          // type:'queryAgent',
          userId: that.userId,
          pwd: that.pwd
        },
        success: function(data) {
          console.log(data);
          if (data.errorDesc) {
            that.showMsg = true;
            that.cmsg = data.errorDesc;
            console.log(data.errorDesc);
            setTimeout(() => {
              that.showMsg = false;
              that.cmsg = "";
            }, 1500);
          } else {
            // console.log(data.result.data.userid)
            // that.$router.push({
            //   name: 'Box',
            //   params: {
            //     userId: data.result.data.userid,
            //     id:data.result.data.id,
            //     cs:'1'
            //   }
            // })
            that.setCookie("addr", data.result.data.addr, 1);
            that.setCookie("country", encodeURI(data.result.data.country), 1);
            that.setCookie("createtime", data.result.data.createtime, 1);
            that.setCookie("dailishangming",encodeURI(data.result.data.dailishangming),1);
            that.setCookie("id", data.result.data.id, 1);
            that.setCookie("modifytime", data.result.data.modifytime, 1);
            that.setCookie("pwd", that.pwd, 1);
            let issystem = data.result.isSystem == false ? "false" : "true";
            that.setCookie("isSystem", issystem, 1);
            that.setCookie("remark", data.result.data.remark, 1);
            that.setCookie("tel", data.result.data.tel, 1);
            that.setCookie("userid", data.result.data.userid, 1);
            console.log(document.cookie)
            // that.setCookie('userid',data.result.data.userid , 1)
          
            that.$router.replace("/home");
          }
        }
      });
    },
    setCookie(key, value, iDay) {
      var oDate = new Date();
      oDate.setDate(oDate.getDate() + iDay);
      document.cookie = key + "=" + value + ";expires=" + oDate;
    },
    getCookie(key) {
      var cookieArr = document.cookie.split("; ");
      for (var i = 0; i < cookieArr.length; i++) {
        var arr = cookieArr[i].split("=");
        if (arr[0] === key) {
          return arr[1];
        }
      }
      return false;
    },
    removeCookie(key) {
      this.setCookie(key, "", -1); //这里只需要把Cookie保质期退回一天便可以删除
    }
  }
};
</script>

<style scoped>
.msg {
  width: 400px;
  min-height: 60px;
  background-color: rgba(0, 0, 0, 0.6);
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
  color: #fff;
}
.back {
  width: 100%;
  height: 100%;
  position: relative;
}
.login-box {
  width: 630px;
  height: 720px;
  background-color: #fff;
  border-radius: 16px;
  position: absolute;
  top: 50%;
  margin-top: -360px;
  right: 234px;
  z-index: 9;
  padding: 45px;
  box-sizing: border-box;
  text-align: center;
}
.login-box * {
  display: block;
  width: 100%;
}
.login-box h3 {
  font-size: 25px;
  height: 56px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(92, 92, 92, 1);
  line-height: 56px;
  margin-bottom: 8px;
}
.login-box span {
  height: 38px;
  font-size: 23px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(188, 188, 188, 1);
  line-height: 38px;
}
.login-box .bd {
  height: 20px;
  border-bottom: 3px solid #f1f1f1;
}
.login-box > input {
  height: 72px;
  background: rgba(241, 241, 241, 1);
  line-height: 72px;
  font-size: 26px;
  color: #626262;
  margin-top: 51px;
  border: none;
  box-sizing: border-box;
  padding-left: 20px;
}
.login-box p {
  text-align: right;
  color: #dedede;
  font-size: 24px;
  height: 35px;
  line-height: 35px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  margin-top: 30px;
}
.login-box .sub {
  height: 72px;
  background: linear-gradient(
    180deg,
    rgba(172, 224, 241, 1) 0%,
    rgba(122, 203, 212, 1) 100%
  );
  border-radius: 4px;
  line-height: 72px;
  font-size: 34px;
  color: #fff;
  margin-top: 51px;
  cursor: pointer;
}
.logo {
  position: absolute;
  left: 66px;
  bottom: 49px;
  z-index: 8;
}
input::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #bcbcbc;
}

input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #bcbcbc;
}

input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #bcbcbc;
}

input:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #bcbcbc;
}
</style>

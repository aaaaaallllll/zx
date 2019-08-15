<template>
  <div class="bind">
    <div class="bg">
      <div class="img">
        <img class="whimg" src="../../common/img/hp.png" alt />
      </div>
      <div class="write">
        <div>
          <h3>您已成功绑定手牌:</h3>
          <h3 style="color:#F68519">G35</h3>
        </div>
        <p>我的消费码，凭此二维码消费开柜</p>
      </div>
      <!-- 二维码部分 -->
      <div class="ewms" id="qrcode"></div>
      <!-- btn部分，分为5个按钮 -->
      <div class="btns1" v-if="one">
        <div class="btnbg">
          <img style="width:60%;margin-top:.4rem;" src="../../common/img/1.png" alt />
        </div>
        <p>挂失</p>
      </div>
      <!-- 第二种 -->
      <div class="btns2" v-else-if="two">
        <div class="btns2_1">
          <div>
            <img style="width:60%;margin-top:.5rem;" src="../../common/img/1.png" alt />
          </div>
          <p style="color:#3a65e7;margin:.5rem;">挂失</p>
        </div>
        <div class="btns2_1">
          <div>
            <img style="width:60%;margin-top:.5rem;" src="../../common/img/4.png" alt />
          </div>
          <p style="color:#3a65e7;margin:.5rem;">锁定</p>
        </div>
      </div>
      <!-- 第三种 -->
      <div class="btns3" v-else-if="three">
        <div class="btns3_1">
          <div>
            <img style="width:60%;margin-top:.5rem;" src="../../common/img/1.png" alt />
          </div>
          <p style="margin:.5rem;color:#3a65e7;">挂失</p>
        </div>
        <div class="btns3_1">
          <div>
            <img style="width:60%;margin-top:.5rem;" src="../../common/img/4.png" alt />
          </div>
          <p style="margin:.5rem;color:#3a65e7;">锁定</p>
        </div>
        <div class="btns3_1">
          <div>
            <img style="width:60%;margin-top:.5rem;" src="../../common/img/3.png" alt />
          </div>
          <p style="margin:.5rem;color:#3a65e7;">解锁</p>
        </div>
      </div>
      <!-- 第四种 -->
      <div class="btns4" v-else-if="four">
        <div class="btns4_1">
          <div>
            <img style="width:60%;margin-top:.3rem;" src="../../common/img/1.png" alt />
          </div>
          <p style="color:#3a65e7;margin-right:.5rem;">挂失</p>
        </div>
        <div class="btns4_1">
          <div>
            <img style="width:60%;margin-top:.3rem;" src="../../common/img/3.png" alt />
          </div>
          <p style="color:#3a65e7;margin-right:.5rem;">解锁</p>
        </div>
        <div class="btns4_1">
          <div>
            <img style="width:60%;margin-top:.3rem;" src="../../common/img/4.png" alt />
          </div>
          <p style="color:#3a65e7;margin-right:.5rem;">锁定</p>
        </div>
        <div class="btns4_1">
          <div>
            <img style="width:60%;margin-top:.3rem;" src="../../common/img/2.png" alt />
          </div>
          <p style="color:#3a65e7;margin-right:.5rem;">自助结账</p>
        </div>
      </div>
      <!-- 第五种 -->
      <div class="btns3" v-else-if="five">
        <div class="btns3_1">
          <div>
            <img style="width:60%;margin-top:.5rem;" src="../../common/img/1.png" alt />
          </div>
          <p style="margin:.5rem;color:#3a65e7;">挂失</p>
        </div>
        <div class="btns3_1">
          <div>
            <img style="width:60%;margin-top:.5rem;" src="../../common/img/4.png" alt />
          </div>
          <p style="margin:.5rem;color:#3a65e7;">锁定</p>
        </div>
        <div class="btns3_1">
          <div>
            <img style="width:60%;margin-top:.5rem;" src="../../common/img/3.png" alt />
          </div>
          <p style="margin:.5rem;color:#3a65e7;">解锁</p>
        </div>
        <div class="btns3_1">
          <div>
            <img style="width:60%;margin-top:.5rem;" src="../../common/img/2.png" alt />
          </div>
          <p style="margin:.5rem;color:#3a65e7;">自助结账</p>
        </div>
        <div class="btns3_1">
          <div>
            <img style="width:60%;margin-top:.5rem;" src="../../common/img/5.png" alt />
          </div>
          <p style="margin:.5rem;color:#3a65e7;">自助消费</p>
        </div>
        <!-- 僵尸div -->
        <div class="btns3_1" style="opacity:0;">
          <div>
            <img style="width:60%;margin-top:.5rem;" src="../../common/img/3.png" alt />
          </div>
          <p style="margin:.5rem;color:#3a65e7;">解锁</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
export default {
  data() {
    return {
      one: true,
      two: false,
      three: false,
      four:false ,
      five: false
    };
  },
  methods: {
    //缓存cookie
    setCookie(key, value, iDay) {
      var oDate = new Date();
      console.log(oDate);
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
      setCookie(key, "", -1); //这里只需要把Cookie保质期退回一天便可以删除
    },
    queryString(name) {
      let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      let r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    },
    //获取openid
    getOpenid(code) {
      const that = this;
      const testServer = "www.intereek.com"; //这是服务器地址
      $.ajax({
        type: "POST",
        dataType: "jsonp",
        jsonp: "callback",
        url:
          "http://" +
          testServer +
          '/pangu/pangu.do?requestData={"operationType":"getOpenid","companyCode":"' +
          that.companyCode +
          '","code":"' +
          code +
          '"}', //这个地址不是固定的，后台接口地址
        success: function(data) {
          //获取成功就保存到cookie中；
          console.log(data);
          if (data.success) {
            that.openid = data.result;
            //alert(openid);
            that.setCookie("openid", data.result, 365);
            that.qrcode();
          }
        }
      });
    },
    qrcode() {
      const that = this;
      let now = +new Date();
      let qrcode = new QRCode("qrcode", {
        width: 210,
        height: 200,
        text: `time:${now}`
      });
    }
  },
  mounted() {
    const that = this;
    that.companyCode = that.queryString("companyCode");
    that.openid = that.queryString("openid");
    $("#qrcode").html("");
    that.qrcode();
    return;
    if (that.getCookie("openid") && that.getCookie("openid") != "undefined") {
      //从cookie中获取
      that.openid = that.getCookie("openid"); //获取成功就保存
      that.qrcode();
    } else {
      //获取不成功,就要从url中截取
      const local = window.location.href;
      const code = that.queryString("code");
      // 获取code
      if (code == null || code === "") {
        //获取code为空或null，就要去微信指定位置获取；
        window.location.href =
          "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
          that.appid +
          "&redirect_uri=" +
          encodeURIComponent(local) +
          "&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect";
        return;
      } else {
        //获取到code调函数请求后台获取openid；
        that.getOpenid(code);
      }
    }
  }
};
</script>

<style scoped>
/* 第一个按钮 */
.btns1 {
  width: 50%;
  height: 3rem;
  position: absolute;
  bottom: 15%;
  left: 25%;
  background: #fff;
  border-radius: 2rem;
  display: flex;
  align-items: center;
}
.whimg {
  width: 100%;
  height: 100%;
}
.btnbg {
  width: 2rem;
  height: 2rem;
  line-height: 2rem;
  background: linear-gradient(
    180deg,
    rgba(22, 178, 254, 1) 0%,
    rgba(58, 102, 232, 1) 100%
  );
  border-radius: 50%;
  margin-top: 0.25rem;
  margin-left: 1rem;
}
.btns1 > p {
  /* position: absolute; */
  color: #3a65e7;
  padding-left: 2rem;
}
/* 第二个按钮 */
.btns2 {
  width: 100%;
  height: 7rem;
  position: absolute;
  bottom: 10%;
  display: flex;
}
.btns2_1 {
  background: #fff;
  width: 40%;
  height: 100%;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
}
.btns2_1 > div {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: linear-gradient(
    180deg,
    rgba(22, 178, 254, 1) 0%,
    rgba(58, 102, 232, 1) 100%
  );
}
/* 第三个按钮 */
.btns3 {
  width: 90%;
  height: 6rem;
  position: absolute;
  bottom: 20%;
  display: flex;
  flex-wrap: wrap;
  left: 5%;
}
.btns3_1 {
  width: 30%;
  height: 100%;
  background: #fff;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 0.3rem auto;
}
.btns3_1 > div {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: linear-gradient(
    180deg,
    rgba(22, 178, 254, 1) 0%,
    rgba(58, 102, 232, 1) 100%
  );
}
/* 第四个按钮 */
.btns4 {
  width: 100%;
  position: absolute;
  bottom: 10%;
  display: flex;
  flex-wrap: wrap;
}
.btns4_1 {
  width: 40%;
  height: 3rem;
  background: #fff;
  border-radius: 0.5rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0.5rem auto;
}
.btns4_1 > div {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: linear-gradient(
    180deg,
    rgba(22, 178, 254, 1) 0%,
    rgba(58, 102, 232, 1) 100%
  );
}
/* end */

.bind {
  position: relative;
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(
    180deg,
    rgba(16, 187, 255, 1) 0%,
    rgba(50, 142, 252, 1) 48%,
    rgba(58, 101, 231, 1) 100%
  );
}
.bg {
  width: 100%;
  min-height: 100%;
  background: url(../../common/img/bg2.png) 100% 100% no-repeat;
  position: absolute;
  background-size: cover;
}
.img {
  width: 5rem;
  height: 5rem;
  position: absolute;
  left: calc(50% - 2.5rem);
  z-index: 2;
}
.write {
  width: 90%;
  height: 10rem;
  background: rgba(255, 255, 255, 1);
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 3rem;
  left: 5%;
  z-index: 1;
}
.write > div {
  display: flex;
  margin-top: 1rem;
}
.write > div > h3 {
  font-size: 1.13rem;
  font-family: "PingFangSC-Medium";
  font-weight: 500;
  color: rgba(58, 101, 231, 1);
  line-height: 1.56rem;
  margin: 2rem auto 0;
}
.write > p {
  font-size: 0.88rem;
  font-family: "PingFangSC-Medium";
  font-weight: 500;
  color: rgba(58, 101, 231, 0.6);
  line-height: 1.25rem;
}
.ewms {
  width: 13.1rem;
  height: 12.5rem;
  position: absolute;
  top: 11rem;
  left: calc(50% - 6.55rem);
  z-index: 3;
  border: 3px solid #3a66e8;
}
</style>

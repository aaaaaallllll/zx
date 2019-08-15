<template>
  <div class="ewm">
    <div class="img1">
      <img src="../../common/img/top_r.png" alt />
    </div>

    <!-- 矩形框 -->
    <div class="juxing">
      <div class="yuan"></div>
      <div class="xian"></div>
      <div class="zt">手牌绑定</div>
      <!-- 二维码 -->
      <div class="ewms" id="qrcode"></div>
      <div class="zt2">请到就近吧台或自助设备扫描下 面的二维码，或者使用扫一扫功 能扫描设备上弹出的二维码进行 手牌绑定</div>
      <!-- 按钮 -->
      <button class="btn" @click="btns">扫一扫绑定手牌</button>
    </div>

    <div class="img2">
      <img src="../../common/img/bottom_l.png" alt />
    </div>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
export default {
  data() {
    return {
      openid: "",
      companyCode: "",
      appid: ""
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
            console.log(that.openid);
            //alert(openid);
            that.setCookie("openid", data.result, 365);
            that.qrcode();
          }
        }
      });
    },
    qrcode() {
      console.log(this.openid);
      const that = this;
      let now = +new Date();
      let openid = that.openid;
      console.log(typeof openid);
      //   let openids=JSON.parse(openid);
      let qrcode = new QRCode("qrcode", {
        width: 210,
        height: 200,
        text: `openid:${that.openid},time:${now}`
      });
    },
    uuid() {
      var s = [];
      var hexDigits = "0123456789abcdef";
      for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
      s[8] = s[13] = s[18] = s[23] = "-";
      var uuid = s.join("");
      return uuid;
    },
    btns() {
      const that = this;
      var u = navigator.userAgent;
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //g
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      let local = "";
      if (isAndroid) {
        local = location.href;
      }
      if (isIOS) {
        local = location.href.split("#")[0]; //hash后面的部分如果带上ios中config会不对
      }
      // /api http://intereek.natapp1.cc/
      $.ajax({
        type: "POST",
        // url: "http://intereek.natapp1.cc/pangu/xcx.do",
        url:"http://192.168.1.9:999/pangu/xcx.do",
        dataType: "jsonp",
        data: {
          operationType: "wxShare",
        //   companyCode: that.companyCode,
          companyCode:"m44gwOk2PSU4cMtqHiEw007",
          url: local
        },
        success: function(res) {
          console.log(res.result);
          let data=res;
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data.result.appid, // 必填，公众号的唯一标识
            timestamp: data.result.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.result.nonceStr, // 必填，生成签名的随机串
            signature: data.result.signature, // 必填，签名，见附录1
            jsApiList: [
              "onMenuShareTimeline",
              "onMenuShareQQ",
              "onMenuShareAppMessage"
            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
        }
      });
    }
  },
  mounted() {
    const that = this;
    that.companyCode = that.queryString("companyCode");
    that.openid = that.queryString("openid");
    that.appid = that.queryString("appid");
    console.log(that.companyCode);
    console.log(that.appid);
    $("#qrcode").html("");
    // that.qrcode();
    if (that.getCookie("openid") && that.getCookie("openid") != "undefined") {
      //从cookie中获取
      that.openid = that.getCookie("openid"); //获取成功就保存
      console.log(that.openid);
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
.zt {
  color: #fff;
  font-size: 1.3rem;
  margin: 1rem 0;
}
.zt2 {
  color: #fff;
  width: 90%;
  margin: 1rem auto;
}
.img1 {
  right: 0;
  top: -2rem;
  position: absolute;
}
.img2 {
  left: 0;
  bottom: -0.5rem;
  position: absolute;
}
.ewm {
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
.heads {
  font-size: 1.4rem;
  color: #000;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;
}
.juxing {
  position: relative;
  width: 80%;
  height: 83vh;
  top: 2.8rem;
  box-shadow: inset 0rem 0.13rem 0.25rem 0rem rgba(0, 0, 0, 0.5);
  border-radius: 1rem;
  border: 0.13rem solid rgba(255, 255, 255, 1);
  margin: 0 auto;
}
.yuan {
  width: 0.69rem;
  height: 0.69rem;
  box-shadow: inset 0rem 0.1rem 0.3rem 0rem rgba(0, 0, 0, 0.5);
  border: 0.13rem solid rgba(255, 255, 255, 1);
  border-radius: 50%;
  margin: 1rem auto;
}
.xian {
  width: 2.5rem;
  height: 0.01rem;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0rem 0.13rem 0.25rem 0rem rgba(0, 0, 0, 0.5);
  border-radius: 0.13rem;
  border: 0.06rem solid rgba(255, 255, 255, 1);
  margin: 0 auto;
  position: relative;
}
.xian::before {
  content: "";
  width: 3px;
  height: 3px;
  border-radius: 50%;
  display: inline-block;
  background: #fff;
  position: absolute;
  right: 3rem;
  top: -1px;
}
.ewms {
  width: 13rem;
  height: 12rem;
  margin: 0 auto;
}
.btn {
  width: 80%;
  height: 2.5rem;
  background: linear-gradient(
    180deg,
    rgba(228, 228, 228, 1) 0%,
    rgba(255, 255, 255, 1) 51%,
    rgba(228, 228, 228, 1) 100%
  );
  box-shadow: 0rem 0.13rem 0.25rem 0rem rgba(0, 0, 0, 0.5);
  border-radius: 0.5rem;
  border: none;
  outline: none;
  color: #3a66e8;
}
@media screen and (max-width: 320px) {
  .yuan {
    margin: 0.2rem auto;
  }
}
@media screen and (max-width: 320px) {
  .zt {
    margin: 0.2rem auto;
  }
}
@media screen and (min-width: 414px) {
  .zt2 {
    margin: 2rem auto;
  }
}
</style>

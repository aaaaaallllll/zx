<template>
  <div class="pay">
    <div class="top">
      <div class="bt">我的微会员</div>
      <div class="top_m">
        <div style="width:5rem;height:5rem;">
          <img
            style="width:100%;height:100%;"
            src="http://www.intereek.com/pangu/html/jiShiMaiKa/images/my_02.png"
            alt="图片加载中..."
          />
        </div>
        <div class="top_m_r">
          <h3 style="margin-bottom:0.5rem;">{{this.$route.params.cardType==undefined?this.$route.params.cardType:"会员卡"}}</h3>
          <p>微会员号:{{this.$route.params.cardNo}}</p>
        </div>
      </div>
      <div style="padding:1rem;">向收银台出示二维码进行消费</div>
    </div>
    <div class="bottom">
      <div class="lan" style="left:25%;"></div>
      <div class="lan" style="right:25%;"></div>
      <div class="bottom_t" style="padding-top:2rem;">
        <div class="bottom_t">
          <div class="img">
            <img style="width:100%;height:100%;" src="../../common/img/yue.png" alt />
          </div>
          <p>余额：{{this.$route.params.balance}}</p>
        </div>
        <div class="bottom_t">
          <div class="img">
            <img style="width:100%;height:100%;" src="../../common/img/jifen.png" alt />
          </div>
          <p>积分：{{this.$route.params.jiFen}}</p>
        </div>
      </div>
      <!-- 充值模块 -->
      <div class="chongz">充值</div>
      <div class="df_ar">
        <div v-for="(n,i) in cz1" :key="i" class="hezi" @click="chongz(n)">&yen;{{n}}</div>
      </div>
      <div class="zdyje top_m">
        <p class="zdy">自定义金额:</p>
        <input type="text" placeholder="请输入充值金额" v-model="money" /> 元
      </div>
      <div class="xian"></div>
      <button class="btn" @click="chongzhi">在线充值</button>
    </div>
  </div>
</template>

<script>
// const kaUrl= "http://intereek.natapp1.cc/pangu/xcx.do";
// const kaUrl ="192.168.1.9:999/pangu/xcx.do";
const kaUrl = "http://www.intereek.com/pangu/xcx.do";
export default {
  name: "pay",
  data() {
    return {
      cz1: [5, 10, 20, 50, 100, 200],
      // 用户输入的金额
      money: "",
      // 支付需要的数据
      openid: this.$route.params.openid,
      companyCode: this.$route.params.companyCode,
      cardNo: this.$route.params.cardNo

      // 页面需要的数据
      // balance:this.$route.balance,//余额
      // cardType:this.$route.cardType,//卡类型
      // jiFen:this.$route.jiFen,//积分
    };
  },
  methods: {
    chongz(n){
      this.money=n;
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
    chongzhi() {
      const that = this;
      let money = that.money;
      // let companyCode = "m44gwOk2PSU4cMtqHiEw007";
      //   订单号
      let couponGuid = that.uuid();
      $.ajax({
        type: "POST",
        dataType: "jsonp",
        jsonp: "callback",
        async: false,
        url:kaUrl,
        data:{
          operationType:'wxPay',
          openid:that.openid,
          orderNo:couponGuid,
          quanMing:'微信会员充值',
          companyCode:that.companyCode,
          cardNo:that.cardNo,
          danJia:money
        },
        success: function(json) {
          console.log(json);
          if (!json.success) {
            alert("查询失败，原因:" + json.errorDesc);
            return;
          } else {
            var appId = json.result.appid;
            var timestamp = json.result.timeStamp;
            var nonceStr = json.result.nonceStr;
            var packages = json.result.package;
            var finalsign = json.result.sign;

            WeixinJSBridge.invoke(
              "getBrandWCPayRequest",
              {
                appId: appId,
                timeStamp: timestamp,
                nonceStr: nonceStr,
                package: packages,
                signType: "MD5",
                paySign: finalsign
              },
              function(res) {
                WeixinJSBridge.log(res.err_msg);
                if (res.err_msg == "get_brand_wcpay_request:ok") {
                  //WeixinJSBridge.call('closeWindow');
                  //buyQuan(quanMing,couponGuid);
                  //banKaBingSongQuan();
                } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                  //alert("用户取消支付!");
                } else {
                  //alert("支付失败!");
                  WeixinJSBridge.call("closeWindow");
                }
              }
            );
          }
          //自动关闭微信浏览器
          //WeixinJSBridge.call('closeWindow');
        },
        error: function(json) {
          //showLoadingDlg(false,"失败"+json);
          console.log(json);
        }
      });

    }
  },
  created() {
    const that = this;
  }
};
</script>

<style scoped>
.btn {
  width: 85%;
  height: 2.81rem;
  background: linear-gradient(
    180deg,
    rgba(142, 196, 255, 1) 0%,
    rgba(100, 176, 255, 1) 100%
  );
  border-radius: 1.41rem;
  color:#fff;
  font-size:1.1rem;
  outline: none;
  border:none;

}
.xian {
  width: 90%;
  height: 0.1rem;
  border-radius: 0.13rem;
  border: 0.06rem solid rgba(236, 236, 236, 1);
  margin: 1rem auto;
  background: #ececec;
}
.df_ar {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 3rem;
  margin-top: 3rem;
}
.top {
  width: 100%;
  background: url(../../common/img/bg.png) 100% 100% no-repeat;
  background-size: cover;
}
.top > div {
  color: #fff;
}
.bt {
  font-size: 1.3rem;
  padding-top: 0.8rem;
  margin-bottom: 1rem;
}
.top_m {
  display: flex;
  justify-content: center;
  align-items: center;
}
.top_m > div > h3,
p {
  margin: 0;
}
.top_m_r {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-sizing: border-box;
  padding-left: 1rem;
}

.bottom {
  margin-top: 3rem;
  width: 100%;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  box-shadow: #aaa 0px -1px 3px 0px;
  position: relative;
}
.lan {
  width: 0.75rem;
  height: 2.13rem;
  background: #64b0ff;
  border-radius: 0.41rem;
  position: absolute;
  top: -1.1rem;
  box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.5);
}
.bottom_t {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.img {
  width: 1.5rem;
  height: 1.5rem;
  padding-right: 0.5rem;
}
.chongz {
  float: left;
  padding-left: 1rem;
  font-size: 1.2rem;
  margin-top: 1rem;
}
.hezi {
  width: 5rem;
  height: 2.5rem;
  background: rgba(255, 255, 255, 1);
  border-radius: 0.41rem;
  border: 0.06rem solid rgba(0, 145, 255, 1);
  color: #0091ff;
  font-size: 1.25rem;
  line-height: 2.5rem;
  margin: 0 0 1rem 0;
}
.hezi:hover{
  background: #64b0ff;
  color:#fff;
}
.zdyje {
  width: 90%;
  color: #676767;
  margin: 0 auto;
}
.zdyje > p {
  font-size: 1.1rem;
  width: 40%;
}
.zdyje > input {
  width: 60%;
  height: 1.56rem;
  border: none;
  margin-top: 8px;
  padding: 5px 0;
  font-size: 1.1rem;
  outline: none;
  color: #000;
}
.zdy:after {
  content: "";
  position: relative;
  display: inline-block;
  width: 0.126rem;
  height: 1.75rem;
  top: 8px;
  left: 4px;
  background: rgba(189, 189, 189, 1);
}
</style>

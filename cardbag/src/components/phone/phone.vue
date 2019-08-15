<template>
  <div class="phone">
    <div class="order_order">
      <div class="phone_main">
        <img
          style="width:100%;"
          src="http://www.intereek.com/pangu/html/banka/images/card_07.png"
          alt
          class="top_img"
        />
        <h4>绑定电话号码</h4>
      </div>
      <div class="row">
        <input id="phone" type="text" placeholder="请输入电话号码" class="input_text" v-model="phone" />
        <div class="info">
          <a href="javascript:;" @click="sendSms" class="phone_code">发送验证码</a>
        </div>
      </div>
      <div class="row" style="margin-top:2rem;">
        <input id="yanZhengMa" type="text" placeholder="请输入验证码" class="input_text" v-model="yzm" />
      </div>
      <div class="btn_group">
        <button style="color:#666;" @click="returncard">取消</button>
        <button style="background:#1fa5fd;" @click="smsYanZheng">确认</button>
      </div>
    </div>
  </div>
</template>

<script>
// import("http://www.intereek.com/pangu/html/banka/js/common.js");
// import("http://www.intereek.com/pangu/html/intereek/js/zizhupay.js");
export default {
  name: "phone",
  data() {
    return {
      canClick: true,
      phone: "",
      yzm: ""
    };
  },
  methods: {
    sendSms() {
      const that = this;
      const openid = that.$route.params.openid;
      const companyCode = that.$route.params.companyCode;
      const phone = that.phone;
      if (phone == "" || phone.length != 11) {
        alert("需要输入11位有效手机号码");
        return;
      }
      $.ajax({
        type: "GET",
        dataType: "jsonp",
        jsonp: "callback",
        url:"http://www.intereek.com/pangu/pangu.do",
        // 'http://www.intereek.com/pangu/pangu.do?requestData={"operationType":"queryLocal","queryType":"sendSmsCode","companyCode":"' +
        //   companyCode +
        //   '","phone":"' +
        //   phone +
        //   '"}',
        data: {
          operationType: "queryLocal",
          queryType: "sendSmsCode",
          companyCode: companyCode,
          phone: phone
        },
        success: function(json) {
          if (!json.success) {
            //showLoadingDlg(false,"");
            alert("验证码发送失败，原因:" + json.errorDesc);
          } else {
            alert("验证码发送成功");
          }
        },
        error: function(json) {
          alert("网络连接失败");
        }
      });
    },
    smsYanZheng() {
      const that = this;
      const openid = that.$route.params.openid;
      console.log(openid);
      const companyCode = that.$route.params.companyCode;
      const phone = that.phone;
      var yanZhengMa = that.yzm;

      if (phone == "" || phone.length != 11) {
        alert("需要输入11位有效手机号码");
        return;
      }

      if (yanZhengMa == "") {
        alert("需要输入有效验证码");
        return;
      }
      //alert("http://www.intereek.com/pangu/pangu.do?requestData={\"operationType\":\"queryLocal\",\"queryType\":\"BindCardSmsYanZheng\",\"companyCode\":\""+
      //		companyCode+"\",\"phone\":\""+phone+"\",\"openid\":\""+openid+"\",\"code\":\""+yanZhengMa+"\"}");
      if (canClick) {
        that.canClick = false;
        $.ajax({
          type: "GET",
          dataType: "jsonp",
          jsonp: "callback",
          url: "http://www.intereek.com/pangu/pangu.do",
          data: {
            operationType: "queryLocal",
            queryType: "BindCardSmsYanZheng",
            companyCode: companyCode,
            phone: phone,
            openid: openid,
            code: yanZhengMa
          },
          // 'http://www.intereek.com/pangu/pangu.do?requestData={"operationType":"queryLocal","queryType":"BindCardSmsYanZheng","companyCode":"' +
          // companyCode +
          // '","phone":"' +
          // phone +
          // '","openid":"' +
          // openid +
          // '","code":"' +
          // yanZhengMa +
          // '"}',
          success: function(json) {
            if (!json.success) {
              //showLoadingDlg(false,"");
              alert("短信验证失败，原因:" + json.errorDesc);
            } else {
              //alert("办卡成功");
              alert("绑定电话成功");
            }
          },
          error: function(json) {
            alert("网络连接失败");
          }
        });
        setTimeout(function() {
          that.canClick = true;
          console.log("加载完成");
        }, 60000);
      }
    },
    returncard() {
      this.$router.back();
    }
  }
};
</script>

<style scoped>
/* @import url(http://www.intereek.com/pangu/html/banka/css/mui.min.css); */
/* @import url(http://www.intereek.com/pangu/html/banka/css/mui.picker.min.css); */
/* @import url(http://www.intereek.com/pangu/html/banka/css/style.css); */
.phone {
  width: 100%;
  height: 100%;
}
.order_order {
  width:100%;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
}
.phone_main {
  margin: 0 auto;
  width: 30%;
  margin-top: 2rem;
}
.row {
  width: 100%;
  height: 2rem;
  display: flex;
  justify-content: space-between;
  position: relative;
}
.info {
  position: absolute;
}
.input_text {
  outline: none;
  border: none;
  width: 100%;
  padding: 1.3rem 0 1.3rem 1rem;
}
.phone_code {
  width: 5.5rem;
  height: 1.8rem;
  border-radius: 0.4rem;
  background-color: #ff7800;
  position: absolute;
  left:16rem;
  top: 0.4rem;
  color: #fff;
  text-decoration: none;
  line-height: 1.8rem;
  font-size: 0.8rem;
}
.btn_group {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.btn_group button {
  width: 35%;
  height: 2.5rem;
  margin-top: 2rem;
  border: none;
  outline: none;
  border-radius: 0.3rem;
  color: #fff;
  font-size: 1rem;
}
</style>

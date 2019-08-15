<template>
  <div class="jilu">
    <div class="his_orders">
      <ul class="list">
        <li v-for="(lists,i) in list" :key="i">
          <div class="li_info">
            <p>
              <span></span>
              [使用时间] {{lists.cC_InputDate}}
            </p>
            <p>[充值] ¥{{lists.cC_BeginSum}}</p>
            <p>[刷卡] ¥{{lists.cC_LenderSum}}</p>
            <p>[说明] {{lists.cC_ItemExplain}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name:"jilu",
  data() {
    return {
      list: []
    };
  },
  methods: {
    // getQueryStr(proName) {
    //   var url = String(window.document.location.href);
    //   if (url.indexOf("?") != -1) {
    //     var str = url.split("?")[1];
    //     strs = str.split("&");
    //     for (var i = 0; i < strs.length; i++) {
    //       if (proName == strs[i].split("=")[0]) return strs[i].split("=")[1];
    //     }
    //   }

    //   return "";
    // },
    chaCardJiLu() {
      const that = this;
      //var server = "466928773.cross.echosite.cn";
      var server = "www.intereek.com";
      //   var cardNo = this.getQueryStr("cardNo");
      //   var companyCode = this.getQueryStr("companyCode");
      // cardNo="Wx190113090534"&companyCode="m44gwOk2PSU4cMtqHiEw007"
      // var cardNo = "Wx190113090534";
      // var companyCode = "m44gwOk2PSU4cMtqHiEw007";
      var cardNo=this.$route.params.cardNo;
      var companyCode=this.$route.params.companyCode;
      console.log(cardNo,companyCode)
      //alert("http://www.intereek.com/pangu/pangu.do?requestData={\"operationType\":\"queryCardCharges\",\"companyCode\":\""+ companyCode+"\",\"cardNo\":\""+cardNo+"\"}");
      $.ajax({
        type: "GET",
        dataType: "jsonp",
        jsonp: "callback",
        url:
          "http://" +
          server +
          '/pangu/pangu.do?requestData={"operationType":"queryCardCharges","companyCode":"' +
          companyCode +
          '","cardNo":"' +
          cardNo +
          '"}',
        success: function(json) {
          if (!json.success) {
            //showLoadingDlg(false,"");
            alert("查询失败，原因:" + json.errorDesc);
          } else {
            var data = json.result;
              console.log(data)
            for (var i = 0; i < data.length; i++) {
              that.list = data;
            }
          }
        },
        error: function(json) {
          alert("网络连接失败");
        }
      });
    }
  },
  created() {
    this.chaCardJiLu();
  }
};
</script>

<style scoped>
/*历史订单*/

.his_orders {
  padding: 0 0.3rem;
}
.his_orders .hd_tit {
  font-size: 0.32rem;
  color: #333333;
  text-align: left;
  position: relative;
  padding-bottom: 0.1rem;
}
.his_orders .hd_tit:after {
  content: "";
  width: 0.63rem;
  height: 0.05rem;
  background: #0192f1;
  display: block;
  border-radius: 0.05rem;
  left: 50%;
  bottom: 0;
  margin-left: -0.31rem;
  position: absolute;
}

.his_orders .list {
  margin-top: 0.3rem;
  padding: 0 0.3rem;
}
.his_orders li {
  font-size:2rem;
  margin: 0 0 0.2rem;
  position: relative;
  border-radius: 0.05rem;
  overflow: hidden;
  text-align: left;
  border-bottom: 1px solid #bbb;
}
.his_orders .li_t {
  height: 0.7rem;
  background: #0192f1;
  line-height: 0.7rem;
  font-size: 0.28rem;
  color: #fff;
  padding: 0 0.3rem;
}
.his_orders .li_t img {
  width: 0.32rem;
  height: 0.32rem;
  margin-right: 0.1rem;
}
.his_orders .li_t .delete {
  width: 0.32rem;
  height: 0.32rem;
  background-size: 0.32rem;
  display: block;
  margin-top: 0.2rem;
}
.his_orders .li_info {
  padding: 0 0.3rem 0.8rem 0.8rem;
  position: relative;
}
.his_orders .li_info p {
  font-size: 0.9rem;
  color: #666666;
  margin-bottom: 0.1rem;
  display: flex;
  align-items: center;
}
.his_orders .li_info .read {
  color: #0192f1;
}
.his_orders .li_info .price {
  font-size: 0.4rem;
  position: absolute;
  right: 0.25rem;
  top: 0.8rem;
}

/*.his_orders li:before,.his_orders li:after{content:'';position:absolute;top: .55rem;width: .3rem;height: .3rem;background: #fff;border-radius:50%;}*/
.his_orders li:before {
  left: -0.15rem;
}
.his_orders li:after {
  right: -0.15rem;
}

.li_info span {
  width: 0.24rem;
  height: 0.9rem;
  background-color: #0192f1;
  display: inline-block;
  margin: 0.2rem 0.3rem 0 -0.6rem;
}
</style>

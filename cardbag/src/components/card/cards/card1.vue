<template>
  <div id="card">
    <!--加载动画-->
    <!-- 代码部分begin -->
    <div v-show="isShow">
      <div class="pop"></div>
      <div class="loader-inner">
        <div class="loader-line-wrap">
          <div class="loader-line"></div>
        </div>
        <div class="loader-line-wrap">
          <div class="loader-line"></div>
        </div>
        <div class="loader-line-wrap">
          <div class="loader-line"></div>
        </div>
        <div class="loader-line-wrap">
          <div class="loader-line"></div>
        </div>
        <div class="loader-line-wrap">
          <div class="loader-line"></div>
        </div>
      </div>
      <div
        style="color:#fff;font-size:1.5rem;margin:0 auto;position:relative;top:15rem;z-index:999;"
      >加载中...</div>
    </div>

    <!-- 卡包 -->
    <div class="card_bag">
      <div class="card_bag_left" style="padding-left:0.7rem;">
        <img
          style="width:35%;"
          src="http://www.intereek.com/pangu/html/kabao/images/icon_05.png"
          alt
        />
        <span style="padding-left:0.5rem;color:#333;">卡包</span>
      </div>
      <div class="card_bag_left">
        <span style="color:#666">{{cardData.length}}张</span>
        <img @click="down1" style="width:22%;padding-left:0.5rem;" :src="src1" alt="loading..." />
      </div>
    </div>

    <!-- 卡包券 -->
    <div class="kabaoquan">
      <!-- 把背景颜色设置在这个上面 -->
      <div
        class="card_bags"
        v-show="isshow1"
        v-for="(card,index) in cardData"
        :key="'info1-'+ index"
      >
        <div class="flex card_bags_top">
          <div class="top_left flex">
            <div style="width:3rem;">
              <img
                style="width:100%;"
                src="http://www.intereek.com/pangu/html/kabao/images/icon_03.png"
                alt
              />
            </div>
            <div style="color:#fff;">
              <p style="font-size:1.2rem;margin-left:1rem;">{{card.cardNo}}</p>
              <p>会员积分:{{card.jiFen}}</p>
            </div>
          </div>
          <div style="padding-right:2rem;">
            <p style="font-size:1.4rem;color:#fff;">&yen;{{card.balance}}</p>
          </div>
        </div>
        <div class="flex card_bags_bottom">
          <p>{{card.companyName}}</p>
          <div>
            <button class="btn1" @click="conZi(card)">充值</button>
            <button class="btn1" @click="xiaoFei(card.cardNo)">消费</button>
            <button class="btn1" @click="jilu(card.cardNo,companyCode)">记录</button>
            <!-- <router-link class="btn1" @click="jilu(card,companyCode)">记录</router-link> -->
          </div>
        </div>
      </div>
    </div>

    <!--券包  -->
    <div class="card_bag" @click="getQuanData1">
      <div class="card_bag_left" style="padding-left:0.7rem;">
        <img
          style="width:35%;"
          src="http://www.intereek.com/pangu/html/kabao/images/icon_01.png"
          alt
        />
        <span style="padding-left:0.5rem;color:#333;">券包</span>
      </div>
      <div class="card_bag_left">
        <span style="color:#666">{{quanData.length}}张</span>
        <img style="width:22%;padding-left:0.5rem;" :src="src2" alt="loading..." />
      </div>
    </div>
    <!-- 券包卡 -->
    <div class="card2" v-show="isshow2">
      <div
        class="card2_p flex"
        v-for="(last,index) in qbLastData"
        v-show="index==showIndex||showIndex==-1"
        :key="index"
      >
        <!-- <div class="card2_p flex"> -->
        <!-- <div class="top clearfix quanCard" v-for="(quan,index) in qlist" :key="index"> -->
        <div class="card2_left">
          <div style="width:2.5rem;margin-top:0.4rem;">
            <img
              style="width:100%;"
              src="http://www.intereek.com/pangu/html/kabao/images/mem_05.png"
              alt
            />
          </div>
          <div style="position:relative;" class="card_plane_right">
            <h6 style="font-size:1rem;">{{last.quanMing}}</h6>
            <span style="font-size:0.5rem;">有效期至:{{last.youXiaoQi?last.youXiaoQi:"没有期限"}}</span>
            <div>
              <span style="font-size:0.2rem;">说明</span>
              <i
                class="iconfont"
                style="position:absolute;left:7rem;top:2.2rem;"
                @click.stop="showShuom(last.couponId)"
                v-show="showSm!=last.couponId"
              >&#xe7ec;</i>
              <i
                class="iconfont"
                style="position:absolute;left:7rem;top:2.2rem;"
                @click.stop="showShuom(last.couponId)"
                v-show="showSm==last.couponId"
              >&#xe7eb;</i>
            </div>
            <span
              v-show="showSm==last.couponId"
              style="position:absolute;top:3.3rem;"
            >满{{last.xiaoFeiManCaiNengDiKou}}减{{last.shangChengDiKouJinE}}</span>
          </div>
        </div>
        <div class="card2_right">
          <div class="flex">
            <p style="margin-left:0.3rem;">去使用</p>
            <i @click.stop="showMa(last.couponId,last.fuKuanMa)" class="iconfont">&#xe7ee;</i>
          </div>
          <div @click="showQuan(index)" style="padding-top:1rem;">
            <p style="margin-left:0.3rem;">剩余：{{qfData[index].length+1}}张</p>
            <i v-show="showIndex!=index" class="iconfont">&#xe8ec;</i>
            <i v-show="showIndex==index" class="iconfont">&#xe661;</i>
          </div>
          <!-- </div> -->
        </div>
      </div>
      <!-- 券包卡2 -->
      <div
        class="card2_1"
        v-for="(qlist,index1) in qfData"
        :key="index1"
        v-show="showIndex==index1"
      >
        <div class="card2_p flex" v-for="quan in qlist">
          <!-- <div class="top clearfix quanCard" v-for="(quan,index) in qlist" :key="index"> -->
          <div class="card2_left">
            <div style="width:2.5rem;margin-top:0.2rem;">
              <img
                style="width:100%;"
                src="http://www.intereek.com/pangu/html/kabao/images/mem_05.png"
                alt
              />
            </div>
            <div class="card_plane_right">
              <h6>{{quan.quanMing}}</h6>
              <span>有效期至:{{quan.youXiaoQi?quan.youXiaoQi:'没有期限'}}</span>
              <div>
                <span style="font-size:0.2rem;">说明</span>
                <i
                  class="iconfont"
                  style="position:absolute;left:7rem;top:2.2rem;"
                  @click.stop="showShuom(quan.couponId)"
                  v-show="showSm!=quan.couponId"
                >&#xe7ec;</i>
                <i
                  class="iconfont"
                  style="position:absolute;left:7rem;top:2.2rem;"
                  @click.stop="showShuom(quan.couponId)"
                  v-show="showSm==quan.couponId"
                >&#xe7eb;</i>
              </div>
              <span
                style="position:absolute;top:3.3rem;"
                v-show="showSm==quan.couponId"
              >满{{quan.xiaoFeiManCaiNengDiKou}}减{{quan.shangChengDiKouJinE}}</span>
            </div>
          </div>
          <div class="card2_right">
            <div class="flex" style="margin-top:-1rem;">
              <p style="padding:1rem;">去使用</p>
              <i @click.stop="showMa(quan.couponId,quan.fuKuanMa)" class="iconfont">&#xe7ee;</i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 绑定手机进入商场按钮 -->
    <div class="card3" v-show="!isShow">
      <div style="width:40%;">
        <button @click="bdsj" class="bd">绑定手机</button>
      </div>
      <div style="width:40%;">
        <button @click="gotoshop" class="bd bd1">进入商场</button>
      </div>
    </div>

    <!--    弹窗-->
    <div class="pop_bg" v-show="showFkm" style="display: block" @click.stop="outFkm"></div>
    <div class="alertTop" v-show="showFkm">
      <div id="qrcode"></div>
      <div
        id="Fkm"
        style="height: 3rem;width:50%;line-height: 3rem;font-size: 1.5rem;color: #333333;position:absolute;top:68%;left:25%;"
      ></div>
      <div class="btnss">
        <div
          class="btn"
          style="color: white;background-color: #0984e3;margin-right:1rem;"
          @click.stop="outFkm"
        >确认</div>
        <div class="btn" style="color: #2d3436;background-color: #dfe6e9" @click.stop="outFkm">取消</div>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
// "topnav": () => import("../first/components/topnav"),
var aUrl = "http://intereek.natapp1.cc/pangu/xcx.do";
// var aUrl = "http://www.intereek.com/pangu/xcx.do";
// var aUrl = "192.168.1.9:999/pangu/xcx.do";
export default {
  name: "card1",
  data() {
    return {
      isshow1: true,
      isshow2: false,
      src1: require("../../../assets/icon_bottom.png"),
      src2: require("../../../assets/icon_bottom.png"),

      // 配置参数
      companyCode: "",
      openid: "",
      balance: "",
      cardNo: "",
      cardType: "",
      jiFen: "",
      showSm: -1,
      showFkm: false,
      buYunXuWxPay: "",
      qbLastData: [],
      // qbData: [],
      cardData: [],
      quanData: [
        {
          companyName: "赵飞",
          couponId: "000558c8-cc27-43e7-835d-0b4f6c210650",
          createTime: "2019-01-04 17:16:58.0",
          fuKuanMa: "1273920038",
          keYongYuShangChengDiKou: "n",
          price: 0.01,
          quanMing:
            "【助浴套餐59.9元】含【单人汗蒸洗浴搓澡仅售59.9元】（原价98元）",
          shangChengDiKouJinE: "10",
          xiaoFeiManCaiNengDiKou: "20",
          youXiaoQi: "2019-12-03 10:54:45"
        },
        {
          companyName: "赵飞",
          couponId: "000558c8-cc27-43e7-835d-0b4f6c210650",
          createTime: "2019-01-04 17:16:58.0",
          fuKuanMa: "1273920038",
          keYongYuShangChengDiKou: "n",
          price: 0.01,
          quanMing:
            "【助浴套餐59.9元】含【单人汗蒸洗浴搓澡仅售59.9元】（原价98元）",
          shangChengDiKouJinE: "10",
          xiaoFeiManCaiNengDiKou: "20",
          youXiaoQi: "2019-12-03 10:54:45"
        },
        {
          companyName: "赵飞",
          couponId: "000558c8-cc27-43e7-835d-0b4f6c210650",
          createTime: "2019-01-04 17:16:58.0",
          fuKuanMa: "1273920038",
          keYongYuShangChengDiKou: "n",
          price: 0.01,
          quanMing:
            "【助浴套餐59.9元】含【单人汗蒸洗浴搓澡仅售59.9元】（原价98元）",
          shangChengDiKouJinE: "10",
          xiaoFeiManCaiNengDiKou: "20",
          youXiaoQi: "2019-12-03 10:54:45"
        },
        {
          companyName: "赵飞",
          couponId: "000558c8-cc27-43e7-835d-0b4f6c210650",
          createTime: "2019-01-04 17:16:58.0",
          fuKuanMa: "1273920038",
          keYongYuShangChengDiKou: "n",
          price: 0.01,
          quanMing:
            "【助浴套餐59.9元】含【单人汗蒸洗浴搓澡仅售59.9元】（原价98元）",
          shangChengDiKouJinE: "10",
          xiaoFeiManCaiNengDiKou: "20",
          youXiaoQi: "2019-12-03 10:54:45"
        },
        {
          companyName: "赵飞",
          couponId: "000558c8-cc27-43e7-835d-0b4f6c210650",
          createTime: "2019-01-04 17:16:58.0",
          fuKuanMa: "1273920038",
          keYongYuShangChengDiKou: "n",
          price: 0.01,
          quanMing:
            "【助浴套餐59.9元】含【单人汗蒸洗浴搓澡仅售59.9元】（原价98元）",
          shangChengDiKouJinE: "10",
          xiaoFeiManCaiNengDiKou: "20",
          youXiaoQi: "2019-12-03 10:54:45"
        },
        {
          companyName: "赵飞",
          couponId: "000558c8-cc27-43e7-835d-0b4f6c210650",
          createTime: "2019-01-04 17:16:58.0",
          fuKuanMa: "1273920038",
          keYongYuShangChengDiKou: "n",
          price: 0.01,
          quanMing:
            "【助浴套餐59.9元】含【单人汗蒸洗浴搓澡仅售59.9元】（原价98元）",
          shangChengDiKouJinE: "10",
          xiaoFeiManCaiNengDiKou: "20",
          youXiaoQi: "2019-12-03 10:54:45"
        },
        {
          companyName: "赵飞",
          couponId: "000558c8-cc27-43e7-835d-0b4f6c210650",
          createTime: "2019-01-04 17:16:58.0",
          fuKuanMa: "1273921038",
          keYongYuShangChengDiKou: "n",
          price: 0.01,
          quanMing:
            "【助浴套餐59.9元】含【单人汗蒸洗浴搓澡仅售59.9元】（原价98元）",
          shangChengDiKouJinE: "10",
          xiaoFeiManCaiNengDiKou: "20",
          youXiaoQi: "2019-12-03 10:54:45"
        },
        {
          companyName: "赵飞",
          couponId: "000558c8-cc27-43e7-835d-0b4f6c210650",
          createTime: "2019-01-04 17:16:58.0",
          fuKuanMa: "1273922038",
          keYongYuShangChengDiKou: "n",
          price: 0.01,
          quanMing: "1111",
          shangChengDiKouJinE: "10",
          xiaoFeiManCaiNengDiKou: "20",
          youXiaoQi: ""
        },
        {
          companyName: "赵飞",
          couponId: "000558c8-cc27-43e7-835d-0b4f6c210650",
          createTime: "2019-01-04 17:16:58.0",
          fuKuanMa: "1273922038",
          keYongYuShangChengDiKou: "n",
          price: 0.01,
          quanMing: "1111",
          shangChengDiKouJinE: "10",
          xiaoFeiManCaiNengDiKou: "20",
          youXiaoQi: ""
        },
        {
          companyName: "赵飞",
          couponId: "000558c8-cc27-43e7-835d-0b4f6c210650",
          createTime: "2019-01-04 17:16:58.0",
          fuKuanMa: "1273922038",
          keYongYuShangChengDiKou: "n",
          price: 0.01,
          quanMing: "1111",
          shangChengDiKouJinE: "10",
          xiaoFeiManCaiNengDiKou: "20",
          youXiaoQi: ""
        },
        {
          companyName: "赵飞",
          couponId: "000558c8-cc27-43e7-835d-0b4f6c210650",
          createTime: "2019-01-04 17:16:58.0",
          fuKuanMa: "1273922038",
          keYongYuShangChengDiKou: "n",
          price: 0.01,
          quanMing: "1111",
          shangChengDiKouJinE: "10",
          xiaoFeiManCaiNengDiKou: "20",
          youXiaoQi: ""
        },
        {
          companyName: "赵飞",
          couponId: "000558c8-cc27-43e7-835d-0b4f6c210650",
          createTime: "2019-01-04 17:16:58.0",
          fuKuanMa: "1273922038",
          keYongYuShangChengDiKou: "n",
          price: 0.01,
          quanMing: "1111",
          shangChengDiKouJinE: "10",
          xiaoFeiManCaiNengDiKou: "20",
          youXiaoQi: ""
        },
        {
          companyName: "赵飞",
          couponId: "000558c8-cc27-43e7-835d-0b4f6c210650",
          createTime: "2019-01-04 17:16:58.0",
          fuKuanMa: "1273922038",
          keYongYuShangChengDiKou: "n",
          price: 0.01,
          quanMing: "1111",
          shangChengDiKouJinE: "10",
          xiaoFeiManCaiNengDiKou: "20",
          youXiaoQi: ""
        },
        {
          companyName: "赵飞",
          couponId: "000558c8-cc27-43e7-835d-0b4f6c210650",
          createTime: "2019-01-04 17:16:58.0",
          fuKuanMa: "1273922038",
          keYongYuShangChengDiKou: "n",
          price: 0.01,
          quanMing: "1111",
          shangChengDiKouJinE: "10",
          xiaoFeiManCaiNengDiKou: "20",
          youXiaoQi: ""
        },
        {
          companyName: "赵飞",
          couponId: "000558c8-cc27-43e7-835d-0b4f6c210650",
          createTime: "2019-01-04 17:16:58.0",
          fuKuanMa: "1273922038",
          keYongYuShangChengDiKou: "n",
          price: 0.01,
          quanMing: "1111",
          shangChengDiKouJinE: "10",
          xiaoFeiManCaiNengDiKou: "20",
          youXiaoQi: ""
        },
        {
          companyName: "赵飞",
          couponId: "000558c8-cc27-43e7-835d-0b4f6c210650",
          createTime: "2019-01-04 17:16:58.0",
          fuKuanMa: "1273922038",
          keYongYuShangChengDiKou: "n",
          price: 0.01,
          quanMing: "1111",
          shangChengDiKouJinE: "10",
          xiaoFeiManCaiNengDiKou: "20",
          youXiaoQi: ""
        }
      ],
      cardData: [],
      qfData: [],
      qm: [],
      showIndex: -1,
      // showImg: true,
      // 这个到时候改true;
      isShow: true,
      appid: "",
      local: "",
      nian: "",
      yue: "",
      ri: "",
      panduanshifouxianshi: false
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
    bdsj() {
      // this.$router.push(
      //   `http://www.intereek.com/pangu/html/newcard/addCardByPhone.html?companyCode=${companyCode}&openid=${openid}`
      // );
      const that = this;
      const openid = that.openid;
      // console.log(openid)ok
      const companyCode = that.companyCode;
      // var companyCode="m44gwOk2PSU4cMtqHiEw007";
      this.$router.push(`/phone/${openid}/${companyCode}`);
    },
    gotoshop() {
      // this.$router.push(
      //   `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=http://www.intereek.com/pangu/intereektuangou.htm&response_type=code&scope=snsapi_userinfo&state=${companyCode}#wechat_redirect`
      // );
      const that = this;
      const appid = that.appid;
      const companyCode = that.companyCode;
      console.log(appid);
      console.log(companyCode);
      window.location.href(
        `http://www.intereek.com/pangu/html/newtuangou/index.html?appid=${appid}&companyCode=${companyCode}`
      );
    },
    jilu(card) {
      // var companyCode="m44gwOk2PSU4cMtqHiEw007";
      // const that = this;
      // window.location.assign(
      //   `http://www.intereek.com/pangu/html/newcard/cardJiLu.html?cardNo=${card.cardNo}&companyCode=${companyCode}`
      // );
      const companyCode = this.companyCode;
      this.$router.push(`/jilu/${card}/${companyCode}`);
      // that.$router.push(
      //   `http://www.intereek.com/pangu/html/newcard/cardJiLu.html?cardNo=${card.cardNo}&companyCode=${companyCode}`
      // );
    },
    // 二维码需要更换?????????????????????????????????????????????
    qrcode(cardNo, companyCode, openid, time) {
      let qrcode = new QRCode("qrcode", {
        width: 180,
        height: 180, // 高度
        text: `cardNo:${cardNo},companyCode:${companyCode},openid:${openid},time:${time}` // 二维码内容  `cardNo:${cardNo},companyCode:${companyCode},openid:${openid},time:${time}`
        // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
        // background: '#f0f'
        // foreground: '#ff0'
      });
    },
    qrcodes(guid) {
      console.log(guid);
      let qrcode = new QRCode("qrcode", {
        width: 180,
        height: 180,
        marginLeft: 4, // 高度
        text: guid // 二维码内容 guid "10086"
        // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
        // background: '#f0f'
        // foreground: '#ff0'
      });
    },
    xiaoFei(cardNo) {
      console.log(cardNo);
      const that = this;
      $("#qrcode").html("");
      $("#Fkm").html("");
      that.showFkm = true;
      var companyCode = that.companyCode;
      // var companyCode="m44gwOk2PSU4cMtqHiEw007";
      console.log(companyCode);
      const openid = that.openid;
      const time = new Date().getTime();
      console.log(time, openid);
      that.qrcode(cardNo, companyCode, openid, time);
    },
    conZi(card) {
      console.log(card);
      const that = this;
      let balance = card.balance;
      let cardNo = card.cardNo;
      let cardType = card.cardType;
      let jiFen = card.jiFen;
      if (that.buYunXuWxPay) {
        alert("请前往收银台进行充值");
        return;
      } else {
        that.$router.push(
          `/pay/${that.openid}/${that.companyCode}/${cardNo}/${balance}/${cardType}/${jiFen}`
        );
      }
    },
    outFkm() {
      this.showFkm = false;
    },
    showMa(guid, Fkm) {
      console.log(guid, Fkm);
      $("#qrcode").html("");
      $("#Fkm").html("");
      this.showFkm = true;
      // const couponId="000558c8-cc27-43e7-835d-0b4f6c210650"
      // const cardNo="Wx181203101144"
      $("#Fkm").html(Fkm);
      this.qrcodes(guid);
      // console.log(Fkm);
      // jQuery(function() {
      //   jQuery("#qrCode").qrcode({ width: 500, height: 500, text: guid });
      // });
    },
    queryString(name) {
      let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      let r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    },
    showShuom(index) {
      console.log(index);
      if (this.showSm == index) {
        this.showSm = -1;
      } else {
        this.showSm = index;
        // console.log( this.showSm)
      }
    },
    getData() {
      // console.log(1)
      const that = this;
      $.ajax({
        type: "POST",
        url: aUrl,
        dataType: "jsonp",
        data: {
          companyCode: that.companyCode,
          // companyCode: "m44gwOk2PSU4cMtqHiEw007",
          // wxCode: code,
          openid: that.openid,
          operationType: "wxNewCard"
        },
        success: function(res) {
          console.log(res);
          that.isShow = false;
          const index = that.local.indexOf("?");
          const _local = that.local.substring(0, index);
          const local =
            _local + `?appid=${that.appid}&companyCode=${that.companyCode}`;
          if (res == null) {
            window.location.href =
              "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
              that.appid +
              "&redirect_uri=" +
              encodeURIComponent(local) +
              "&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect";
            return;
          }
          if (res.result.openid) {
            console.log(res.result);
            const data = res.result;
            that.buYunXuWxPay = data.buYunXuWxPay;
            that.openid = data.openid;
            that.quanData = data.quans;
            that.cardData = data.cards;
            that.getQuanData();
          } else {
          }
        },
        error: function(err) {
          console.log(err);
        }
      });
    },
    getQuanData1() {
      const that = this;
      if (that.isshow2 == false) {
        that.isshow2 = true;
      } else {
        that.isshow2 = false;
      }
    },
    getQuanData() {
      const that = this;
      let data = that.quanData;
      let list = [];
      let lastName = data[0].quanMing;
      let n = true;
      let list0 = [];
      let name = [];
      let list4 = [];
      list0.push(data[0]);
      name.push(lastName);
      list.push(list0);
      for (let i = 0; i < data.length; i++) {
        n = true;
        for (let j = 0; j < name.length; j++) {
          if (name[j] == data[i].quanMing) {
            list[j].push(data[i]);
            n = false;
          } else {
            if (j == name.length - 1 && n) {
              name.push(data[i].quanMing);
              let list2 = [];
              list2.push(data[i]);
              list.push(list2);
            }
          }
        }
      }
      for (let c = 0; c < name.length; c++) {
        list4.push(list[c][0]);
      }
      for (let c = 0; c < name.length; c++) {
        list[c].splice(0, 2);
      }
      that.qbLastData = list4;
      that.qfData = list;
      that.qm = name;
      console.log(that.qbLastData);
      console.log(that.qfData);
      console.log(that.qm);
    },
    showQuan(index) {
      console.log(index);
      // if (this.showIndex == index) {
      //   this.showIndex = 99;
      // } else {
      //   this.showIndex = index;
      // }
      if (this.showIndex == -1) {
        this.showIndex = index;
      } else {
        this.showIndex = -1;
      }
    },
    // 卡包的点击事件；
    down1() {
      let that = this;
      if (that.isshow1 == true) {
        that.src1 = require("../../../assets/icon_top.png");
        that.isshow1 = false;
      } else {
        that.src1 = require("../../../assets/icon_bottom.png");
        that.isshow1 = true;
      }
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
            that.getData();
          }
        }
      });
    }
  },
  mounted() {
    const that = this;
    const oDate = new Date();
    const a = String(oDate);
    const list = a.split(" ");
    that.yue = list[1];
    that.ri = list[2];
    that.nian = list[3];
    // const code = that.queryString("code");
    // console.log(code);
    that.local = window.location.href;
    that.appid = that.queryString("appid");
    that.companyCode = that.queryString("companyCode");
    // that.getQuanData();
    if (that.getCookie("openid") && that.getCookie("openid") != "undefined") {
      //从cookie中获取
      that.openid = that.getCookie("openid"); //获取成功就保存
      that.getData();
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
@import "../../../common/css/style.css";
* {
  margin: 0;
  padding: 0;
}
.pop {
  height: 100vh;
  width: 100%;
  background-color: #000;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 4;
}
.loader-inner {
  width: 100px;
  height: 60px;
  margin: 0 auto;
  position: relative;
  top: 10rem;
  z-index: 99;
}
.loader-line-wrap {
  -webkit-animation: spin 2000ms cubic-bezier(0.175, 0.885, 0.32, 1.275)
    infinite;
  animation: spin 2000ms cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite;
  box-sizing: border-box;
  height: 50px;
  left: 0;
  overflow: hidden;
  position: absolute;
  top: 0;
  -webkit-transform-origin: 50% 100%;
  transform-origin: 50% 100%;
  width: 100px;
}
.loader-line {
  border: 4px solid transparent;
  border-radius: 100%;
  box-sizing: border-box;
  height: 100px;
  left: 0;
  margin: 0 auto;
  position: absolute;
  right: 0;
  top: 0;
  width: 100px;
}
.loader-line-wrap:nth-child(1) {
  -webkit-animation-delay: -50ms;
  animation-delay: -50ms;
}
.loader-line-wrap:nth-child(2) {
  -webkit-animation-delay: -100ms;
  animation-delay: -100ms;
}
.loader-line-wrap:nth-child(3) {
  -webkit-animation-delay: -150ms;
  animation-delay: -150ms;
}
.loader-line-wrap:nth-child(4) {
  -webkit-animation-delay: -200ms;
  animation-delay: -200ms;
}
.loader-line-wrap:nth-child(5) {
  -webkit-animation-delay: -250ms;
  animation-delay: -250ms;
}

.loader-line-wrap:nth-child(1) .loader-line {
  border-color: hsl(0, 80%, 60%);
  height: 90px;
  width: 90px;
  top: 7px;
}
.loader-line-wrap:nth-child(2) .loader-line {
  border-color: hsl(60, 80%, 60%);
  height: 76px;
  width: 76px;
  top: 14px;
}
.loader-line-wrap:nth-child(3) .loader-line {
  border-color: hsl(120, 80%, 60%);
  height: 62px;
  width: 62px;
  top: 21px;
}
.loader-line-wrap:nth-child(4) .loader-line {
  border-color: hsl(180, 80%, 60%);
  height: 48px;
  width: 48px;
  top: 28px;
}
.loader-line-wrap:nth-child(5) .loader-line {
  border-color: hsl(240, 80%, 60%);
  height: 34px;
  width: 34px;
  top: 35px;
}
@-webkit-keyframes spin {
  0%,
  15% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes spin {
  0%,
  15% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
marquee {
  color: #fff;
  font-size: 40px;
}

.card2_p {
  padding: 0.5rem 0;
}
.card1 {
  width: 100%;
  height: 100%;
  padding-top: 0.5rem;
}
.card_bag {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 3.2rem;
  background:#dcdcdc;
  margin-top: 0.5rem;
}
.card_bag_left {
  width: 3.3rem;
  display: inline-block;
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  /* padding:0.8rem; */
}

/* 卡包券卡 */
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card2 {
  width: 95%;
  height: 100%;
  margin: 0.5rem auto 0;
}
.card2_1 {
  width: 100%;
  height: 100%;
  margin: 0.5rem auto 0;
}
.card2_p {
  width: 100%;
  height: 100%;
  margin-top: 0.5rem;
  border-radius: 1rem;
  /* background: url(../../../assets/img6.jpg) no-repeat center; */
  /* background-size: 100%; */
}
.card2 .card2_p:nth-child(4n + 1) {
  background: url(../../../assets/img6.jpg) no-repeat center;
  background-size: cover;
}
.card2 .card2_p:nth-child(4n + 2) {
  background: url(../../../assets/img7.jpg) no-repeat center;
  background-size: cover;
}
.card2 .card2_p:nth-child(4n + 3) {
  background: url(../../../assets/img8.jpg) no-repeat center;
  background-size: cover;
}
.card2 .card2_p:nth-child(4n + 4) {
  background: url(../../../assets/img9.jpg) no-repeat center;
  background-size: cover;
}
.card2_left {
  display: flex;
  align-items: space-between;
  padding: 1rem;
}
.card_plane_right {
  width: 8rem;
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: #fff;
  position: relative;
  /* overflow: hidden; */
  white-space: nowrap;
  text-overflow: ellipsis;
}
.card_plane_right > h6 {
  width: 8rem;
  overflow: hidden;
  font-size: 1rem;
  text-align: left;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.card_plane_right > span {
  width: 8rem;
  font-size: 0.5rem;
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.card2_right {
  margin-top: 1rem;
  margin-right: 0.5rem;
  display: flex;
  flex-direction: column;
  color: #fff;
}
/* lastbutton */
.card3 {
  margin-top: 1rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.bd {
  width: 100%;
  height: 2.2rem;
  outline: none;
  border: none;
  border-radius: 0.4rem;
  background: linear-gradient(to left, #fc937e, #f5627a);
  color: #fff;
}
.bd1 {
  background: linear-gradient(to left, #ffcf4c, #ffa666);
}

/* 第二个卡包券 */
.card_bags {
  width: 95%;
  height: 7.5rem;
  margin: 0.5rem auto 0;
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  background: #fff;
}
.card_bags_top {
  width: 100%;
  height: 100%;
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
  /* background: url(../../../assets/1.png) no-repeat center; */
  /* background-size: 100%; */
}
.kabaoquan {
  background: #ececec;
}
.kabaoquan .card_bags:nth-child(n) {
  background: url(../../../assets/1.png) no-repeat center;
  background-size: cover;
}
.kabaoquan .card_bags:nth-child(2n) {
  background: url(../../../assets/2.png) no-repeat center;
  background-size: cover;
}
.kabaoquan .card_bags:nth-child(3n) {
  background: url(../../../assets/3.png) no-repeat center;
  background-size: cover;
}
.kabaoquan .card_bags:nth-child(4n) {
  background: url(../../../assets/4.png) no-repeat center;
  background-size: cover;
}

.top_left {
  padding: 1rem 0 1rem 1rem;
}
.card_bags_bottom {
  background: #fff;
  padding: 0.5rem 0 0.5rem 1rem;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
}
.btn1 {
  width: 3rem;
  color: #0c88ca;
  border: 1px solid #c7bdbd;
  outline: none;
  display: inline-block;
  padding: 0.1rem;
  margin-right: 0.1rem;
  background-color: #fff;
}

/* 后续动画 */
.back {
  overflow: hidden;
}
.back img {
  /*height: 860px;*/
  width: 100%;
  position: absolute;
  top: 20%;
  left: -10%;
  /*opacity: 0.3;*/
  z-index: 999;
}
.back span {
  position: absolute;
  top: 50%;
  z-index: 1111;
  width: 100%;
  font-size: 20px;
  height: 60px;
  display: block;
  text-align: center;
  color: #a1a1a1;
}

.pop_bg {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  display: none;
}
.alertTop {
  height: 35%;
  width: 50%;
  position: fixed;
  left: 10%;
  top: 25%;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 50px;
  border: 1px solid #939393;
  z-index: 99;
}
.alertTop #qrcode {
  height: 30%;
  width: 30%;
  position: fixed;
  /*background-color: aquamarine;*/
  left: 24.5%;
  top: 31.3%;
}
.alertTop .btnss {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.alertTop .btn {
  margin-top:108%;
  font-size: 1rem;
  display: block;
  height: 3rem;
  border-radius: 15px;
  width: 50%;
  background-color: bisque;
  line-height: 3rem;
}
.card_qf {
  font-size: 0.28rem;
  color: #333333;
  padding: 0.25rem 0.6rem 0.25rem 0.2rem;
  line-height: 0.34rem;
  background: #fff;
  margin-bottom: 0.2rem;
  position: relative;
}
.card_qf:after {
  content: "";
  position: absolute;
  background: url(../../../common/img/icon_02.png) no-repeat center;
  background-size: cover;
  width: 0.21rem;
  height: 0.12rem;
  top: 50%;
  right: 0.2rem;
  margin-top: -0.06rem;
}
.card_Tsqf:after {
  background: url(../../../common/img/icon_02-1.png) no-repeat center;
  background-size: cover;
}
/*.card_module .list #quans .clearfix{*/
/*    display: none;*/
/*}*/
/*.card_module .list #quans .on{*/
/*    display: block;*/
/*}*/
.off {
  transform: rotate(180deg);
}
@font-face {
  font-family: "iconfont"; /* project id 1208028 */
  src: url("//at.alicdn.com/t/font_1208028_ygw20p1i7vo.eot");
  src: url("//at.alicdn.com/t/font_1208028_ygw20p1i7vo.eot?#iefix")
      format("embedded-opentype"),
    url("//at.alicdn.com/t/font_1208028_ygw20p1i7vo.woff2") format("woff2"),
    url("//at.alicdn.com/t/font_1208028_ygw20p1i7vo.woff") format("woff"),
    url("//at.alicdn.com/t/font_1208028_ygw20p1i7vo.ttf") format("truetype"),
    url("//at.alicdn.com/t/font_1208028_ygw20p1i7vo.svg#iconfont") format("svg");
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
#card .list .quanCard {
  height: 290px;
}
#card .list .quanCard img {
  margin-top: 60px;
  margin-left: -20px;
}
#card .list .quanCard .quanLeft {
  float: left;
  /*background-color: #333333;*/
  /*line-height: 290px;*/
  height: 240px;
}
#card .list .quanCard .quanLeft h3 {
  font-size: 40px;
  height: 40px;
  width: 400px;
  line-height: 40px;
  color: white;
  margin-top: 15px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
#card .list .quanCard .quanLeft span i {
  margin-left: 180px;
  font-size: 26px;
  transition: 0.6s;
  transform: rotate(180deg);
}
#card .list .quanCard .quanLeft span {
  margin-top: 20px;
  display: block;
  font-size: 26px;
  line-height: 30px;
  height: 30px;
  width: 480px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: white;
}
#card .list .quanCard .quanRight {
  float: right;
  /*background-color: bisque;*/
  height: 240px;
  width: 200px;
  font-size: 40px;
  color: white;
  padding-top: 80px;
  text-align: right;
}
#card .list .quanCard .quanRight span {
  line-height: 30px;
  height: 30px;
  width: 200px;
  /*margin-top: 60px;*/
}
#card .list .quanCard .quanRight i {
  font-size: 36px;
}
#card .list .quanCard .quanRight div {
  line-height: 30px;
  height: 30px;
  width: 200px;
  font-size: 29px;
  margin-top: 60px;
  margin-left: 20px;
}
.fade-enter-active,
.fade-leave-active {
  transition: width 0.61s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  width: 0;
}
</style>
<template>
  <div class="phone_main">
    <img src="../../common/images/shop_2.png" alt class="top_img" />
    <h6 class="top_tit">购买信息</h6>
    <div class="phone_form">
      <div class="row" @click="openPicker">
        <span class="tit">使用时间{{chuandi.shiYongShiJianBiTian=='y'?'(必填)':'(选填)'}}</span>
        <span class="tit" style="margin-left:1rem;width:10rem;">{{pickerValue1}}</span>
      </div>
      <div class="row" >
        <span style='margin-right:1rem;' class="tit">购买份数(必填)</span>
        <div class="tit">
          <span class="tit" @click='jj' style="width:2rem;height:2rem;">
            <img style="width:100%;height:100%;" src="../../common/images/btnf.png" alt="">
          </span>
            <input type="number" class="text" style='width:2rem;text-align:center;' v-model="num" />
            <span class="tit" @click="add" style="width:2rem;height:2rem;">
            <img style="width:100%;height:100%;" src="../../common/images/btnj.png" alt="">
          </span>
        </div>

      </div>
      <div class="row">
        <span class="tit">电话{{chuandi.dianHuaBiTian=='y'?'(必填)':'(选填)'}}</span>
        <input type="number" class="text" v-model="phone" />
        <a v-if="canClick" href="javascript:;" class="code" @click="getSms" style="font-size: .8rem">发送验证码</a>
        <a v-else href="javascript:;" style="background:#aaa;font-size: .8rem" class="code">{{yzm}}</a>
      </div>
      <div class="row">
        <span class="tit">验证码{{chuandi.dianHuaBiTian=='y'?'(必填)':'(选填)'}}</span>
        <input type="text" class="text" v-model="yanZhenMa" style="width: 14rem"/>
      </div>
      <div class="row">
        <span class="tit">姓名</span>
        <input type="text" class="text" v-model="userName" style="width: 16rem"/>
      </div>
      <div class="row">
        <span class="tit">备注</span>
        <input type="text" class="text" v-model="remark" style="width: 16rem"/>
      </div>
      <div class="btn_group clearfix">
        <a href="javascript:;" class="btn cancel fl"  @click="toBack">取消</a>
        <a href="javascript:;" class="btn yes fr" @click="yzSms">确认</a>
      </div>
    </div>
    <mt-datetime-picker ref="picker" :startDate="startDate" type="datetime" v-model="pickerValue"></mt-datetime-picker>

    <!--砍价分享弹窗-->
    <div v-show="showAlert">
      <div class="zheZhao" @click.stop="showAlert=false"></div>
      <div class="alertTop">
        <div class="alertTop_content">
          <i class="left_top iconfont">&#xe611;</i>
          <h5>恭喜你</h5>
          <p>已经完成付款</p>
          <span >分享给好友，满{{chuandi.pinTuanRenShu}}人才可完成拼单哦</span>
          <div class="icon_img">
            <div class="icon_info" @click="showMenBan">
              <i class="iconfont" style="font-size: 2.1rem">&#xe625;</i>
              <span>微信朋友</span>
            </div>
            <div class="icon_info" @click="showMenBan">
              <i class="iconfont">&#xe62e;</i>
              <span style="margin-top: .1rem">微信朋友圈</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--支付弹窗页-->
    <div class="zhifu" v-if="isShowZf">
      <div class="back" @click="isShowZf=false"></div>
      <div class="zhifu_bottom">
        <div class="info_bottom">
          <img src="../../common/images/shop_5.png"  @click="isShowZf=false">
          <h5>支付</h5>
          <div class="zfInfo">
            <span>消费金额</span>
            <p style="color: #d13a3b">
              <span>￥{{chuandi.danJia*num}}</span>
              <span v-if="chuandi.jiFen>0">+{{chuandi.jiFen*num}}积分</span>
            </p>
          </div>
          <ul>
            <li >
              <span>支付方式</span>
              <p>
                <i class="iconfont" style="color: #64ae43;font-size: 1rem;margin-right: .4rem">&#xe625;</i>
                <span>微信支付</span>
                <span style="color: #d13a3b">￥{{jinE}}</span>
<!--                <span class="kuang iconfont" v-if="zfIndex==0" style="background-color: #f49b45;color: #FFF;">&#xe6b4;</span>-->
<!--                <span class="kuang" v-else ></span>-->
              </p>
            </li>
          </ul>
          <div class="zfBtn" @click="wxpay">确认</div>
        </div>
      </div>
    </div>
    <!--分享蒙板-->
    <div class="mengban" v-if="showMbBl">
      <div class="back" @click="showMbBl=false"></div>

      <div class="menb_text">
        <span>点击分享给好友</span>
        <p  style="transform: rotate(180deg);">
          <i class="iconfont" style="font-size: 1rem;">&#xe606;</i>
        </p>


        </div>
    </div>
    <!--弹框-->
    <div class="tankuang">
      <div>

      </div>
    </div>
  </div>
</template>

<script>
  const testServer= "intereek.natapp1.cc";

  const api='http://intereek.natapp1.cc/'
  // const api='/api'

  import wxapi from '../../common/js/wxapi.js'

import { Toast } from "mint-ui";
export default {
  name: "pay",
  data() {
    return {
      startDate: new Date(),
      kanJia: "",
      showAlert: false,
      showPtuan: true,
      yzm: "发送验证码",
      totalTime: 60,
      canClick: true,
      isShowZf:false,
      showMbBl:false,
      // showWxPayType:true,
      zfIndex:0,
      teamId:'',
      //路径获取参数
      chuandi:{},
      id:'',
      appid:'',
      openid:'',
      companyCode:'',
      //输入框相关
      phone:'',
      pickerValue: new Date(),
      yanZhenMa:'',
      userName:'',
      addr:'',
      srDate:'',
      num:1,
      remark:'',
      //支付相关
      couponGuid:'',
      //获取到的卡信息
      cardYuE:'',
      diKouJinE:'',
      xiaoFeiManCaiNengDiKou:'',
      couponId:'',
      xingMingBiTian:'',
      dianHuaBiTian:'',
      kanJiaJinE:0,
    };
  },
  mounted(){
    const that=this
    that.companyCode = that.queryString('companyCode')
    // that.openid = that.queryString('openid')
    that.appid=that.queryString('appid')
    console.log(that.$route)
    that.openid=that.$route.params.openid
    // alert(that.openid)
    that.id=that.$route.params.id
    that.teamId=that.$route.params.teamId
    that.chuandi=that.$route.params
    console.log('1='+that.teamId)
    if(that.teamId==''||that.teamId==undefined||that.teamId==null){
      that.teamId=that.uuid2()
    }
    // if(that.teamId==''||that.teamId==undefined||that.teamId==null){
    //   that.teamId=that.uuid2()
    // }
    if(that.$route.params.wxPayType!='FB'){
      that.zfIndex=0
    }else {
      that.zfIndex=1
    }
    // alert('3='+that.teamId)
    if(that.chuandi.shiKanJia=='y'){
      that.getQuans()
      that.showPtuan=true
    }else {
      that.getWxKaBao()
      that.showPtuan=false
    }
    // const s = document.createElement('script');
    // s.type = 'text/javascript';
    // s.src = 'https://res.wx.qq.com/open/js/jweixin-1.0.0.js';
    // document.body.appendChild(s);

    // wxapi.wxRegister(this.wxRegCallback,that.companyCode,window.location.href)
    // const api='http://intereek.natapp1.cc/'


  },
  computed: {
    pickerValue1() {
      var timer = this.pickerValue;
      var time = "";
      if (!timer == "") {
        time += timer.getFullYear() + "-";
        time += this.jiao(timer.getMonth() + 1) + "-";
        time += this.jiao(timer.getDate()) + " ";
        time += this.jiao(timer.getHours()) + ":";
        time += this.jiao(timer.getMinutes());
        console.log(time);
      }
      return time;
    },
    jinE(){
      const that=this
      if(that.diKouJinE == null || that.chuandi.keYongQuanZhiFu == "n"){
        that.diKouJinE = 0;
      }

      if(that.diKouJinE > 0){
        if(that.xiaoFeiManCaiNengDiKou > 0 && that.chuandi.danJia*that.num < that.xiaoFeiManCaiNengDiKou){
          that.diKouJinE = 0;
        }
      }
      if(that.cardYuE == null || that.keYongKaZhiFu == "n"){
        that.cardYuE = 0;
      }

      let cardKuan = 0;
      let shengYuKuan = that.chuandi.danJia*that.num-that.diKouJinE;
      if(shengYuKuan > 0){
        if(shengYuKuan >= that.cardYuE){
          cardKuan = that.cardYuE.toFixed(2);
        }else{
          cardKuan = shengYuKuan.toFixed(2);
        }
      }
      return (that.chuandi.danJia*that.num-cardKuan-that.diKouJinE-that.kanJiaJinE).toFixed(2);
    }
  },
  methods: {
    //获取券信息
    getQuans(){
      const that=this
      that.$axios
        .post(
          api + "pangu/xcx.do",
          that.qs.stringify({
            operationType: "queryQuanShuoMing",
            id: that.id,
            openid:that.openid,
          })
        )
        .then(res => {
          console.log(res);
          let data=res.data.result
          console.log(data);
          if(res.data.success){
            that.getWx()
            that.cardYuE = 0
            that.kanJiaJinE=data.kanJiaJinE
            that.xiaoFeiManCaiNengDiKou=0;
            that.couponId=res.data.result.couponId;
            that.xingMingBiTian = 'n';
            that.dianHuaBiTian ='n';
            console.log('抵扣='+that.kanJiaJinE)
            console.log('金额='+that.jinE)
          }else {
            alert(res.data.errorDesc)
          }
        }).catch((res)=>{
        alert(res)
      });
    },
    //分享蒙板
    showMenBan(){
      this.showMbBl=true
      this.showAlert=false
    },
    //获取卡包信息
    getWxKaBao(){
      const that=this
      that.$axios
        .get(
          api + "/pangu/pangu.do?requestData=" +
          "{\"operationType\":\"queryWxKaBao\"," +
          "\"openid\":\""+that.openid+"\"," +
          "\"companyCode\":\""+that.companyCode+"\"}",
        )
        .then(res => {
          console.log(res);
          if(!res.data.success){
            //showLoadingDlg(false,"");
            alert(res.data.errorDesc)
            Toast({
              message: res.data.errorDesc,
              position: 'middle',
              duration: 1000
            });
          }else{
            that.getWx()
            that.cardYuE = res.data.result.cardYuE;
            that.diKouJinE=res.data.result.shangChengDiKouJinE;
            that.xiaoFeiManCaiNengDiKou=res.data.result.xiaoFeiManCaiNengDiKou;
            that.couponId=res.data.result.couponId;
            that.xingMingBiTian = res.data.result.xingMingBiTian;
            that.dianHuaBiTian = res.data.result.dianHuaBiTian;

          }
        }).catch((res)=>{
        alert('网络连接失败')
      });
    },
    //调取微信支付
    wxpay(){
      const that=this

      if(that.zfIndex==1){
        window.location.href=`fuBei.html?companyCode=${that.companyCode}&heji=${that.chuandi.danJia}&openid=${that.openid}&appid=${that.appid}&quanId=${that.id}&num=${that.num}&jiFen=${that.chuandi.jiFen}`
        return
      }
      if(that.diKouJinE == null || that.chuandi.keYongQuanZhiFu == "n"){
        that.diKouJinE = 0;
      }

      if(that.diKouJinE > 0){
        if(that.xiaoFeiManCaiNengDiKou > 0 && that.chuandi.danJia*that.num < that.xiaoFeiManCaiNengDiKou){
          that.diKouJinE = 0;
        }
      }
      if(that.cardYuE == null || that.keYongKaZhiFu == "n"){
        that.cardYuE = 0;
      }

      let cardKuan = 0;
      let shengYuKuan = that.chuandi.danJia*that.num-that.diKouJinE;
      if(shengYuKuan > 0){
        if(shengYuKuan >= that.cardYuE){
          cardKuan = that.cardYuE.toFixed(2);
        }else{
          cardKuan = shengYuKuan.toFixed(2);
        }
      }
      let jinE = (that.chuandi.danJia*that.num-cardKuan-that.diKouJinE-that.kanJiaJinE).toFixed(2);


      console.log(that.teamId)
      that.couponGuid=that.uuid()
      // const payUrl = "http://"+testServer+"/pangu/pangu.do?requestData={\"operationType\":\"wxPay\",\"danJia\":\""+
      // const son={
      //   operationType:'wxPay',
      //   danJia:that.chuandi.danJia,
      //   openid:that.openid,
      //   orderNo:that.couponGuid,
      //   quanMing:that.chuandi.quanMing,
      //   companyCode:that.companyCode,
      //   num:that.num,
      //   shijian:that.syDate,
      //   phone:that.phone,
      //   name:that.userName,
      //   jinE:jinE,
      //   diKouJinE:that.diKouJinE,
      //   couponId:that.couponId,
      //   addr:that.addr,
      //   shengRi:that.pickerValue1,
      //   cardYuE:cardKuan,
      //   remark:' ',
      //   jiFen:that.chuandi.jiFen,
      // }
      // const strSon=JSON.stringify(son)
      const strCode=that.chuandi.danJia+
        "\",\"openid\":\""+that.openid+
        "\",\"orderNo\":\""+that.couponGuid+
        "\",\"quanMing\":\""+that.chuandi.quanMing+
        "\",\"companyCode\":\""+that.companyCode+
        "\",\"num\":\""+that.num+
        "\",\"shijian\":\""+that.pickerValue1+
        "\",\"phone\":\""+that.phone+
        "\",\"name\":\""+that.userName+
        "\",\"jinE\":\""+jinE+
        "\",\"diKouJinE\":\""+that.diKouJinE+
        "\",\"couponId\":\""+that.couponId+
        "\",\"addr\":\""+that.addr+
        "\",\"shengRi\":\""+that.srDate+
        "\",\"cardYuE\":\""+cardKuan+
        "\",\"remark\":\""+that.remark+
        "\",\"teamId\":\""+that.teamId+
        "\",\"jiFen\":\""+that.chuandi.jiFen+"\"}";
      const payUrl = api+"pangu/pangu.do?requestData={\"operationType\":\"wxPay\",\"danJia\":\""+strCode
      const successUrl =api+"pangu/pangu.do?requestData={\"operationType\":\"wxPaySuccess\",\"money\":\""+strCode
      that.$axios
        .get(
          payUrl
          // '/api'+"/pangu/pangu.do?requestData="+strSon
        )
        .then(res => {
          console.log(res);
          if(!res.data.success){
            //showLoadingDlg(false,"");
            Toast({
              message: res.data.errorDesc,
              position: 'middle',
              duration: 1000
            });
          }else{
            if(jinE <= 0) {
              that.$axios
                .get(
                  successUrl
                )
                .then(res => {
                  console.log(res);
                  if (!res.data.success) {
                    Toast({
                      message: res.data.errorDesc,
                      position: 'middle',
                      duration: 1000
                    });
                  } else {

                  }
                });
              window.location.href=
                "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+
                that.appid+
                "&redirect_uri=http://"+
                testServer+"/pangu//newcard.htm&response_type=code&scope=snsapi_userinfo&state="+that.companyCode+"#wechat_redirect";
              return;
            }
            const appId = res.data.result.appid;
            const timestamp = res.data.result.timeStamp;
            const nonceStr = res.data.result.nonceStr;
            const packages = res.data.result.package;
            const finalsign = res.data.result.sign;
            console.log(appId)

            WeixinJSBridge.invoke('getBrandWCPayRequest',{
              "appId" : appId,"timeStamp" : timestamp, "nonceStr" :nonceStr, "package" : packages,"signType" : "MD5", "paySign" : finalsign
            }, function(res) {
              //alert(res.err_msg);
              //alert(res.err_code+res.err_desc+res.err_msg);
              // alert(that.teamId)
              WeixinJSBridge.log(res.err_msg);
              if (res.err_msg == "get_brand_wcpay_request:ok") {
                if(that.chuandi.pinTuanRenShu>0){

                  that.showPtuan=false
                  that.showAlert = true;
                  that.isShowZf=false
                }
                // that.kanJia = that.randIndex();
                //alert("支付成功");
                //WeixinJSBridge.call('closeWindow');
                //alert("1");
                //buyTuanGouQuan(quanMing,couponGuid);
                // window.location.href=
                //   "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+
                //   appid+
                //   "&redirect_uri=http://"+
                //   testServer+"/pangu//newcard.htm&response_type=code&scope=snsapi_userinfo&state="+companyCode+"#wechat_redirect";
              } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                //alert("用户取消支付!");
              } else {
                //alert("支付失败!");

                WeixinJSBridge.call('closeWindow');
              }
            });

          }
        });
    },
    //控制数量
    jj(){
      const that=this;
      if(that.num<=1){
        Toast({
          message:'数量不能小于1',
          position:'center',
          duration:1000
        })
      }else{
        that.num--;
      }
    },
    add(){
      const that=this;
      that.num++;
    },
    //验证短信
    yzSms(){
      const that=this
      console.log('抵扣='+that.kanJiaJinE)
      console.log('金额='+that.jinE)
      // console.log(that.jinE())
      // that.showPtuan=false
      // that.showAlert = true;
      // that.isShowZf = true;
      // return;
      if(that.pickerValue==''  &&that.chuandi.shiYongShiJianBiTian=='y'){
        Toast({
          message: '使用时间不能为空',
          position: 'middle',
          duration: 1000
        });
        return
      }
      if(that.num<=0){
        Toast({
          message: '请输入正确的数量',
          position: 'middle',
          duration: 1000
        });
        return;
      }
      // if(that.chuandi.)
      if(that.phone.length!=11 &&that.chuandi.dianHuaBiTian=='y'){
        Toast({
          message: '请输入有效的手机号',
          position: 'middle',
          duration: 1000
        });
        return;
      }
      if(that.yanZhenMa==''&&that.chuandi.dianHuaBiTian=='y'){
        Toast({
          message: '验证码不能为空',
          position: 'middle',
          duration: 1000
        });
        return
      }
      // that.isShowZf=true
      // return;
      // alert(that.chuandi.dianHuaBiTian)
      // alert(JSON.stringify(that.chuandi))
      if(that.chuandi.dianHuaBiTian=='n'){
        that.isShowZf=true
        that.getFenxian()
        return
      }
      that.$axios
        .get(
          api + "pangu/pangu.do?requestData={\"operationType\":\"queryLocal\",\"queryType\":\"smsYanZheng\",\"companyCode\":\""+
          that.companyCode+"\",\"phone\":\""+that.phone+"\",\"openid\":\""+that.openid+"\",\"code\":\""+that.yanZhenMa+"\"}",

        )
        .then(res => {
          console.log(res);
          if(!res.data.success){
            //showLoadingDlg(false,"");
            Toast({
              message: res.data.errorDesc,
              position: 'middle',
              duration: 1000
            });
            that.time=1
          }else{
            // that.showAlert = true;
            that.isShowZf=true
            that.getFenxian()

          }
        });
    },
    //获取分享
    getFenxian(){
      const that=this
      wx.ready(function () {
        // alert('1')
        const urlCs=`teamId=${that.teamId}&id=${that.id}&companyCode=${that.companyCode}&appid=${that.appid}`
        //分享到朋友圈
        wx.onMenuShareTimeline({
          title: that.chuandi.quanMing,
          link: `${api}pangu/html/newtuangou/pintuan.html?${urlCs}`.split('#')[0],//域名必须和安全域名保持一致
          // imgUrl: imgLink,//域名必须和安全域名保持一致
          success: function () {
            // 用户确认分享后执行的回调函数
            songHongBao();
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
            alert('你没有分享到朋友圈');
          }
        });
        //分享到朋友
        wx.onMenuShareAppMessage({
          title: that.chuandi.quanMing,
          desc: ' ', // 分享描述
          link: `${api}pangu/html/newtuangou/pintuan.html?${urlCs}`.split('#')[0],//域名必须和安全域名保持一致
          // link: `${api}pangu/html/newtuangou/pintuan.html?teamId=${that.teamId}&id=${that.id}&companyCode=${that.companyCode}&appid=${that.appid}`.split('#')[0],//域名必须和安全域名保持一致
          // link:  window.location.href.split('#')[0], // 分享链接
          // imgUrl: imgLink, // 分享图标
          type: 'link', // 分享类型,music、video或link，不填默认为link
          success: function () {
            alert("分享成功");
          },
          cancel: function () {
            alert("未分享!");
          }
        });
      });
    },
    //获取订单编号
    uuid() {
      let s = [];
      let hexDigits = "0123456789abcdef";
      for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
      s[8] = s[13] = s[18] = s[23] = "-";
      return s.join("")
    },
    uuid2() {
      let s = [];
      let hexDigits = "0123456789abcdef";
      for (let i = 0; i < 12; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
      s[8] = s[13] = s[18] = s[23] = "-";
      return s.join("")
    },
    //获取地址参数
    queryString(name){
      let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
      let r = window.location.search.substr(1).match(reg);
      if(r!=null)return  unescape(r[2]); return null;
    },
    //返回上一级
    toBack(){
      const that=this
      that.$router.push({
        name: 'Detail',
        params: {
          id: that.id,
          openid:that.openid,
          teamId:that.teamId
        }
      })
      that.$router.replace('/detail')
    },
    //发送短信
    getSms(){
      const that=this
      if(that.phone.length!=11){
        Toast({
          message: '请输入有效的手机号',
          position: 'middle',
          duration: 1000
        });
      }else {
        that.send()
        that.$axios
          .get(
            api + "pangu/pangu.do?requestData={\"operationType\":\"queryLocal\",\"queryType\":\"sendSmsCode\",\"companyCode\":\""+
            that.companyCode+"\",\"phone\":\""+that.phone+"\"}",

          )
          .then(res => {
            console.log(res);
            if(!res.data.success){
              //showLoadingDlg(false,"");
              Toast({
                message: res.data.errorDesc,
                position: 'middle',
                duration: 1000
              });
              that.time=1
            }else{
              Toast({
                message: '验证码发送成功',
                position: 'middle',
                duration: 1000
              });
            }
          });
      }
    },
    send() {
      const that = this;
      that.canClick=false;
      if (that.totalTime <= 0) {
        that.canClick=true;
        that.totalTime = 60;
        that.yzm = "重新发送验证码";
      } else {
        that.yzm = that.totalTime + "s秒后重新发送";
        setTimeout(() => {
        that.totalTime--;
        that.send();
        }, 1000);
      }
      // if(!that.canClick){return}//节流
      // that.canClick=false;
      // that.yzm=that.totalTime+'s秒后重新发送';
      // setTimeout(()=>{
      //   that.totalTime--;
      //   that.yzm=that.totalTime+'s秒后重新发送';
      //   console.log(that.totalTime)
      //   if(that.totalTime=0){
      //     that.clock=null;
      //     that.yzm="重新发送验证码";
      //     that.totalTime=10;
      //     that.canClick=true;
      //   }
      // },1000)
    },
    jiao(time) {
      // console.log(typeof time);
      if (time < 10) {
        time = "0" + time;
      }
      return time;
    },
    openPicker() {
      this.$refs.picker.open();
    },
    //显示砍价弹窗
    toKanJia() {
      const that = this;
      that.showAlert = true;
      that.kanJia = that.randIndex();
      console.log(that.kanJia);
      // console.log(that.qs)
      // that.getWx()
    },
    //分享朋友圈
    wxRegCallback () {
      // 用于微信JS-SDK回调
      this.wxShareTimeline()
      this.wxShareAppMessage()
    },
    wxShareTimeline () {
      // 微信自定义分享到朋友圈
      // let shareLinkUlr = window.location.href.split("#")[0];
      // shareLinkUlr = shareLinkUlr.replace(/\&/g, '%26');
      let option = {
        title: '限时团购周 挑战最低价', // 分享标题, 请自行替换
        link: window.location.href.split('#')[0], // 分享链接，根据自身项目决定是否需要split
        // link: .split('#')[0], // 分享链接，根据自身项目决定是否需要split
        // link: shareLinkUlr, // 分享链接，根据自身项目决定是否需要split
        // imgUrl: '../../common/images/icon_02.png', // 分享图标, 请自行替换，需要绝对路径
        success: () => {
          alert('分享成功')
        },
        error: () => {
          alert('已取消分享')
        }
      }
      // 将配置注入通用方法
      wxapi.ShareTimeline(option)
    },
    wxShareAppMessage () {
      // 微信自定义分享给朋友
      let shareLinkUlr = window.location.href.split("#")[0];
      shareLinkUlr = shareLinkUlr.replace(/\&/g, '%26');
      let option = {
        title: '限时团购周 挑战最低价', // 分享标题, 请自行替换
        // desc: '限时团购周 挑战最低价', // 分享描述, 请自行替换
        link: window.location.href.split('#')[0], // 分享链接，根据自身项目决定是否需要split
        // link: shareLinkUlr, // 分享链接，根据自身项目决定是否需要split
        // imgUrl: 'logo.png', // 分享图标, 请自行替换，需要绝对路径
        success: () => {
          alert('分享成功')
        },
        error: () => {
          alert('已取消分享')
        }
      }
      // 将配置注入通用方法
      wxapi.ShareAppMessage(option)
    },
    //调取wx api
    getWx() {
      const that = this;
      var u = navigator.userAgent;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      let local=''
      if (isAndroid) {
        local=location.href
      }
      if (isIOS) {
        local=location.href.split('#')[0]  //hash后面的部分如果带上ios中config会不对
      }
      // /api http://intereek.natapp1.cc/
      that.$axios
        .post(
          api + "pangu/xcx.do",
          that.qs.stringify({
            operationType: "wxShare",
            companyCode: that.companyCode,
            // "url":local// 获取页面当前链接
            url: local // 获取页面当前链接
          })
        )
        .then(res => {
          console.log(res);
          const data=res.data
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId:data.result["appid"], // 必填，公众号的唯一标识
            timestamp: data.result["timestamp"], // 必填，生成签名的时间戳
            nonceStr: data.result["nonceStr"], // 必填，生成签名的随机串
            signature: data.result["signature"],// 必填，签名
            jsApiList: ["onMenuShareTimeline"
              ,"onMenuShareQQ"
              ,"onMenuShareAppMessage"] // 必填，需要使用的JS接口列表
          });
        });
    },
    //获取随机数
    randIndex() {
      const ran = Math.floor(Math.random() * 10);
      console.log(ran);
      if (ran > 5) {
        return ran - 5;
      } else if (ran == 0) {
        return 1;
      } else {
        return ran;
      }
    }
  }
};
</script>

<style scoped>
  .menb_text{
    width: 10rem;
    height: 2.6rem;
    /*background-color: #FFF;*/
    border-radius: .4rem;
    display: flex;
    font-size: 1rem;
    color: #fff;
    position: fixed;
    right: .5rem;
    top:.5rem;
    z-index: 100;
    justify-content: center;
    align-items: center;
    border: 2px dashed #FFF;
  }
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

*:before,
*:after {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
html,
body,
div,
span,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
abbr,
address,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
samp,
small,
strong,
sub,
sup,
var,
b,
i,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section,
summary,
time,
mark,
audio,
video,
input {
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  vertical-align: baseline;
  background: transparent;
  font-family: "Microsoft YaHei", Arial, Helvetica, sans-serif;
  font-weight: normal;
}
img {
  border: 0;
  display: inline-block;
  margin: 0 auto;
  vertical-align: middle;
  max-width: 100%;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
ul,
li {
  list-style: none;
}
a {
  text-decoration: none;
  color: inherit;
}
:focus {
  outline: none;
}
.clearfix {
  *zoom: 1;
}
.clearfix:before,
.clearfix:after {
  display: table;
  line-height: 0;
  content: "";
}
.clearfix:after {
  clear: both;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
}
html {
  height: 100%;
  font-size: 15.625vw;
}
em {
  font-style: normal;
}
.body_bg {
  background: #f8f7f7;
}
.white {
  background: #fff;
}
.auto {
  width: 6.9rem;
  margin: 0 auto;
}
input[type="button"],
input[type="submit"],
input[type="reset"] {
  -webkit-appearance: none;
}
.c_main {
  color: #f49b45;
}
.phone_main {
  padding: 1rem 0 0;
}
.phone_main .top_img {
  height: 4rem;
  display: block;
  margin: 2rem auto;
}
.phone_main .top_tit {
  font-size: 1.2rem;
  color: #333333;
  text-align: center;
  margin-top: 0.2rem;
}

.phone_form {
  padding: 0.8rem;
}
.phone_form .row {
  height: 3rem;
  overflow: hidden;
  border-bottom: 1px solid #e5e5e5;
  font-size: 0;
  position: relative;
  line-height: 3.8rem;
  box-sizing: border-box;
}
.phone_form .tit {
  font-size: 1rem;
  color: #666666;
  line-height: 1rem;
  display: inline-block;
}
.phone_form .text {
  display: inline-block;
  line-height: 2rem;
  padding: 0 0.2rem;
  width: 8rem;
  font-size: 0.9rem;
  color: #333;
  height: 2rem;
}
.phone_form .select {
  width: 4.2rem;
  font-size: 0.28rem;
  color: #333;
  border: none;
  line-height: 1rem;
  height: 1rem;
  appearance: none;
  -webkit-appearance: none;
  background: url(../../common/images/card_08.png) no-repeat right center;
  background-size: 0.11rem 0.2rem;
}
.phone_form .code {
  position: absolute;
  right: 0;
  width: 6rem;
  height: 1.6rem;
  line-height: 1.6rem;
  background: #ff7800;
  color: #fff;
  text-align: center;
  font-size: 0.24rem;
  border-radius: 0.3rem;
  top: 0.7rem;
}
.phone_form .btn_group {
  padding: 0 1rem;
  margin-top: 2rem;
}
.phone_form .btn_group .btn {
  width: 8rem;
  height: 2.6rem;
  text-align: center;
  line-height: 2.6rem;
  font-size: 1.1rem;
  border-radius: 0.3rem;
  display: block;
}
.phone_form .btn_group .cancel {
  background: #e5e5e5;
  color: #666666;
}
.phone_form .btn_group .yes {
  background: #1fa5fd;
  color: #fff;
}

/*弹窗*/
.zheZhao {
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 98;
}
.alertTop {
  width: 19.69rem;
  height: 16.13rem;
  background: rgba(255, 255, 255, 1);
  border-radius: 0.5rem;
  position: fixed;
  left: 50%;
  top: 50%;
  margin-top: -8.065rem;
  margin-left: -9.854rem;
  z-index: 99;
}
.alertTop_content {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.alertTop .left_top {
  position: absolute;
  top: -4rem;
  left: -0.8rem;
  font-size: 7rem;
  color: #e0620d;
}
.alertTop h5 {
  font-size: 1.75rem;
  font-family: GurmukhiMN-Bold;
  font-weight: bold;
  color: rgba(224, 98, 13, 1);
}
.alertTop p {
  font-size: 1.5rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(73, 73, 73, 1);
  margin-top: 0.5rem;
}
.alertTop span {
  font-size: 1.13rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(222, 59, 47, 1);
  margin-top: 0.5rem;
}
.alertTop .icon_img {
  margin-top: 0.8rem;
  display: flex;
  justify-content: space-around;
  width: 100%;
}
.alertTop .icon_img i {
  font-size: 2.6rem;
  color: #64ae43;
}
.alertTop .icon_img .icon_info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 1rem;
  width: 4rem;
  height: 4rem;
}
.alertTop .icon_img .icon_info span {
  font-size: 0.75rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(63, 63, 63, 1);
}
/*图标*/
@font-face {
  font-family: 'iconfont';  /* project id 1314785 */
  src: url('//at.alicdn.com/t/font_1314785_9n8bt6pn7wd.eot');
  src: url('//at.alicdn.com/t/font_1314785_9n8bt6pn7wd.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_1314785_9n8bt6pn7wd.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_1314785_9n8bt6pn7wd.woff') format('woff'),
  url('//at.alicdn.com/t/font_1314785_9n8bt6pn7wd.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_1314785_9n8bt6pn7wd.svg#iconfont') format('svg');
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
.zhifu{
  width: 100%;
  height: 100%;
}
.back{
  width: 100%;
  height: 100vh;
  background-color: rgba(0,0,0,.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
}
.zhifu_bottom{
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  /*height: 10rem;*/
  background-color: white;
  box-shadow: 0 0 4px #ccc;
  padding: .8rem;
}
.info_bottom{
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-between ;
  align-items: center;
  font-size: 1rem;
}
.info_bottom img{
  width: 1.3rem;
  position: absolute;
  right: 0;
  top: 0;
}
.info_bottom h5{
  font-size: 1.2rem;
}
.zfInfo{
  display: flex;
  justify-content: space-between ;
  width: 100%;
  padding: 0 .4rem;
  box-sizing: border-box;
  border-bottom: 1px solid #bbb;
  height: 2rem;
}
.zfInfo>p{
  display: flex;
  justify-content: space-between ;
  font-size: 1rem;
}
.info_bottom ul{
  width: 100%;
  padding-bottom: 1rem;
}
.info_bottom li{
  display: flex;
  justify-content: space-between ;
  width: 100%;
  padding: 0 .4rem;
  font-size: 1rem;
  height: 3rem;
  align-items: center;
}
.info_bottom li>p{
  display: flex;
  align-items: center;
}
.info_bottom li span{
  font-size: 1rem;
}
.info_bottom li .kuang{
  height: 1.2rem;
  width: 1.2rem;
  display: inline-block;
  border-radius: .6rem;
  border: 1px solid #f49b45;
  font-size: .7rem;
  line-height: 1.2rem;
  text-align: center;
  color: #f49b45;
  margin-left: .6rem
}
.zfBtn{
  width: 80%;
  height: 2.6rem;
  font-size: 1.2rem;
  background-color: #387dfd;
  color: #FFF;
  line-height: 2.6rem;
  text-align: center;
  border-radius: 1.3rem;
}
</style>



<style>
.picker {
  background-color: #fff;
}
</style>

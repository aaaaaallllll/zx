<template>
  <div class="shop">
    <!-- 首页轮播组件 -->
    <div class="swiper-container" v-if="isSwiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(p,i) in pic" :key="i">
          <img :src="p" />
        </div>
<!--        <div class="swiper-slide">-->
<!--        <img src="../../../common/images/shop_1.png" />-->
<!--      </div>-->
      </div>
      <!--分页器-->
      <div class="swiper-pagination"></div>
    </div>
    <div class="flex_left">
      <p class="quanMing">{{infoList.quanMing}}</p>
    </div>
    <!-- prices -->
    <div class="flex" style="padding:.2rem .4rem;" >
      <div class="flex" style="align-items: flex-end">
        <div class="flex top_left_left" style="align-items: flex-end">
          <p style="padding-right:0.5rem;font-size:.6rem;">&yen;</p>
          <p class="res">{{infoList.danJia}}</p>
          <p class="res" v-if="infoList.jiFen>0">+{{infoList.jiFen}}积分</p>
        </div>
        <div>
          <!-- text-decoration下划线CSS单词值参数：
                none : 　无装饰
                blink : 　闪烁
                underline : 　下划线
                line-through : 　贯穿线
                overline :   上划线
          -->
          <s style="font-size:0.75rem;color:#4E4E4E">&yen;{{infoList.zongJiaZhi}}</s>
        </div>
      </div>
    </div>

    <!-- 拼单人员 -->
    <div class="flex" style="margin-bottom:.2rem;" v-if="false">
      <div class="flex">
        <div class="bottom_left">
          <img class="imgs" src alt />
        </div>
        <p style="padding-left:0.3rem;font-size:1rem;">某某某</p>
      </div>
      <div class="flex" style="align-items:flex-start;padding:1rem;">
        <div class="flex" style="margin-top:-0.3rem;font-size:.9rem;padding-right:0.4rem;">
          还差
          <p style="color:#DD3B2F;font-size:.9rem;">1人</p>拼成
        </div>
        <button class="btn" @click="pintuan">去拼单</button>
      </div>
    </div>
    <!-- 点击 去拼团 弹框 -->
    <div class="pindanye" :style="pintuankuang">
      <div class="flex2">
        <div class="flex_right">
          <svg
            @click="pintuanclose"
            t="1564197033216"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="5186"
            width="25"
            height="25"
          >
            <path
              d="M851.416 217.84l-45.256-45.248L512 466.744l-294.152-294.16-45.256 45.256L466.744 512l-294.152 294.16 45.248 45.256L512 557.256l294.16 294.16 45.256-45.256L557.256 512z"
              fill="#bfbfbf"
              p-id="5187"
            />
          </svg>
        </div>
        <div style="font-size:1.1rem;color:#000;text-align:center;">参与某某的拼单</div>
        <div
          style="font-size:1rem;color:#666;margin-top:1rem;text-align:center;"
        >仅剩1个名额，{{h}}:{{m}}:{{s}}后结束</div>
        <div class="pinpin">
          <div class="flexs">
            <div class="pindan_img">
              <img class="imgs" src="../../../common/images/1.jpg" alt />
            </div>
            <p class="pinzhu">拼主</p>
          </div>
          <div class="flexs" v-show="haveone1">
            <div class="pindan_img">
              <img class="imgs" src alt />
            </div>
            <p class="pinzhu">成员</p>
          </div>
          <div class="flexs" v-show="!haveone1">
            <div class="pindan_img">
              <svg
                t="1564197640750"
                class="icon pdsvg"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="5719"
                width="30"
                height="30"
              >
                <path
                  d="M712.96 538.88c2.56-2.986667 4.693333-5.546667 6.826667-8.533333 0.853333-1.28 2.133333-2.56 2.986666-3.84 1.706667-2.133333 2.986667-4.266667 4.693334-6.4 0.853333-1.28 2.133333-2.986667 2.986666-4.266667 2.133333-3.413333 4.266667-6.4 6.4-9.813333 0-0.426667 0.426667-0.426667 0.426667-0.853334 25.6-41.813333 40.106667-91.733333 38.826667-145.066666-3.413333-140.8-119.466667-255.573333-260.266667-257.706667-148.053333-2.133333-268.8 116.906667-268.8 264.533333v2.986667c0.426667 18.773333 15.36 33.706667 34.133333 33.706667 19.2 0 34.133333-15.786667 34.133334-34.986667V366.933333c0-113.066667 96.426667-204.373333 211.2-195.84 96.853333 7.253333 174.933333 86.613333 180.906666 183.466667 4.693333 77.653333-35.84 146.346667-98.133333 182.186667-71.253333 38.826667-122.88 109.653333-135.253333 193.28-2.986667 20.48 13.226667 38.826667 33.706666 38.826666 16.64 0 31.146667-11.946667 33.706667-28.586666 8.96-61.44 46.506667-113.493333 98.56-142.933334 6.826667-3.84 13.226667-7.68 19.626667-11.946666l3.84-2.56c2.133333-1.28 3.84-2.986667 5.973333-4.266667 1.706667-1.28 3.413333-2.56 5.12-4.266667 2.56-2.133333 5.12-4.266667 8.106667-6.4 1.28-1.28 2.986667-2.56 4.266666-3.84 1.706667-1.28 3.413333-2.986667 5.12-4.693333 2.56-2.133333 4.693333-4.693333 7.253334-6.826667l4.693333-4.693333c1.706667-1.706667 2.986667-3.413333 4.693333-5.12 1.706667-0.853333 2.986667-2.133333 4.266667-3.84z"
                  fill="#8a8a8a"
                  p-id="5720"
                />
                <path
                  d="M499.2 878.933333m-42.666667 0a42.666667 42.666667 0 1 0 85.333334 0 42.666667 42.666667 0 1 0-85.333334 0Z"
                  fill="#8a8a8a"
                  p-id="5721"
                />
              </svg>
            </div>
            <p class="pinzhu"></p>
          </div>
          <div class="flexs" v-show="haveone2">
            <div class="pindan_img">
              <img class="imgs" src alt />
            </div>
            <p class="pinzhu">成员</p>
          </div>
          <div class="flexs" v-show="!haveone2">
            <div class="pindan_img">
              <svg
                t="1564197640750"
                class="icon pdsvg"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="5719"
                width="30"
                height="30"
              >
                <path
                  d="M712.96 538.88c2.56-2.986667 4.693333-5.546667 6.826667-8.533333 0.853333-1.28 2.133333-2.56 2.986666-3.84 1.706667-2.133333 2.986667-4.266667 4.693334-6.4 0.853333-1.28 2.133333-2.986667 2.986666-4.266667 2.133333-3.413333 4.266667-6.4 6.4-9.813333 0-0.426667 0.426667-0.426667 0.426667-0.853334 25.6-41.813333 40.106667-91.733333 38.826667-145.066666-3.413333-140.8-119.466667-255.573333-260.266667-257.706667-148.053333-2.133333-268.8 116.906667-268.8 264.533333v2.986667c0.426667 18.773333 15.36 33.706667 34.133333 33.706667 19.2 0 34.133333-15.786667 34.133334-34.986667V366.933333c0-113.066667 96.426667-204.373333 211.2-195.84 96.853333 7.253333 174.933333 86.613333 180.906666 183.466667 4.693333 77.653333-35.84 146.346667-98.133333 182.186667-71.253333 38.826667-122.88 109.653333-135.253333 193.28-2.986667 20.48 13.226667 38.826667 33.706666 38.826666 16.64 0 31.146667-11.946667 33.706667-28.586666 8.96-61.44 46.506667-113.493333 98.56-142.933334 6.826667-3.84 13.226667-7.68 19.626667-11.946666l3.84-2.56c2.133333-1.28 3.84-2.986667 5.973333-4.266667 1.706667-1.28 3.413333-2.56 5.12-4.266667 2.56-2.133333 5.12-4.266667 8.106667-6.4 1.28-1.28 2.986667-2.56 4.266666-3.84 1.706667-1.28 3.413333-2.986667 5.12-4.693333 2.56-2.133333 4.693333-4.693333 7.253334-6.826667l4.693333-4.693333c1.706667-1.706667 2.986667-3.413333 4.693333-5.12 1.706667-0.853333 2.986667-2.133333 4.266667-3.84z"
                  fill="#8a8a8a"
                  p-id="5720"
                />
                <path
                  d="M499.2 878.933333m-42.666667 0a42.666667 42.666667 0 1 0 85.333334 0 42.666667 42.666667 0 1 0-85.333334 0Z"
                  fill="#8a8a8a"
                  p-id="5721"
                />
              </svg>
            </div>
            <p class="pinzhu"></p>
          </div>
        </div>
        <button class="btn pindanbtn">参与拼单</button>
      </div>
    </div>
    <div class="none"></div>
    <!-- 大标题 -->
    <div id="lastone">
      <!-- v-for在这里 -->
      <div class="dibu" v-for="(item,index) in infoList.shuoMings">
        <!-- 空线 -->
        <!-- 购买须知 -->
        <div style="display:flex;padding:0.5rem 0;">
          <p class="flex_left title_h4" >{{item.biaoTi}}</p>
        </div>
        <!-- 细线 -->
        <div class="line" v-if="item.biaoTi!=''&&item.biaoTi!=undefined"></div>
        <div style="padding:0.5rem 1rem;">

          <img :src="item.imgUrl" class="title_img">
          <p class="flex_left" style="font-size:0.88rem;text-align:left;">{{item.shuoMing}}</p>
        </div>
        <!-- 空线 -->
        <div class="none"></div>
      </div>
    </div>
    <!-- 底部按钮固定样式 -->
    <div class="btn_last">
      <div v-if="infoList.shiKanJia=='y'" class="btn_kanjia"  @click="toKanJia">砍价</div>
      <div @click="toPay(infoList)"  class="btn_goumai">立即购买</div>
    </div>
<!--    <button ></button>--> <!--砍价分享弹窗-->
    <div v-show="showAlert">
      <div class="zheZhao" @click.stop="showAlert=false"></div>
      <div class="alertTop">
        <div class="alertTop_content">
          <i class="left_top iconfont">&#xe611;</i>
          <h5>恭喜你</h5>
          <p >你已砍了{{kanJia}}元</p>
          <span >分享给好友，可以多砍一刀哦</span>
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


  </div>
</template>

<script>
  const api='http://intereek.natapp1.cc/'
  // const api='/api'
  import Swiper from "swiper";
  import "swiper/dist/css/swiper.min.css";
export default {
  data() {
    return {
      pic: [],
      pintuan1: false,
      pintuankuang: "display:none;",
      clocktime: null,
      showAlert:false,
      time: 86400,
      h: 23,
      m: 59,
      s: 60,
      haveone1: true,
      haveone2: false,
      infoList:[],
      isSwiper:true,
      openid:'',
      id:'',
      kanJia:0,
      showMbBl:'',
      guid:'',
      teamId:'',
      companyCode:'',
      appid:'',
      wxPayType:'',
    };
  },
  mounted() {
    const that=this
    that.clock();
    // console.log(this.$route)
    console.log('1111')
    that.companyCode = that.queryString('companyCode')
    that.appid = that.queryString('appid')
    that.guid=that.uuid()
    // alert(that.$route.params.id)
    console.log(that.$route.params)
    if(that.$route.params.id==undefined||that.$route.params.id==null){
      that.openid=that.getCookie('openid')
      that.wxPayType=that.getCookie('wxPayType')
      that.id=that.getCookie('id')
      that.teamId=that.getCookie('teamId')
      // alert('进入缓存')
    }else {
      that.openid=that.$route.params.openid
      that.id=that.$route.params.id
      that.wxPayType=that.$route.params.wxPayType
      that.teamId=that.$route.params.teamId
      // alert('2='+that.teamId)
      that.setCookie('id',that.$route.params.id,2)
      that.setCookie('teamId',that.$route.params.teamId,2)
      that.setCookie('openid',that.$route.params.openid,2)
      that.setCookie('wxPayType',that.$route.params.wxPayType,2)
    }
    that.getData(that.id)


  },
  methods: {
    //获取地址参数
    queryString(name){
      let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
      let r = window.location.search.substr(1).match(reg);
      if(r!=null)return  unescape(r[2]); return null;
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
    //砍价
    toKanJia(){
      const that=this


      console.log(that.guid)
      that.$axios
        .post(
          api + "pangu/xcx.do",
          that.qs.stringify({
            operationType: "kanJia",
            openid: that.openid,
            // guid: that.guid,
            quanId: that.id,
            fromOpenId:that.openid,
          })
        )
        .then(res => {
          console.log(res);
          if(res.data.success){
            let data=res.data.result
            console.log(data);
            that.kanJia=data
            that.showAlert=true
          }else {
            alert(res.data.errorDesc)
          }

        });
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
    //分享蒙板
    showMenBan(){
      this.showMbBl=true
      this.showAlert=false
    },
    //跳转到支付
    toPay(data){
      const that=this
      let path=''
      let name=''
      if(data.isCard=='y'){
        path='/vippay'
        name='VipPay'
      }else {
        path='/pay'
        name='Pay'
      }
      let jiaGe=0
      if(data.pinTuanRenShu==null||data.pinTuanRenShu==undefined||data.pinTuanRenShu==0){
        jiaGe=data.danJia
        data.pinTuanRenShu=0
      }else {
        jiaGe=data.pinTuanJia
      }
      that.$router.push({
        name:name,
        params: {
          openid:that.openid,
          danJia:jiaGe,
          jiFen:data.jiFen,
          teamId:that.teamId,
          keYongKaZhiFu:data.keYongKaZhiFu,
          keYongQuanZhiFu:data.keYongQuanZhiFu,
          pinTuanRenShu:data.pinTuanRenShu,
          shiKanJia:data.shiKanJia,
          id:that.id,
          quanMing:data.quanMing,
          wxPayType:that.wxPayType,
          dianHuaBiTian:data.dianHuaBiTian,
          shiYongShiJianBiTian:data.shiYongShiJianBiTian
        }
      })
      that.$router.replace(path)
    },
    //获取数据
    getData(id){
      const that=this
      that.$axios
        .post(
          api + "pangu/xcx.do",
          that.qs.stringify({
            operationType: "queryQuanShuoMing",
            id: id,
            openid:that.openid,
          })
        )
        .then(res => {
          console.log(res);
          let data=res.data.result
          console.log(data);
          //获取轮播
          let imgList=[]
          imgList.push(data.imgUrl)
          for(let i=0;i<data.shuoMings.length;i++){
            if(data.shuoMings[i].gunDong=='y'){
              imgList.push(data.shuoMings[i].imgUrl)
            }

          }
          if(data.shiKanJia=='y'){
            that.getWx()
            wx.ready(function () {
              //分享到朋友圈
              wx.onMenuShareTimeline({
                title: data.quanMing,
                // link:  window.location.href.split('#')[0],//域名必须和安全域名保持一致
                link: `${api}pangu/html/newtuangou/kanjia/kanjia.html?quanId=${that.id}&guid=${that.guid}&companyCode=${that.companyCode}&appid=${that.appid}&fromOpenid=${that.openid}`.split('#')[0],//域名必须和安全域名保持一致
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
                title: data.quanMing,
                desc: ' ', // 分享描述
                link: `${api}pangu/html/newtuangou/kanjia/kanjia.html?quanId=${that.id}&guid=${that.guid}&companyCode=${that.companyCode}&appid=${that.appid}&fromOpenid=${that.openid}`.split('#')[0],//域名必须和安全域名保持一致
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
          }
          that.pic=imgList
          that.infoList=data
          // console.log(that.pic)
          new Swiper(".swiper-container", {
            // autoplay: true,//可选选项，自动滑动
            autoplay: {
              delay: 3000 //4秒切换一次
            },
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
              spaceBetween: 10,
              dynamicBullets:true,//分页器多则隐藏
            },
            loop: true, // 循环模式选项
            initialSlide :0,
            observer:true,//修改swiper自己或子元素时，自动初始化swiper
            observeParents:true//修改swiper的父元素时，自动初始化swiper
          });
          console.log(imgList)
          if(imgList.length<=1&&!data.imgUrl){
            that.isSwiper=false
          }
        });
    },
    //cook相关
    setCookie(key, value, iDay) {
      let oDate = new Date();
      oDate.setDate(oDate.getDate() + iDay);
      document.cookie = key + '=' + value + ';expires=' + oDate;

    },
    getCookie(key) {
      let cookieArr = document.cookie.split('; ');
      for(let i = 0; i < cookieArr.length; i++) {
        let arr = cookieArr[i].split('=');
        if(arr[0] === key) {
          return arr[1];
        }
      }
      return false;
    },
    removeCookie(key) {
      this.setCookie(key, '', -1);//这里只需要把Cookie保质期退回一天便可以删除
    },
    // 一天的计时器
    clock() {
      const that = this;
      let t = that.time;
      let hours = that.h;
      let minute = that.m;
      let second = that.s;
      that.clocktime = setInterval(() => {
        if (hours == 0 && (minute == 0) & (second == 0)) {
          that.clocktime = null;
        } else {
          second--;
          if (minute < 0) {
            --hours;
            minute = 59;
            second = 59;
          }
          if (second < 0) {
            second = 59;
            minute--;
          }
          //  else if(minute==0){
          //     minute=0;
          //    }else if(minute==0&&second<0){
          //    --hours;
          //    minute=59;
          //    second=59;
          //  }
        }
        that.s = second < 10 ? "0" + second : second;
        that.m = minute < 10 ? "0" + minute : minute;
        that.h = hours < 10 ? "0" + hours : hours;
      }, 1000);
    },
    pintuan() {
      const that = this;
      if (that.pintuan1 == false) {
        that.pintuankuang = "display:block";
        that.pintuan1 = true;
      } else {
        that.pintuankuang = "display:none;";
        that.pintuan1 = false;
      }
    },
    pintuanclose() {
      const that = this;
      if (that.pintuan1 == true) {
        that.pintuankuang = "display:none;";
        that.pintuan1 = false;
      } else {
        that.pintuankuang = "display:block";
        that.pintuan1 = true;
      }
    }
  }
};
</script>

<style scoped>

  .swiper-container{
    /*width: 95%;*/
    width: 100%;
    height: 11rem;
    /*border-radius: .7rem;*/
  }
  .swiper-wrapper{
    width: 100%;
  }
  .swiper-slide{
    width: 100%;
  }
  .swiper-container img{
    /*height: 10rem;*/
    width: 100%;
  }
.pinzhu {
  font-size: 1rem;
  margin-top: 1rem;
}
.flexs {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.router-link-active {
  text-decoration: none;
  font-size: 1.2rem;
  color: #969696;
}
/* 流式布局 */
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.flex_left {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}
.flex_right {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}
/* 空线粗 */
.none {
  margin-top: 1rem;
  width: 100%;
  height: 0.7rem;
  background: #f0f0f0;
}
/* 空线细 */
.line {
  width: 95%;
  height: 0.15rem;
  background: #f0f0f0;
  margin: 0 auto;
}
.top_left_left {
  color: #d13a3b;
  align-items: baseline;
  margin-right: .4rem;
}
.imgs {
  border-radius: 50%;
  width: 100%;
  height: 100%;
}
.bottom_left {
  background: #d8d8d8;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  margin: 0.5rem;
}
.btn {
  width: 6rem;
  height: 2.2rem;
  background: #de3b2f;
  border: none;
  outline: none;
  border-radius: 0.3rem;
  color: #fff;
}
.btn_last {
  /*display: block;*/
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 3rem;
  font-size: 1.1rem;
  font-weight: normal;
  border: none;
  outline: none;
  display: flex;
  /*justify-content: center;*/
  align-items: center;


  text-align: center;
}
.btn_kanjia{
  width: 8rem;
  height: 3rem;
  background-color: #d13a3b;
  color: #FFF;
  line-height: 3rem;
}
.btn_goumai{
  width: 100%;
  height: 3rem;
  line-height: 3rem;
  background: #2352ba;
  color: #fff;
}

#lastone .dibu:last-child {
  margin-bottom: 2rem;
}
  .flexs {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .router-link-active {
    text-decoration: none;
    font-size: 1.2rem;
    color: #969696;
  }
  /* 流式布局 */
  .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .flex_left {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .flex_right {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }
  /* 空线粗 */
  .none {
    margin-top: 1rem;
    width: 100%;
    height: 0.7rem;
    background: #f0f0f0;
  }
  /* 空线细 */


  .top_right {
    position: relative;
  }
  .top_rights {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
  }
  .top_right1 {
    position: absolute;
    right: 2.7rem;
    background: #d8d8d8;
    z-index: 4;
  }
  .top_right2 {
    position: absolute;
    background: #b9b9b9;
    right: 1.5rem;
    z-index: 3;
  }
  .top_right3 {
    position: absolute;
    background: #969696;
    right: 0.2rem;
    z-index: 2;
  }
  .imgs {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }
  .bottom_left {
    background: #d8d8d8;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    margin: 0.5rem;
  }
  .btn {
    width: 6rem;
    height: 2.2rem;
    background: #de3b2f;
    border: none;
    outline: none;
    border-radius: 0.3rem;
    color: #fff;
  }

  .pinpin {
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
  }
  .pindanye {
    width: 100%;
    height: 100%;
  }
  .flex2 {
    width: 90%;
    height: 50%;
    display: flex;
    background: #fff;
    flex-direction: column;
    position: fixed;
    z-index: 100;
    top: 24%;
    left: 5%;
    border-radius: 0.6rem;
    box-shadow: 0 0 10px #ccc;
  }
  .pindan_img {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    background: #d8d8d8;
    border: 1px solid #979797;
  }
  .pdsvg {
    /* margin-top: 1rem; */
    padding: 0.75rem;
  }
  .pindanbtn {
    width: 90%;
    height: 3rem;
    margin: 0 auto;
    font-size: 1rem;
    font-weight: 100;
  }
  /*后加*/
  .quanMing{
    font-size:.9rem;
    padding: 0 .4rem;
    margin-top: .8rem;
  }
  .res{
    position: relative;
    top: .1rem;
    font-size:1.13rem;
  }
  .title_img{
    width: 100%;
    margin: .7rem 0;
  }
  .title_h4{
    font-size:0.88rem;
    margin-left: .5rem;
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
  /*蒙板*/
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
  .back{
    width: 100%;
    height: 100vh;
    background-color: rgba(0,0,0,.5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
  }
</style>


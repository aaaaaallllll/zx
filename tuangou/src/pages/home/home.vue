<template>
    <div id="home">
      <!--轮播图-->
      <div class="swiper-container" v-show="imgList.length>0">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in imgList">
            <img :src="item"  :key="index">
          </div>
        </div>
        <!--分页器-->
        <div class="swiper-pagination"></div>
      </div>
      <!--外链导航-->
      <div class="title_nav" v-if="shopList.name1!=''&& shopList.name1!= null && shopList.name1!=undefined">
          <div class="title_box">
            <a :href="shopList.url1">
              <img src="../../common/images/page_05.png">
              <span>{{shopList.name1}}</span>
            </a>
          </div>
          <div class="title_box">
            <a :href="shopList.url2">
              <img src="../../common/images/page_06.png">
              <span>{{shopList.name2}}</span>
            </a>
          </div>
          <div class="title_box">
            <a :href="shopList.url3">
              <img src="../../common/images/page_07.png">
              <span>{{shopList.name3}}</span>
            </a>
          </div>
          <div class="title_box">
            <a :href="shopList.url4">
              <img src="../../common/images/page_08.png">
              <span>{{shopList.name4}}</span>
            </a>
          </div>
          <div class="title_box">
            <a :href="shopList.url5">
              <img src="../../common/images/page_09.png">
              <span>{{shopList.name5}}/酒店</span>
            </a>
          </div>

      </div>

      <!--限时抢购-->
      <div class="shop_box"  v-if="showXianShi">
        <div class="shop_title">
          <div class="title_back title_text">限时抢购</div>
        </div>
        <ul>
          <li v-for="(item,index) in shopList.weiXia" v-if="item.showShop" @click="toShopInfo(item.id,0)">
            <div style="height: 5rem;width: 5.2rem">
              <img :src="item.imgUrl">
            </div>
            <div class="box_content">
              <h4>{{item.tuanGouQuanMing}}</h4>
              <div class="content_info">
                <div class="info_left">
                  <div class="info_number">
                    <p>已抢{{item.yiShou}}件</p>
                    <span>{{Math.floor((item.yiShou/item.shuLiang)*100)}}%</span>
                  </div>
                  <div class="info_price">
                    <span v-if="item.jiFen>0">￥{{item.danJia}}+{{item.jiFen}}积分</span>
                    <span v-else>￥{{item.danJia}}</span>
                    <span>￥{{item.zongJiaZhi}}</span>
                  </div>
                </div>
                <div class="info_right">
                  <div class="btn">
                    <span class="qiang">抢</span>
                    <span>立即抢购</span>
                  </div>
                  <div class="info_end">
                    距结束 :
                    <span >{{endTimeMiao(index,0)[0]}}</span> :
                    <span>{{endTimeMiao(index,0)[1]}}</span> :
                    <span>{{endTimeMiao(index,0)[2]}}</span>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!--团购数据-->
      <div class="shop_box"  v-if="showpinTuan">
        <div class="shop_title">
          <div class="title_back title_text">限时拼团</div>
        </div>
        <ul>
          <li v-for="(item,index) in shopList.pinTuan" v-if="item.showShop" @click="toShopInfo(item.id,0)">
            <div style="height: 5rem;width: 5.2rem">
              <img :src="item.imgUrl">
            </div>
            <div class="box_content">
              <h4>{{item.tuanGouQuanMing}}</h4>
              <div class="content_info">
                <div class="info_left">
                  <div class="info_number">
                    <p>已抢{{item.yiShou}}件</p>
                    <span>{{Math.floor((item.yiShou/item.shuLiang)*100)}}%</span>
                  </div>
                  <div class="info_price">
                    <span v-if="item.jiFen>0">￥{{item.danJia}}+{{item.jiFen}}积分</span>
                    <span v-else>￥{{item.danJia}}</span>
                    <span>￥{{item.zongJiaZhi}}</span>
                  </div>
                </div>
                <div class="info_right">
                  <div class="btn">
                    <span class="qiang">抢</span>
                    <span>立即抢购</span>
                  </div>
                  <div class="info_end">
                    距结束 :
                    <span >{{endTimeMiao(index,2)[0]}}</span> :
                    <span>{{endTimeMiao(index,2)[1]}}</span> :
                    <span>{{endTimeMiao(index,2)[2]}}</span>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!--砍价数据-->
      <div class="shop_box" v-if="showKanJia">
        <div class="shop_title">
          <div class="title_back title_text">砍价免费拿</div>
        </div>
        <ul>
          <li v-for="(item,index) in shopList.kanJia"  @click="toShopInfo(item.id,0)" v-if="item.showShop">
            <div style="height: 5rem;width: 5.2rem">
              <img :src="item.imgUrl">
            </div>
            <div class="box_content">
              <h4>{{item.tuanGouQuanMing}}</h4>
              <div class="content_info">
                <div class="info_left">
                  <div class="info_number">
                    <p>已抢{{item.yiShou}}件</p>
                    <span>{{Math.floor((item.yiShou/item.shuLiang)*100)}}%</span>
                  </div>
                  <div class="info_price">
                    <span v-if="item.jiFen>0">￥{{item.danJia}}+{{item.jiFen}}积分</span>
                    <span v-else>￥{{item.danJia}}</span>
                    <span>￥{{item.zongJiaZhi}}</span>
                  </div>
                </div>
                <div class="info_right">
                  <div class="btn">
                    <span class="qiang">抢</span>
                    <span>立即抢购</span>
                  </div>
                  <div class="info_end">
                    距结束 :
                    <span >{{endTimeMiao(index,1)[0]}}</span> :
                    <span>{{endTimeMiao(index,1)[1]}}</span> :
                    <span>{{endTimeMiao(index,1)[2]}}</span>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!--quans数据-->
      <div class="shop_box"  v-for = "(value,key,index) in shopList.quans" :key="index" >
        <div class="shop_title">
          <div class="title_back title_text">{{key}}</div>
        </div>
        <ul>
          <li v-for="(item,index2) in value" @click="toShopInfo(item.id,0)">
            <div style="height: 5rem;width: 5.2rem">
              <img :src="item.imgUrl">
            </div>
            <div class="box_content">
              <h4>{{item.tuanGouQuanMing}}</h4>
              <div class="content_info">
                <div class="info_left">
                  <div class="info_number">
                    <p>已抢{{item.yiShou}}件</p>
                    <span>{{Math.floor((item.yiShou/item.shuLiang)*100)}}%</span>
                  </div>
                  <div class="info_price">
                    <span v-if="item.jiFen>0">￥{{item.danJia}}+{{item.jiFen}}积分</span>
                    <span v-else>￥{{item.danJia}}</span>
                    <span>￥{{item.zongJiaZhi}}</span>
                  </div>
                </div>
                <div class="info_right">
                  <div class="btn">
                    <span class="qiang">抢</span>
                    <span>立即抢购</span>
                  </div>
<!--                  <div class="info_end">-->
<!--                    距结束 :-->
<!--                    <span >{{endTimeMiao(0)[0]}}</span> :-->
<!--                    <span>{{endTimeMiao(0)[1]}}</span> :-->
<!--                    <span>{{endTimeMiao(0)[2]}}</span>-->
<!--                  </div>-->
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!--砍价分享弹窗-->
<!--      <div v-show="showAlert">-->
<!--        <div class="zheZhao" @click.stop="showAlert=false"></div>-->
<!--        <div class="alertTop">-->
<!--          <div class="alertTop_content">-->
<!--            <i class="left_top iconfont">&#xe611;</i>-->
<!--            <h5>恭喜你</h5>-->
<!--            <p>你已砍了{{kanJia}}元</p>-->
<!--            <span>分享给好友，可以多砍一刀哦</span>-->
<!--            <div class="icon_img">-->
<!--              <div class="icon_info">-->
<!--                <i class="iconfont" style="font-size: 2.1rem">&#xe625;</i>-->
<!--                <span >微信群聊</span>-->
<!--              </div>-->
<!--              <div class="icon_info" >-->
<!--                <i class="iconfont">&#xe62e;</i>-->
<!--                <span style="margin-top: .1rem">微信朋友圈</span>-->
<!--              </div>-->

<!--            </div>-->
<!--          </div>-->
<!--        </div>-->

<!--      </div>-->
      <!--办会员弹窗-->
            <div v-show="showAlert">
              <div class="zheZhao" @click.stop="showAlert=false"></div>
              <div class="xunWen">
                <div class="alertTop_content">
                  <img src="../../common/images/shop_3.png" >
                  <span>注册会员，优惠更多</span>
                  <div>
                    <p style="background-color: #1B9CFC;color: #FFF" @click="goBanKa">注册会员</p>
                    <p @click="showAlert=false">继续购买</p>
                  </div>
                </div>
              </div>

            </div>
    </div>
</template>

<script>
  const api='http://intereek.natapp1.cc/'
  // const api='/api'
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'
    export default {
      name: "home",
      data(){
        return{
          shopList:{},
          time:[],
          time2:[],
          time3:[],
          showAlert:true,
          kanJia:0,
          companyCode:'m44gwOk2PSU4cMtqHiEw007',
          appid:'',
          openid:'',
          showXianShi:false,
          imgList:[],
          teamId :'',
          shopid:'',
          showpinTuan:false,
          showKanJia:false,
        }
      },
      computed:{
        endTimeMiao(){
          return function (index,ttt) {
            const that=this
            let newTime=[]
            let time=[]
            // let time=that.time[index]
            if(ttt==0){
             time=that.time[index]
            }else if(ttt==1){
              time=that.time2[index]
            }else {
              time=that.time3[index]
            }

            newTime[0]=Math.floor(time/3600)%24
            newTime[1]=Math.floor(time/60)% 60
            newTime[2]=Math.floor(time% 60)
            for(let i=0;i<newTime.length;i++){
              if(newTime[i]<10){
                newTime[i]='0'+newTime[i]
              }
            }
            return newTime
          }

        },

      },
      watch:{

      },
      methods:{
        //跳转商品详情页
        toShopInfo(id,type){
          const that=this
          that.$router.push({
            name: 'Detail',
            params: {
              id: id,
              wxPayType:that.shopList.wxPayType,
              openid:that.openid
            }
          })
          that.$router.replace('/detail')
        },
        //跳转办卡页面
        goBanKa(){
          window.open(`http://www.intereek.com/pangu/html/newbanka/banKa.html?companyCode=${this.companyCode}&appid=${this.appid}`)
        },
        //倒计时
        getEndTime(index){
          const that=this
          if(that.time[index]==0){
            // alert('111')
          }else {
            that.time[index]--
            that.$forceUpdate()
            setTimeout(function () {
              // console.log(that.time[0])
              that.getEndTime(index)
            },1000)
          }
        },
        //显示砍价弹窗
        toKanJia(){
          const that=this
          that.showAlert=true
          that.kanJia=that.randIndex()
          console.log(that.kanJia)
          // console.log(that.qs)
          that.getWx()
        },
        //调取wx api
        getWx(){
          const that=this
          const local = window.location.href;
          // /api http://intereek.natapp1.cc/
          that.$axios.post(api+'pangu/xcx.do',
            that.qs.stringify({
            "operationType":"wxShare",
            "companyCode":that.companyCode,
            // "url":local// 获取页面当前链接
            "url":'http://intereek.natapp1.cc/pangu/xcx.do'// 获取页面当前链接
          })).then((res)=>{
            console.log(res)
          })
        },
        //获取随机数
        randIndex(){
          const ran=Math.floor(Math.random()*10)
          console.log(ran)
          if(ran>5){
            return ran-5
          }else if(ran==0){
            return 1
          }else {
            return ran
          }

        },
        //获取地址参数
        queryString(name){
          let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
          let r = window.location.search.substr(1).match(reg);
          if(r!=null)return  unescape(r[2]); return null;
        },
        //cook相关
        setCookie(key, value, iDay) {
          var oDate = new Date();
          oDate.setDate(oDate.getDate() + iDay);
          document.cookie = key + '=' + value + ';expires=' + oDate;

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
        removeCookie(key) {
          this.setCookie(key, '', -1);//这里只需要把Cookie保质期退回一天便可以删除
        },
        //获取openid
        getOpenid(c){
          const that =this;
          that.$axios
            .get(
              api + "/pangu/pangu.do?requestData={\"operationType\":\"getOpenid\"," +
              "\"companyCode\":\""+that.companyCode+"\"," +
              "\"code\":\""+c+"\"}",
            )
            .then(res => {
              console.log(res);
                if(res.data.success){
                  that.openid=res.data.result;
                  console.log(that.openid)
                  //alert(openid);
                  that.setCookie('openid',res.data.result,365)
                  // alert(that.getCookie('openid'))
                  if(that.teamId!=''&& that.teamId!=undefined&&that.teamId!=null){
                    const that=this
                    that.$router.push({
                      name: 'Detail',
                      params: {
                        id: that.shopid,
                        teamId:that.teamId,
                        openid:that.openid,
                        wxPayType:'WX'
                      }
                    })
                    that.$router.replace('/detail')
                  }else {
                    that.getData()
                    // alert(that.openid)
                  }
                }else {
                  Toast({
                    message: res.data.errorDesc,
                    position: 'middle',
                    duration: 1000
                  });
                      }
              })
          //alert(this.companyCode);
          //alert(c);
          // $.ajax({
          //   type: "GET",
          //   dataType: "jsonp",
          //   jsonp:'callback',
          //   url: "http://"+testServer+"/pangu/pangu.do?requestData={\"operationType\":\"getOpenid\",\"companyCode\":\""+that.companyCode+"\",\"code\":\""+c+"\"}",
          //   success: function(data){
          //     if(data.success){
          //       that.openid=data.result;
          //       console.log(that.openid)
          //       //alert(openid);
          //       that.setCookie('openid',data.result,365)
          //       that.getHuiYuanKa()
          //     }else {
          //       layer.msg(data.errorDesc);
          //     }
          //   }
          //
          // });
        },
        //获取数据
        getData(){
          const that = this;
          // /api http://intereek.natapp1.cc/
          that.$axios
            .post(
              api + "pangu/xcx.do",
              that.qs.stringify({
                operationType: "intereekTuanGou",
                companyCode: that.companyCode,
                openid: that.openid,
              })
            )
            .then(res => {
              console.log(res);
              let data=res.data.result
              document.title = `${data.companyName}商城`
              //限时秒杀倒计时
              let arr1=data.weiXia
              let arr2=data.weiShang
              arr1.push.apply(arr1,arr2)
              data.weiXia=arr1
              let time1=[]
              for (let i=0;i<data.weiXia.length;i++){
                let end_time = new Date(data.weiXia[i].ziDongXiaJiaShiJian.replace(/-/g, "/")).getTime();//月份是实际月份-1

                let start_time = new Date(data.weiXia[i].ziDongShangJiaShiJian.replace(/-/g, "/")).getTime();//月份是实际月份-1
                let now_time=new Date().getTime()
                // console.log(end_time)
                // console.log(start_time)

                console.log(start_time<now_time && now_time<end_time)
                if(start_time<now_time && now_time<end_time){
                  data.weiXia[i].showShop=true
                  let sys_second = (end_time-now_time)/1000;
                  time1.push(sys_second)
                }else {
                  data.weiXia[i].showShop=false
                }

              }
              console.log(time1)
              //拼团倒计时
              let time3=[]
              for (let i=0;i<data.pinTuan.length;i++){
                let end_time = new Date(data.pinTuan[i].ziDongXiaJiaShiJian.replace(/-/g, "/")).getTime();//月份是实际月份-1

                let start_time = new Date(data.pinTuan[i].ziDongShangJiaShiJian.replace(/-/g, "/")).getTime();//月份是实际月份-1
                let now_time=new Date().getTime()
                // console.log(end_time)
                // console.log(start_time)

                console.log(start_time<now_time && now_time<end_time)
                if(start_time<now_time && now_time<end_time){
                  data.pinTuan[i].showShop=true
                  let sys_second = (end_time-now_time)/1000;
                  time3.push(sys_second)
                  that.showpinTuan=true
                }else {
                  data.pinTuan[i].showShop=false
                }

              }
              console.log(time3)
              that.time3=time3
              //砍价倒计时
              let time2=[]
              for (let i=0;i<data.kanJia.length;i++){
                let end_time = new Date(data.kanJia[i].ziDongXiaJiaShiJian.replace(/-/g, "/")).getTime();//月份是实际月份-1

                let start_time = new Date(data.kanJia[i].ziDongShangJiaShiJian.replace(/-/g, "/")).getTime();//月份是实际月份-1
                let now_time=new Date().getTime()
                // console.log(end_time)
                // console.log(start_time)

                console.log(start_time<now_time && now_time<end_time)
                if(start_time<now_time && now_time<end_time){
                  data.kanJia[i].showShop=true
                  let sys_second = (end_time-now_time)/1000;
                  time2.push(sys_second)
                  that.showKanJia=true
                }else {
                  data.kanJia[i].showShop=false
                }

              }
              console.log(time2)
              that.time2=time2
              //判断是否显示限时秒杀
              let weixiaList=data.weiXia
              // console.log(weixiaList)
              if(weixiaList.length>0){
                for(let i=0;i<weixiaList.length;i++){
                  if(weixiaList[i].showShop){
                    that.showXianShi=true
                  }
                }
              }
              //判断是否为拼团
              //判断是否为会员
              if(data.cardNum>0){
                that.showAlert=false
              }
              //获取轮播图
              let imgList=[]
              for(let key in data.quans){
                for(let i=0;i<data.quans[key].length;i++){
                  if(data.quans[key][i].shiGunDong=='y'){
                    imgList.push(data.quans[key][i].imgUrl)
                  }
                }
              }
              // console.log(imgList)
              that.imgList=imgList
              //轮播图
              new Swiper('.swiper-container', {
                // autoplay: true,//可选选项，自动滑动
                autoplay: {
                  delay: 4000,//4秒切换一次
                },

                pagination: {
                  el: '.swiper-pagination',
                  clickable: true,
                  spaceBetween: 10,
                  dynamicBullets:true,//分页器多则隐藏
                },
                loop: true, // 循环模式选项
                initialSlide :0,
                observer:true,  //修改swiper自己或子元素时，自动初始化swiper
                observeParents:true,  //修改swiper的父元素时，自动初始化swiper
              })
              that.shopList=data
              that.time=time1

              for(let i=0;i<that.time.length;i++){
                that.time[i]--
                that.getEndTime(i)
              }

            });
        }
      },
      mounted() {
        const that=this
        that.appid=that.queryString('appid')
        that.companyCode = that.queryString('companyCode')
        that.openid = that.queryString('openid')
        that.teamId = that.queryString('teamId')
        that.shopid = that.queryString('quanId')
        // alert(that.shopid)
        console.log('teamid='+that.teamId)
        // alert('teamid='+that.teamId)
        // that.getData()
        // return
        if(that.getCookie('openid')&&that.getCookie('openid')!='undefined'){
          that.openid=that.getCookie('openid')
          if(that.teamId!=''&& that.teamId!=undefined&&that.teamId!=null){
            const that=this
            that.$router.push({
              name: 'Detail',
              params: {
                id: that.shopid,
                teamId:that.teamId,
                openid:that.openid
              }
            })
            that.$router.replace('/detail')
            return
          }
          // alert(that.openid)
          that.getData()
        }else {
          const local = window.location.href;
          const code = that.queryString('code')
          // 获取code
          if(code == null || code === ""){
            window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+that.appid+"&redirect_uri="+
              encodeURIComponent(local)+"&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect";
          }else{
            console.log(code)
            // that.code=code
            that.getOpenid(code)
          }
        }



        // let start=setInterval(function () {
        //   that.shopList[0].list[0].endTime2--
        //   if(that.shopList[0].list[0].endTime2==0){
        //     clearInterval(start)
        //   }
        // },1000)


      },
      created() {

      }
    }
</script>

<style scoped>
  #home{
    height: 100%;
    width: 100%;
  }
  /*弹窗*/
  /*会员*/
  .xunWen{
    width:16rem;
    height:6.20rem;
    background:rgba(255,255,255,1);
    border-radius:0.5rem;
    position: fixed;
    left: 50%;
    top: 50%;
    margin-top: -3.1rem;
    margin-left: -8rem;
    z-index: 99;
  }
  .xunWen img{
    position: absolute;
    top: -1rem;
    right: -.8rem;
    width: 3rem;
    color: #e0620d;
  }
  .xunWen div p{
    display: inline-block;
    width: 5rem;
    height: 1.5rem;
    background-color: #ccc;
    text-align: center;
    line-height: 1.5rem;
    border-radius: .3rem;
    margin: 0 .5rem;
  }
  /*砍价*/
  .zheZhao{
    height: 100%;
    width: 100%;
    background-color: rgba(0,0,0,.5);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 98;
  }
  .alertTop{
    width:19.69rem;
    height:16.13rem;
    background:rgba(255,255,255,1);
    border-radius:0.5rem;
    position: fixed;
    left: 50%;
    top: 50%;
    margin-top: -8.065rem;
    margin-left: -9.854rem;
    z-index: 99;

  }
  .alertTop_content{
    padding: .2rem .8rem;
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction:column;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
  }
  .alertTop .left_top{
    position: absolute;
    top: -4rem;
    left: -.8rem;
    font-size: 7rem;
    color: #e0620d;
  }
  .alertTop h5{
    font-size:1.75rem;
    font-family:GurmukhiMN-Bold;
    font-weight:bold;
    color:rgba(224,98,13,1);
  }
  .alertTop p{
    font-size:1.5rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(73,73,73,1);
    margin-top: .5rem;
  }
  .alertTop span{
    font-size:1.13rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(222,59,47,1);
    margin-top: .5rem;
  }
  .alertTop .icon_img{
    margin-top: .8rem;
    display: flex;
    justify-content:space-around;
    width: 100%;
  }
  .alertTop .icon_img i{
    font-size: 2.6rem;
    color: #64ae43;

  }
  .alertTop .icon_img .icon_info{
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    position: relative;
    top: 1rem;
    width: 4rem;
    height: 4rem;
  }
  .alertTop .icon_img .icon_info span{
    font-size:0.75rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(63,63,63,1);
  }
  /*图标*/
  @font-face {
    font-family: 'iconfont';  /* project id 1314785 */
    src: url('//at.alicdn.com/t/font_1314785_wg3sktfo4np.eot');
    src: url('//at.alicdn.com/t/font_1314785_wg3sktfo4np.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_1314785_wg3sktfo4np.woff2') format('woff2'),
    url('//at.alicdn.com/t/font_1314785_wg3sktfo4np.woff') format('woff'),
    url('//at.alicdn.com/t/font_1314785_wg3sktfo4np.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_1314785_wg3sktfo4np.svg#iconfont') format('svg');
  }
  .iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;}
  /*外链导航*/
  .title_nav{
    display: flex;
    justify-content:space-around;
    height: 6.2rem;
    width: 100%;
    /*background-color: #0984e3;*/
    align-items: center;
    text-align: center;
    font-size: .6rem;
    /*padding:  0 .3rem;*/
  }
  .title_box{
    height: 4rem;
    /*line-height: 1rem;*/
    width: 6rem;
  }
  .title_nav img{
    height: 3rem;
    width: 3rem;
    border-radius: 1.3rem;
    display: block;
    margin: 0 auto;
  }
  .title_nav span{
    margin-top: .4rem;
    /*position: relative;*/
    /*top: .4rem;*/
    display: block;
    color: #5a5a5a;
  }
  /*轮播图*/
  .swiper-container{
    /*width: 95%;*/
    width: 100%;
    height: 11rem;
    margin: 0 auto;
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
  .shop_box{
    width: 100%;
    font-size: 1rem;
  }
  .shop_title{
    width: 100%;
    height: 2rem;
    /*background-color: #0984e3;*/
    margin-top: 1rem;
    /*line-height: 2rem;*/
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .title_text{
    font-size: 1rem;
    color: #333333;
    width: 7rem;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 7rem;
  }
  .title_back{
    background-image: url(../../common/images/page_10.png);

    /*margin: 0 auto .1rem;*/
  }
  /*限时抢购*/
  .shop_box li{
    width: 100%;
    height: 6.5rem;
    /*background-color: #0984e3;*/
    padding: .75rem .6rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #EEE;
  }
  .shop_box li img{
    height:5rem;
    width: 5.2rem;
    border-radius: .3rem;
  }
  .box_content{
    width: 100%;
    height: 6.5rem;
    padding: .6rem 0 .6rem .6rem;
    box-sizing: border-box;
    display: flex;
    flex-direction:column;
    justify-content: space-between;
  }
  .content_top{
    display: flex;
    justify-content: space-between;
  }
  .top_img{
    display: flex;
    /*align-items: center;*/
  }
  .shop_box .top_img img{
    width: 1.4rem;
    height: 1.4rem;
    border-radius: .7rem;
    background-color: #7a7a7a;
    position: relative;
    z-index: 3
  }
  .shop_box .top_img img:first-child{
   background-color: #adadad;
    left: 1rem;
    z-index: 1;
  }
  .shop_box .top_img img:nth-child(2){
   background-color: #919191;
    left: .5rem;
    z-index: 2;
  }
  .content_info{
    display: flex;
    justify-content: space-between;
  }
  .info_left{
    max-width: 5.5rem;
  }
  .info_number{
    width: 6.4rem;
    height: .9rem;
    line-height: .9rem;
    background-color: rgba(255, 71, 87, 0.3);
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: .5rem;
    padding-right: .2rem;
    box-sizing: border-box;
  }
  .info_number span{
    display: block;
    font-size: .4rem;
    height: .9rem;
    line-height: .9rem;
    color: #ff4757;
  }
  .info_number p{
    /*height: .9rem;*/
    /*line-height: .9rem;*/
    font-size: .5rem;
    width: 3.7rem;
    background-color: #eb4d4b;
    border-radius: .5rem;
    color: #FFF;
    padding-left: .2rem;
    box-sizing: border-box;
    display: block;
  }
  .info_price{
    margin-top: .7rem;
    display: flex;
    align-items: flex-end;
    width:10rem;
  }
  .info_price span:first-child{
    font-size: .9rem;
    color: #eb4d4b;
  }
  .info_price span:last-child{
    font-size: .5rem;
    color: #9f9f9f;
    text-decoration:line-through
  }
  .info_right{
    display: flex;
    flex-direction:column;
    justify-content: space-between;
    align-items: flex-end;
  }
  .info_right .btn{
    width: 5rem;
    height: 1.2rem;
    background: linear-gradient(to right, #FF6640 0%, #FFBB45 100%);
    line-height: 1.2rem;
    border-radius: .7rem;
    color: #FFF;
    font-size: .6rem;
    box-sizing: border-box;
    padding-left: .1rem;
    display: flex;
    align-items: center;
  }
  .info_right .btn2{
   justify-content: center;
  }
  .info_right .btn span{
    height: 1rem;
    text-align: center;
    /*line-height: 1rem;*/
    display: block;
  }
  .info_right .btn .qiang{
    width: 1.1rem;
    border-radius: .55rem;
    color: #EE5A24;
    background-color: #FFF;
    margin-right: .2rem;
    font-weight: 600;
  }
  .info_end {
    color: #eb4d4b;
    font-size: .5rem;
    /*display: flex;*/
    /*align-items: center;*/
    /*justify-content: center;*/
  }
  .info_end span{
    width: 1.1rem;
    height: .9rem;
    line-height: .9rem;
    text-align: center;
    display: inline-block;
    background-color: #eb4d4b;
    color: #FFF;
    border-radius: 0.1rem;
  }
</style>

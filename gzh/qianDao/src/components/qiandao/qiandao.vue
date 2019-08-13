<template>
  <div class="qiandao">
<!--    <div class="top">-->
<!--&lt;!&ndash;      <div class="top_top">&ndash;&gt;-->
<!--&lt;!&ndash;        <div style="width:1.6rem;">&ndash;&gt;-->
<!--&lt;!&ndash;          <img style="width:100%;" src="../../assets/left.svg.svg" alt />&ndash;&gt;-->
<!--&lt;!&ndash;        </div>&ndash;&gt;-->
<!--&lt;!&ndash;        <span style="color:#fff;font-size:0.9rem;">说明</span>&ndash;&gt;-->
<!--&lt;!&ndash;      </div>&ndash;&gt;-->
<!--      <div class="top_middle">-->
<!--        <div class="middle_left">-->
<!--          <div class="middle_img">-->
<!--            <img src alt />-->
<!--          </div>-->
<!--          <div class="middle_span">-->
<!--            <span style="font-size:1.05rem;">连续签到{{continuous}}天</span>-->
<!--            <p style="font-size:0.8rem;">累计签到{{accumulative}}天</p>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div style="width:1.5rem;margin-top:0.5rem;">-->
<!--          <img style="width:100%;" src="../../assets/chanpin.svg.svg" alt />-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
    <!-- 签到礼包 -->
    <div class="loding" v-if="!showHuiyuan">
      <!-- 代码部分begin -->
      <div class="loader-inner">
<!--        <div class="loader-line-wrap">-->
<!--          <div class="loader-line"></div>-->
<!--        </div>-->
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
      <!-- 代码部分end -->
      <div style="font-size: 1rem;color: #FFF">加载中...</div>
    </div>
    <div class="f_top" v-show="showHuiyuan">
      <div class="user_top">
        <div class="user_touxian">
          <div class="huanguan">
            <i class="iconfont" style="color: #9ec6a9;font-size: 2rem;">&#xe617;</i>
          </div>

<!--          balance: -11095-->
<!--          cardName: "11"-->
<!--          cardNo: "Wx190113090534"-->
<!--          cardPhone: "15958125374"-->
<!--          cardType: "白金卡"-->
<!--          cardTypeId: "3"-->
<!--          companyCode: "m44gwOk2PSU4cMtqHiEw007"-->
<!--          companyName: "赵飞"-->
<!--          jiFen: 1119-->
          <img src="../../assets/qiandao_n.png"  class="imgTou">
          <img src="../../assets/qiandao_c.png" class="imgCai">
          <span>{{kaList.cardName}}</span>
        </div>
        <div class="progress">
          <div class="progress_lv">
            <p>
              <i class="iconfont">&#xe638;</i>
            </p>
            <span>{{kaList.cardType}}</span>
          </div>
          <div class="progress_bottom">
            <div class="progress_length">
              <span :style="jiFenStyle"></span>
            </div>
            <span class="progress_info">{{jiFen}}/{{jiFenToLv}}分</span>
          </div>

        </div>
      </div>
      <div class="user_info">
        <div class="info_left">
          <p>
            <i class="iconfont">&#xe603;</i>
            <span >{{kaList.cardPhone}}</span>
          </p>
          <p>
            <i class="iconfont">&#xe637;</i>
            <span >{{jiFen}}积分</span>
          </p>
        </div>
        <div class="info_right">
          <p>
            <i class="iconfont">&#xe6b3;</i>
            <span>{{kaList.companyName}}</span>
          </p>
          <p>
            <i class="iconfont">&#xe65c;</i>
            <span >{{kaList.cardNo}}</span>
          </p>
        </div>
      </div>
    </div>
    <div v-show="showQd">
      <div class="qiandao_text">
        <span>连续签到{{continuous}}天</span>
        <span>累计签到{{accumulative}}天</span>
      </div>
      <div class="center">
              <div class="center_top">
                <div class="center_left">
                  <p style="color:#353438;font-size:0.9rem;">领连签礼包</p>
                  <!-- <progress max="100" value="30"></progress> -->
                  <div class="progress2">
                    <div class="progress2_right" :style="arrStyle"></div>
                  </div>

                </div>
                <div class="center_left">
                  <p style="color:#EF4B4E">{{lxqdllb}}天</p>
                  <p style="color:#7C7D7F">/{{days}}天</p>
                </div>
              </div>
        <div class="center_middle">
          <!-- 上周打卡 !!!写签到-->
          <div class="center_qiandao">
            <div class="column" v-for="(item,index) in lastWeek" :key="index">
              <div style="background:#AAABB8;" v-if="!item.signIn && item.daoDa" @click.stop="repSign(true,index,item.date)">
                <span style="color:#fff;margin-left:0.31rem;font-size:0.9rem;">补</span>
              </div>
              <div  style="border:0.06rem solid rgba(224,224,224,1)"  v-if="item.signIn && item.daoDa">
                <span style="color:#EF4B4E;margin-left:0.20rem;font-size:0.7rem;" class="iconfont">&#xe6b4;</span>
              </div>
              <div  style="border:0.06rem solid rgba(224,224,224,1)"  v-if="!item.signIn && !item.daoDa">
                <span style="color:#fff;margin-left:0.35rem;font-size:0.9rem;"></span>
              </div>
              <p style="font-size:0.69rem;color:#6A6A6C;margin:0.2rem 0 0 1rem;">周{{item.week}}</p>
            </div>
            <div class="column column_text">
              <span style="margin-top: -0.1rem">上周</span>
              <span style="margin-top: 0.2rem">签到</span>
            </div>
          </div>
          <!-- 同上本周打卡 -->
          <div class="center_qiandao" style="margin:1rem 1.5rem 0 0;">
            <div class="column" v-for="(item,index) in thisWeek" :key="index">
              <div style="background:#AAABB8;" v-if="!item.signIn && item.daoDa&& !item.br" @click.stop="repSign(false,index,item.date)">
                <span style="color:#fff;margin-left:0.31rem;font-size:0.9rem;">补</span>
              </div>
              <div style="background:#EF4B4E;" v-if="!item.signIn && item.daoDa && item.br" @click.stop="signIn">
                <span style="color:#fff;margin-left:0.31rem;font-size:0.9rem;">签</span>
              </div>
              <div  style="border:0.06rem solid rgba(224,224,224,1)"  v-if="item.signIn && item.daoDa ">
                <span style="color:#EF4B4E;margin-left:0.20rem;font-size:0.7rem;" class="iconfont">&#xe6b4;</span>
              </div>
              <div  style="border:0.06rem solid rgba(224,224,224,1);border-radius:50%;width:1.5rem;height:1.5rem;margin-left:1rem;"  v-if="!item.signIn && !item.daoDa && !item.br">
                <span style="color:#fff;margin-left:0.35rem;font-size:0.9rem;"></span>
              </div>
              <p style="font-size:0.69rem;color:#6A6A6C;margin:0.2rem 0 0 1rem;" >周{{item.week}}</p>
            </div>
            <!--          <div class="column column_text2">-->
            <!--            <img  src="../../assets/lb.png" style="margin-top: -0.1rem;color: #c52e28;font-size: 1rem;height: 1.25rem" >-->
            <!--            &lt;!&ndash;<span style="margin-top: -0.1rem;color: #c52e28;font-size: 1rem" class="iconfont">&#xe603;</span>&ndash;&gt;-->
            <!--            <span style="margin-top: 0.2rem">大礼包</span>-->
            <!--          </div>-->
            <div class="column column_text">
              <span style="margin-top: -0.1rem">本周</span>
              <span style="margin-top: 0.2rem">签到</span>
            </div>
          </div>
          <div class="btn" @click.stop="signIn" v-if="dayNowBl">
            今日签到，周日领大礼包
          </div>
          <div class="btn2" v-else>
            已签到
          </div>
        </div>


      </div>
    </div>


    <!--弹出-->
<!--    position="top"-->
    <mt-popup
      v-model="popupVisible"
      :modal=false
      class="alertTop"
      position="top"
    >
      {{msg}}
    </mt-popup>
    <div class="smText">
      {{smText}}
    </div>
  </div>
</template>

<script>
  import { MessageBox,Popup   } from 'mint-ui'
  // const ajaxUrl='http://www.intereek.com/haotian/xcx.do'
  // const kaUrl='http://www.intereek.com/pangu/xcx.do'

  const ajaxUrl='http://intereek.natapp1.cc/haotian/xcx.do'
  // const ajaxUrl='http://192.168.1.7:999/com_pangu_tang_web_war_exploded/xcx.do'
  const kaUrl='http://intereek.natapp1.cc/pangu/xcx.do'
  // const kaUrl='http://192.168.1.7:999/com_pangu_tang_web_war_exploded/xcx.do'

  // const ajaxUrl='http://intereek.natapp1.cc/com_pangu_tang_web_war_exploded/xcx.do'
  const testServer="www.intereek.com"
export default {
  data() {
    return {
      // week: ["一", "二", "三", "四", "五", "六", "日"]
      smText:'',//说明
      accumulative:0,//累计签到时间
      continuous:0,//连续签到时间
      days:0,//连续签到多少天会获得礼包
      popupVisible:false,//控制弹窗
      openid:'',//用户id
      companyCode:'',//门店id
      msg:'',//弹窗内容
      // arrStyle:{
      //   width: '5.2rem'
      // },//动态样式
      // slots:'1111',
      nowDate:'',//今天日期
      nowDataIndex:0,//今天日期位置(静态改变参数)
      dayNowBl:true,//判断今天是否签到过
      //上周
      lastWeek:[],
      //本周
      thisWeek:[],
      appid:'',
      //会员卡信息
      kaList:{},
      jiFen:'',
      jiFenToLv:'',//多少积分升级
      //控制加载中签到信息
      showHuiyuan:false,
      showQd:false

    };
  },
  watch:{
    //检测popupVisible的值,如果是true,让它两秒钟之后false
    popupVisible(val) {
      console.log(val)
      if (val) {
        setTimeout(() => {
          this.popupVisible= false;
        }, 2000);
      }
    }

  },
  mounted() {
    const that=this;
    that.companyCode = that.queryString('companyCode')
    that.openid = that.queryString('openid')
    // that.appid = that.queryString('appid')
    //获取code
    // that.getData()
    that.getHuiYuanKa()
    return
    that.appid=that.queryString('appid')
    if(that.getCookie('openid')&&that.getCookie('openid')!='undefined'){
      that.openid=that.getCookie('openid')
      that.getHuiYuanKa()

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


  },
  computed:{
    arrStyle(){
      const that=this
      const lxqd=that.continuous%that.days
      let sz=Math.floor((lxqd/that.days)*100)
      if(that.continuous==0){
        sz=0
      }else if(lxqd==0){
        sz=100
      }

      return {width:sz+'%'}
    },
    jiFenStyle(){
      const that=this
      let sz=0
      const toLv=that.jiFenToLv
      const jiFen=that.jiFen
      if(toLv==0){
        sz=0
      }else if(jiFen>toLv&&toLv!=0){
        sz=100
      }else {
        sz=Math.floor((jiFen/toLv)*100)
      }

      return {width:sz+'%'}
    },
    lxqdllb(){
      const that=this
      let sz=that.continuous%that.days
      if(that.continuous==0){
        sz=0
      }else if(sz==0){
        sz=that.days
      }

      return sz
    }
  },
  methods:{
    //获取url地址属性函数
    queryString(name) {
      let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
      let r = window.location.search.substr(1).match(reg);
      if(r!=null)return  unescape(r[2]); return null;
    },
    //补签
    repSign(bl,index,date){
      const that=this
      if(bl){
        console.log('1')
      }
      else {
        console.log('2')
      }
      console.log(index)
      console.log(date)
      // return
      MessageBox.confirm('确认补签吗?').then(
        action => {
          console.log('1')
          $.ajax({
            // url: '/api',
            url: ajaxUrl,
            dataType: "jsonp",
            jsonp:'callback',
            type: "post",
            data: {
              companyCode: that.companyCode,
              operationType: 'wxQianDaoService',
              openid:that.openid,
              type:'',
              date:date
            },
            success(res) {
              console.log(res);
              if(res.success){
                that.msg='补签成功'
                that.popupVisible=true
                if(bl){
                  console.log('1')
                  that.lastWeek[index].signIn=true
                }
                else {
                  that.thisWeek[index].signIn=true
                }
                that.accumulative+=1
                if(res.result.liBao){
                  alert('恭喜获得'+res.result.liBao)
                }
                that.getHuiYuanKa()
              }else {
                that.msg=res.errorDesc
                that.popupVisible=true
              }

            }
          })
          // Toast('退出成功')

        },
        action => {
          console.log('2')
        }
      )
    },
    //获取openid
    getOpenid(code){
      const that=this
      $.ajax({
        type: "GET",
        dataType: "jsonp",
        jsonp:'callback',
        url: "http://"+testServer+"/pangu/pangu.do?requestData={\"operationType\":\"getOpenid\",\"companyCode\":\""+that.companyCode+"\",\"code\":\""+code+"\"}",
        success: function(data){
          that.openid=data.result;
          console.log(that.openid)
          //alert(openid);
          that.setCookie('openid',data.result,365)
          that.getHuiYuanKa()
        }

      });
    },
    //签到
    signIn(){
      const that=this
      // that.msg='签到成功'
      // that.popupVisible=true
      // that.thisWeek[that.nowDataIndex].signIn=true
      // that.dayNowBl=false
      // that.accumulative+=1
      // that.continuous+=1
      // return
      $.ajax({
        // url: '/api',
        url: ajaxUrl,
        dataType: "jsonp",
        jsonp:'callback',
        type: "post",
        data: {
          companyCode: that.companyCode,
          operationType: 'wxQianDaoService',
          openid:that.openid,
          type:'',
          date:that.nowDate
        },
        success(res) {
          console.log(res);
          if(res.success){
            that.msg='签到成功'
            that.popupVisible=true
            that.thisWeek[that.nowDataIndex].signIn=true
            that.dayNowBl=false
            that.accumulative+=1
            that.continuous+=1
            if(res.result.liBao){
              alert('恭喜获得'+res.result.liBao)
            }
            that.getHuiYuanKa()
          }else {
            that.msg=res.errorDesc
            that.popupVisible=true
          }

        }
      })
    },
    //获取会员卡信息
    getHuiYuanKa(){
      const that=this
      $.ajax({
        // url: '/api',
        url: kaUrl,
        dataType: "jsonp",
        jsonp:'callback',
        type: "post",
        data: {
          companyCode: that.companyCode,
          operationType: 'wxNewCard',
          openid:that.openid,
          xuYaoShengJiJiFen:'y'
        },
        success(res) {
          console.log(res);
          if(res.success){
            const data=res.result.cards
            if(data.length<=0){
              alert('您还不是会员')
            }else {
              that.kaList=data[0]
              that.jiFen=data[0].jiFen
              that.jiFenToLv=res.result.creditsNeeded
              that.showHuiyuan=true
              that.getData()
            }

          }

        }
      })
    },
    //获取是否签到
    getData(){
      const that=this;
      //先获取这两周的时间
      let lastWeekDate=[];
      let thisWeekDate=[];
      let lastWeek=[];
      let thisWeek=[];
      const hz=['一','二','三','四','五','六','日']
      const lastIndex=[7,6,5,4,3,2,1];
      const thisIndex=[0,-1,-2,-3,-4,-5,-6];
      //偷个懒两个一起写
      for(let i=0;i<lastIndex.length;i++){
        lastWeekDate.push(that.getTime(lastIndex[i]))
        thisWeekDate.push(that.getTime(thisIndex[i]))
      }

      // console.log(lastWeekDate)
      console.log(thisWeekDate)
      //获取当天日期
      let pad = function() {
        let tbl = [];
        return function(num, n) {
          let len = n-num.toString().length;
          if (len <= 0) return num;
          if (!tbl[len]) tbl[len] = (new Array(len+1)).join('0');
          return tbl[len] + num;
        }
      }();
      const myDate = new Date();     //获取当前年份(2位)
      const dayNow=myDate.getFullYear()+'-'+pad((myDate.getMonth()+1),2)+"-"+pad(myDate.getDate(),2);
      that.nowDate=dayNow
      // console.log(that.getTime(-12))
      // console.log(dayNow)
      //获取哪些是未到达的日期
      const nowIndex=thisWeekDate.indexOf(dayNow)
      that.nowDataIndex=nowIndex
      // console.log(nowIndex)
      for(let i=0;i<thisWeekDate.length;i++){
        let brBl=false
        if(i==nowIndex){
          brBl=true
        }
        if(i<=nowIndex){
          let son={
            week:hz[i],
            signIn:false,
            daoDa:true,
            date:thisWeekDate[i],
            br:brBl
          }
          thisWeek.push(son)
        }else {
          let son={
            week:hz[i],
            signIn:false,
            daoDa:false,
            date:thisWeekDate[i],
            br:brBl
          }
          thisWeek.push(son)
        }
      }
      console.log(thisWeek)

      $.ajax({
        // url: '/api',
        url: ajaxUrl,
        dataType: "jsonp",
        jsonp:'callback',
        type: "post",
        data: {
          companyCode: that.companyCode,
          operationType: 'wxQianDaoLogInService',
          openid:that.openid,
        },
        success(res) {
          console.log(res);
          if(res.success){
            that.showQd=true
            const data = res.result

            for(let i=0;i<thisWeekDate.length;i++){
              let sBl=false
              if(data.record.indexOf(thisWeekDate[i])!=-1){
                thisWeek[i].signIn=true
              }
              if(data.record.indexOf(lastWeekDate[i])!=-1){
               sBl=true
              }
              if(data.record.indexOf(dayNow)!=-1){
                that.dayNowBl=false
              }
              let son={
                week:hz[i],
                signIn:sBl,
                daoDa:true,
                date:lastWeekDate[i],
                br:false
              }
              lastWeek.push(son)
            }

            that.accumulative=data.leiJi
            that.continuous=data.lianXu
            that.lastWeek=lastWeek
            that.thisWeek=thisWeek
            that.smText=data.remark
            that.days=data.days
            console.log(lastWeek)
            console.log(thisWeek)
          }

        }
      })
    },
    //获取日期
    getTime(n) {
      let now = new Date();
      let year = now.getFullYear();
      //因为月份是从0开始的,所以获取这个月的月份数要加1才行
      let month = now.getMonth() + 1;
      let date = now.getDate();
      let day = now.getDay();
      // console.log(date);
      //判断是否为周日,如果不是的话,就让今天的day-1(例如星期二就是2-1)
      if (day !== 0) {
        n = n + (day - 1);
      } else {
        n = n + day;
      }
      if (day) {
        //这个判断是为了解决跨年的问题
        if (month > 1) {
          month = month;
        }
        //这个判断是为了解决跨年的问题,月份是从0开始的
        else {
          year = year - 1;
          month = 12;
        }
      }
      now.setDate(now.getDate() - n);
      year = now.getFullYear();
      month = now.getMonth() + 1;
      date = now.getDate();
      // console.log(n);
      let s = year + "-" + (month < 10 ? ('0' + month) : month) + "-" + (date < 10 ? ('0' + date) : date);
      return s;
      //上周的开始时间
      // console.log(getTime(7));
      //上周的结束时间
      // console.log(getTime(1));
      //本周的开始时间
      // console.log(getTime(0));
      //本周的结束时间
      // console.log(getTime(-6));
      //下周的开始时间
      // console.log(getTime(-7));
      //下周结束时间
      // console.log(getTime(-13));
    },
    //缓存cookie
    setCookie(key, value, iDay) {
      let oDate = new Date();
      oDate.setDate(oDate.getDate() + iDay);
      document.cookie = key + '=' + value + ';expires=' + oDate;

    },
    getCookie(key) {
      var cookieArr = document.cookie.split('; ');
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
  }
};
</script>

<style scoped>
  .loding{
    width: 100%;
    text-align: center;
    margin: 3rem auto;
  }
  .qiandao{
    /*height: 100%;*/
    width: 100%;
    /*background:linear-gradient(90deg,rgba(229,66,72,1) 0%,rgba(242,108,92,1) 100%);*/
    padding: 3.6rem 0.94rem 0;
    box-sizing: border-box;

  }
  /*中部*/
  .qiandao_text{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 2.6rem;
    color: #FFF;
    font-size: 0.88rem;
    font-weight:400;
    padding: 0 .8rem;
    box-sizing: border-box;
  }
  .qiandao_text span:first-child{
    font-size: 1.13rem;
  }
  /*头部*/
  .f_top{
    width:100%;
    height:7.5rem;
    background:rgba(255,255,255,1);
    box-shadow:0.06rem 0.13rem 0.25rem 0 rgba(164,164,164,0.5);
    border-radius:0.69rem;
    margin: 0 auto 1.2rem;
    /*display: flex;*/
    /*flex-direction: column;*/
    /*justify-content: space-between;*/
  }
  .user_top{
    position: relative;
    top:-2.3rem;
    height:5rem;
    width: 100%;
    /*text-align: right;*/
  }
  .user_touxian{
    position: relative;
    margin: 0 auto;
    text-align: center;
    height: 3.75rem;
    width: 3.75rem;
  }
  .huanguan{
    transform: rotate(30deg);
    display: inline-block;
    position: absolute;
    top:-1rem;
    right: -.65rem;
    z-index: 3;
  }
  .user_touxian .imgTou{
    height: 3.75rem;
    width: 3.75rem;
    z-index: 2;
  }
  .user_touxian span{
    position: absolute;
    bottom:-.45rem;
    left: 50%;
    margin-left: -2.5rem;
    display: inline-block;
    width:5rem;
    font-size: .7rem;
    color: #FFF;
    z-index: 10;
  }
  .user_touxian .imgCai{
    width:5rem;
    height:1.38rem;
    position: absolute;
    bottom:-.8rem;
    left: 50%;
    margin-left: -2.5rem;
    z-index: 9;
  }
  .user_top .progress{
    width: 30%;
    height: 2.3rem;
    /*background-color: #d13a3b;*/
    position: absolute;
    right: .8rem;
    bottom: .2rem;
  }
  .user_top .progress_lv{
    display: flex;
    align-items: center;
    height: 1.2rem;
    width: 100%;
    /*color: #efcfa7;*/
  }
  .user_top .progress_lv p{
    width:1.4rem;
    height:1.2rem;
    border-radius: .6rem;
    background:linear-gradient(90deg,rgba(158,198,169,1) 0%,rgba(128,173,139,1) 100%);
    text-align: center;
    line-height: 1.2rem;
    display: inline-block;
  }
  .user_top .progress_lv p i{
    color: #FFEA57;
    font-weight: 100;
  }
  .user_top .progress_lv span{
    width:100%;
    height:0.63rem;
    background:linear-gradient(90deg,rgba(158,198,169,1) 0%,rgba(128,173,139,1) 100%);
    border-radius:0 0.44rem 0.44rem 0;
    text-align: center;
    line-height: .63rem;
    font-size: 0.5rem;
    color: #FFF;
    overflow: hidden;
    position: relative;
    left: -0.1rem;
  }
  .progress_bottom{
    width: 100%;
    margin-top: .2rem;
  }
  .progress_length{
    width: 100%;
    height:0.38rem;
    background:rgba(227,235,229,1);
    border-radius:0.19rem;
  }
  .progress_length span{
    display: block;
    width: 40%;
    height:0.38rem;
    background:linear-gradient(90deg,rgba(158,198,169,1) 0%,rgba(128,173,139,1) 100%);
    border-radius:0.19rem;
    transition: width .4s;
  }
  .progress_bottom .progress_info{
    font-size: 0.31rem;
    display: block;
    width: 100%;
    text-align: right;
    color: #6A6A6C;
  }
  .user_info{
    width: 100%;
    position: relative;
    top:-2.3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1.2rem .9rem;
    box-sizing: border-box;
    font-size: 0.69rem;
    color: #6A6A6C;
    overflow: hidden;
  }
  .user_info i{
    color: #E7484B;
    margin-right: .3rem;
  }
  .user_info p{
    min-width: 7.5rem;
  }
/*这是图标  */
  @font-face {
    font-family: 'iconfont';  /* project id 1314785 */
    src: url('//at.alicdn.com/t/font_1314785_vwyoezw1zc.eot');
    src: url('//at.alicdn.com/t/font_1314785_vwyoezw1zc.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_1314785_vwyoezw1zc.woff2') format('woff2'),
    url('//at.alicdn.com/t/font_1314785_vwyoezw1zc.woff') format('woff'),
    url('//at.alicdn.com/t/font_1314785_vwyoezw1zc.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_1314785_vwyoezw1zc.svg#iconfont') format('svg');
  }
.iconfont{
  font-family:"iconfont" !important;
  font-size:16px;font-style:normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;}
/*.top {*/
/*  height: 9.4rem;*/
/*  display: flex;*/
/*  flex-direction: column;*/
/*  padding: 1rem;*/
/*  background: -moz-linear-gradient(to right, #e54248 0%, #f26c5c 100%);*/
/*  background: -webkit-linear-gradient(to right, #e54248 0%, #f26c5c 100%);*/
/*  background: -o-linear-gradient(to right, #e54248 0%, #f26c5c 100%);*/
/*  background: -ms-linear-gradient(to right, #e54248 0%, #f26c5c 100%);*/
/*  background: linear-gradient(to right, #e54248 0%, #f26c5c 100%);*/
/*}*/
.smText{
  margin-top: 1.3rem;
  font-size: 0.9rem;
  color: #FFF;
  padding: 0 2rem;
  box-sizing: border-box;
}
.alertTop{
  width: 100%;
  padding: 0 .3rem;
  border-radius: .2rem;
  font-size: 1rem;
  height: 2.5rem;
  background-color: rgba(0,0,0,0.5);
  text-align: center;
  line-height: 2.5rem;
  color: #FFF;
}
/*.top_top {*/
/*  display: flex;*/
/*  justify-content: space-between;*/
/*  align-items: center;*/
/*  !*color: #a0cce9;*!*/
/*}*/
/*.top_middle {*/
/*  display: flex;*/
/*  justify-content: space-between;*/
/*  !* align-items: center; *!*/
/*  margin-top: 1.5rem;*/
/*}*/
/*.middle_left {*/
/*  flex: 1;*/
/*  display: flex;*/
/*  justify-content: flex-start;*/
/*  align-items: center;*/
/*}*/
/*.middle_img {*/
/*  width: 4rem;*/
/*  height: 4rem;*/
/*  border-radius: 50%;*/
/*  background: #d8d8d8;*/
/*  margin-right: 0.8rem;*/
/*}*/
/*.middle_span {*/
/*  margin-top: 0.5rem;*/
/*  color: #fff;*/
/*}*/

/* 签到礼包 */
.center {
  width: 100%;
  margin: 0 auto;
  /*height: 15rem;*/
  background: #fff;
  border-radius: 1rem;
  padding-top: .7rem;
  /*position: relative;*/
  /*top: -3rem;*/
}
.center_top {
  display: flex;
  justify-content: space-around;
  width: 90%;
  height: 3rem;
   margin:.3rem auto;
  /*position: absolute;*/
  border-top-right-radius: 1rem;
  border-top-left-radius: 1rem;
  background: #F6F7FB;
  /*left: 1rem;*/
  /*top: 1rem;*/
}
.center_left {
  display: flex;
  justify-content: space-around;
  align-items: center;
  /*padding: 0.9rem;*/
  font-size: 0.9rem;
}
.progress2 {
  width: 7rem;
  height: 0.5rem;
  background: #efdbe1;
  border-radius: 2rem;
  margin-left: 0.3rem;
  margin-top: 0.3rem;
  position: relative;
}
 /*在这里改变进度条的长度,改变宽度即可 */
.progress2_right {
  /*width: 2.3rem;*/
  width: 100%;
  height: 0.5rem;
  position: absolute;
  background: linear-gradient(to right, #f2816a 0%, #f6545b 100%);
  top: 0;
  left: 0;
  border-radius: 2rem;
  transition: width 0.6s;
}

.center_middle {
  width: 100%;
  display: flex;
  flex-direction: column;
  box-shadow:1px 2px 4px 0 rgba(164,164,164,0.5);
  border-radius:0.69rem;
  background-color: #FFF;
}
.center_qiandao {
  display: flex;
  justify-content: center;
  align-items: center;
  margin:1.5rem 1.5rem 0 0;
}
.column{
  display:flex;
  flex-direction:column;
  align-items:center;

  /* 上周签到 */
}
.column>div{
  box-sizing: border-box;
  border-radius:50%;width:1.5rem;height:1.5rem;margin-left:1rem;
  line-height: 1.5rem;
}
.column>span{
  text-align: center;
  /*margin-left: 2rem;*/
  /*width: 1rem;*/
  font-size: 0.63rem;
  color: #B0B0B0;
}
.column_text{
  padding-left:0.7rem;
  margin-right: -0.4rem;
}
.column_text2{
  /*padding-left:0.3rem;*/
  /*position: relative;*/
  margin: 0 -0.7rem 0 0.3rem;
}
.btn{
  width:11.63rem;
  height:1.75rem;
  background:linear-gradient(90deg,rgba(229,66,72,1) 0%,rgba(242,108,92,1) 100%);
  border-radius:0.88rem;
  margin:  1rem auto 1.5rem;
  color: #FFF;
  text-align: center;
  font-size: 0.75rem;
  line-height: 1.75rem;
}
.btn2{
  width:11.63rem;
  height:1.75rem;
  background:linear-gradient(90deg, rgb(199, 199, 199) 0%, rgb(224, 224, 224) 100%);
  border-radius:0.88rem;
  margin:  1rem auto 1.5rem;
  color: #FFF;
  text-align: center;
  font-size: 0.75rem;
  line-height: 1.75rem;
}
  /*加载中图标动画*/
  .loader-inner {width: 100px;height: 60px;margin: 100px auto;position: relative;}
  .loader-line-wrap {
    -webkit-animation: spin 2000ms cubic-bezier(.175, .885, .32, 1.275) infinite;
    animation: spin 2000ms cubic-bezier(.175, .885, .32, 1.275) infinite;
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
  .loader-line-wrap:nth-child(1) { -webkit-animation-delay: -50ms; animation-delay: -50ms; }
  .loader-line-wrap:nth-child(2) { -webkit-animation-delay: -100ms; animation-delay: -100ms; }
  .loader-line-wrap:nth-child(3) { -webkit-animation-delay: -150ms; animation-delay: -150ms; }
  .loader-line-wrap:nth-child(4) { -webkit-animation-delay: -200ms; animation-delay: -200ms; }
  .loader-line-wrap:nth-child(5) { -webkit-animation-delay: -250ms; animation-delay: -250ms; }

  /*.loader-line-wrap:nth-child(1) .loader-line {*/
  /*  border-color: hsl(145, 63%, 42%);*/
  /*  height: 80px;*/
  /*  width: 80px;*/
  /*  top: 7px;*/
  /*}*/
  .loader-line-wrap:nth-child(2) .loader-line {
    /*border-color: hsl(60, 80%, 60%);*/
      border-color: hsl(145, 63%, 42%);
    height: 66px;
    width: 66px;
    top: 14px;
  }
  .loader-line-wrap:nth-child(3) .loader-line {
    /*border-color: hsl(28, 80%, 52%);*/
    border-color: hsl(60, 80%, 60%);
    height: 52px;
    width: 52px;
    top: 21px;
  }
  .loader-line-wrap:nth-child(4) .loader-line {
    border-color: hsl(145, 63%, 49%);
    height: 38px;
    width: 38px;
    top: 28px;
  }
  .loader-line-wrap:nth-child(5) .loader-line {
    border-color: hsl(48, 89%, 50%);
    height:24px;
    width: 24px;
    top: 35px;
  }
  @-webkit-keyframes spin {
    0%, 15% {
      -webkit-transform: rotate(0);
      transform: rotate(0);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes spin {
    0%, 15% {
      -webkit-transform: rotate(0);
      transform: rotate(0);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  marquee{
    color: #FFF;
    font-size: 40px;
  }
</style>

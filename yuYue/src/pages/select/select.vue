<template>
    <div>
        <div class="header">

            {{roomType=='餐饮预订'||roomType=='洗浴预订'?'':'预约'}}{{roomType}}
          <i class="iconfont lt" @click="$router.back()">&#xe7eb;</i>
        </div>
      <!-- 选择日期 -->
      <div class="main mainsbg" v-if="status==0">
        <ul class="ul-tab2">
          <li :class="{ on: dayindex==0 }" @click="daychecked(0,today)">
            <div>
              <p>{{today}}</p>
              今天
            </div>
          </li>
          <li :class="{ on: dayindex==1 }" @click="daychecked(1,tomorrow)">
            <div>
              <p>{{tomorrow}}</p>
              明天
            </div>
          </li>
          <li :class="{ on: dayindex==2 }" @click="daychecked(2,afterday)">
            <div>
              <p>{{afterday}}</p>
              后天
            </div>
          </li>
        </ul>
        <div class="m-item-time">
          <div class="time" :class="{on:timeindex==0}" @click="onclicktime(0)">
            <i class="icon iconfont icon-taiyang"></i><span>00:00-17:30</span>
          </div>
          <div class="time" :class="{on:timeindex==1}" @click="onclicktime(1)">
            <i class="icon iconfont icon-yueliang"></i><span>18:00-23:30</span>
          </div>
        </div>
        <div v-if="dayindex==0">
          <div class="m-check" role="checkbox" v-if="timeindex==0">
            <label @click="timechecked(item.id,item.time)"
                   :class="{ checked: item.id==timeindex2,disable:item.id<disableid }"
                   v-for="(item,index) in daytimelist">
              <input type="checkbox">
              <span>{{item.time}}</span>
            </label>
          </div>
          <div class="m-check" role="checkbox" v-if="timeindex==1">
            <label @click="timechecked(item.id,item.time)"
                   :class="{ checked: item.id==timeindex2,disable:item.id<disableid }"
                   v-for="(item,index) in nighttimelist">
              <input type="checkbox">
              <span>{{item.time}}</span>
            </label>
          </div>
        </div>
        <div v-else>
          <div class="m-check" role="checkbox" v-if="timeindex==0">
            <label @click="timechecked(item.id,item.time)" :class="{ checked: item.id==timeindex2 }"
                   v-for="(item,index) in daytimelist">
              <input type="checkbox">
              <span>{{item.time}}</span>
            </label>
          </div>
          <div class="m-check" role="checkbox" v-if="timeindex==1">
            <label @click="timechecked(item.id,item.time)" :class="{ checked: item.id==timeindex2 }"
                   v-for="(item,index) in nighttimelist">
              <input type="checkbox">
              <span>{{item.time}}</span>
            </label>
          </div>
        </div>
        <div class="g-a1" @click="checkedok(1)">确认选择</div>
      </div>
      <!--预约信息-->
      <div v-if="status==1" class="main">
        <div class="roomInfo">
           <span style="margin-left: 5px;font-size: 13px">
             {{roomType=='餐饮预订'||roomType=='洗浴预订'?'人数':'房号'}}:{{roomId}}
           </span>
          <span style="margin-left: 5px;font-size: 13px">
             类型:{{roomType}}
          </span>
          <span style="margin-left: 5px;color: #828282">
            预约时间:{{datatimes}}
          </span>
        </div>
<!--        <div class="m-yuyue">-->
<!--          <div class="wp">-->
<!--            <div class="con" v-for="item in mes">-->
<!--              <a href="javascript:(0)">-->
<!--                <div class="pic">-->
<!--&lt;!&ndash;                  <img :src="userinfo.imgUrl" alt="">&ndash;&gt;-->
<!--                </div>-->
<!--                <div class="txt">-->
<!--                  <h3>{{userinfo.userName}}-{{techId}}号</h3>-->
<!--                  <p>{{item.menuName}} <span>￥{{item.price}}/{{item.shiJian}}分钟</span></p>-->
<!--                </div>-->
<!--              </a>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->

        <div class="m-txt">
          <div class="wp">
            预约信息
          </div>
        </div>
        <div class="m-txt">
          <div class="wp">
            姓名
            <input type="text" style="margin-left: 10px" v-model="name">
          </div>
        </div>
        <div class="m-txt">
          <div class="wp">
            电话
            <input type="number" style="margin-left: 10px" v-model="telephoneNumber">
          </div>
        </div>
<!--        <div class="m-txt">-->
<!--          <div class="wp" >-->
<!--            会员卡: {{hyk}}-->
<!--          </div>-->
<!--        </div>-->
<!--        <ul class="hyk" :class="{hykOn:showHyk}">-->
<!--          <li>{{item}}</li>-->
<!--        </ul>-->
        <div class="kong"></div>
      </div>
      <div v-if="status==1"  class="g-a1"  @click="showHyk=!showHyk">立即预约￥{{price3}}</div>

      <div class="tc" v-if="showHyk">
        <div class="title">请选择会员卡</div>
        <ul>
          <li  v-for="(item,index) in cards" :class="{liOn:item==hyk}" @click="selectHyk(item)">{{item}}</li>
        </ul>
        <div class="btn">
          <div class="qr" @click="sub">确认</div>
          <div class="qx" @click="showHyk=!showHyk">取消</div>
        </div>
      </div>
      <div class="kong"></div>
    </div>

</template>

<script>
  // const ajaxUrl='http://intereek.natapp1.cc/pangu/xcx.do'
  const ajaxUrl="http://www.intereek.com/pangu/xcx.do"
  function getDateStr(dayCount) {
    if (null == dayCount) {
      dayCount = 0;
    }
    var dd = new Date();
    dd.setDate(dd.getDate() + dayCount);//设置日期
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1;//获取当前月份的日期
    var d = dd.getDate();
    return m + "-" + d;
  }
    // import layer from '../../layer/layer'
    export default {
      data(){
        return{
          price1:0,
          price2:0,
          endTime:[],
          name:'',
          telephoneNumber:'',
          roomId:0,
          techId: 0,
          companyCode: '',
          list: [],
          status: 0,
          length: 0,
          today: '',
          tomorrow: '',
          afterday: '',
          dayindex: 0,
          timeindex: 0,
          timeindex2: -1,
          disableid: 0,
          companyName: '',
          contprice: 0,
          nighttimelist: [{
            time: '18:00', checked: false, id: 37,
          }, {
            time: '18:30', checked: false, id: 38,
          }, {
            time: '19:00', checked: false, id: 39,
          }, {
            time: '19:30', checked: false, id: 40,
          }, {
            time: '20:00', checked: false, id: 41,
          }, {
            time: '20:30', checked: false, id: 42,
          }, {
            time: '21:00', checked: false, id: 43,
          }, {
            time: '21:30', checked: false, id: 44,
          }, {
            time: '22:00', checked: false, id: 45,
          }, {
            time: '22:30', checked: false, id: 46,
          }, {
            time: '23:00', checked: false, id: 47,
          }, {
            time: '23:30', checked: false, id: 48,
          }],
          daytimelist: [{
            time: '00:00', checked: false, id: 1,
          }, {
            time: '00:30', checked: false, id: 2,
          }, {
            time: '01:00', checked: false, id: 3,
          }, {
            time: '01:30', checked: false, id: 4,
          }, {
            time: '02:00', checked: false, id: 5,
          }, {
            time: '02:30', checked: false, id: 6,
          }, {
            time: '03:00', checked: false, id: 7,
          }, {
            time: '03:30', checked: false, id: 8,
          }, {
            time: '04:00', checked: false, id: 9,
          }, {
            time: '04:30', checked: false, id: 10,
          }, {
            time: '05:00', checked: false, id: 11,
          }, {
            time: '05:30', checked: false, id: 12,
          }, {
            time: '06:00', checked: false, id: 13,
          }, {
            time: '06:30', checked: false, id: 14,
          }, {
            time: '07:00', checked: false, id: 15,
          }, {
            time: '07:30', checked: false, id: 16,
          }, {
            time: '08:00', checked: false, id: 17,
          }, {
            time: '08:30', checked: false, id: 18,
          }, {
            time: '09:00', checked: false, id: 19,
          }, {
            time: '09:30', checked: false, id: 20,
          }, {
            time: '10:00', checked: false, id: 21,
          }, {
            time: '10:30', checked: false, id: 22,
          }, {
            time: '11:00', checked: false, id: 23,
          }, {
            time: '11:30', checked: false, id: 24,
          }, {
            time: '12:00', checked: false, id: 25,
          }, {
            time: '12:30', checked: false, id: 26,
          }, {
            time: '13:00', checked: false, id: 27,
          }, {
            time: '13:30', checked: false, id: 28,
          }, {
            time: '14:00', checked: false, id: 29,
          }, {
            time: '14:30', checked: false, id: 30,
          }, {
            time: '15:00', checked: false, id: 31,
          }, {
            time: '15:30', checked: false, id: 32,
          }, {
            time: '16:00', checked: false, id: 33,
          }, {
            time: '16:30', checked: false, id: 34,
          }, {
            time: '17:00', checked: false, id: 35,
          }, {
            time: '17:30', checked: false, id: 36,
          }],
          menus: [],
          datatimes: '',
          day: '',
          info: [],
          userinfo: [],
          year: '',
          openid: '',
          mes:[],
          roomType:'',
          showHyk:false,
          hyk:'',
          quans:[],
          cards:[],
          priceList:[]
        }
      },

      computed:{
        price3(){
          const that=this
          const priceList=that.priceList
          let times1=that.datatimes.split(' ')
          let time2=times1[1].split(':')
          let time3=[]
          for(let i=0;i<time2.length;i++){
            time3.push(parseInt(time2[i]))
          }
          let price=0
          // if(endTime[0]>time3[0]){
          //   price=that.price1
          // }else if(endTime[0]==time3[0]&&endTime[1]>time3[1]){
          //   price=that.price1
          // }else {
          //   price=that.price2
          // }
          if(that.roomType=='洗浴预订'){
            for(let i=0;i<priceList.length;i++){
              if(priceList[i].startTime[0]<=time3[0]&&priceList[i].endTime[0]>time3[0]){
                price=priceList[i].price
                return price*that.roomId
              }else if(priceList[i].startTime[0]==time3[0]||priceList[i].endTime[0]==time3[0]){
                if(priceList[i].startTime[1]<=time3[1]&&priceList[i].endTime[1]>time3[1]){
                  price=priceList[i].price
                  return price*that.roomId
                }
              }
            }
            return price*that.roomId
          }else {
            for(let i=0;i<priceList.length;i++){
              if(priceList[i].startTime[0]<=time3[0]&&priceList[i].endTime[0]>time3[0]){
                price=priceList[i].price
                return price
              }else if(priceList[i].startTime[0]==time3[0]||priceList[i].endTime[0]==time3[0]){
                if(priceList[i].startTime[1]<=time3[1]&&priceList[i].endTime[1]>time3[1]){
                  price=priceList[i].price
                  return price
                }
              }
            }
            return price
          }


        },

      },

      mounted() {
        const that=this
        that.companyCode = that.queryString('companyCode')
        that.openid = that.queryString('openid')
        console.log(that.$route.params)
        that.roomId=that.$route.params.id
        that.roomType=that.$route.params.type

        that.priceList=that.$route.params.priceList


        // console.log(that.priceList)

        that.getdate()
        that.getQuans()
        // const _t = encodeURI(encodeURI('付'))
        const name = decodeURI(decodeURI(that.queryString('cardName')))
        const cn=that.queryString('cardName')
        // const name = decodeURI(decodeURI(_t))
        // console.log(_t)
        if(cn==null||cn ==''||cn==undefined){
          that.name=''
        }else {
          that.name=name

        }
        that.telephoneNumber = that.queryString('cardPhone')
      },
      methods:{
        selectHyk(item){
          this.hyk=item
          // this.showHyk=false
        },
        getQuans(){
          const that=this
          $.ajax({
            type: "post",
            url:ajaxUrl,
            dataType: "jsonp",
            data: {
              companyCode: that.companyCode,
              openid:that.openid,
              operationType:'wxNewCard'
            },
            success: function (data) {
              console.log(data)
              // console.log(data.result.cards)
              // console.log('1')
              // console.log(data.result.quans)
              const cards=data.result.cards
              const quans=data.result.quans
              let cardList=[]
              let quanList=[]
              for (let i=0;i<cards.length;i++){
                cardList.push(cards[i].cardNo)
              }
              for (let i=0;i<quans.length;i++){
                quanList.push(quans[i].cardNo)
              }
              console.log('卡信息2')
              console.log(cardList)
              console.log(quanList)
              that.cards=cardList
              that.quans=quanList
              that.hyk=cardList[0]
            },
            error:function (err) {
              console.log(err);
              console.log('获取失败')
            }
          });
        },
        sub() {
          const that = this;

          // console.log(price)
            if(that.roomType=='餐饮预订'||that.roomType=='洗浴预订'){
              let price=that.price3
              console.log('cs1')

              $.ajax({
                type: "POST",
                url: ajaxUrl,
                dataType: "jsonp",
                // data: "name=garfield&age=18",
                data: {
                  operationType: 'queryLocal',
                  queryType: 'CanYinYuDing',
                  companyCode: that.companyCode,
                  yuYueDate: that.datatimes,
                  openid:that.openid,
                  yuYueLeiXing:that.roomType,
                  number:that.roomId,
                  name:that.name,
                  tableNo:" ",
                  telephoneNumber:that.telephoneNumber,
                  cardNo:that.hyk,
                  money:price,
                  quans:that.quans
                },
                success: function (data) {
                  if (data.success) {
                    that.$layer.msg('预约成功');
                    // layer.msg('预约成功');

                    console.log(data)
                  } else {
                    that.$layer.msg(data.errorDesc)

                    console.log('2')
                  }
                }
              });
            }else {
              console.log('cs2')
              console.log(that.quans)

              $.ajax({
                type: "POST",
                url: ajaxUrl,
                dataType: "jsonp",
                // data: "name=garfield&age=18",
                data: {
                  operationType: 'queryLocal',
                  queryType: 'YuYueBaoXiang',
                  companyCode: that.companyCode,
                  yuYueDate: that.datatimes,
                  openid:that.openid,
                  roomType:that.roomType,
                  roomNo:that.roomId,
                  name:that.name,
                  telephoneNumber:that.telephoneNumber,
                  cardNo:that.hyk,
                  money:that.price3,
                  quans:that.quans
                },
                success: function (data) {
                  if (data.success) {
                    that.$layer.msg('预约成功');
                    // layer.msg('预约成功');

                    console.log(data)
                  } else {
                    that.$layer.msg(data.errorDesc)

                    console.log('2')
                  }
                }
              });
            }
          that.showHyk=false


        },
        daychecked(e, day) {
          this.dayindex = e
          this.day = day
          if (e == 0 && this.timeindex2 < this.disableid) {
            this.timeindex2 = -1
          }
        },
        onclicktime(e) {
          this.timeindex = e
        },
        timechecked(e, time) {
          if (this.dayindex == 0 && e < this.disableid) {
            return
          } else {
            this.timeindex2 = e
            this.datatimes = this.year + '-' + this.day + ' ' + time + ':00'
            console.log(this.datatimes)
          }

        },
        getdate() {
          this.today = getDateStr(0)
          this.tomorrow = getDateStr(1)
          this.afterday = getDateStr(2)
          this.year = new Date().getFullYear();
          this.hour = new Date().getHours()
          this.min = new Date().getMinutes()
          this.day = this.today
          console.log(this.hour, this.min)
          if (this.min > 30) {
            this.disableid = this.hour * 2 + 3
          } else {
            this.disableid = this.hour * 2 + 2
          }
        },
        getmenus() {
          var that = this;
          var list = that.list
          var list3 = []
          var list4 = []
          var contprice = 0
          for (var i = 0; i < list.length; i++) {
            if (list[i].checked) {
              let ls = {
                menuName: list[i].menuName,
                price: list[i].price,
                shiJian: list[i].shiJian
              }
              list4.push(ls)
            }
          }
          that.mes = list4
          console.log(that.mes)
          for (var i = 0; i < list.length; i++) {
            if (list[i].checked) {
              let list2 =list[i].menuName
              //var list3 = [list[i].menuName]
              contprice += list[i].price
              list3.push(list2)
            }
            that.contprice = contprice

          }
          that.menus = list3
          console.log(that.menus)
        },
        checkedok(e) {
          const that=this
          // if (this.length == 0) {
          //   layer.msg('还没有选择服务', function () {
          //     return false
          //   });
          //   return false
          // } else {
          //
          // }
          if (e == 1) {
            if (that.timeindex2 == -1) {
              // console.log('asdsafas')
              that.$layer.msg('请选择时间');
              return false
            }
          }
          console.log(that.price3)
          that.status = e
        },
        queryString(name) {
          var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
          var r = window.location.search.substr(1).match(reg);
          if (r != null) return unescape(r[2]);
          return null;
        },
      },
      filters: {
        filtersImg: function (img) {
          var imgs = ajaxUrl + '/' + img
          console.log(imgs)
          return imgs;
        },
        filtersNav: function (e) {
          var s = parseInt(e) + 1;
          var img = 'image/nav-' + s + '.png'
          return img;
        }
      }
    }
</script>

<style scoped>
  .kong{
    width: 100%;
    height: 60px;
  }
  .tc{
    position: fixed;
    z-index: 1;
    width: 300px;
    height: 240px;
    overflow: hidden;
    background-color: #c5c5c5;
    top: 50%;
    left: 50%;
    margin-left: -150px;
    margin-top: -100px;
    padding: 10px;
  }
  .tc .title{
    text-align: center;

  }
  .tc ul{
    width: 280px;
    height: 150px;
    /*overflow-y: auto;*/
    background-color: #f8f8f8;
    overflow-y: scroll;
    padding-left: 5px;
    padding-right: 5px;
    margin-top: 10px;
  }
  .tc ul li{
    width: 100%;
    height: 30px;
    font-size: 16px;
    border-bottom: 1px solid #c7c7c7;
    text-align: center;
  }
  .tc ul .liOn{
    background-color: #0984e3;
  }
  .tc .btn{
    height: 30px;
    box-sizing: border-box;
    margin-top: 10px;
    background-color: #c5c5c5;
  }
  .tc .btn div{
    width: 120px;
    height: 30px;
    text-align: center;
    line-height: 30px;
  }
  .tc .btn .qr{
    float: left;
    background-color: #539fff;

  }
  .tc .btn .qx{
    float: right;
    background-color: #6c6c6c;
  }
  .hyk{
    width: 100%;
    /*height: 300px;*/
    /*background-color: #888888;*/
    padding-left: 5px;
    padding-right: 5px;
    position: relative;
    top: -10px;
    opacity: 0;
    transition: opacity 0.4s;
    left: -10000px;
  }
  .hykOn{
    opacity: 1;
    left: 0;
  }
  .hyk .liOn{
    background-color: #0984e3;
  }
  .hyk li{
    height: 30px;
    width: 100%;
    border-bottom: 1px solid #f5f6fd;
    text-align: center;
    line-height: 30px;
    color: white;
    background-color: #74b9ff;
  }
  .kong{
    width: 100%;
    height: 120px;
  }
  /*@import "../../layer/layer.css";*/
  .roomInfo{
    width: 96%;
    height: 60px;
    margin: 10px auto;
    background-color: #ffffff;
    border-radius: 40px;
    line-height: 60px;
    text-align: center;
    border: 1px solid #e8e8e8;
  }
  .roomInfo span{
    display: inline-block;
    font-size: 10px;
    color: #373737;
  }
  @font-face {
    font-family: 'iconfont';  /* project id 1176823 */
    src: url('//at.alicdn.com/t/font_1176823_dj0zchoq545.eot');
    src: url('//at.alicdn.com/t/font_1176823_dj0zchoq545.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_1176823_dj0zchoq545.woff2') format('woff2'),
    url('//at.alicdn.com/t/font_1176823_dj0zchoq545.woff') format('woff'),
    url('//at.alicdn.com/t/font_1176823_dj0zchoq545.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_1176823_dj0zchoq545.svg#iconfont') format('svg');
  }
  .iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;}
  .lt{
    float: left;

  }
  .header{
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    color: #ffffff;
    border-bottom: 1px solid #d6d6d6;
    background-color: #1B9CFC;
    text-align: center;
  }

  *,:after,:before{margin:0;padding:0;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;outline:0!important;-webkit-tap-highlight-color:rgba(255,255,255,0);-webkit-tap-highlight-color:transparent;-webkit-text-size-adjust:100%;-webkit-font-smoothing:antialiased;font-smoothing:antialiased}
  body,html{margin:0 auto;max-width:750px}
  body{color:#333;font-size:14px;line-height:1.5;font-family:'Microsoft Yahei',"PingFang SC","Helvetica Neue",Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;max-width:750px;margin:0 auto;background-color:#fff}
  img{max-width:100%;border:none}
  input,select,textarea{font-size:14px;color:#333;font-family:'Microsoft Yahei',"PingFang SC","Helvetica Neue",Helvetica,Arial,sans-serif;border:none}
  input[type=button],input[type=checkbox],input[type=radio],input[type=reset],input[type=submit],select{-webkit-appearance:none;-moz-appearance:none;appearance:none}
  ::-webkit-input-placeholder{color:#aaa}
  ::-moz-placeholder{color:#aaa}
  ::-ms-input-placeholder{color:#aaa}
  select::-ms-expand{display:none}
  a{color:#333;text-decoration:none}
  a:hover{color:#ff4b59}
  ul{list-style:none}
  .fix{*zoom:1}
  .fix:after,.fix:before{display:block;content:"";height:0;clear:both}
  table{border-collapse:collapse;border-spacing:0}
  .c{clear:both}
  .col-l{float:left}
  .col-r{float:right}
  em{font-style:normal}
  .wp{margin:0 18px}
  .wp2{margin:0 15px}
  .h45{height:45px;clear:both;overflow:hidden}
  .footer{height:50px;position:fixed;left:0;bottom:0;width:100%;box-shadow:0 -5px 10px 0 rgba(137,148,143,.1);overflow:hidden;background-color:#fff;padding-top:5px;z-index:99}
  .footer ul li{float:left;width:20%;text-align:center}
  .footer ul li a{font-size:12px;color:#b2b2b2}
  .footer ul li i{display:block;width:23px;height:21px;margin:0 auto 1px;font-style:normal;background-size:cover;background-position:center center}
  .footer ul li.on a{color:#539fff}
  .footer ul .li1.on i{background-image:url(../../images/j-i1h.png)!important}
  .footer ul .li2.on i{background-image:url(../../images/j-i2h.png)!important}
  .footer ul .li3.on i{background-image:url(../../images/j-i3h.png)!important}
  .footer ul .li4.on i{background-image:url(../../images/j-i4h.png)!important}
  .footer ul .li5.on i{background-image:url(../../images/j-i5h.png)!important}
  #win03 .inner .form3 label.checked span i,#win06 .item-t1 .i2,#win3 .ul-h3 li.on a i,#win49 .inner-49 .bom a i,#win50 .m-50 li .o em,.footer ul li .i1,.footer ul li .i2,.footer ul li .i3,.footer ul li .i4,.footer ul li .i5,.footer ul li.on .i1,
  .footer ul li.on .i2,.footer ul li.on .i4,.footer ul li.on .i5,.g-hs1 p i,.g-radio1 .bom .con label i,.g-radio1 .bom .con label input:checked+i,.header .hdl a,.header .hdr,.header.fixed .hdl a,
  .header.fixed .hdr,.header.header2 .hdl a,.header.header2 .hdr,.header2 .menuBtn,.header2.fixed .menuBtn,.hs-so1 i,.js-top,.m-16 p span i,.m-19 .con .top .r .a1 i,.m-19 .con .top .r .a2 i,
  .m-19 .text .add .pic,.m-19 .text2 .box .bom a em,.m-19 .text2 .box .bom a i,.m-19s1 .r i,.m-32 .con2 .i1,.m-32 .con2 .i2,.m-32 .m-19 .con .top .box .sex,.m-32 .m-19 .con .top .box i,.m-32 .m-19 .con .top .txt h3 i,
  .m-32 .text .i-32 .i-1,.m-32 .text .i-32 .i-2,.m-32 .text .i-32 .i-3,.m-40 .item1 .top h3 i,.m-40 .item2 .bom label input:checked+.box em,.m-40 .item2 .top a i,.m-h1 .pic,.m-h1 .txt .r em,.m-h21 .m-hs3 .item.hs .r label .s1,
  .m-h21 .m-hs3 .item.hs .r label .s2,.m-h21 .t2 .pic i,.m-h21-z .a-view i,.m-hs02 .inp i,.m-hs02 .tab .top a i,.m-hs03 .con2 label i,.m-hs03 .con2 label.checked i,.m-hs21 p i,.m-hs3 .form .con i,.m-hs3 .form .item .r em,
  .m-info-z1 .a-more-z1:after,.m-info-z1 .item a em,.m-info-z1 .item i,.m-mycenter .info .head .sex,.m-pop .close,.m-pop .close2,.m-pop .form-34 label input:checked+span em,.m-pop .inner .form2 label input:checked+span i,
  .m-pop .item-t1 .i-31,.m-pop .item-t1 i,.m-so .bom .r,.m-so .bom ul li i,.m-so .top .box .sel i,.menuBtn,.row1 .tit em,.row1 .tit i,.row1 .tit.on i,.row1 dd a i,.top-h1 i,.ul-31 li .pic .i1,.ul-31 li .pic .i2,.ul-31 li .txt .bom a.a1,
  .ul-31 li .txt .t h3 i.i2,.ul-31 li .txt .t h3 i.i3,.ul-38 li i.i1,.ul-38 li i.i2,.ul-41 li .pic,.ul-41-z li .pic.pic2,.ul-41-z li .pic.pic3,.ul-41-z li .pic.pic4,.ul-41-z li .pic.pic5,.ul-h3 li a i,.ul-h3 li.on a i,.ul-h35 li a i,
  .ul-h4 li .i1,.ul-h4 li .i2,.ul-h4 li .i3,.ul-h41 a .i1,.ul-h5 li a i,.ul-hs1 li .s1,.ul-hs1 li .s2,.ul-hs1 li .s3,.ul-hs1 li .s4,.ul-hs35 li .txt .bom i,.ul-hs41 .top .r a,.ul-list-z1 li i{background-repeat:no-repeat;-webkit-background-size:404px auto;-moz-background-size:404px auto;-ms-background-size:404px auto;-o-background-size:404px auto;background-size:404px auto}
  .bgclass{background-color:#f5f6fd}
  .slick-z1 .item img{display:block;width:100%}
  .slick-z1{overflow:hidden;position:relative;z-index:-1}
  .slick-z1 .slick-dots{position:absolute;left:0;width:100%;text-align:left;bottom:29px;padding-left:139px}
  .slick-z1 .slick-dots li{position:relative;overflow:hidden;display:inline-block;width:5px;height:5px;background-color:#f1f2f2;border-radius:50%;margin:0 4px}
  .slick-z1 .slick-dots li button{position:absolute;left:-9999px}
  .slick-z1 .slick-dots li.slick-active{width:10px;border-radius:5px}
  .m-bg1{height:70px;position:relative;background-color:#fff;margin-bottom:10px}
  .m-info1{position:absolute;top:-30px;left:50%;width:86%;overflow:hidden;border-radius:5px;background-color:#fff;box-sizing:content-box;padding:11px;z-index:10;box-shadow:0 3px 3px #f5f6fd;-webkit-transform:translateX(-50%);-moz-transform:translateX(-50%);-ms-transform:translateX(-50%);-o-transform:translateX(-50%);transform:translateX(-50%)}
  .m-info1 .pic{width:61px;height:61px;float:left;overflow:hidden;border-radius:5px;margin-right:10px}
  .m-info1 .pic img{display:block;width:100%;height:100%}
  .m-info1 .txt{overflow:hidden;padding-top:5px}
  .m-info1 .txt h3{font-size:12px;color:#333;line-height:1.1;font-weight:400;margin-bottom:3px}
  .m-info1 .txt .start-tel{overflow:hidden;color:#999;font-size:12px;margin-bottom:3px}
  .m-info1 .txt .m-start{float:left}
  .m-info1 .txt .tel{overflow:hidden;width:19px;height:19px;background:url(../../images/j-p5.png) right center no-repeat;float:right;position:relative;background-size:19px 19px;padding-left:25px;box-sizing:content-box;margin-right:13px}
  .m-info1 .txt .tel:after{position:absolute;content:'';left:0;top:50%;margin-top:-8px;width:1px;height:16px;background-color:#f0f0f0}
  .m-start span{display:inline-block;width:10px;height:10px;background:url(../../images/j-p2.png) center center no-repeat;background-size:cover}
  .m-start span.s-off{background-image:url(../../images/j-p3.png)}
  .m-info1 .txt .address{font-size:12px;color:#666;line-height:1.1;background:url(../../images/j-p4.png) left center no-repeat;background-size:11px 13px;padding-left:17px}
  .ul-list-z1{overflow:hidden;list-style:none;padding:17px 0 2px}
  .ul-list-z1 li{width:20%;float:left;text-align:center;margin-bottom:15px}
  .ul-list-z1 li a{font-size:12px;color:#444}
  .ul-list-z1 li i{display:block;width:45px;height:45px;margin:0 auto 3px;border-radius:50%;overflow:hidden;box-shadow:0 3px 5px #eee}
  .ul-list-z1 li i img{display:block;width:100%;height:100%}
  .row-a1{margin-bottom:10px;background-color:#fff}
  .row-a2{padding-top:10px;background-color:#fff}
  .m-tit01{height:16px;line-height:16px;overflow:hidden}
  .m-tit01 h3{line-height:1.1;font-size:14px;background:url(../../images/j-p6.png) left center no-repeat;background-size:13px 16px;padding-left:16px}
  .m-tit01 a{float:right;font-size:12px;color:#999}
  .ul-list-z2{overflow:hidden;margin:35px -5px 0}
  .ul-list-z2 li{float:left;width:50%;padding:0 5px;margin-bottom:10px}
  .ul-list-z2 li .pic{position:relative;padding-top:91%;margin-bottom:9px}
  .ul-list-z2 li .pic img{position:absolute;top:0;left:0;width:100%;height:100%}
  .ul-list-z2 li .pic p{position:absolute;width:39px;height:16px;line-height:16px;text-align:center;top:10px;right:9px;font-size:12px;color:#fff;z-index:5;border-radius:9px;background-color:#539fff}
  .ul-list-z2 li .pic .info{position:absolute;bottom:0;left:0;height:54px;width:100%;font-size:12px;color:#fff;padding:28px 10px 0;background:url(../../images/j-p7.png) center center no-repeat;background-size:cover}
  .ul-list-z2 li .info span{float:left}
  .ul-list-z2 li .info .m-start{float:right;padding-top:4px}
  .ul-list-z2 li .txt{height:12px;line-height:12px;font-size:12px;overflow:hidden;color:#999}
  .ul-list-z2 li .txt span{float:right}
  .h60{width:100%;height:60px}
  .m-box-z1{margin-top:15px}
  .m-box-z1 .item{background-color:#fff;overflow:hidden;margin-bottom:10px;padding:18px 15px;border-radius:3px;box-shadow:0 0 5px #ddd}
  .m-box-z1 .item .pic{float:left;border-radius:50%;width:51px;height:51px;overflow:hidden;margin-right:12px}
  .m-box-z1 .item .pic img{display:block;width:100%;height:100%}
  .m-box-z1 .item .txt{overflow:hidden}
  .m-box-z1 .item .txt .tit{overflow:hidden;height:16px;line-height:16px;margin-bottom:6px}
  .m-box-z1 .item .txt h3{float:left;line-height:1.1}
  .m-box-z1 .item .txt h3 a{font-size:15px;color:#333}
  .m-box-z1 .item .txt .tag{float:right}
  .m-box-z1 .item .txt .tag.green{color:#22dba9}
  .m-box-z1 .item .txt .tag.blue{color:#539fff}
  .m-box-z1 .item .txt p{font-size:14px;color:#333;margin-bottom:12px}
  .m-box-z1 .item .txt p span{float:right;color:#f63434;font-size:12px}
  .m-box-z1 .item .txt .a-grop{text-align:right;font-size:0}
  .m-box-z1 .item .txt .a-grop a{display:inline-block;width:60px;height:23px;text-align:center;line-height:22px;border:1px solid #ddd;border-radius:3px;font-size:12px;margin-left:10px}
  .m-box-z1 .item .txt .a-grop a.a2{color:#539fff;border-color:#539fff}
  .m-txt{font-size:15px;color:#666;height:46px;line-height:46px;background-color:#fff;margin-bottom:10px;border-top:1px solid #f5f6fd}
  .m-txt span{float:right}
  .m-txt .s2{color:#ff3434}
  .m-yuyue{overflow:hidden;padding:15px 10px 20px;background-color:#fff}
  .m-yuyue .pic{float:left;width:51px;height:51px;overflow:hidden;margin-right:12px;border-radius:50%}
  .m-yuyue .pic img{display:block;width:100%;height:100%}
  .m-yuyue .txt{overflow:hidden}
  .m-yuyue .txt h3,.m-yuyue .txt p{font-size:15px;color:#333}
  .m-yuyue .txt p span{font-size:13px;color:#f63434}
  .m-yuyue .con{padding:20px 10px 25px;background:url(../../images/j-p9.png) right 10px center no-repeat;background-size:5px 10px;box-shadow:0 0 10px #ddd;border-radius:5px}
  .g-a1{position:fixed;bottom:0;left:0;width:100%;height:50px;line-height:50px;text-align:center;font-size:14px;color:#fff;background-color:#539fff}
  .ul-tab1{float:left;height:100%;border-top:1px solid #eee;border-right:1px solid #eee;overflow-y:scroll;background-color:#f8f8f8}
  .ul-tab1 li a{display:block;width:84px;height:42px;line-height:41px;text-align:center;border-left:3px solid #f8f8f8;border-bottom:1px solid #eee}
  .ul-tab1 li.on a{background-color:#fff;color:#539fff;border-color:#539fff #539fff #fff}
  .tab-wrap{height:calc(100vh - 50px)}
  .m-select-item{overflow:hidden;height:100%;background-color:#fff;overflow-y:scroll}
  .m-select-item .line{padding:10px;border-bottom:1px solid #eee;position:relative;overflow:hidden}
  .m-select-item .pic{float:left;width:50px;height:5px;border-radius:5px;margin-right:14px}
  .m-select-item .txt{overflow:hidden}
  .m-select-item .txt h3{font-size:13px;color:#333;line-height:2.1;margin-bottom:2px}
  .m-select-item .txt p{font-size:12px;color:#999;line-height:2.1}
  .m-select-item .txt span{font-size:12px;color:#333;line-height:1.1}
  .m-select-item .line label{position:absolute;right:10px;top:50%;margin-top:-8px;display:inline-block;width:16px;height:16px;background:url(../../images/j-p11.png) center center no-repeat;background-size:16px 16px;overflow:hidden}
  .m-select-item .line label.checked{background-image:url(../../images/j-p12.png)}
  .m-select-item .line label input{position:absolute;left:-9999px}
  .m-select-item .txt h3.on{color:#539fff}
  .ul-tab2{text-align:center;font-size:0;border-top:1px solid #f0f0f0}
  .ul-tab2 li{font-size:0;display:inline-block;height:54px;line-height:54px;width:33%}
  .ul-tab2 li div{font-size:14px;display:inline-block;vertical-align:middle;width:95px;height:38px;line-height:1.1;padding-top:4px}
  .ul-tab2 li:nth-child(2) div{border-left:1px solid #f0f0f0;border-right:1px solid #f0f0f0}
  .ul-tab2 li.on div{color:#fff;border-radius:19px;background-color:#539fff}
  .m-item-time{text-align:center;font-size:0;padding:17px 0;background-color:#f5f6fd}
  .m-item-time .time{font-size:14px;width:50%;display:inline-block;height:22px;line-height:22px;border-left:1px solid #f0f0f0}
  .m-item-time .time span{vertical-align:middle;font-size:12px;padding-left:10px;display:inline-block;background-size:13px 13px}
  .m-item-time .time2 span{color:#539fff;}
  .m-item-time .time.on{
    color: #539fff;
  }
  .m-check{overflow:hidden;padding:10px 13px}
  .m-check label{float:left;width:25%;font-size:14px;position:relative;text-align:center;margin-bottom:10px}
  .m-check label input{position:absolute;left:-9999px}
  .m-check label span{display:inline-block;width:82%;height:40px;line-height:40px;background-color:#eee;border-radius:5px}
  .m-check label.checked span{color:#fff;background-color:#539fff}
  .m-check label.disable span{color:#999;}
  .m-pic img{display:block;width:100%}
  .m-info01{padding:9px 0 14px;background-color:#fff;margin-bottom:10px}
  .m-info01 .tit{overflow:hidden;padding-left:15px;margin-bottom:12px}
  .m-info01 .tit .num,.m-info01 .tit .start{float:left}
  .m-info01 .tit .num{font-size:24px;color:#333;margin-right:3px}
  .m-info01 .tit .start span{font-size:12px}
  .m-info01 .tit .start .m-start{height:12px;line-height:12px}
  .m-info01 .tit .txt{height:36px;line-height:36px;font-size:12px;color:#999;float:right;padding-right:15px}
  .m-info01 .tit .txt span{float:right;font-size:12px;margin-left:30px}
  .m-info01 .tel{padding:0 15px;position:relative}
  .m-info01 .tel h3{font-size:12px;margin-bottom:7px}
  .m-info01 .tel .address{font-size:12px;color:#999;background:url(../../images/j-p4.png) left center no-repeat;background-size:11px 13px;padding-left:15px}
  .m-info01 .tel .phone{position:absolute;right:0;top:50%;margin-top:-10px;overflow:hidden;width:19px;height:19px;background:url(../../images/j-p5.png) right center no-repeat;background-size:19px 19px;padding-left:25px;box-sizing:content-box;margin-right:13px}
  .m-info01 .tel .phone:after{position:absolute;content:'';left:0;top:50%;margin-top:-8px;width:1px;height:16px;background-color:#f0f0f0}
  .m-user-txt{background-color:#fff}
  .m-tit01.m-tit02{height:auto;padding:15px 0 13px}
  .m-tit01.m-tit02 h3{font-size:15px;font-weight:400;background-image:url(../../images/j-p15.png)}
  .m-tit01.m-tit02 a{color:#539fff}
  .m-user-txt .item{padding-top:15px;padding-bottom:13px;border-top:1px solid #ddd}
  .m-user-txt .desc{overflow:hidden;margin-bottom:7px}
  .m-user-txt .desc .pic{float:left;width:37px;height:37px;border-radius:50%;overflow:hidden;margin-right:10px}
  .m-user-txt .desc .pic img{display:block;width:100%;height:100%}
  .m-user-txt .desc .left{float:left}
  .m-user-txt .desc .left span{font-size:14px;color:#333;line-height:1.1}
  .m-user-txt .desc .left .m-start{height:12px;line-height:12px}
  .m-user-txt .desc .time{height:37px;line-height:37px;float:right;font-size:12px;color:#999}
  .m-user-txt .txt{font-size:12px;color:#666}
  .mainsbg{
    background: #fff;
    position: fixed;
    width: 100%;
    height: 100%;
  }
  .goBack{
    float: left;
    transform: rotateZ(180deg);
    margin-left: 4px;
    margin-top: -4px;
  }
  .top{
    height: 40px;
    width: 100%;
    line-height: 40px;
    text-align: center;
    font-size: 16px;
  }
  .btn{
    width: 100%;
    height: 40px;
    margin: 0 auto;
    text-align: center;
    line-height: 40px;
    background-color:  #539fff;
  }
  .btn>span{
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 13px;
    text-align: center;
    /*background-color: #FFFFFF;*/
    /*border: 1px solid #4876FF;*/
    box-sizing: border-box;
    /* border-radius: 30rpx; */
    display: inline-block;
    color: #FFF;

  }
  .btn .on{
    background-color: #539fff;
    color: #FFFFFF;
  }
  .room{
    width: 100%;
    text-align: center;
    padding: 10px 10px 10px 10px;
  }
  .room .box{
    width: 31%;
    height: 40px;
    line-height: 36px;
    display: inline-block;
    margin: 3px 3px 3px 3px;
    background-color: #FFFFFF;
    border-radius: 25px;
    border: 2px solid #f1f1f1;
    /*transition: opacity 0.6s;*/
    opacity: 0;
    overflow: hidden;
    position: static;
    float: left;
    color: #1b1b1b;
    font-size: 7px;
    transition: background-color 0.6s;
  }
  .room .boxShow{
    opacity: 1;
  }
  .room .box span{
    font-size: 9px;
    margin: 6px auto;
    display: block;
    color: #5a5a5a
  }
  .room .box .h3{

    /*margin-bottom: 50px;*/
    margin: 0;
  }
  .room .box .jis{
    margin: 11px auto;
  }
  #yu .room .select{
    /*border: 8px solid #3742fa;*/
    background-color:  #539fff;
    color: #FFF;
  }
  .nextBtn{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100px;
    background-color:  #539fff;
    color: #FFF;
    text-align: center;
    font-size: 40px;
    line-height: 100px
  }

</style>

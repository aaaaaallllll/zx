<!--<template>-->
<!--    <div>-->
<!--      order-->
<!--    </div>-->
<!--</template>-->

<!--<script>-->
<!--    export default {-->
<!--      name: "Order",-->
<!--    }-->
<!--</script>-->

<!--<style scoped>-->
<!--  @import'../../common/css/style.css';-->

<!--</style>-->
<template>
  <div>
    <div class="top">
        <span>
          我的预约
        </span>
    </div>
    <div>
      <ul class="res-info">
        <transition-group name="fade">
          <li class="info" v-for="(item,index) in YuyeInfo" :key="item.id" v-if="YuyeInfo.length>0">
            <img src="http://www.intereek.com/pangu/html/newJiShiYuYue/images/j-p1.png" style="border-radius: 5px">
            <span @click="_ShowAlert(index,item.id)">X</span>
            <div class="info-center">
              <h3 v-if="item.yuYueLeiXing!=null||item.yuYueLeiXing!=''||item.yuYueLeiXing!=undefined">{{item.yuYueLeiXing}}</h3>
              <span >{{item.userId}}号</span>
              <span  v-if="!item.menuName==''">{{item.menuName}}</span>

              <div class="time">预约时间：{{item.yuJiDaoDa}}</div>

              <p v-if="item.yuYueLeiXing=='洗浴预订'">{{item.remark}}人</p>
              <span  v-else>{{item.roomNo}}号</span>
            </div>
          </li>

        </transition-group>
      </ul>
      <div v-if="YuyeInfo===null" style="text-align: center;font-size: 20px;margin-top: 50px;color: #939393">没有预约信息</div>
    </div>

    <AlertTip v-show="ShowAlert"
              :alertText="'确认要取消预约吗'"
              @_cancel="_ShowAlert"
              @affirm="CancelYY"
    />
    <div class="kong"></div>
  </div>
</template>

<script>
  var aUrl  = "http://www.intereek.com/pangu/xcx.do";
  // var aUrl  = "http://intereek.natapp1.cc/pangu/xcx.do";
  import AlertTip from '../../components/AlertTip/AlertTip'

  import { MessageBox, Toast } from 'mint-ui'
  // import 'mint-ui/lib/style.css'
  export default {
    name: "Profile",
    data(){
      return{
        YuyeInfo:null,
        ShowAlert:false,
        index:null,
        companyCode:'',
        openid:'',
        id:'',
        ydate:'',
      }
    },

    mounted(){
      let that=this

      that.companyCode=that.queryString('companyCode')
      that.openid=that.queryString('openid')
      that.GetYuYueList()
    },

    methods:{
      //获取url地址属性函数
      queryString(name) {
        let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        let r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
      },
      //是否显示弹窗
      _ShowAlert(index,id){
        let that =this
        that.id=id

        this.ShowAlert=!this.ShowAlert;
        this.index=index;
        console.log(this.index)
      },
      //删除信息
      CancelYY(){
        var that = this;
        console.log(this.id)
        // let _id=[]
        // console.log(this.id)
        // _id.push(this.id)
        // console.log(this.id)
        // console.log(_id)
        let index=that.index
        console.log('qian='+this.index)

        $.ajax({
          type: "POST",
          url: aUrl,
          dataType: "jsonp",
          data: {
            companyCode: that.companyCode,
            openid:that.openid,
            operationType:'queryLocal',
            queryType:'DeleteYuYue',
            id:"["+that.id+"]",
            // id:_id,
          },
          success: function (data) {
            console.log(data)
          },
          error:function (err) {
            console.log('no')
            console.log(err)
          }
        });
        this._ShowAlert();

        console.log(index)
        this.YuyeInfo.splice(index,1)
        // delete this.YuyeInfo[this.index]
      },
      //获取预约信息
      GetYuYueList(){
        const that = this;
        console.log(that.openid)
        $.ajax({
          type: "POST",
          url: aUrl,
          dataType: "jsonp",
          data: {
            companyCode: that.companyCode,
            openid:that.openid,
            operationType:'queryLocal',
            queryType:'GetYuYueList',
          },
          success: function (data) {
            // var that=this
            console.log(data)
            if(data.result.length>0){
              var list3 = []
              var list = data.result
              for (var i = 0; i < list.length; i++) {
                var num= list[i].yuJiDaoDa.replace(/[^0-9]/ig,"");
                let ydate=parseInt(num)
                var time = new Date(ydate);
                var list2 = {
                  // yuJiDaoDa: list[i].yuJiDaoDa,
                  yuJiDaoDa: time.getFullYear()+"年"+`${parseInt(time.getMonth())+1}`+"月"+time.getDate()+"日"+'-'+that.PrefixInteger(time.getHours(),2)+':'+that.PrefixInteger(time.getMinutes(),2)+':'+that.PrefixInteger(time.getSeconds(),2),
                  menuName: list[i].menuName,
                  userId: list[i].userId,
                  id: list[i].id,
                  yuYueLeiXing:list[i].yuYueLeiXing,
                  roomNo:list[i].roomNo,
                  remark:list[i].remark,
                }
                list3.push(list2)
              }
              // that.id=list[0].id
              that.YuyeInfo = list3
              console.log(list3)
              console.log(that.YuyeInfo)
              that.ydate=list[0].yuJiDaoDa
              // console.log(parseInt(this.ydate))
            }

          },
          error:function (err) {
            console.log('no')
            console.log(err)
          }
        });
      },
      PrefixInteger(num, m) {
        return (Array(m).join(0) + num).slice(-m);
      },

    },

    //删除预约信息
    DeleteYuYue(){

    },
    //获取毫秒数


    components:{
      AlertTip,
    }

  }
</script>

<style scoped>
  .kong{
    width: 100%;
    height: 120px;
  }
  li{
    list-style: none;
    overflow: hidden;
  }
  .top{
    height: 40px;
    width: 100%;
    background-color: #007aff;
    text-align: center;
  }
  .top span{
    color: #FFFFFF;
    font-size: 15px;
    display: inline-block;
    line-height: 40px;
    height: 100%;
  }
  .res-info{
    text-align: center;
    width: 100%;
  }
  .info{
    width: 94%;
    box-shadow: 0 0 4px #aeaeae;
    height: 80px;
    margin: 20px auto;
    line-height: 80px;
    position: relative;
  }
  .info img{
    position: absolute;
    left: 10px;
    top: 50%;
    margin-top: -33px;
    /*float: left;*/
    height: 66px;
    width: 66px;
  }
  .info>span{
    position: absolute;
    right: 5px;
    top: 5px;
    color: #b2b2b2;
    height: 15px;
    width: 15px;
    line-height: 15px;
  }
  .info-center{
    width: 200px;
    /*background-color: #007aff;*/
    height: 80px;
    margin: 0 auto;
    position: relative;
  }
  .info .info-center h3{
    font-size: 14px;
    float: left;
    display: block;
    position: absolute;
    top: -20px;
    left: 20px;

  }
  .info .info-center span{
    font-size: 10px;
    display: inline-block;
    /*float: left;*/
    margin-left: -15px;
    color: #151515;
    width: 100px;
    height: 20px;
    text-align: center;
  }
  .info .info-center p{
    font-size: 10px;
    display: inline-block;
    /*float: left;*/
    color: #626262;
  }
  .info .info-center .time{
    font-size: 12px;
    display: block;
    position: absolute;
    right: -50px;
    bottom: 2px;
    height: 20px;
    line-height: 20px;
    color: #a1a1a1;
  }
  .fade-enter-active, .fade-leave-active {
    transition: width 0.61s ;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    width: 0;
  }
</style>

<!--<template>-->
<!--    <div>-->
<!--      teaRoom-->
<!--    </div>-->
<!--</template>-->

<!--<script>-->
<!--    export default {-->
<!--        name: "teaRoom"-->
<!--    }-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->
<template>
  <div id="app">
    <div class="back">

    </div>
    <div class='btn'>
      <span >茶房预定</span>

    </div>
    <div class='room' v-if="showBox==1">
      <div class="box boxShow"  v-for="(item,index) in roomData"  :class="{'select':selectIndex==index}" @click="savaData(index,item)">
        房间号：{{item}}
        <!--                <span> </span>-->
        <!--                <span>开始时间：{{item.qiZhongTime?item.qiZhongTime:'无'}}</span>-->
        <!--                <span >剩余时间：{{item.leftTime}}分钟</span>-->
      </div>
    </div>
    <!--    <div class="nextBtn" @click="">选好了</div>-->
    <div class="kong"></div>
  </div>
</template>

<script>
  // const ajaxUrl='http://intereek.natapp1.cc/pangu/xcx.do'
  const ajaxUrl="http://www.intereek.com/pangu/xcx.do"
  export default {
    name: "room",
    data(){
      return{
        showBox:1,
        roomData:[],
        selectRoomData:'',
        companyCode:'',
        selectIndex:-1,
        openid:'',
        priceList:[]
      }
    },
    methods:{
      beforeCreate() {

        document.querySelector('body').setAttribute('style', 'background-color:#f7f7f7')

      },

      beforeDestroy() {

        document.querySelector('body').removeAttribute('style')

      },

      //获取房间状态
      getRoomData(){
        const that=this
        console.log(that.companyCode)
        console.log(that.openid)
        $.ajax({
          url: ajaxUrl,
          // url: api.pangu,
          dataType: "jsonp",
          jsonp:'callback',
          type: "post",
          data: {
            companyCode: that.companyCode,
            operationType: 'queryLocal',
            queryType: 'GetAvailableBaoXiangs',
            openid:that.openid,
            leiXing:'茶室'
          },
          success(res) {
            console.log(res);
            const data = res.result


            console.log(data)
            that.roomData=data.room
            let prices=data.price
            let list=[]

            for(let i=0;i<prices.length;i++){
              let list2=prices[i].endTime.split(':')
              let list3=prices[i].startTime.split(':')
              let son={
                startTime:list3,
                endTime:list2,
                price:prices[i].price
              }
              list.push(son)
            }
            // list.push(list2)
            console.log(list)

            that.priceList=list

          }
        })
      },
      //选中房间
      savaData(index,name){
        const that=this
        that.selectIndex=index
        that.selectRoomData=name
        console.log(that.selectRoomData)
        console.log(that.selectIndex)
        that.$router.push({
          name: 'Select',
          params: {
            id: name,
            type:'茶室',
            priceList:that.priceList
          }
        })
        that.$router.replace('/select')
      },
      //获取url地址属性函数
      queryString(name) {
        let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        let r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
      },
      //切换状态
      // show(index){
      //   const that=this
      //   that.showBox=index
      //
      //   // console.log(this.data.showBox)
      //   // console.log(this.data.jSData)
      //   if (index == 2 && that.jSData==null){
      //     this.getJsData()
      //     console.log('bbbb')
      //   }
      // },
    },
    mounted() {
      const that=this
      that.companyCode = that.queryString('companyCode')
      that.openid = that.queryString('openid')
      that.getRoomData()
      that.beforeCreate()

    }
  }
</script>

<style scoped>
  /*html{*/
  /*  width: 100%;*/
  /*  height: 100%;*/
  /*}*/
  body{
    background-color: #f7f7f7;
    width: 100%;
    height: 100%;
  }
  .btn{
    width: 100%;
    height: 45px;
    margin: 0 auto;
    text-align: center;
    line-height: 45px;
    background-color: #4876FF;

  }
  .btn>span{
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    text-align: center;
    /*background-color: #FFFFFF;*/
    /*border: 1px solid #4876FF;*/
    box-sizing: border-box;
    /* border-radius: 30rpx; */
    display: inline-block;
    color: #ffffff;

  }
  .btn .on{
    background-color: #4876FF;
    color: #FFFFFF;
  }
  .room{
    width: 100%;
    text-align: center;
    padding-left: 14px;
    box-sizing: border-box;
    height: 100%;
    background-color: #333333;
  }
  .room .box{
    width: 27%;
    height: 30px;
    line-height: 30px;
    display: inline-block;
    margin: 8px 6px 8px 6px;
    background-color: #FFFFFF;
    border-radius: 25px;
    border: 2px solid #f1f1f1;
    /*transition: opacity 0.6s;*/
    /*opacity: 0;*/
    overflow: hidden;
    position: static;
    float: left;
    color: #1b1b1b;
    font-size: 12px;
    transition: background-color 0.6s;
  }
  .room .boxShow{
    opacity: 1;
  }
  .room .box span{
    font-size: 2px;
    margin: 19px auto;
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
    background-color:  #4876FF;
    color: #FFF;
  }
  .nextBtn{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100px;
    background-color:  #4876FF;
    color: #FFF;
    text-align: center;
    font-size: 40px;
    line-height: 100px
  }
  /*#app{*/
  /*  height: 100%;*/
  /*  width: 100%;*/
  /*  !*position: absolute;*!*/
  /*  !*left: 0;*!*/
  /*  !*top: 0;*!*/
  /*  background-color: #a9a9a9;*/
  /*  !*z-index: 1;*!*/
  /*}*/
  .kong{
    width: 100%;
    height: 60px;
    float: left;
  }
</style>

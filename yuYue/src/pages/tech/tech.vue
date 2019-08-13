<template>
    <div>
      <!--轮播图-->
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" >
            <img src="http://www.intereek.com/pangu/html/newJiShiYuYue/images/banner1.jpg" >
          </div>
          <div class="item swiper-slide" >
            <img src="http://www.intereek.com/pangu/html/newJiShiYuYue/images/banner2.jpg" >
          </div>
          <div class="swiper-slide" >
            <img src="http://www.intereek.com/pangu/html/newJiShiYuYue/images/banner1.jpg" >
          </div>
          <div class="item swiper-slide" >
            <img src="http://www.intereek.com/pangu/html/newJiShiYuYue/images/banner2.jpg" >
          </div>
        </div>
        <div class="gadget">
          <i class="iconfont" style="margin-left: 3px">&#xe650;</i>
          <span>2</span>
          <i class="iconfont" style="margin-left:-3px">&#xe64b;</i>
        </div>
        <!--            分页器-->
        <!--<div class="swiper-pagination"></div>-->
      <!--店面信息-->
      </div>
      <div class="showInfo">
        <div class="xbk">
          <div class="info-left">
            <h3>海纳百川都市温泉(下沙店)</h3>
            <p>
              <i class="iconfont">&#xe62a;</i>
              <span>浙江省杭州市江干区幸福南路1289号</span>
            </p>
          </div>
          <div class="info-right">
            <a href="tel:057187112826">
              <i class="iconfont">&#xe61e;</i>
            </a>
          </div>
        </div>
      </div>
      <!--请选择服务技师-->
      <div class="jiShiTitle">
        <i class="iconfont">&#xe688;</i>
        <span>请选择服务技师</span>
      </div>
      <!--筛选-->
      <div class="screen">
        <div class="screen-box" v-for="(item,index) in techJobs" @click="toScreen(item)">
          <p>
            <img src="../../common/images/on-1.png" v-if="item===techJob">
            <i class="iconfont">&#xe615;</i>
          </p>
          <span :class="{on:item===techJob}">{{item}}</span>
        </div>
      </div>
      <!--技师列表-->
      <div class="jisShiList" >
        <div class="jisShiBox" v-for="(item,index) in yuYueList">
          <a :href="`${theServer}pangu/html/newJiShiYuYue/project.html?techId=${item.userId}&companyCode=${companyCode}&openid=${openid}&cardName=${cardName}&cardPhone=${cardPhone}&cs4=2asd`"
             target="_self"
          >
          <img :src="item.imgUrl" >
          <p>预约</p>
          <h4>{{item.userName}}</h4>
          <span>已服务{{item.ciShu}}次</span>
          </a>
        </div>
      </div>
      <div v-if="yuYueList===null" class="looding">
        数据加载中......
      </div>

      <div class="kong"></div>
    </div>

</template>

<script>

  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'

    export default {
        name: "tech",
      data(){
          return{
            companyCode:'',
            openid:'',
            techJobs:[],
            techJob:'全部',
            yuYueList:null,
            cardName:'',
            cardPhone:'',
            // theServer:'http://intereek.natapp1.cc/',
            theServer:'http://www.intereek.com/',
          }
      },
      methods:{
        // 筛选
        toScreen(item){
          this.techJob=item
          this.getSecList(item)
        },
        // 获取数据
        getSecList(item){
          const that=this
          var aUrl  = "http://www.intereek.com/pangu/xcx.do";
          // this.$http.post( that.theServer2+'pangu/xcx.do', that.qs.stringify({    //这里是发送给后台的数据
          //     companyCode:that.companyCode,
          //     operationType:'jiShiYuYue',
          //     openid:that.openid
          // })
          // ).then((res) => {
          //   console.log(res);
          //   if(res.data.success){
          //     console.log(res.data.result.result)
          //     const data=res.data.result.result
          //     let joblist=data.techJobs
          //     joblist.unshift('全部')
          //     that.techJobs=joblist
          //     // 技师列表
          //     let list3 = []
          //     let list =data.techs
          //     if(item==='全部'){
          //       for (let i = 0; i < list.length; i++) {
          //         let list2 = {
          //           ciShu: list[i].ciShu,
          //           imgUrl: list[i].imgUrl,
          //           userId: list[i].userId,
          //           userName: list[i].userName,
          //         }
          //         list3.push(list2)
          //       }
          //     }else {
          //       // console.log('1')
          //       for (let i = 0; i < list.length; i++) {
          //         if(list[i].techJob===item){
          //           let list2 = {
          //             ciShu: list[i].ciShu,
          //             imgUrl: list[i].imgUrl,
          //             userId: list[i].userId,
          //             userName: list[i].userName,
          //           }
          //           list3.push(list2)
          //         }
          //       }
          //     }
          //     that.yuYueList = list3
          //     console.log(that.yuYueList)
          //   }
          // }).catch((err) => {
          //   console.log('11'+err);
          // });

          // });
          // 暂用
          $.ajax({
            type: "POST",
            url: aUrl,
            dataType: "jsonp",
            data: {
              companyCode: that.companyCode,
              openid:that.openid,
              operationType:'jiShiYuYue'
            },
            success: function (res) {
              console.log(res)
              console.log(res.result)

              if(res.success){

                const data=res.result.result
                let joblist=data.techJobs
                joblist.unshift('全部')
                that.techJobs=joblist
                // 技师列表
                let list3 = []
                let list =data.techs
                if(item==='全部'){
                  for (let i = 0; i < list.length; i++) {
                    let list2 = {
                      ciShu: list[i].ciShu,
                      imgUrl: list[i].imgUrl,
                      userId: list[i].userId,
                      userName: list[i].userName,
                    }
                    list3.push(list2)
                  }
                }else {
                  // console.log('1')
                  for (let i = 0; i < list.length; i++) {
                    if(list[i].techJob===item){
                      let list2 = {
                        ciShu: list[i].ciShu,
                        imgUrl: list[i].imgUrl,
                        userId: list[i].userId,
                        userName: list[i].userName,
                      }
                      list3.push(list2)
                    }
                  }
                }
                that.yuYueList = list3
                console.log(that.yuYueList)
              }
            },
            error:function (err) {
              console.log('no')
              console.log(err)
            }
        })
        },
        //获取url地址属性函数
        queryString(name) {
          let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
          let r = window.location.search.substr(1).match(reg);
          if(r!=null)return  unescape(r[2]); return null;
        },
      },
      mounted() {
        const that=this
        new Swiper('.swiper-container', {
          // autoplay: true,//可选选项，自动滑动
          autoplay: {
            delay: 5000,//5秒切换一次
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
            spaceBetween: 10,
          },
          loop: true, // 循环模式选项
        })

        that.appid =that.queryString('appid')
        that.companyCode = that.queryString('companyCode')
        that.openid = that.queryString('openid')
        that.cardName = that.queryString('cardName')
        that.cardPhone = that.queryString('cardPhone')
        that.telephoneNumber = that.queryString('cardPhone')
        that.getSecList('全部')
      }
    }
</script>

<style scoped>
  @import'../../common/css/style.css';
  .looding{
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 16px;
    color: #8e8e8e;
  }
  .kong{
    width: 100%;
    height: 56px;
    /*float: left;*/
  }
  .iconfont{
    font-family:"iconfont" !important;
    font-size:13px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;}
  /*轮播图*/
  .swiper-container{
    width: 100%;
    height: 160px;
    margin: 7px auto 0;
    text-align: center;
    position: relative;
  }
  .swiper-container .gadget{
    height: 24px;
    width: 46px;
    border-radius: 12px;
    background-color: rgba(0,0,0,0.7);
    position: absolute;
    bottom: 10px;
    left: 40px;
    z-index: 7;
    line-height: 24px;
    text-align: center;
    color: rgba(255,255,255,0.5);
    font-size: 12px;
  }
  .swiper-container .gadget i{
    font-size:12px;
    margin: 0;
  }
  .swiper-slide img{
    width: 87%;
    height: 160px;
    border-radius: 8px;
    /*box-shadow: 2px 2px 8px #7a7a7a;*/
  }
  .swiper-container .swiper-wrapper .swiper-slide-prev{
   position: relative;
    left: 35px;
  }
  .swiper-container .swiper-wrapper .swiper-slide-next{
    position: relative;
    right: 35px;
  }
  /*门店信息*/
  .showInfo{
    height: 74px;
    width: 100%;
   padding: 13px 15px;
    box-sizing: border-box;
  }
  .showInfo .xbk{
    width: 100%;
    height: 61px;
    /*background-color: #0984e3;*/
    display: flex;
    /*align-items: center;*/
    border-bottom: 1px solid #D8D8D8;
  }
  .showInfo .xbk .info-left{
    /*background-color: #7a7a7a;*/
    width: 100%;
    height: 48px;
  }
  .showInfo .xbk .info-left h3{
    font-size: 19px;
    color: #363636;
  }
  .showInfo .xbk .info-left p{
    font-size: 13px;
    color: #7C7C7C;
    margin-top: 5px;
  }
  .showInfo .xbk .info-right{
    /*background-color: #0984e3;*/
    width: 72px;
    height: 40px;
    margin-top: 4px;
    border-left: 1px solid #D8D8D8;
    border-radius: 2px;
    font-size: 22px;
    line-height: 40px;
    text-align: center;
  }
  .showInfo .xbk .info-right i{
    color: #FEBA00;
    font-size: 20px;
  }
  /*请选择服务技师*/
  .jiShiTitle{
    height: 24px;
    width: 100%;
    text-align: left;
    padding-left: 15px;
    margin-top: 12px;
    box-sizing: border-box;
    font-size: 17px;
    color: #363636;
  }
  .jiShiTitle i{
    background: linear-gradient(to bottom, #FF9445, #FF3B56);
    -webkit-background-clip: text;
    color: transparent;
    font-size: 16px;
    margin-right: 11px;
  }
  /*筛选*/
  .screen{
    min-height: 98px;
    /*width: 100%;*/
    width: 347px;
    margin: 10px auto;
    /*padding: 10px 15px;*/
    box-sizing: border-box;
    /*background-color: #333333;*/
    padding-bottom: 10px;
  }
  .screen .screen-box{
    width: 82px;
    height: 78px;
    display: inline-block;
    margin-right: 2px;
    margin-left: 2px;

  }
  .screen .screen-box p{
    background: linear-gradient(#FF9745, #FF3956); /* 标准的语法 */
    color: white;
    width: 82px;
    height: 44px;
    border-radius:4px;
    text-align: center;
    line-height: 44px;
    position: relative;
  }
  .screen .screen-box p img{
    width: 30px;
    height: 30px;
    position: absolute;
    right: -3px;
    bottom: -2px;
  }
  .screen .screen-box p i{
    font-size: 27px;
  }
  .screen .screen-box span{
    display: block;
    text-align: center;
    height: 16px;
    width: 82px;
    margin-top: 5px;
    overflow: hidden;
    font-size: 11px;
    color: #7c7c7c;
    transition: color 0.6s;
  }
  .screen .screen-box>.on{
    /*background-color: rgba(188, 188, 188, 1);*/
    /*background: linear-gradient(#BCBCBC, #BCBCBC); !* 标准的语法 *!*/
    color: #FF6952;
  }
  /*技师列表*/
  .jisShiList{
    margin: 10px auto;
    /*background-color: #333333;*/
    width: 352px;
  }
  .jisShiBox{
    margin-top: 10px;
    margin-left: 2px;
    margin-right: 2px;
    width: 170px;
    height: 170px;
    display: inline-block;
    position: relative;
    box-shadow: 1px 1px 2px #c4c4c4;
  }
  .jisShiBox img{
    height: 170px;
    width: 170px;
  }
  .jisShiBox p{
    position: absolute;
    right: 14px;
    top: 11px;
    width:50px;
    height:24px;
    background:linear-gradient(180deg,rgba(255,150,70,1) 0%,rgba(255,57,85,1) 100%);
    border-radius:12px;
    text-align: center;
    line-height: 24px;
    color: white;
  }
  .jisShiBox h4{
    position: absolute;
    bottom: 10px;
    left: 10px;
    color: #444444;
  }
  .jisShiBox span{
    position: absolute;
    bottom: 10px;
    right: 10px;
    color: #909090;
  }

</style>

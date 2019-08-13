<template>
  <div id="change">
    <div class="title">
      <span>Channels</span>

    </div>
    <div class="content">
      <div class="handle" style="padding-left: 100px">
        <div class="search">
          <input type="text" placeholder="Country" v-model="countrySs">
          <i class="iconfont" @click="showGj=!showGj">&#xe600;</i>
          <div class="xlk" v-show="showGj">
            <ul>
              <li v-for="(item,index) in gjList" @click="geiSs(item)">{{item}}</li>
            </ul>
          </div>
        </div>
        <div class="search">
          <input type="text" placeholder="Language" v-model="languageSs">
          <i class="iconfont" @click="showLan=!showLan">&#xe600;</i>
          <div class="xlk" v-show="showLan">
            <ul>
              <li v-for="(item,index) in gjList" @click="geiSs2(item)">{{item}}</li>
            </ul>
          </div>
        </div>
        <div class="search">
          <input type="text" placeholder="Channel" v-model="channelSs">
          <!--          <i class="iconfont" >&#xe645;</i>-->
        </div>
      </div>
      <div class="handle">
        <i class="iconfont" @click="addAlert">&#xe601;</i>
        <!--        <p :class="{active:checkAll}" @click="checkAllShow">Select All</p>-->
        <div class="search" >
          <input type="text" placeholder="Source Url" v-model="urlSs" style="width: 367px;position: relative;top:-10px">
          <!--          <i class="iconfont" >&#xe645;</i>-->
        </div>
        <div class="seaBtn" @click="getData()">search</div>
<!--        <b class="iconfont" @click="toggerAlert">&#xe696;</b>-->
      </div>
      <transition-group
        name="bounce"
        enter-active-class="bounceInLeft"
        leave-active-class="bounceOutRight"
        :duration="600"
      >
<!--        @click="choose(item.id)"-->
        <div class="box" v-for="(item,index) in list"  :key="item.id" >
          <div class="back" :class="{on:item.ck}"></div>
          <div class="box-left">
            <div class="box-left-top">
              <span style="left: 51px">Country: {{item.guojia}}</span>
              <span style="left: 491px">Language: {{item.leibie}}</span>
              <span style="left: 869px">Channel: {{item.vodtype}}</span>
            </div>
            <div class="box-left-bottom">
              <p style="left: 51px">Source Types: {{item.dianshitaiming}}
              </p>
              <p style="left: 491px">Source Url: {{item.dianshitaiurl}}</p>
              <p style="left: 869px">Logo Url: {{item.logourl}}</p>
            </div>

          </div>
          <div class="box-right" :class="{in:item.ck}">
            <!--            编辑-->
            <i class="iconfont" @click.stop="alterItem(item.id,item.createtime)">&#xe619;</i>
            <!--            删除-->
            <b class="iconfont" @click.stop="toggerAlert2(item.id)">&#xe696;</b>
          </div>
        </div>
      </transition-group>


    </div>
    <!--添加-->
    <div class="redact" v-if="showAdd" :key="223466">
      <h6>{{msg}} Agents</h6>
      <div class="redact-hang">
        <div class="redact-ge" style="margin-right: 108px">
          <span>Country：</span>
          <input type="text" v-model="guojia">
        </div>
        <div class="redact-ge" style="margin-right: 108px">
          <span>Language：</span>
          <input type="text" style="width: 216px" v-model="leibie">
        </div>
        <div class="redact-ge">
          <span>Sourse Types：</span>
          <input type="text" v-model="dianshitaiming">
        </div>
      </div>
      <div class="redact-hang">
        <div class="redact-ge" style="margin-right: 108px">
          <span>logoUrl：</span>
          <input type="text" v-model="logourl">
        </div>
        <div class="redact-ge" style="margin-right: 108px">
          <span>Channel：</span>
          <div>
            <p :class="{active:vodtype}" @click="vodtype=!vodtype">Live</p>
            <p :class="{active:!vodtype}" @click="vodtype=!vodtype">Vod</p>
            <!--            <input type="text" v-model="phone">-->
          </div>
        </div>
        <div class="redact-ge">
          <span>Sort：</span>
          <input type="text" v-model="paiXu">
        </div>
      </div>
      <div class="redact-hang" >
        <div class="redact-ge" style="margin-right: 108px">
          <span>Sourse Url：</span>
          <input type="text" style="width: 612px" v-model="dianshitaiurl">
        </div>
      </div>
      <div class="btn">
        <div style="margin-right: 36px"  @click="gbAdd">Cancel</div>
        <div style="margin-left: 36px" @click="addItem">Confirm</div>
      </div>
    </div>
    <!--弹窗-->
    <div class="msg" v-if="showMsg">{{cmsg}}</div>
    <!--删除-->
          <div class="delectBox" v-if="showAlert" :key="123466">
            <i class="iconfont">&#xe624;</i>
            <span>Delect selected？</span>
            <div class="btn">
              <div style="margin-right: 36px" @click="toggerAlert">Cancel</div>
              <div style="margin-left: 36px" @click="deleteItem">Confirm</div>
            </div>
          </div>
  </div>
</template>

<script>
  // const ajaxUrl='http://192.168.1.234:999/haotian/xcx.do'
  // const ajaxUrl= 'http://192.168.1.15:999/com_pangu_tang_web_war_exploded/xcx.do'
  const ajaxUrl= 'http://47.110.228.20:89/haotian/xcx.do'
  export default {
    name: "agentGl",
    data(){
      return{
        list:[],
        csList:[],
        checkAll:false,
        showAlert:false,
        dIndex:-1,
        showIndex:-1,
        showAdd:false,
        password:'8888',
        //新增编辑
        dianshitaiming:'',
        dianshitaiurl:'',
        guojia:'',
        isdeleted:'',
        leibie:'',
        logourl:'',
        modifytime:'',
        paixu:'',
        vodtype:true,
        createtime:'',
        paiXu:'0',
        afterIndex:-1,
        msg:'',//编辑或者新增
        //搜索
        search:'',
        userId:'',
        id:'',
        //提示框
        cmsg:'',
        showMsg:false,
        //筛选框
        countrySs:'',
        languageSs:'',
        channelSs:'',
        urlSs:'',
        lanList:[],
        gjList:[],
        showLan:false,
        showGj:false
      }
    },
    computed:{
      // xsList(){
      //   const that=this
      //   let list=that.list
      //   if(that.search==''){
      //     return list
      //   }else {
      //     let list2=[]
      //     for(let i=0;i<list.length;i++){
      //       if(list[i].name.toLowerCase().indexOf(that.search.toLowerCase())!=-1){
      //         list2.push(list[i])
      //       }
      //     }
      //     return list2
      //   }
      // }
    },
    methods:{
      geiSs(item){
        this.countrySs=item
        this.showGj=false
      },
      geiSs2(item){
        this.languageSs=item
        this.showLan=false
      },
      choose(id){
        const list=this.list
        let index=null
        for(let i=0;i<list.length;i++){
          if(id==list[i].id){
            index=i
          }
        }
        this.list[index].ck=!this.list[index].ck
      },
      checkAllShow(){
        const that=this
        that.checkAll=!that.checkAll
        for(let i=0;i<that.list.length;i++){
          that.list[i].ck=that.checkAll
        }
      },
      toggerAlert(){
        this.showAlert=!this.showAlert
      },
      toggerAlert2(id){
        const that=this
        let index=null
        const list=this.list
        for(let i=0;i<list.length;i++){
          if(id==list[i].id){
            index=i
          }
        }
        that.id=that.list[index].id
        that.createtime=that.list[index].createtime
        that.leibie=that.list[index].leibie
        that.guojia=that.list[index].guojia
        that.dianshitaiming=that.list[index].dianshitaiming
        that.vodType=that.list[index].vodType
        that.dianshitaiurl=that.list[index].dianshitaiurl
        that.paiXu=that.list[index].paixu
        that.logourl=that.list[index].logourl
        that.showAlert=!that.showAlert
        that.dIndex=index

      },
      deleteItem(){
        const that=this
        const index=that.dIndex
        console.log(index)
        let list=that.list
        let list2=[]
        if(that.dIndex===-1){
          console.log('1')
          for(let i=0;i<list.length;i++){
            if(!list[i].ck){
              list2.push(list[i])
            }
          }
          that.list=list2
        }else {
          let id=parseInt(that.id)
          console.log(id)
          console.log(typeof(id))
          $.ajax({
            type: "POST",
            url: ajaxUrl,
            dataType: "jsonp",
            // data: "name=garfield&age=18",
            data: {
              operationType: 'shiBoDianShiTaiService',
              type:'delete',
              id:Number(id)
            },
            success: function (data) {
              console.log(data)
              if (!data.errorDesc) {
                // that.altShow('删除成功')
              } else {
                that.altShow(data.errorDesc)
              }
            }
          });
          console.log('2')
          that.dIndex=-1
          that.list.splice(index,1)
          // that.list=list
        }
        that.showAlert=false

      },
      gbAdd(){
        const that=this
        that.showAdd=false
        that.leibie=''
        that.guojia=''
        that.dianshitaiming=''
        that.vodType=true
        that.dianshitaiurl=''
        that.paiXu='0'
        that.logourl=''
      },
      //添加
      addAlert(){
        this.showAdd=true
        this.msg='New'
      },
      addItem(){
        const that=this
        const xIndex=that.afterIndex
        let vt=null
        if(that.vodType){
          vt='vod'
        }else {
          vt='live'
        }
        if(xIndex==-1){
          const index=that.list.length+1
          that.msg='New'

          // 添加请求
          $.ajax({
            type: "POST",
            url: ajaxUrl,
            dataType: "jsonp",
            // data: "name=garfield&age=18",
            data: {
              operationType: 'shiBoDianShiTaiService',
              type:'update',
              data:JSON.stringify({
                leiBie:that.leibie,
                guoJia:that.guojia,
                dianShiTaiMing:that.dianshitaiming,
                vodType:vt,
                dianShiTaiUrl:that.dianshitaiurl,
                paiXu:that.paiXu,
                logoUrl:that.logourl,
                // agent:that.agent,
              })
            },
            success: function (data) {
              console.log(data)
              if (!data.errorDesc) {
                // let list=eval('('+data.result+')')
                let list=data.result
                console.log(list)
                let son={
                  leibie:list.leibie,
                  dianshitaiming:list.dianshitaiming,
                  dianshitaiurl:list.dianshitaiurl,
                  guojia:list.guojia,
                  logourl:list.logourl,
                  paixu:list.paixu,
                  vodtype:list.vodtype,
                  ck: false,
                  id:list.id,
                  createtime:list.createtime,
                  modifytime:list.modifytime
                }
                that.list.unshift(son)
                that.gbAdd()
              } else {
                that.altShow(data.errorDesc)
              }
            }
          });
        }else {

          // 编辑请求
          $.ajax({
            type: "POST",
            url: ajaxUrl,
            dataType: "jsonp",
            // data: "name=garfield&age=18",
            data: {
              operationType: 'shiBoDianShiTaiService',
              type:'update',
              data:JSON.stringify({
                leiBie:that.leibie,
                guoJia:that.guojia,
                dianShiTaiMing:that.dianshitaiming,
                vodType:vt,
                dianShiTaiUrl:that.dianshitaiurl,
                paiXu:that.paiXu,
                logoUrl:that.logourl,
                id:that.id,
                createTime:that.createtime
                // agent:that.agent,
              })
            },
            success: function (data) {
              console.log(data)
              if (!data.errorDesc) {
                const list=data.result
                that.list[xIndex].leibie=list.leibie
                that.list[xIndex].guojia =list.guojia
                that.list[xIndex].dianshitaiming=list.dianshitaiming
                that.list[xIndex].vodtype=list.vodtype
                that.list[xIndex].dianshitaiurl=list.dianshitaiurl
                that.list[xIndex].paixuu=list.paixu
                that.list[xIndex].logourl=list.logourl
                that.list[xIndex].createtime=list.createtime
                that.list[xIndex].modifytime=list.modifytime
                that.afterIndex=-1
                that.gbAdd()
              } else {
                that.altShow(data.errorDesc)
              }
            }
          });
        }


      },
      //更改
      alterItem(id,createtime){
        const that=this
        const list=that.list
        let index=null
        for(let i=0;i<list.length;i++){
          if(id==list[i].id){
            index=i
          }
        }
        // that.leibie=''
        // that.guojia=''
        // that.dianshitaiming=''
        // that.vodType=true
        // that.dianshitaiurl=''
        // that.paiXu='0'
        // that.logourl=''
        that.id=that.list[index].id
        that.createtime=that.list[index].createtime
        that.leibie=that.list[index].leibie
        that.guojia=that.list[index].guojia
        that.dianshitaiming=that.list[index].dianshitaiming
        that.vodType=that.list[index].vodType
        that.dianshitaiurl=that.list[index].dianshitaiurl
        that.paiXu=that.list[index].paixu
        that.logourl=that.list[index].logourl

        that.showAdd=true
        that.afterIndex=index
        that.msg='Redact'
        that.id=id
        that.createtime=createtime
      },
      // 获取数据
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
      // 获取播放源列表
      getData(){
        const that=this
        $.ajax({
          type: "POST",
          url: ajaxUrl,
          dataType: "jsonp",
          // data: "name=garfield&age=18",
          data: {
            operationType: 'shiBoDianShiTaiService',
            type:'query',
            data:JSON.stringify({
              leiBie:that.languageSs,
              guoJia:that.countrySs,
              dianShiTaiMing:that.channelSs,
              dianShiTaiUrl:that.urlSs,
              // agent:that.agent,
            })
          },
          success: function (data) {
            console.log(data)
            if (!data.errorDesc) {
              let list=eval('('+data.result+')')
              console.log(list)
              let list2=[]
              let list3=[]
              let list4=[]
              for(let i=0;i<list.length;i++){

                let son={
                  leibie:list[i].leibie,
                  dianshitaiming:list[i].dianshitaiming,
                  dianshitaiurl:list[i].dianshitaiurl,
                  guojia:list[i].guojia,
                  logourl:list[i].logourl,
                  paixu:list[i].paixu,
                  vodtype:list[i].vodtype,
                  ck: false,
                  id:list[i].id,
                  createtime:list[i].createtime,
                  modifytime:list[i].modifytime
                }
                list2.push(son)
                list3.push(list[i].leibie)
                list4.push(list[i].guojia)
              }
              that.list=list2
              that.csList=list2
              if(that.urlSs==''&that.channelSs==''&that.countrySs==''&that.languageSs==''){
                that.lanList=Array.from(new Set(list3))
                that.gjList=Array.from(new Set(list4))
              }
            } else {
              that.altShow(data.errorDesc)
            }
          }
        });
      },
      // 弹窗
      altShow(err){
        const that=this
        that.showMsg=true
        that.cmsg=err
        console.log(err)
        setTimeout(()=>{
          that.showMsg=false
          that.cmsg=''
        },1500)
      }
    },
    mounted() {

      this.userId=this.getCookie('userId')
      console.log(this.userId)
      this.getData()
    }

  }
</script>

<style scoped>
  @import'../../../common/css/style.css';
  .msg{
    width: 400px;
    min-height: 60px;
    background-color: rgba(0,0,0,0.6);
    border-radius: 8px;
    text-align: center;
    line-height: 60px;
    font-size: 20px;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-left: -200px;
    margin-top: -30px;
    z-index: 10;
    color: #FFF;
  }
  #change{
    width: 100%;
    height: 100%;
  }
  /*头部*/
  .title{
    height: 126px;
    width: 100%;
    font-size: 25px;
    padding-left: 77px;
    color: #5C5C5C;
    /*line-height: 126px;*/
    box-sizing: border-box;
    display: flex;
    padding-top: 36px;
  }
  .content .search{
    display: inline-block;
    /*margin-right: 60px;*/
    /*width: 268px;*/
    /*height: 44px;*/
    /*margin-left: 470px;*/
    position: relative;
  }
  .content .seaBtn{
    width:120px;
    height:44px;
    background:rgba(148,194,252,1);
    border-radius:22px;
    text-align: center;
    font-size: 18px;
    line-height: 44px;
    margin-left: 80px;
    color: white;
    position: relative;
    top: -10px;
    cursor:pointer;
  }
  .title span{
    display: inline-block;
    width: 100px;
    height: 54px;
    line-height: 54px;
  }
  .content .search input{
    width: 180px;
    height: 44px;
    box-sizing: border-box;
    border-radius: 27px;
    border: 2px solid #BBD5F6;
    padding-left: 20px;
    padding-right: 20px;
    line-height: 54px;
    color: #5C5C5C;
    font-size: 18px;
    background-color: #E0F1FF;
    outline: none;
    z-index: 2;
  }
  .content .search i{
    font-size: 20px;
    color: #FFF;
    position: relative;
    right: 60px;
    cursor:pointer;
    top: 5px;
    z-index: 2;
  }
  .content .search .xlk{
    float: left;
    height: 140px;
    width: 180px;
    z-index: 6;
    position: absolute;
    top: 50px;
    left: 0;
    /*padding: 20px;*/
    margin-top: 5px;
    background-color: #AEC0CF;
    border-radius:4px;
    overflow-y: scroll;
  }
  .content .search .xlk li{
    width: 100%;
    overflow: hidden;
    height: 44px;
    cursor:pointer;
    text-align: center;
    font-size: 18px;
    line-height: 44px;
    color: #FFF;
  }
  /*内容*/
  .content{
    height: calc(100% - 126px);
    width: 100%;
    background-color: #F3F9FE;
    box-shadow:inset 0 0 6px rgba(166,177,187,0.5);
    box-sizing: border-box;
    padding-left: 36px;
    padding-right: 36px;
    overflow-y: scroll;
  }
  /*功能按钮*/
  .content .handle{
    width: 100%;
    height: 61px;
    padding-top: 29px;
    padding-left: 36px;
    position: relative;
    box-sizing: border-box;
  }
  .content .handle *{
    display: inline-block;

  }
  .content .handle i{
    width: 60px;
    color: #ACD1FF;
    font-size: 30px;
    cursor:pointer;
    height:33px;
    line-height: 33px;
    text-align: center;
  }
  .content .handle p{
    height:33px;
    line-height: 33px;
    text-align: center;
    width:108px;
    background-color: #FFF;
    border-radius:8px;
    color: rgba(148,194,252,1);
    font-size: 16px;
    /*position: relative;*/
    /*top:-6px;*/
    position: absolute;
    right: 108px;
    border: 1px solid rgba(148,194,252,1);
    cursor:pointer;
  }
  .content .handle .active{
    background:rgba(148,194,252,1);
    color: #FFF;
  }
  .content .handle b{
    height:33px;
    line-height: 33px;
    text-align: center;
    width: 60px;
    color: #ACD1FF;
    font-size: 30px;
    position: absolute;
    right: 46px;
    font-weight:normal;
    cursor:pointer;
  }
  /*卡片信息*/
  .content .box{
    width: 1296px;
    height: 108px;
    background:rgba(255,255,255,1);
    box-shadow:1px 1px 4px 0 rgba(0,0,0,0.5);
    margin: 18px auto;
    color: #181818;
    display: flex;
    position: relative;
  }
  .content .box .back{
    background-color: #BBD9FE;
    width: 0;
    height: 100%;
    position: absolute;
    transition: width 0.2s;
    z-index: 2;
  }
  .content .box .on{
    width: 100%;
  }
  .content .box .box-left{
    width: calc(100% - 42px);
    height: 108px;
    /*background-color: #2D7FE4;*/
    box-sizing: border-box;
    z-index: 3;
  }
  .content .box .box-right{
    width: 42px;
    height: 108px;
    line-height: 40px;
    /*background-color: #4598FF;*/
    /*color: #ACD1FF;*/
    padding-top: 14px;
    box-sizing: border-box;
    z-index: 3;
    color: #BBD9FE;
  }
  .content .box .box-right *{
    cursor:pointer;
  }
  .content .box .in{
    color: #FFF;
  }
  .content .box .box-right .iconfont{
    font-size: 30px;
    font-weight:normal
  }
  .content .box .box-left{
    color: #181818;
    font-size: 17px;
  }
  .content .box .box-left .box-left-top{
    height: 54px;
    width: 100%;
    line-height: 54px;
    padding-left: 51px;
    position: relative;
  }
  .content .box .box-left .box-left-top span{
    position: absolute;
    top:7px;
    max-width: 360px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .content .box .box-left .box-left-bottom{
    height: 54px;
    width: 100%;
    line-height: 54px;
    padding-left: 51px;
    position: relative;
  }
  .content .box .box-left .box-left-bottom *{
    display: inline-block;
  }
  .content .box .box-left p{
    color: #181818;
    font-size: 17px;
    margin-right: 263px;
    position: absolute;
    top:-7px;
    max-width: 360px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .content .box .box-left p>span{

  }
  /*删除*/
  .delectBox{
    width:1080px;
    height:302px;
    background:rgba(255,255,255,1);
    box-shadow:1px 1px 4px 2px rgba(199,206,214,1);
    border-radius:14px;
    position: fixed;
    z-index: 9;
    top: 50%;
    margin-top: -151px;
    left: 50%;
    margin-left: -540px;
    text-align: center;
  }
  .delectBox i{
    color: #f7ba2a;
    font-size: 80px;
    margin-top: 39px;
    display: block;
  }
  .delectBox span{
    display: block;
    width:267px;
    height:45px;
    font-size:30px;
    color:rgba(92,92,92,1);
    line-height:45px;
    margin: 30px auto;
  }
  .delectBox .btn{
    margin: 13px auto;
  }
  .delectBox .btn>div{
    width:226px;
    height:54px;
    background:rgba(69,152,255,1);
    border-radius:14px;
    color: #FFF;
    font-size: 22px;
    text-align: center;
    line-height: 54px;
    display: inline-block;
    cursor:pointer;
  }
  /*添加*/
  .redact{
    width: 1080px;
    height: 540px;
    background:rgba(255,255,255,1);
    box-shadow:1px 1px 4px 2px rgba(199,206,214,1);
    border-radius:16px;
    position: fixed;
    z-index: 9;
    top: 50%;
    margin-top: -270px;
    left: 50%;
    margin-left: -540px;
    text-align: center;
  }
  .redact h6{
    margin-top: 30px;
    color: #5C5C5C;
    font-size: 27px;
  }
  .redact .redact-hang{
    margin-top: 22px;
    height: 91px;
    width: 100%;
    text-align: left;
    padding-left: 36px
  }
  .redact .redact-hang .redact-ge{
    height: 91px;
    display: inline-block;
  }
  .redact .redact-hang .redact-ge span{
    font-size:20px;
    color:rgba(32,95,172,1);
    line-height:33px;
    display: block;
    text-align: left;
  }
  .redact .redact-hang .redact-ge input{
    width: 288px;
    height: 54px;
    border:1px solid rgba(183,191,199,1);
    box-sizing: border-box;
    color: #BCBCBC;
    padding-left: 20px;
    font-size: 23px;
    background:rgba(245,250,254,1);
  }
  .redact .redact-hang .redact-ge div{
    width: 216px;
    height: 54px;
    box-sizing: border-box;
  }
  .redact .redact-hang .redact-ge p{
    display: inline-block;
    width: 96px;
    height: 54px;
    background:rgba(148,194,252,1);
    border-radius:16px;
    box-sizing: border-box;
    text-align: center;
    line-height: 54px;
    font-size: 20px;
    color: #FFF;
    margin-right: 10px;
    cursor:pointer;
  }
  .redact .redact-hang .redact-ge .active{
    background-color: #4598ff;
  }
  .redact .btn{
    margin: 33px auto;
  }
  .redact .btn>div{
    width:226px;
    height:54px;
    background:rgba(69,152,255,1);
    border-radius:14px;
    color: #FFF;
    font-size: 22px;
    text-align: center;
    line-height: 54px;
    display: inline-block;
    cursor:pointer;
  }
  /*输入框提示文字*/
  input::-webkit-input-placeholder { /* WebKit browsers */
    color: #BCBCBC;
  }

  input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #BCBCBC;
  }

  input::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #BCBCBC;
  }

  input:-ms-input-placeholder { /* Internet Explorer 10+ */
    color: #BCBCBC;
  }
  /*过渡动画*/
  /* 定义进入动画的初始状态*/
  .fade-enter {
    opacity: 0;
  }

  /* 定义进入动画的结束状态*/
  .fade-enter-to {
    opacity: 1;
  }
  /* 定义离开动画的初始状态*/
  .fade-leave {
    opacity: 1;
  }

  /* 定义离开动画的结束状态*/
  .fade-leave-to {
    opacity: 0;
  }
</style>


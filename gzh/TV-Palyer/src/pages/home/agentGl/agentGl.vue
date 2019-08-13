<template>
  <div id="agent">
    <div class="title">
      <span>Agents</span>
      <div class="search">
        <input type="text" placeholder="search for name" v-model="search">
        <i class="iconfont" >&#xe645;</i>
      </div>
    </div>
    <div class="content">
      <div class="handle">
        <i class="iconfont" @click="addAlert">&#xe601;</i>
<!--        <p :class="{active:checkAll}" @click="checkAllShow">Select All</p>-->
<!--        <b class="iconfont" @click="toggerAlert">&#xe696;</b>-->
      </div>
      <transition-group
        name="bounce"
        enter-active-class="bounceInLeft"
        leave-active-class="bounceOutRight"
        :duration="600"
      >
        <div class="box" v-for="(item,index) in xsList" :key="item.id" >
          <div class="back" :class="{on:item.ck}"></div>
          <div class="box-left">
            <div class="box-left-top">
              <span style="left: 51px">Name: {{item.name}}</span>
              <span style="left: 311px">password: {{item.password}}</span>
              <span style="left: 729px">Agent: {{item.agent}}</span>
              <span style="left: 913px">Telephone: {{item.telephone}}</span>
            </div>
            <div class="box-left-bottom">
              <p style="left: 51px">Add: {{item.add}}
              </p>
              <p style="left: 521px">Country: {{item.country}}</p>
              <p style="left: 811px">Remark: {{item.remark}}</p>
            </div>

          </div>
          <div class="box-right" :class="{in:item.ck}">
<!--            编辑-->
            <i class="iconfont" @click.stop="alterItem(item.id,item.createtime)">&#xe619;</i>
<!--            删除-->
<!--            <b class="iconfont" @click.stop="toggerAlert2(item.id)">&#xe696;</b>-->
          </div>
        </div>
      </transition-group>


    </div>
    <!--添加-->
      <div class="redact" v-if="showAdd" :key="223466">
        <h6>{{msg}} Agents</h6>
        <div class="redact-hang">
          <div class="redact-ge" style="margin-right: 108px">
            <span>Name：</span>
            <input type="text" v-model="name">
          </div>
          <div class="redact-ge" style="margin-right: 108px">
            <span>Password：</span>
            <input type="text" style="width: 216px" v-model="password">
          </div>
          <div class="redact-ge">
            <span>Agent：</span>
            <input type="text" v-model="agent">
          </div>
        </div>
        <div class="redact-hang">
          <div class="redact-ge" style="margin-right: 108px">
            <span>Telephone：</span>
            <input type="text" v-model="phone">
          </div>
          <div class="redact-ge" style="margin-right: 108px">
            <span>Country：</span>
            <input type="text" style="width: 216px" v-model="country">
          </div>
          <div class="redact-ge">
            <span>Add：</span>
            <input type="text" v-model="add">
          </div>
        </div>
        <div class="redact-hang" >
          <div class="redact-ge" style="margin-right: 108px">
            <span>Remark：</span>
            <input type="text" style="width: 612px" v-model="remark">
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
<!--      <div class="delectBox" v-if="showAlert" :key="123466">-->
<!--        <i class="iconfont">&#xe624;</i>-->
<!--        <span>Delect selected？</span>-->
<!--        <div class="btn">-->
<!--          <div style="margin-right: 36px" @click="toggerAlert">Cancel</div>-->
<!--          <div style="margin-left: 36px" @click="deleteItem">Confirm</div>-->
<!--        </div>-->
<!--      </div>-->
  </div>
</template>

<script>
  // const ajaxUrl='http://192.168.1.234:999/haotian/xcx.do'
  const ajaxUrl='http://47.110.228.20:89/haotian/xcx.do'
  // const ajaxUrl= 'http://192.168.1.15:999/com_pangu_tang_web_war_exploded/xcx.do'
    export default {
        name: "agentGl",
      data(){
          return{
            list:[],
            checkAll:false,
            showAlert:false,
            dIndex:-1,
            showIndex:-1,
            showAdd:false,
            name:'',
            password:'8888',
            agent:'',
            phone:'',
            country:'',
            add:'',
            remark:'',
            afterIndex:-1,
            search:'',
            msg:'',
            userId:'',
            id:'',
            createtime:'',
            cmsg:'',
            showMsg:false
          }
      },
      computed:{
        xsList(){
          const that=this
          let list=that.list
          if(that.search==''){
            return list
          }else {
            let list2=[]
            for(let i=0;i<list.length;i++){
              if(list[i].name.toLowerCase().indexOf(that.search.toLowerCase())!=-1){
                list2.push(list[i])
              }
            }
            return list2
          }
        }
      },
      methods:{
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
          let index=null
          const list=this.list
          for(let i=0;i<list.length;i++){
            if(id==list[i].id){
              index=i
            }
          }
          this.showAlert=!this.showAlert
          this.dIndex=index
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
          that.name=''
          that.password='8888'
          that.agent=''
          that.phone=''
          that.add=''
          that.country=''
          that.remark=''
        },
        //添加
        addAlert(){
          this.showAdd=true
          this.msg='New'
        },
        addItem(){
          const that=this
          const xIndex=that.afterIndex
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
                type:'updateAgent',
                data:JSON.stringify({
                  daiLiShangMing:that.agent,
                  tel:that.phone,
                  country:that.country,
                  addr:that.add,
                  userId:that.name,
                  pwd:that.pwd,
                  remark:that.remark,
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
                    name:list.userid,
                    password:list.pwd,
                    agent:list.dailishangming,
                    telephone:list.tel,
                    add:list.addr,
                    country:list.country,
                    remark:list.remark,
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
                type:'updateAgent',
                data:JSON.stringify({
                  daiLiShangMing:that.userId,
                  tel:that.phone,
                  country:that.country,
                  addr:that.add,
                  userId:that.name,
                  // pwd:that.password,
                  id:that.id,
                  createTime:that.createtime,
                  remark:that.remark,
                  // agent:that.agent,
                })
              },
              success: function (data) {
                console.log(data)
                if (!data.errorDesc) {
                  that.list[xIndex].name=that.name
                  that.list[xIndex].password=that.password
                  that.list[xIndex].agent=that.agent
                  that.list[xIndex].telephone=that.phone
                  that.list[xIndex].add=that.add
                  that.list[xIndex].country=that.country
                  that.list[xIndex].remark=that.remark
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
          that.name=that.list[index].name
          that.password=that.list[index].password
          that.agent=that.list[index].agent
          that.phone=that.list[index].telephone
          that.add=that.list[index].add
          that.country=that.list[index].country
          that.remark=that.list[index].remark
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
        // 获取代理商列表
        getData(){
          const that=this
          $.ajax({
            type: "POST",
            url: ajaxUrl,
            dataType: "jsonp",
            // data: "name=garfield&age=18",
            data: {
              operationType: 'shiBoDianShiTaiService',
              type:'queryAgent',
              data:JSON.stringify({
                // daiLiShangMing:that.userId
              })
            },
            success: function (data) {
              console.log(data)
              if (!data.errorDesc) {
                let list=eval('('+data.result+')')
                console.log(list)
                let list2=[]
                for(let i=0;i<list.length;i++){
                  let son={
                    name:list[i].userid,
                    password:list[i].pwd,
                    agent:list[i].dailishangming,
                    telephone:list[i].tel,
                    add:list[i].addr,
                    country:list[i].country,
                    remark:list[i].remark,
                    ck: false,
                    id:list[i].id,
                    createtime:list[i].createtime,
                    modifytime:list[i].modifytime
                  }
                  list2.push(son)
                }
                that.list=list2
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
  #agent{
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
  .title .search{
    display: inline-block;
    width: 420px;
    height: 54px;
    margin-left: 470px;
  }
  .title span{
    display: inline-block;
    width: 100px;
    height: 54px;
    line-height: 54px;
  }
  .title .search input{
    width: 360px;
    height: 54px;
    box-sizing: border-box;
    border-radius: 27px;
    border: 2px solid #BBD5F6;
    padding-left: 29px;
    padding-right: 70px;
    line-height: 54px;
    color: #5C5C5C;
    font-size: 20px;
    background-color: #E0F1FF;
    outline: none;
  }
  .title .search i{
    font-size: 26px;
    color: #FFF;
    position: relative;
    right: 60px;
    cursor:pointer;
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
  }
  .content .handle *{
    display: inline-block;
    height:33px;
    line-height: 33px;
    text-align: center;
  }
  .content .handle i{
    width: 60px;
    color: #ACD1FF;
    font-size: 30px;
    cursor:pointer;
  }
  .content .handle p{
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
    max-width: 400px;
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
    max-width: 400px;
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

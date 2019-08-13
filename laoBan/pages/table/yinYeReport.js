// pages/table/yinYeReport.js
import {
  Datas
} from '../../utils/data.js'
import {
  api
} from '../../api/config.js'
const datas = new Datas()
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: false,
    begin: '',
    end: '',
    begintime: new Date().getTime(),
    endtime: new Date().getTime(),
    shopTitle: ['金额/数量', '本月累计'],
    gradeData: [],
    shopName: '',
    datetype: 'date',
    tous:[],
    quans:[],
    chans:[],
    xmus:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0
    })
    this.getyesterday()
    const shopName = wx.getStorageSync('userinfo').companyName
    this.setData({
      shopName: shopName
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //获取日期
  resdata: function (e) {
    console.log(e)
    this.setData({
      begin: e.detail.begin,
      end: e.detail.end,
      begintime: e.detail.begintime,
      endtime: e.detail.endtime,
      showGdTitle:false
    })
    // this.getList()
  },
  //切换查询方式
  changedata() {
    var status = this.data.status
    this.setData({
      status: !status
    })
  },
  //时段查询
  // checkdata: function (e) {
  //   var that = this;
  //   console.log(e)
  //   var type = e.currentTarget.dataset.id
  //   that.setData({
  //     type: type
  //   })
  //   if (type == 0) {
  //     this.getToday()
  //   } else if (type == 1) {
  //     this.getyesterday()
  //   } else if (type == 2) {
  //     this.getCurrentMonth()
  //   } else {
  //     this.getlastMonth()
  //   }
  // },
  // getToday() {
  //   var that = this;
  //   let timeType = 1;
  //   let end = datas.gettoday()
  //   let begin = datas.gettoday()
  //   let begin1 = begin.replace(/-/g, '/');
  //   let end1 = end.replace(/-/g, '/');
  //   that.setData({
  //     timeType: timeType,
  //     begin: begin,
  //     end: end,
  //     begintime: new Date(begin1).getTime(),
  //     endtime: new Date(end1).getTime()
  //   })
  //   this.getList()
  // },
  todetail(e) {
    let begin = e.currentTarget.dataset.begin
    let end = e.currentTarget.dataset.end
    let type = e.currentTarget.dataset.type
    wx.navigateTo({
      url: '/pages/webpage/statisticsdetail?type=' + type + '&begin=' + begin + '&end=' + end,
    })
  },
  changedata() {
    var status = this.data.status
    this.setData({
      status: !status
    })
  },
  getdata: function (e) {
    console.log(e)
    this.setData({
      begin: e.detail.begin,
      end: e.detail.end,
      begintime: e.detail.begintime,
      endtime: e.detail.endtime
    })
    this.getList()
  },
  getdatatimebegin: function (e) {
    console.log(e)
    this.setData({
      begin: e.detail.data,
      begintime: e.detail.datatime
    })
  },
  getdatatimeend: function (e) {
    console.log(e)
    this.setData({
      end: e.detail.data,
      endtime: e.detail.datatime
    })
  },
  formatter: function (val) {
    var strs = val.split(''); //字符串数组
    var str = ''
    for (var i = 0, s; s = strs[i++];) { //遍历字符串数组
      str += s;
      if (!(i % 4)) str += '\n'; //按需要求余
    }
    return str
  },
  getList() {
    console.log('1')
    const that = this;
    wx.showLoading({
      title: '加载中',
    })
    const userId = wx.getStorageSync('userinfo').userId
    const companyCode = wx.getStorageSync('userinfo').companyCode
    let gradeList = []
    // mdList[i].companycode
      wx.request({
        url: api.url,
        data: {
          operationType: 'queryLocal',
          companyCode: companyCode,
          queryType: 'YingYeKuaiBao',
          date: that.data.begin,
          userId:userId
          // date: "2019-06-02"
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'post',
        success(res) {
          wx.hideLoading()
          if (res.data.success) {
            let list = res.data.result
            console.log(list)
            let gradeData=[]
            let quans=[]
            let tous=[]
            let chans = []
            let xmus=[]
            let yuans=[]
            for (let i = 0; i < list.length; i++){
              if (list[i].proName=='总实收'){
                let zonShiShou = {}
                zonShiShou.proName = list[i].proName
                zonShiShou.benRiVal = list[i].benRiVal
                zonShiShou.benYueVal = list[i].benYueVal
                // color ='#ff7979'
                tous.push(zonShiShou)
                // delete list[i];
              } else if (list[i].proName.indexOf('[张]') != -1){
                let son={
                proName : list[i].proName,
                benRiVal : list[i].benRiVal,
                benYueVal : list[i].benYueVal
                
                }
                quans.push(son)
              } else if (list[i].proName.indexOf('[元]') != -1 ){
                let son = {
                proName: list[i].proName,
                benRiVal: list[i].benRiVal,
                benYueVal: list[i].benYueVal
                }
                yuans.push(son)
              } else if (list[i].proName.indexOf('[个]') != -1) {
                let son = {
                  proName: list[i].proName,
                  benRiVal: list[i].benRiVal,
                  benYueVal: list[i].benYueVal
                }
                xmus.push(son)
              }else if (list[i].proName.indexOf('[次]') != -1) {
                let son = {
                  proName: list[i].proName,
                  benRiVal: list[i].benRiVal,
                  benYueVal: list[i].benYueVal
                }
                chans.push(son)
              }else{
                let son = {
                  proName: list[i].proName,
                  benRiVal: list[i].benRiVal,
                  benYueVal: list[i].benYueVal
                }
                gradeData.push(son)
              }   
            }
            
            console.log(tous)
            console.log(quans)
            console.log(chans)
            console.log(xmus)
            console.log(yuans)
            for(let i=0;i<yuans.length;i++){
              xmus.push(yuans[i])
            }
           
            that.setData({
              gradeData: gradeData,
              tous: tous,
              quans: quans,
              chans: chans,
              xmus: xmus,
             
            })
            
          } else {
            wx.showToast({

              title: res.data.errorDesc,

              icon: 'none',

              duration: 1000//持续的时间

            })
          }
        }
      })
  },
  // toYinYeReport(e) {
  //   const companyCode = e.currentTarget.id
  //   const userId = wx.getStorageSync('userinfo').userId
  //   const pwd = wx.getStorageSync('userinfo').pwd
  //   const companyName = e.currentTarget.dataset.name
  //   console.log(companyCode)
  //   console.log(companyName)
  //   let list = {
  //     companyCode: companyCode,
  //     userId: userId,
  //     pwd: pwd,
  //     companyName: companyName
  //   }
  //   wx.setStorageSync("userinfo", list);
  //   console.log(wx.getStorageSync('userinfo'))
  //   wx.navigateTo({
  //     url: '/pages/table/yinYeReport',
  //   })
  // },
  
  getyesterday() {
    var that = this;
    let timeType = 1;
    let end = that.checkdatatime(datas.getyesterday())
    let begin = that.checkdatatime(datas.getyesterday())
    let begin1 = begin.replace(/-/g, '/');
    let end1 = end.replace(/-/g, '/');
    that.setData({
      timeType: timeType,
      begin: begin,
      end: end,
      begintime: new Date(begin1).getTime(),
      endtime: new Date(end1).getTime()
    })
    that.getList()
  },
  checkdatatime: function (e) {
    var time = new Date(e.replace(/-/g, '/'));
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    var datas = y + '-' + this.add0(m) + '-' + this.add0(d)
    return datas
  },
  add0: function (m) {
    return m < 10 ? '0' + m : m
  },
  longTap(){
    const that=this
    var query = wx.createSelectorQuery()//创建节点查询器 query
    query.select('#title').boundingClientRect()//这段代码的意思是选择Id=the-id的节点，获取节点位置信息的查询请求
    query.selectViewport().scrollOffset()//这段代码的意思是获取页面滑动位置的查询请求
    query.exec(function (res) {
      // res[0].top       // #the-id节点的上边界坐标
      // res[1].scrollTop // 显示区域的竖直滚动位置
      // console.log(res)
      console.log(res[0].top)
      console.log(res[0].left)
      if (res[0].top>0){
        console.log('hhh')
        that.setData({
          showGdTitle: false
        })
      }else{
        that.setData({
          showGdTitle: true,
          trLeft: res[0].left
        })
      }
    })
  },
  toBmyj(){
    console.log('2')
    let begin = this.data.begin
    wx.navigateTo({
      url: '/pages/section/secGrade?begin=' + begin,
    })
  },
  topOut() {
    console.log('2')
    setTimeout(() => {
      
      const that = this
      var query = wx.createSelectorQuery()//创建节点查询器 query
      query.select('#title').boundingClientRect()//这段代码的意思是选择Id=the-id的节点，获取节点位置信息的查询请求
      query.selectViewport().scrollOffset()//这段代码的意思是获取页面滑动位置的查询请求
      query.exec(function (res) {
        // res[0].top       // #the-id节点的上边界坐标
        // res[1].scrollTop // 显示区域的竖直滚动位置
        // console.log(res)
        console.log(res[0].top)
        console.log(res[0].left)
        if (res[0].top > 0) {
          console.log('hhh')
          that.setData({
            showGdTitle: false
          })
        } else {
          that.setData({
            showGdTitle: true,
            trLeft: res[0].left
          })
        }
      })
    }, 500)

  }
})
// pages/clock /clock.js
var app = getApp();
import {
  api
} from '../../api/config.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showBox:1,
    roomData:[],
    //技师信息
    jSData: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(app.globalData.userinfo)
    this.getRoomData()
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
    console.log(this.data.showBox)
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
  //获取房间状态
  getRoomData(){
    const that=this
    let companyCode = wx.getStorageSync('userinfo').companyCode
    let techId = wx.getStorageSync('userinfo').userId
    wx.request({
      url: api.url,
      data: {
        companyCode: companyCode,
        operationType: 'queryLocal',
        queryType: 'RoomStatus',
        techId: techId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success(res) {
        console.log(res.data);
        const data = res.data.result
        let list=[];
        for (let i = 0; i < data.length;i++){
          //获取开始时间
          const qzTime = data[i].qiZhongTime.split(" ");
          //获取剩余时间
          const syTime = data[i].leftTime
          //获取房态
          let color=''
          switch (data[i].status){
            case 0:
            console.log('111')
              color='#FFFFFF';
              break;
            case 1:
              color = '#ff6b6b';
              break;
            case 2:
              color = '#ff9f43';
              break;
            case 3:
              color = '#00d2d3';
              break;
            case 4:
              color = '#48dbfb';
              break;
            case 5:
              color = '#c8d6e5';
              break;   
          }
          let list2={
            name: data[i].name,
            techId: data[i].techId,
            qiZhongTime: qzTime[3],
            leftTime: syTime,
            color: color
          }
          list.push(list2)
        }
        // console.log(list);
        that.setData({
          roomData: list
        });
      }
    })
  },
  //获取技师状态
  getJsData(){
    console.log('a')
    const that = this
    const companyCode = wx.getStorageSync('userinfo').companyCode
    const techId = wx.getStorageSync('userinfo').techId
    wx.request({
      url: api.url,
      data: {
        companyCode: companyCode,
        operationType: 'queryLocal',
        queryType: 'queryJiShiStatus',
        techId: techId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success(res) {
        console.log(res.data.result);
        const data = res.data.result
        let list = [];
        for (let i = 0; i < data.length; i++) {
          //获取开始时间
          let qzTime = data[i].startTime.split(" ");
          //获取剩余时间
          const syTime = data[i].leftTime
          let list2 = {
            id: data[i].id,
            techStatus: data[i].techStatus,
            startTime: qzTime[1],
            leftTime: syTime,
            gender: data[i].gender,
          }
          list.push(list2)
        }
        // console.log(list);
        that.setData({
          jSData: list
        });
      }
    })
  },
  //切换状态
  show(e){
    const index = e.currentTarget.dataset.name
    this.setData({
      showBox: index
    });
    // console.log(this.data.showBox)
    // console.log(this.data.jSData)
    if (index == 2 && this.data.jSData==null){
      this.getJsData()
      console.log('bbbb')
    }
  },
  //跳转路由
  gotoPr(e){
    wx.navigateTo({
      url: '/pages/dispatch/dispatch?roomId=' + e.currentTarget.id,
    })
  },
  gotoPj(e) {
    wx.navigateTo({
      url: '/pages/dispatch/dispatch?jishiId=' + e.currentTarget.id,
    })
  },
})
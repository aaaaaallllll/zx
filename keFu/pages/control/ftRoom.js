// pages/control/ftRoom.js
import {
  api
} from '../../api/config.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    roomName:'',
    showIndex:0,
    dtLeft:47,
    roomData:[{
      color:'#2878FF'
    },
    {
      color: '#BFBFBF'
    }],
    xianShiList:[],
    konFanList:[],
    youKeList:[]
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
    this.getList()
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
  //双向绑定
  sXuanUpdateValue(e) {
    let name = e.currentTarget.dataset.name;
    // let nameMap = {}
    let value = e.detail && e.detail.value
    let index = this.data.showIndex
    let roomList =[]
    // nameMap[name] = value
    if (index==0){
      roomList = this.data.roomData
    }else if(index==1){
      roomList = this.data.youKeList
    }else{
      roomList = this.data.konFanList
    }
    
    let list=[]
    // console.log('Abc'.toLowerCase())
    roomList.forEach(v=>{
      if (v.name.toLowerCase().indexOf(value.toLowerCase())!=-1){
        list.push(v)
      }
    })
    // nameMap[xianShiList] = list
    this.setData({
      roomName: value,
      xianShiList:list

    })
  },
  //筛选
  toStatu(e){
    let index = e.currentTarget.dataset.name;
    let left=0;
    let list = []
    if(index==0){
      left = 47
      list = this.data.roomData
    }else if(index==1){
      left=162
      list = this.data.youKeList
    }else{
      left=271
      list = this.data.konFanList
    }
    
    
    this.setData({
      showIndex:index,
      dtLeft: left,
      xianShiList:list
    })
  },
  //获取房间状态
  getList() {
    wx.showLoading({
      title: '加载中',
    })
    const that = this
    let companyCode = wx.getStorageSync('userinfo').companyCode
    let techId = wx.getStorageSync('userinfo').userId
    wx.request({
      url: api.url,
      data: {
        companyCode: companyCode,
        operationType: 'queryLocal',
        // queryType: 'FangKongGetStatus',
        userId: techId,
        queryType: 'RoomStatus'
        
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success(res) {
        wx.hideLoading()
        if (res.data.success) {
          console.log(res.data);
          const data = res.data.result
          let list = []
          let youKeList = []
          let konFanList = []
          for (let i = 0; i < data.length; i++) {
            //获取开始时间
            const qzTime = data[i].qiZhongTime.split(" ");
            let qzzhTime = ''
            // console.log(qzTime)
            // for (let j = 0; j < qzTime.length;j++){
            //   if (qzTime[i].indexOf('AM') != -1 || qzTime[i].indexOf('PM') != -1){
            //     qzzhTime = qzTime[i]
            //   }
            // }
            //获取剩余时间
            const syTime = Math.abs(data[i].leftTime)
          //获取房态
          let color = ''
          switch (data[i].status) {
            case 0:
              color = '#BFBFBF';
              break;
            case 1:
              color = '#2878FF';
              break;
            case 2:
              color = '#BFBFBF';
              break;
            case 3:
              color = '#2878FF';
              break;
            case 4:
              color = '#BFBFBF';
              break;
            case 5:
              color = '#BFBFBF';
              break;
            case 6:
              color = '#2878FF';
              break;
          }
          let list2 = {
            name: data[i].name,
            techId: data[i].techId,
            qiZhongTime: qzTime[4],
            leftTime: syTime,
            color: color
          }
            if (list2.color =='#BFBFBF'){
              konFanList.push(list2)
            }else{
              youKeList.push(list2)
            }
          list.push(list2)
        }
        
        console.log(list);
        that.setData({
          roomData: list,
          konFanList: konFanList,
          youKeList: youKeList,
          xianShiList: list
        });
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
  toControl(e){
    wx.navigateTo({
      url: '/pages/control/control?roomNo=' + e.currentTarget.dataset.id,
    })
  }
})
// pages/control/ftRoom.js
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
    }]
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
  updateValue(e) {
    let name = e.currentTarget.dataset.name;
    let nameMap = {}
    nameMap[name] = e.detail && e.detail.value
    this.setData(nameMap)
  },
  //筛选
  toStatu(e){
    let index = e.currentTarget.dataset.name;
    let left=0;
    if(index==0){
      left = 47
    }else if(index==1){
      left=162
    }else{
      left=271
    }
    this.setData({
      showIndex:index,
      dtLeft: left
    })
  }
})
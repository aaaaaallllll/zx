// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showIndex:-1,
    phone:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const phone = wx.getStorageSync('userinfo').userId
    this.setData({
      phone:phone
    })
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
  showCT(e){
    const index = e.currentTarget.dataset.name
    if (this.data.showIndex==index){
      this.setData({
        showIndex: -1
      });
    }else{
      this.setData({
        showIndex: index
      });
    }
    
    console.log(this.data.showIndex)
  },
  toLogin(){
    wx.reLaunch({
      url: '/pages/login/login',
    })
  },
  toList() {
    wx.navigateTo({
      url: '/pages/myStore/list',
    })
  },
  toAdd() {
    wx.navigateTo({
      url: '/pages/myStore/add',
    })
  },
  toDelete() {
    wx.navigateTo({
      url: '/pages/myStore/delete',
    })
  }
})
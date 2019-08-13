// pages/myStore/delete.js
import {
  api
} from '../../api/config.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nocancel:true,
    dIndex:-1,
    list: [],
    kong:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(wx.getStorageSync('userinfo').data)
    // const _data = JSON.parse(wx.getStorageSync('userinfo').data)
    // const _data = wx.getStorageSync('userinfo').data
    // if (_data.length>0){
    //   this.setData({
    //     list: _data
    //   })
    // }else{
    //   this.setData({
    //     kong: true
    //   })
    // }
    // console.log(_data)
    this.getList()
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
  //确认
  confirm(){
    const that=this
    console.log('aaa')
    const index=that.data.dIndex
    const userId = wx.getStorageSync('userinfo').userId
    // const index = e.currentTarget.dataset.name
    let list = that.data.list 
    const companyCode = list[index].companycode
    wx.request({
      url: api.ajaxUrl,
      data: {
        operationType: 'xcxBossUserService',
        userId: userId,
        companyCode: companyCode,
        type: 'delete'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success(res) {
        console.log(res.data)
        if (res.data.success) {
          list.splice(index, 1)
          if (list.length > 0) {
            that.setData({
              list: list,
              nocancel: true,
              dIndex: -1
            })
          } else {
            that.setData({
              list: list,
              kong: true,
              nocancel: true,
              dIndex: -1
            })
          }
        
          wx.showToast({

            title: '已删除',

            icon: 'none',

            duration: 1000//持续的时间

          })
          
          
         
        }

      }
    })

  },
  //取消
  cancel(){
    this.setData({
      nocancel:true
    })
  },
  //删除
  deleteShop(){
    const that=this
    this.setData({
      nocancel: false
    })
  },
  //点击
  onDown(e){
    const that=this
    const _index = e.currentTarget.dataset.name
    const index = that.data.dIndex
    if(index==_index){
      that.setData({
        dIndex:-1
      })
    }else{
      that.setData({
        dIndex: _index
      })
    }
  },
  //获取列表
  getList(){
    const that=this
    const userId = wx.getStorageSync('userinfo').userId
    wx.request({
      
      url: api.ajaxUrl,
      data: {
        operationType: 'xcxBossUserService',
        userId: userId,
        type: 'query'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success(res) {
        console.log(res.data)
        if (res.data.success) {
          const _data = JSON.parse(res.data.result)
          if (_data.length>0){
            that.setData({
              list: _data
            })
          }else{
            that.setData({
              kong: true
            })
        }
        }else{
          wx.showToast({

            title: '获取失败',

            icon: 'none',

            duration: 1000//持续的时间

          })
        }

      }
    })
  }
})
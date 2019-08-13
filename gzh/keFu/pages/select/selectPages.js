// pages/select/selectPages.js
import {
  api
} from '../../api/config.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    today: '',
    tomorrow: '',
    afterday: '',
    disableid: '',
    jiShiId: '',
    xmList: [],
    xzList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)

    this.setData({
      jiShiId: options.jiShiId
    })
    console.log('2')
    this.getPages()
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
  //按钮
  chenk() {
    const that = this

    if (that.data.xzList.length == 0) {
      wx.showToast({

        title: '请选择项目',

        icon: 'none',

        duration: 1000//持续的时间

      })
      return
    }
    const xzList = that.data.xzList
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    prevPage.setData({
      xzList: xzList,
    })
    wx.navigateBack({
      delta: 1,
    }) 

  },
  //选择项目
  alterPg(e) {
    const that = this
    let index = e.currentTarget.dataset.id
    // console.log(index)
    let xmList = that.data.xmList
    let xzList = that.data.xzList
    xmList[index].checked = !xmList[index].checked

    if (xmList[index].checked) {
      // console.log('1')
      let son = {
        menuName: xmList[index].menuName,
        price: xmList[index].price,
        shiJian: xmList[index].shiJian
      }
      xzList.push(son)
    } else {
      // console.log('2')
      for (let i = 0; i < xzList.length; i++) {
        if (xzList[i].menuName == xmList[index].menuName) {
          xzList.splice(i, 1)
        }
      }
    }
    that.setData({
      xmList: xmList,
      xzList: xzList
    })
  },
  getPages(){
    const that=this
    const companyCode = wx.getStorageSync('userinfo').companyCode
    wx.request({
      url: api.url,
      data: {
        operationType: 'queryLocal',
        companyCode: companyCode,
        techId: that.data.jiShiId,
        queryType: 'JiShiYuYueTechMenus'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success(res) {
        console.log(res)

        if (res.data.success) {
          that.setData({
            xmList: res.data.result
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
  }
})
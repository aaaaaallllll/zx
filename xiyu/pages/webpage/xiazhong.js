import {
  Login
} from '../../utils/login.js'
const login = new Login()
import {
  Model
} from '../../api/model.js'
const Models = new Model()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tagid: 0,
    roomNos: [],
    menu: '',
    seatText: '',
    roomNo: '',
    number: '',
    techMsgId: '',
    techmenus: [],
    listData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let companyName = wx.getStorageSync('userinfo').companyName
    this.setData({
      companyName: companyName
    })
    this.getData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  // 获取上钟信息
  getData: function() {
    var that = this;
    let companyCode = wx.getStorageSync('userinfo').companyCode
    let techId = wx.getStorageSync('userinfo').techId
    const querySofaTechIng = Models.querySofaTechIng(companyCode, techId)
    querySofaTechIng.then(res => {
      if (res.result) {
        that.setData({
          data: res.result,
        })
      } else {
        wx.showToast({
          title: res.errorDesc,
          icon: 'none'
        })
      }
    })
  },
  // 下钟预约
  yuYueChuLi: function(accept, yuYueId) {
    var that = this;
    let companyCode = wx.getStorageSync('userinfo').companyCode
    let techId = wx.getStorageSync('userinfo').techId
    const yuYueChuLi = Models.yuYueChuLi(companyCode, techId, accept, yuYueId)
    yuYueChuLi.then(res => {
      if (res.success) {
        wx.switchTab({
          url: '/pages/home/home',
          success: function() {
            wx.showToast({
              title: '确认成功'
            })
          },
        })
      } else {
        wx.showToast({
          title: res.errorDesc,
          icon: 'none'
        })
      }
    })
  },
  // 下钟
  xiazhong: function() {
    var that = this;
    let companyCode = wx.getStorageSync('userinfo').companyCode
    let techId = wx.getStorageSync('userinfo').techId
    const xiaZhong = Models.xiaZhong(companyCode, techId)
    xiaZhong.then(res => {
      if (res.success) {
        if (res.result) {
          wx.showModal({
            title: '提示',
            content: '您还有预约是否接受？',
            success: function(sm) {
              if (sm.confirm) {
                that.yuYueChuLi('y', res.result.id)
              } else if (sm.cancel) {
                that.yuYueChuLi('n', res.result.id)
              }
            }
          })
        } else {
          wx.switchTab({
            url: '/pages/home/home',
            success: function() {
              wx.showToast({
                title: '下钟成功'
              })
            },
          })
        }
      } else {
        var str = res.errorDesc;
        console.log();
        if (str.indexOf("提前") != -1) {
          wx.showModal({
            title: '提示',
            content: res.errorDesc + '，是否要申请强制下钟？',
            success: function(sm) {
              if (sm.confirm) {
                that.qiangzhixiazhong()
              } else if (sm.cancel) {
                wx.switchTab({
                  url: '/pages/home/home',
                  success: function() {
                    wx.showToast({
                      title: '已放弃下钟',
                    })
                  },
                })
              }
            }
          })
        } else {
          wx.showToast({
            title: res.errorDesc,
            icon: 'none'
          })
        }
      }
    })
  },
  qiangzhixiazhong: function() {
    let companyCode = wx.getStorageSync('userinfo').companyCode
    let techId = wx.getStorageSync('userinfo').techId
    const xiaZhongShenQing = Models.xiaZhongShenQing(companyCode, techId)
    xiaZhongShenQing.then(res => {
      if (res.success) {
        wx.switchTab({
          url: '/pages/home/home',
          success: function() {
            wx.showToast({
              title: '下钟申请已提交成功'
            })
          },
        })
      } else {
        wx.showToast({
          title: res.errorDesc,
          icon: 'none'
        })
      }
    })
  }
})
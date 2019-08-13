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
    listData: [],
    inputShowed: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getData()
    this.gettype()
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
  // 获取类型
  gettype: function() {
    var that = this;
    let companyCode = wx.getStorageSync('userinfo').companyCode
    let techId = wx.getStorageSync('userinfo').techId
    const huJiaoFuWu = Models.huJiaoFuWu('query')
    huJiaoFuWu.then(res => {
      if (res.result) {
        var list = []
        for (let i = 0; i < res.result.length; i++) {
          var lists = {
            name: res.result[i],
            active: false
          }
          list.push(lists)
        }
        console.log(list, '333333')
        that.setData({
          listData: list,
        })
      } else {
        wx.showToast({
          title: res.errorDesc,
        })
      }
    })
  },
  sub: function() {
    var that = this;
    if (that.data.roomNo.length < 1) {
      wx.showToast({
        title: '请输入房间号',
        icon: 'none'
      })
      return
    }
    if (that.data.seatText.length == '') {
      wx.showToast({
        title: '请输入手牌号',
        icon: 'none'
      })
      return
    }
    let item = []
    let list = that.data.listData
    for (let i = 0; i < list.length; i++) {
      if (list[i].active) {
        item.push(list[i].name)
      }
    }
    console.log(item)
    if (item.length == 0) {
      wx.showToast({
        title: '请选择服务类型',
        icon: 'none'
      })
      return
    }
    that.setData({
      items: item
    })
    const huJiaoFuWupost = Models.huJiaoFuWupost(that.data.seatText, that.data.roomNo, JSON.stringify(that.data.items))
    huJiaoFuWupost.then(res => {
      if (res.success) {
        wx.switchTab({
          url: '/pages/home/home',
          success: function(res) {
            wx.showToast({
              title: '添加成功',
            })
          }
        })
      } else {
        wx.showToast({
          title: res.errorDesc,
          icon: 'none'
        })
      }
    })
  },
  tagcheck: function(e) {
    let index = e.currentTarget.dataset.id
    let list = this.data.listData

    list[index].active = !list[index].active
    this.setData({
      listData: list
    })
  },
  updateValue(e) {
    let name = e.currentTarget.dataset.name;
    let nameMap = {}
    nameMap[name] = e.detail && e.detail.value
    this.setData(nameMap)
  },
  // 提交
  getData: function() {
    var that = this;
    let companyCode = wx.getStorageSync('userinfo').companyCode
    let techId = wx.getStorageSync('userinfo').techId
    const paiQianInfo = Models.paiQianInfo(companyCode, techId)
    paiQianInfo.then(res => {
      console.log(res)
      if (res.result) {
        let list = []
        let jishitype = []
        for (var key in res.result.techJobs) {
          console.log(key); //键名
          console.log(res.result.techJobs[key]); //键值
          var lists = {
            name: key,
            list: res.result.techJobs[key]
          }
          list.push(lists)
        }
        that.setData({
          roomNos: res.result.roomNos,
          techJobs: res.result.techJobs,
          jishitype: list
        })
        console.log(that.data.jishitype, '1111')
        const techJobs = res.result.techJobs
        that.setData({
          columns: [{
              values: Object.keys(techJobs),
              className: 'column1'
            },
            {
              values: techJobs[list[0].name],
              className: 'column2',
              defaultIndex: 0
            }
          ],
        })
        console.log(that.data.techJobs)
      } else {
        wx.showToast({
          title: res.errorDesc,
        })
      }
    })
  },
  bindPickerChange(e) {
    var that = this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    that.setData({
      roomNo: that.data.roomNos[e.detail.value]
    })
  },
  changeselect() {
    this.setData({
      inputShowed: !this.data.inputShowed
    })
  }
})
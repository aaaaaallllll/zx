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
    roomNos:[],
    menu: '',
    seatText: '',
    roomNo: '',
    number: '',
    techMsgId: '',
    techmenus:[],
    listData: [],
    inputShowed:false
  },
  tagcheck: function(e) {
    console.log(e)
    this.setData({
      tagid: e.currentTarget.dataset.id
    })
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
  bindPickerChange(e) {
    var that = this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    that.setData({
      roomNo: that.data.roomNos[e.detail.value]
    })
  },
  updateValue(e) {
    let name = e.currentTarget.dataset.name;
    let nameMap = {}
    nameMap[name] = e.detail && e.detail.value
    this.setData(nameMap)
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
  // 提交
  getData: function () {
    var that = this;
    let companyCode = wx.getStorageSync('userinfo').companyCode
    let techId = wx.getStorageSync('userinfo').techId
    const paiQianInfo = Models.paiQianInfo(companyCode, techId)
    paiQianInfo.then(res => {
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
  gettype: function () {
    var that = this;
    let companyCode = wx.getStorageSync('userinfo').companyCode
    let techId = wx.getStorageSync('userinfo').techId
    const queryTechMenus = Models.queryTechMenus(companyCode, techId)
    queryTechMenus.then(res => {
      if (res.result) {
        that.setData({
          listData: res.result,
        })
      } else {
        wx.showToast({
          title: res.errorDesc,
        })
      }
    })
  },
  // 提交
  sub: function() {
    console.log('333')
    var that = this;
    if (that.data.roomNo == '') {
      wx.showToast({
        title: '请输入房间号',
        icon: 'none'
      })
      return
    }
    if (that.data.seatText == '') {
      wx.showToast({
        title: '请输入手牌号',
        icon: 'none'
      })
      return
    }
    let companyCode = wx.getStorageSync('userinfo').companyCode
    let techId = wx.getStorageSync('userinfo').techId
    const shangZhong = Models.shangZhong(companyCode, techId, that.data.listData[that.data.tagid], that.data.seatText, that.data.roomNo, that.data.number, that.data.techMsgId)
    shangZhong.then(res => {
      if (res.result) {
        wx.showToast({
          title: '提交成功'
        })
      } else {
        wx.showToast({
          title: res.errorDesc,
        })
      }
    })
  },
  changeselect() {
    this.setData({
      inputShowed: !this.data.inputShowed
    })
  }
})
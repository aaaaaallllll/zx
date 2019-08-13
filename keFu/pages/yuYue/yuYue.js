// pages/yuYue/yuYue.js
import { api } from '../../api/config.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jiShiId:'',
    phone:'',
    name:'',
    time:'',
    xzList:[],
    showIndex:0,
    openid:'',
    rengShu:null,
    fjList:['包厢','SPA','茶房'],
    fjType:'包厢',
    roomId:'',
    zuoId:'',
    userId:'',
    room:"",
    number:1
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
    this.login()
    console.log(wx.getStorageSync('userinfo'))
    const userId = wx.getStorageSync('userinfo').techId
    this.setData({
      userId: userId
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
  login() {
    const that = this
    wx.login({
      success: res => {
        console.log(res.code)
        const companyCode = wx.getStorageSync('userinfo').companyCode
        const code = res.code
        wx.request({

          // url: api.url,
          // url: api.openIdUrl,
          url: api.openIdUrl + "?requestData={\"operationType\":\"xcxGetOpenid\",\"type\":\"" + "3" + "\",\"code\":\"" + code +"\"}",
          // data: {
          //   operationType: 'xcxGetOpenid',
          //   code: code
          // },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: 'get',
          success(res) {
           

            if (res.data.success) {
              console.log(res.data.result)
              that.setData({
                openid: res.data.result
              })
              wx.setStorageSync("openid", res.data.result);
              
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
  },
  //双向绑定
  updateValue(e) {
    let name = e.currentTarget.dataset.name;
    let nameMap = {}
    nameMap[name] = e.detail && e.detail.value
    this.setData(nameMap)
  },
  toSelect(){
    wx.navigateTo({
      url: '/pages/select/select',
    })
  },
  toSelectPages(){
    if (this.data.jiShiId == '') {
      wx.showToast({

        title: '技师号不能为空',

        icon: 'none',

        duration: 1000//持续的时间

      })
      return
    }
    wx.navigateTo({
      url: '/pages/select/selectPages?jiShiId=' + this.data.jiShiId,
    })
  },
  myGoTO(e){
    let index = e.currentTarget.dataset.id;
    this.setData({
      showIndex:index
    })
  },
  // 提交预约
  sub(){
    const that=this
    const companyCode = wx.getStorageSync('userinfo').companyCode
    console.log(companyCode)
    let techId = that.data.jiShiId
    let yuJiDaoDa = that.data.time
    let name = that.data.name
    let telephoneNumber = that.data.phone
    let list = that.data.xzList
    if (techId==''){
      wx.showToast({

        title: '技师号不能为空',

        icon: 'none',

        duration: 1000//持续的时间

      })
      return
    } else if (list.length == 0) {
      wx.showToast({

        title: '预约项目不能为空',

        icon: 'none',

        duration: 1000//持续的时间

      })
      return
    }else if (yuJiDaoDa==''){
      wx.showToast({

        title: '预约时间不能为空',

        icon: 'none',

        duration: 1000//持续的时间

      })
      return
    } else if (telephoneNumber.length != 11) {
      wx.showToast({

        title: '请输入正确的手机号',

        icon: 'none',

        duration: 1000//持续的时间

      })
      return
    }
    let menus=[]
    for(let i=0;i<list.length;i++){
      let list2 = list[i].menuName
      menus.push(list2)
    }
    const openid =that.data.openid
    wx.request({
      url: api.url,
      data: {
        operationType: 'queryLocal',
        queryType: 'JiShiYuYueAdd',
        companyCode: companyCode,
        techId: techId,
        menus: JSON.stringify(menus),
        yuJiDaoDa: yuJiDaoDa,
        openid: openid,
        name: name,
        telephoneNumber: telephoneNumber,
        userId: that.data.userId,
        roomNo:that.data.room,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success(res) {
        console.log(res)

        if (res.data.success) {
          wx.showToast({

            title: '预约成功',

            icon: 'none',

            duration: 1000//持续的时间

          })
          that.setData({
            jiShiId:'',
            phone:'',
            name:'',
            time:'',
            xzList:[]
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
  //选择房间类型
  selectRoom(e){
    const type = e.currentTarget.dataset.name
    this.setData({
      fjType: type
    })
  },
  // 提交房间预约
  sub2(){
    const that = this
    const companyCode = wx.getStorageSync('userinfo').companyCode
    console.log(companyCode)
    let roomId = that.data.roomId
    let yuJiDaoDa = that.data.time
    let roomType = that.data.fjType
    let name = that.data.name
    let telephoneNumber = that.data.phone
    const openid = that.data.openid
    if (roomId == '') {
      wx.showToast({

        title: '房间号不能为空',

        icon: 'none',

        duration: 1000//持续的时间

      })
      return
    } else if (yuJiDaoDa == '') {
      wx.showToast({

        title: '预约时间不能为空',

        icon: 'none',

        duration: 1000//持续的时间

      })
      return
    } else if (telephoneNumber.length != 11) {
      wx.showToast({

        title: '请输入正确的手机号',

        icon: 'none',

        duration: 1000//持续的时间

      })
      return
    }
   
    wx.request({
      url: api.url,
      data: {
        operationType: 'queryLocal',
        queryType: 'YuYueBaoXiang',
        companyCode: companyCode,
        yuYueDate: yuJiDaoDa,
        openid: openid,
        roomType: roomType,
        roomNo: roomId,
        name: name,
        telephoneNumber: telephoneNumber,
        userId: that.data.userId,
        number:that.data.number
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success(res) {
        console.log(res)

        if (res.data.success) {
          wx.showToast({

            title: '预约成功',

            icon: 'none',

            duration: 1000//持续的时间

          })
          that.setData({
            roomId: '',
            phone: '',
            name: '',
            time: ''
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
  // 预约洗浴
  sub3(){
    const that = this
    const companyCode = wx.getStorageSync('userinfo').companyCode
    console.log(companyCode)
    let rengShu = that.data.rengShu
    let yuJiDaoDa = that.data.time
    let name = that.data.name
    let telephoneNumber = that.data.phone
    const openid = that.data.openid
    if (rengShu == null) {
      wx.showToast({

        title: '人数不能为空',

        icon: 'none',

        duration: 1000//持续的时间

      })
      return
    } else if (rengShu == 0) {
      wx.showToast({

        title: '人数不能为零',

        icon: 'none',

        duration: 1000//持续的时间

      })
      return
    } else if (yuJiDaoDa == '') {
      wx.showToast({

        title: '预约时间不能为空',

        icon: 'none',

        duration: 1000//持续的时间

      })
      return
    } else if (telephoneNumber.length != 11) {
      wx.showToast({

        title: '请输入正确的手机号',

        icon: 'none',

        duration: 1000//持续的时间

      })
      return
    }

    wx.request({
      url: api.url,
      data: {
        operationType: 'queryLocal',
        queryType: 'CanYinYuDing',
        companyCode: companyCode,
        yuYueDate: yuJiDaoDa,
        openid: openid,
        yuYueLeiXing: '洗浴预订',
        number: rengShu,
        name: name,
        tableNo: " ",
        telephoneNumber: telephoneNumber,
        userId: that.data.userId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success(res) {
        console.log(res)

        if (res.data.success) {
          wx.showToast({

            title: '预约成功',

            icon: 'none',

            duration: 1000//持续的时间

          })
          that.setData({
            rengShu: null,
            phone: '',
            name: '',
            time: '',
            zuoId: ''
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
  //预约餐饮
  sub4(){
    const that = this
    const companyCode = wx.getStorageSync('userinfo').companyCode
    console.log(companyCode)
    let rengShu = that.data.rengShu
    let yuJiDaoDa = that.data.time
    let zuoId = that.data.zuoId
    let name = that.data.name
    let telephoneNumber = that.data.phone
    const openid = that.data.openid
    if (zuoId==''){
      wx.showToast({

        title: '桌号不能为空',

        icon: 'none',

        duration: 1000//持续的时间

      })
      return
    }else if (rengShu == null) {
      wx.showToast({

        title: '人数不能为空',

        icon: 'none',

        duration: 1000//持续的时间

      })
      return
    } else if (rengShu == 0) {
      wx.showToast({

        title: '人数不能为零',

        icon: 'none',

        duration: 1000//持续的时间

      })
      return
    }else if (yuJiDaoDa == '') {
      wx.showToast({

        title: '预约时间不能为空',

        icon: 'none',

        duration: 1000//持续的时间

      })
      return
    } else if (telephoneNumber.length != 11) {
      wx.showToast({

        title: '请输入正确的手机号',

        icon: 'none',

        duration: 1000//持续的时间

      })
      return
    }

    wx.request({
      url: api.url,
      data: {
        operationType: 'queryLocal',
        queryType: 'CanYinYuDing',
        companyCode: companyCode,
        yuYueDate: yuJiDaoDa,
        openid: openid,
        yuYueLeiXing: '餐饮预订',
        number: rengShu,
        tableNo: zuoId,
        userId: that.data.userId,
        name: name,
        telephoneNumber: telephoneNumber,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success(res) {
        console.log(res)

        if (res.data.success) {
          wx.showToast({

            title: '预约成功',

            icon: 'none',

            duration: 1000//持续的时间

          })
          that.setData({
            rengShu: null,
            phone: '',
            name: '',
            time: '',
            zuoId:''
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
  toDingdan(){
    wx.navigateTo({
      url: '/pages/yuYue/dingDang',
    })
  }
})
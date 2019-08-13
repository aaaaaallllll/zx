// pages/clock/handState.js
import {
  api
} from '../../api/config.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showBox: 1,
    index: 1,
    handList: [],
    left: 0,
    offsetTop: 10000,
    scrollTop: 0,
    shopTitles: ['空闲', '在用', '预定'],
    gradeData: [],
    datetype: 'date',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(app.globalData.userinfo)
    
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
    const that = this
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0
    })
    

    var query = wx.createSelectorQuery()//创建节点查询器 query
    query.select('#title').boundingClientRect()//这段代码的意思是选择Id=the-id的节点，获取节点位置信息的查询请求
    query.selectViewport().scrollOffset()//这段代码的意思是获取页面滑动位置的查询请求
    query.exec(function (res) {
      // res[0].top       // #the-id节点的上边界坐标
      // res[1].scrollTop // 显示区域的竖直滚动位置
      console.log(res)
      that.setData({
        offsetTop: res[0].top,
      })
      // console.log(res[0].top)
      // console.log(res[0].left)
    })
    that.getBgList()
  },
  onPageScroll: function (e) {
    // console.log(e)//{scrollTop:99}
    this.setData({
      scrollTop: e.scrollTop
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
    console.log(this.data.index)

    if (this.data.showBox==2){
      this.getHandList()
    }
   
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //获取手牌状态
  getHandList() {
    const that = this
    wx.showLoading({
      title: '加载中',
    })
    const companyCode = wx.getStorageSync('userinfo').companyCode
    const userId = wx.getStorageSync('userinfo').userId
    wx.request({
      url: api.url,
      data: {
        operationType: 'queryLocal',
        queryType: 'queryStatus',
        companyCode: companyCode,
        // companyPwd: that.data.pwd,
        page: that.data.index,
        // userId: userId
        userId: userId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success(res) {
        console.log(res.data)
        wx.hideLoading()
        let list = res.data.result
        if (list.length > 0) {
          // let list3 = []
          let data = that.data.handList
          for (let i = 0; i < list.length; i++) {
            const lx = list[i].seatIdentity.split('$')
            let status = null
            let statusColor='#FFF'
            switch (list[i].status) {
              case -1:
                status = '无效状态'
                statusColor ='rgba(0, 255, 255, 0.5)'
                break;
              case 1:
                status = '可用'
                statusColor = '#FFF'
                break;
              case 2:
                status = '正在使用'
                statusColor = 'rgba(0, 255, 255, 0.5)'
                break;
              case 3:
                status = '结账'
                statusColor = 'rgba(128, 128, 128, 0.507)'
                break;
              case 4:
                status = '锁定'
                statusColor = 'rgba(255, 166, 0, 0.5)'
                break;
              case 5:
                status = '停用'
                statusColor = 'rgba(255, 0, 0, 0.5)'
                break;
              case 6:
                status = '警告'
                statusColor = 'rgba(255, 255, 0, 0.507)'
                break;
              case 7:
                status = '押金离场'
                statusColor = 'gba(238, 130, 238, 0.5)'
                break;
              case 8:
                status = '重新结账'
                statusColor = 'rgba(100, 148, 237, 0.5)'
                break;
              case 9:
                status = '预定'
                statusColor = 'rgba(0, 255, 128, 0.5)'
                break;
            }
            let typeColor ='#4876FF'
            switch (lx[1]) {
              case '女宾':
                typeColor = '#ff6b6b'
                break;
              case '男宾':
                typeColor = '#0abde3'
                break;
              case '客房':
                typeColor = '#feca57'
                break;
              case '外卖牌':
                typeColor = '#1dd1a1'
                break;
            }
            let list2 = {
              expense: list[i].expense,//已消费
              text: list[i].text,//牌号
              type: lx[1],//类型
              status: status,//状态
              typeColor: typeColor,
              statusColor: statusColor
            }
            data.push(list2)
          }
          // data.push(list3)
          let index = that.data.index
          index++
          that.setData({
            handList: data,
            index: index
          })
          console.log(that.data.handList)
        } else if (that.data.index == 1) {
          wx.showToast({

            title: res.data.errorDesc,

            icon: 'none',

            duration: 1000//持续的时间

          })
        } else {
          wx.showToast({

            title: '已经是最后一页了',

            icon: 'none',

            duration: 1000//持续的时间

          })
        }

      }
    })
  },
  
  //切换状态
  show(e) {
    const index = e.currentTarget.dataset.name
    this.setData({
      showBox: index
    });
    // console.log(this.data.showBox)
    // console.log(this.data.jSData)
    if (index == 2 && this.data.handList.length==0) {
      // this.getJsData()
      console.log('bbbb')
      this.getHandList()
    }
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0
    })
  },
  //跳转路由
  // gotoPr(e) {
  //   wx.navigateTo({
  //     url: '/pages/dispatch/dispatch?roomId=' + e.currentTarget.id,
  //   })
  // },
  getBgList(){
    const that = this
    wx.showLoading({
      title: '加载中',
    })
    const companyCode = wx.getStorageSync('userinfo').companyCode
    const userId = wx.getStorageSync('userinfo').userId
    wx.request({
      url: api.url,
      data: {
        operationType: 'queryLocal',
        queryType: 'querySeatExcel',
        companyCode: companyCode,
        // companyPwd: that.data.pwd,
        userId: userId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success(res) {
        console.log(res.data)
        wx.hideLoading()
        if (!res.data.errorDesc) {
          let list = res.data.result
          that.setData({
            gradeData: list
          })
        } else if (that.data.index == 1) {
          wx.showToast({

            title: res.data.errorDesc,

            icon: 'none',

            duration: 1000//持续的时间

          })
        }

      }
    })
  },
  getLeft(e) {
    // console.log(e.detail.scrollLeft)
    // console.log(e.currentTarget.offsetTop)
    let left = e.detail.scrollLeft
    let offsetTop = e.currentTarget.offsetTop
    this.setData({
      left: left,

    })
  }
})
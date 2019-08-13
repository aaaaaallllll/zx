// pages/clock/newClock.js
import {
  api
} from '../../api/config.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showIndex:2,
    roomData: null,
    //技师信息
    jSData: null,
    //表格
    left: 0,
    offsetTop: 10000,
    scrollTop: 0,
    shopTitles: ['数量'],
    gradeData: [],
    datetype: 'date',
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
    that.getBgData()
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  toStatu(e){
    const that=this
    const index = e.currentTarget.dataset.name
    this.setData({
      showIndex: index
    });
    // console.log(this.data.showBox)
    // console.log(this.data.jSData)
    if (index == 1 && that.data.jSData == null) {
      that.getJsData()
      console.log('bbbb')
    }
    if (index == 0 && that.data.roomData == null) {
      that.getRoomData()
      console.log('bbbb')
    }
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0
    })
  },
  toStatu2(){
    const that= this
    const index = that.data.showIndex
    if(index==0){
      that.setData({
        showIndex:2
      })
    }else if(index==2){
      that.setData({
        showIndex: 0
      })
      if (that.data.roomData == null) {
        that.getRoomData()
        console.log('bbbb')
      }
    }
  },
  //获取表格
  getBgData() {
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
        queryType: 'RoomStatusExcel',
        userId: techId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success(res) {
        console.log(res.data)
        wx.hideLoading()
        if (res.data.success) {
          const data = res.data.result
          let list=[]
          for (let i = 0; i < data.length; i++) {
            //获取房态
            let ft = ''
            switch (data[i].status) {
              case 0:
                ft = '空闲';
                break;
              case 1:
                ft = '入住';
                break;
              case 2:
                ft = '等待服务';
                break;
              case 3:
                ft = '服务';
                break;
              case 4:
                ft = '等待清洁';
                break;
              case 5:
                ft = '预约服务';
                break;
              case 6:
                ft = '维修';
                break;
            }
            let son = {
              status: ft,
              count: data[i].count,
            }
            list.push(son)
          }
          that.setData({
            gradeData:list
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
  //获取房间状态
  getRoomData() {
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
        queryType: 'RoomStatus',
        userId: techId
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
          let list = [];
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
                color = 'rgba(212,212,212,1)';
                break;
              case 1:
                color = '#e1b12c';
                break;
              case 2:
                color = 'rgba(193,13,193,0.6)';
                break;
              case 3:
                color = 'rgba(255,0,0,0.6)';
                break;
              case 4:
                color = 'rgba(160,160,160,1)';
                break;
              case 5:
                color = 'rgba(36,210,63,0.6)';
                break;
              case 6:
                color = '#e1b12c';
                break;
            }
            let list2 = {
              name: data[i].name,
              techId: data[i].techId,
              qiZhongTime: qzTime[4],
              leftTime: syTime,
              color: color
            }
            list.push(list2)
          }
          console.log(list);
          that.setData({
            roomData: list
          });
        }else{
          wx.showToast({

            title: res.data.errorDesc,

            icon: 'none',

            duration: 1000//持续的时间

          })
        }
        
      }
    })
  },
  //获取技师状态
  getJsData() {
    wx.showLoading({
      title: '加载中',
    })
    console.log('a')
    const that = this
    const companyCode = wx.getStorageSync('userinfo').companyCode
    const techId = wx.getStorageSync('userinfo').techId
    wx.request({
      url: api.url,
      data: {
        companyCode: companyCode,
        operationType: 'queryLocal',
        queryType: 'queryJiShiStatus',
        userId: techId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success(res) {
        wx.hideLoading()
        
        if (res.data.success){
          console.log(res.data.result);
          const data = res.data.result
          let list = [];
          for (let i = 0; i < data.length; i++) {
            //获取开始时间
            let qzTime = data[i].startTime.split(" ");
            let qzzhTime = ''
            if (qzTime[1]) {
              qzzhTime = qzTime[1].substring(0, qzTime[1].length - 3)
            }

            //获取剩余时间
            const syTime = data[i].leftTime
            //获取房态
            let color = ''
            switch (data[i].techStatus) {
              case '空闲':
                color = 'rgba(212,212,212,1)';
                break;
              case '下班':
                color = '#e1b12c';
                break;
              case '点钟':
                color = 'rgba(255,0,0,0.6)';
                break;
              case '加钟':
                color = 'rgba(255,0,0,0.6)';
                break;
              case '轮钟':
                color = 'rgba(255,0,0,0.6)';
                break;
              case 5:
                color = 'rgba(160,160,160,0.6)';
                break;
              case 6:
                color = '#e1b12c';
                break;
            }
            let list2 = {
              id: data[i].id,
              techStatus: data[i].techStatus,
              startTime: qzzhTime,
              leftTime: syTime,
              gender: data[i].gender,
              color: color
            }
            list.push(list2)
          }
          // console.log(list);
          that.setData({
            jSData: list
          });
        }else{
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
// pages/hujiaofuwu/hujiaofuwu.js
import {
  api
} from '../../api/config.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 页面数据
    val: "",
    num1: "",
    roomData: [],
    roomData1: [],
  },
  srk(e) {
    let num1 = e.detail && e.detail.value;
    if (!num1) {
      this.setData({
        roomData1: this.data.roomData
      })
    } else {
      let list = this.data.roomData1;
      let list2 = [];
      for (let i = 0; i < list.length; i++) {
        if (list[i].name.indexOf(num1) != -1) {
          list2.push(list[i]);
        }
      }
      this.setData({
        roomData1: list2
      })
    }

  },
  //获取房间状态
  // getRoomData() {
  //   wx.showLoading({
  //     title: '加载中',
  //   })
  //   const that = this
  //   let companyCode = wx.getStorageSync('userinfo').companyCode
  //   let techId = wx.getStorageSync('userinfo').userId
  //   wx.request({
  //     url: api.url,
  //     data: {
  //       companyCode,
  //       operationType: 'queryLocal',
  //       queryType: 'paiQianInfo',
  //       techId
  //     },
  //     header: {
  //       'content-type': 'application/x-www-form-urlencoded'
  //     },
  //     method: 'post',
  //     success(res) {
  //       wx.hideLoading()
  //       if (res.data.success) {
  //         console.log(res);
  //         const data = res.data.result.roomNos;
  //         let list = [];
  //         let list1=[];
  //         for(let i in data){
  //           list.push(data[i])
  //           list1.push(data[i])
  //         }
  //         that.setData({
  //           roomData: list,
  //           roomData1: list1
  //         });
  //         console.log(that.data.roomData1)
  //       } else {
  //         wx.showToast({

  //           title: res.data.errorDesc,

  //           icon: 'none',

  //           duration: 1000//持续的时间

  //         })
  //       }

  //     }
  //   })
  // },
  //获取房间状态
  getRoomData() {
    // wx.showLoading({
    //   title: '加载中',
    // })
    const that = this
    let companyCode = wx.getStorageSync('userinfo').companyCode
    let userId = wx.getStorageSync('userinfo').techId
    console.log(companyCode)
    console.log(userId)
    wx.request({
      url: api.url,
      data: {
        companyCode,
        operationType: 'queryLocal',
        queryType: 'RoomStatus',
        userId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success(res) {
        console.log(res)
        wx.hideLoading()
        if (res.data.success) {
          console.log(res.data);
          const data = res.data.result
          let list = [];
          let list1 = [];
          for (let i = 0; i < data.length; i++) {
            //获取开始时间
            const qzTime = data[i].qiZhongTime.split(" ");
            let qzzhTime = ''
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
                color = 'rgba(255,0,0,0.5)';
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
            list1.push(list2)
          }
          console.log(list);
          that.setData({
            roomData: list,
            roomData1: list1
          });
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
  // 跳转到房间
  toroom(e) {
    let i = e.currentTarget.dataset.index;
    let room = e.currentTarget.dataset.room[i];
    console.log(i)
    console.log(room)
    wx.navigateTo({
      url: `/pages/hujiaofuwu/toroom?name=${room}`
    })
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
    // this.addusers();
    this.getRoomData();

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

  }
})
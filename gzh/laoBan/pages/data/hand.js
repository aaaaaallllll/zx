// pages/data/hand.js
import {
  api
} from '../../api/config.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    handList:[],
    index:1,
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
    this.getHandList()
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
    
    this.getHandList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getHandList(){
    const that=this
    const companyCode = wx.getStorageSync('userinfo').companyCode
    wx.request({
      url: api.url,
      data: {
        operationType: 'queryLocal',
        queryType: 'queryStatus',
        companyCode: companyCode,
        // companyPwd: that.data.pwd,
        page: that.data.index
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success(res) {
        console.log(res.data)
        
        let list=res.data.result
        if (list.length>0){
          // let list3 = []
          let data = that.data.handList
          for (let i = 0; i < list.length; i++) {
            const lx = list[i].seatIdentity.split('$')
            let status=null
            switch (list[i].status) {
              case -1:
                status = '无效状态'
                break;
              case 1:
                status = '可用'
                break;
              case 2:
                status = '正在使用'
                break;
              case 3:
                status = '结账'
                break;
              case 4:
                status = '锁定'
                break;
              case 5:
                status = '停用'
                break;
              case 6:
                status = '警告'
                break;
              case 7:
                status = '押金离场'
                break;
              case 8:
                status = '重新结账'
                break;
              case 9:
                status = '预定'
                break;
            }
            let list2 = {
              expense: list[i].expense,//已消费
              text: list[i].text,//牌号
              type: lx[1],//类型
              status: status//状态
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
        }else if(that.data.index==1){
          wx.showToast({

            title: '没有手牌信息',

            icon: 'none',

            duration: 1000//持续的时间

          })
        }else{
          wx.showToast({

            title: '已经是最后一页了',

            icon: 'none',

            duration: 1000//持续的时间

          })
        }
        
      }
    })
  }
})
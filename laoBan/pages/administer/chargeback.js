// pages/administer/chargeback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showIndex:0,
    auditData:[{
        id:1921941234,
        state:0,
        data:'09/27 20:02',
        ck:false,
        seData:[],
        showBtn:false
      },
      {
        id: 18212341234,
        state: 1,
        data: '09/27 20:02',
        ck: false
      },
      {
        id: 12212341234,
        state: 0,
        data: '09/27 20:02',
        ck: false
      },
      {
        id: 14212341234,
        state: 1,
        data: '09/27 20:02',
        ck: false
      },
      {
        id: 13212341234,
        state: 0,
        data: '09/27 20:02',
        ck: false
      },
      {
        id: 11212341234,
        state: 0,
        data: '09/27 20:02',
        ck: false
      }]
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
  //切换
  showSh(e){
    const index = e.currentTarget.dataset.name
    this.setData({
      showIndex: index,
    })
  },
  //选择审核
  select(e){
    const that=this
    const index = e.currentTarget.id
    let ff=null
    // console.log(index)
    let data = that.data.auditData
    let list = []
    data[index].ck = !data[index].ck
    for(let i=0;i<data.length;i++){
      if(data[i].ck){
        list.push(data[i].id)
      }
    }
    if(list.length!=0){
      ff=true
    }else{
      ff=false
    }
    that.setData({
      auditData:data,
      seData:list,
      showBtn:ff
    })
  }
})
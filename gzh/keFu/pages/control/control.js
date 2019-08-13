// pages/control/control.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mosIndex:0,//灯光模式
    msIndex:0,//总模式
    qjIndex:0,//情景模式
    dengList:[
      {
        deng1Name: '射灯',
        deng2Name: '阅读灯',
        deng1ck: false,
        deng2ck: false,
      },
      {
        deng1Name: '夜灯',
        deng2Name: '卫灯',
        deng1ck: false,
        deng2ck: false,
      },
      {
        deng1Name: '激光灯',
        deng2Name: '顶灯',
        deng1ck: false,
        deng2ck: false,
      },
      {
        deng1Name: '灯带',
        deng2Name: '梳洗灯',
        deng1ck: false,
        deng2ck: false,
      }
    ]
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
  //控制总模式
  msDeploy(e){
    const id = e.currentTarget.dataset.id
    this.setData({
      msIndex: id
    })
  },
  //控制情景模式
  qjDeploy(e) {
    const id = e.currentTarget.dataset.id
    this.setData({
      qjIndex: id
    })
  },
  // 控制灯光模式
  deploy(e){
    // console.log(e)
    const id = e.currentTarget.dataset.id
    this.setData({
      mosIndex:id
    })
  },
  //控制灯光
  deployDeng(e){
    const that=this
    const id = e.currentTarget.dataset.id
    const ed = e.currentTarget.dataset.ed
    const dengList = that.data.dengList
    if(ed==0){
      console.log('1')
      dengList[id].deng1ck = !dengList[id].deng1ck
    }else{
      console.log('2')
      dengList[id].deng2ck = !dengList[id].deng2ck
    }
    that.setData({
      dengList: dengList
    })
   
  },
  cscs(e){
    console.log(e)
  },
  // 控制背景音乐
  toMusic(e){
    let xz = e.detail.x
    let yz = e.detail.y
    // console.log('x='+xz)
    // console.log('y='+yz)
    if(yz<350){
      console.log('+')
      return
    } else if (yz>350&&yz<440&&xz<180){
      console.log('|<')
      return
    } else if (yz > 350 && yz < 440 && xz > 180 && xz < 270) {
      console.log('||')
      return
    } else if (yz > 350 && yz < 440 && xz > 270) {
      console.log('>|')
      return
    } else if (yz > 440) {
      console.log('-')
      return
    }
  }
})
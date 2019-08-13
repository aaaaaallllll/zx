//index.js
//获取应用实例
const wxCharts = require('../../utils/wxcharts.js');
import { api } from '../../api/config.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    showOn:false,
    Num:'',
    phone:'',
    balance:'',
    debit:'',
    lender:'',
    //常点服务
    pgData: [],
    //常点技师
    jisData:[],
    //常点套餐
    tcData: [],
    animationData:'',
    xiHao:'',
    xiHaoList:[],
    cardNo:'',
    dIndex:-1
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
    wx.hideTabBar()
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
  //获取用户信息
  getUser(){
    wx.showLoading({
      title: '加载中',
    })
    const that=this
    const companyCode = wx.getStorageSync('userinfo').companyCode
    console.log('1')
    wx.request({
      url: api.getUser,
      data: {
        operationType: 'keFuChaHuiYuanService',
        companyCode: companyCode,
        phone: that.data.Num
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'get',
      success(res) {
        wx.hideLoading()
        console.log(res)
        if(res.data.success){
          const data = res.data.result
          // console.log(data.fuWu)
          let list = []
          for (let i = 0; i < data.fuWu.length; i++) {
            let list2 = {
              name: data.fuWu[i].menuName,
              data: data.fuWu[i].count
            }
            list.push(list2)
          }
          that.setData({
            showOn: true,
            name: data.name,
            balance: data.balance,
            debit: data.debit,
            lender: data.lender,
            pgData: list,
            jisData: data.jiShi,
            tcData: data.xiangMu,
            phone: that.data.Num,
            xiHaoList: data.xiHao,
            cardNo: data.cardNo
          })
          console.log(list)
          
          // 常点服务
          if (list.length>0){
            let columnChart = new wxCharts({
            canvasId: 'pieCanvas',
            type: 'pie',
            series: list,
            width: 360,
            height: 300,
            dataLabel: true,
            animation: true,
            name: '常点服务',
          });
          }
          if (data.jiShi.length > 0) {
            that.getJsData();
          }
          if (data.xiangMu.length > 0) {
            that.getTcData()
          }
          
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
  //双向绑定
  updateValue(e) {
    let name = e.currentTarget.dataset.name;
    let nameMap = {}
    nameMap[name] = e.detail && e.detail.value
    this.setData(nameMap)
  },
  //获取常点技师信息
  getJsData(){
    let that=this;
    // console.log(that.data.jisData);
    let list = that.data.jisData
    let data=list.sort(function (a, b) {
      return b.count - a.count;
    });
    const holds = data[0].count
    // for(let i=0;i<data.length;i++){
    //   holds += data[i].count;
    // };
    for (let i = 0; i < data.length; i++) {
      data[i].hold = Math.round((data[i].count / holds)*100) 
    };
    // console.log(data)
    that.setData({
      jisData:data
    })
  },
  //获取常点套餐信息
  getTcData() {
    const that = this;
    // console.log(that.data.tcData);
    const list = that.data.tcData
    const data = list.sort(function (a, b) {
      return b.count - a.count;
    });
    const holds = data[0].count
    // for (let i = 0; i < data.length; i++) {
    //   holds += data[i].count;
    // };
    for (let i = 0; i < data.length; i++) {
      data[i].hold = Math.round((data[i].count / holds) * 100)
    };
    // console.log(data)
    that.setData({
      tcData: data
    })
  },
  showText(){
    let that=this;
    console.log(that.data.Num.length)
    if (that.data.Num.length==11){
      this.getUser()
    }else{
      wx.showToast({

        title: '请输入有效的手机号',

        icon: 'none',

        duration: 1000//持续的时间

      })
    }
      

    // //创建动画
    // var animation = wx.createAnimation({

    //   duration: 4000,
    //   timingFunction: "ease",
    //   delay: 0,
    //   transformOrigin: "50% 50%",

    // });
    // animation.rotate(45).scale(0.8).translate(10, 10).step();     //边旋转边放大
    // //导出动画数据传递给组件的animation属性。
    // this.setData({
    //   animationData: animation.export(),
    // })
  },
  addXihao(){
    console.log('1')
    wx.showLoading({
      title: '添加中',
    })
    const that = this
    const companyCode = wx.getStorageSync('userinfo').companyCode
    const userId = wx.getStorageSync('userinfo').techId
    // console.log(companyCode)
    wx.request({
      url: api.url,
      data: {
        queryType: 'CardXiHao',
        operationType: 'queryLocal',
        companyCode: companyCode,
        cardNo: that.data.cardNo,
        xiHao: that.data.xiHao,
        // userId: that.data.Num,
        userId: userId,
        type:'add',
       
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'get',
      success(res) {
        wx.hideLoading()
        console.log(res)
        if (res.data.success) {
          that.setData({
            xiHaoList:res.data.result,
            xiHao:''
          })
          wx.showToast({

            title: '添加成功',

            icon: 'none',

            duration: 1000//持续的时间

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
  showDelete(e){
    const that= this
    console.log(e.currentTarget.dataset.id)
    const id = e.currentTarget.dataset.id
    if(id==that.data.dIndex){
      that.setData({
        dIndex: -1
      })
    }else{
      that.setData({
        dIndex: id
      })
    }
    
  },
  deleteXihao(e){
    wx.showLoading({
      title: '删除中',
    })
    const that = this
    const id = e.currentTarget.dataset.id
    const xh = e.currentTarget.dataset.xh
    const index = e.currentTarget.dataset.index
    const companyCode = wx.getStorageSync('userinfo').companyCode
    const userId = wx.getStorageSync('userinfo').techId
    console.log(id)
    
    
    wx.request({
      url: api.url,
      data: {
        queryType: 'CardXiHao',
        operationType: 'queryLocal',
        companyCode: companyCode,
        cardNo: that.data.cardNo,
        xiHao: xh,
        // userId: that.data.Num,
        userId: userId,
        type: 'delete',
        id: id

      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'get',
      success(res) {
        wx.hideLoading()
        console.log(res)
        if (res.data.success) {
          console.log(index)
          let list = that.data.xiHaoList
          list.splice(index,1)
          console.log(list)
           that.setData({
             xiHaoList: list
          })
          wx.showToast({

            title: '删除成功',

            icon: 'none',

            duration: 1000//持续的时间

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
  }
  
})
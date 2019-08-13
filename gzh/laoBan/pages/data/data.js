import {
  Model
} from '../../api/model.js'
const Models = new Model()
import {
  Datas
} from '../../utils/data.js'
const datas = new Datas()
var util = require('../../utils/util.js');
import {
  api
} from '../../api/config.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sqList:{
      buMenXiangMuBaoBiao: false,
      buMenYeJi:false,
      huiYuanTongJi:false,
      jiShiYeJi:false,
      jiShiYeJiYueBao:false,
      jiShiZhongShuTongJi:false,
      keDanJiaFenXi: false,
      keHuFenXi: false,
      keLiuLiangTongJi: false,
      keLiuYueBao: false,
      menDianFuWuYeJi: false,
      menDianFuWuZhuanHuaLv: false,
      menDianKeLiu: false,
      menDianShouYin: false,
      menDianYeJi: false,
      menDianYeWuZhuanHuaLv: false,
      menDianZhuYuZhuanHuaLv: false,
      menDianZuLiaoZhuanHuaLv: false,
      paiHangBang: false,
      shouKuanTongJi: false,
      shouPaiZhuangTai: false,
      xiangMuLeiBiePaiMing: false,
      xiangMuXiaoShouTongJi: false,
      yingYeFenXi: false,
      yingYeKuaiBao: false,
      yuanGongTiCheng: false,
      yuanGongTiChengMingXi: false,
      yuanGongXiaoShouPaiMing: false,
      yuanGongYeJiBaoBiao: false,
      zhongFangZhuangTai: false,
      id:'',
      userId:''
    },
    mdList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '登录中',
    })
    // this.wxlogin()
    const that = this
    // let code = null
    if (wx.getStorageSync('userinfo')) {
      
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          console.log(res.code)

         
          wx.request({
            url: api.ajaxUrl,
            data: {
              operationType: 'xcxBossUserService',
              code: res.code,
              type: 'logIn',
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'post',
            success(res) {
              console.log(res.data)
             
              if (res.data.success) {
                
                console.log('ceshi')
                wx.hideLoading()
                that.getIndex()


              } else {
                wx.redirectTo({
                  url: '/pages/login/login'
                })
                console.log('cdddd')
              }
            }
          })
        }
      })
     

    } else {
      wx.redirectTo({
        url: '/pages/login/login'
      })
    }
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
  goRanklist: function () {
    wx.navigateTo({
      url: '/pages/data/ranklist',
    })
  },
  goKehuAnalysis: function () {
    wx.navigateTo({
      url: '/pages/data/kehuAnalysis',
    })
  },
  goAnalysis: function () {
    wx.navigateTo({
      url: '/pages/data/analysis',
    })
  },
  goBusinessAnalysis: function () {
    wx.navigateTo({
      url: '/pages/data/businessAnalysis',
    })
  },
  goYingyeStatistics: function () {
    wx.navigateTo({
      url: '/pages/data/yingyeStatistics',
    })
  },
  goReceivables: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/data/receivables',
    })
  },
  goUserStatistics: function () {
    wx.navigateTo({
      url: '/pages/data/userStatistics',
    })
  },
  goUserStatistics: function () {
    wx.navigateTo({
      url: '/pages/data/userStatistics',
    })
  },
  goUserStatistics: function () {
    wx.navigateTo({
      url: '/pages/data/userStatistics',
    })
  },
  goProjectStatistics: function () {
    wx.navigateTo({
      url: '/pages/data/projectStatistics',
    })
  },
  gopassengerStatistics: function () {
    wx.navigateTo({
      url: '/pages/data/passengerStatistics',
    })
  },
  goTechNumStatistics: function () {
    wx.navigateTo({
      url: '/pages/data/techNumStatistics',
    })
  },
  goHand: function () {
    wx.navigateTo({
      url: '/pages/clock/handState',
    })
  },
  goMdGrade(){
    wx.navigateTo({
      url: '/pages/table/mdGrade',
    })
  },
  goYinYeReport(){
    wx.navigateTo({
      url: '/pages/table/yinYeReport',
    })
  },
  goMdCas(){
    wx.navigateTo({
      url: '/pages/table/mdCas',
    })
  },
  goSyingReport(){
    wx.navigateTo({
      url: '/pages/table/syingReport',
    })
  },
  goMdfwGrade() {
    wx.navigateTo({
      url: '/pages/table/mdfwGrade',
    })
  },
  goMdywCvr(){
    wx.navigateTo({
      url: '/pages/table/mdywCvr',
    })
  },
  goMdfwCvr() {
    wx.navigateTo({
      url: '/pages/table/mdfwCvr',
    })
  },
  goMdzyCvr() {
    wx.navigateTo({
      url: '/pages/table/mdzyCvr',
    })
  },
  goMdzlCvr() {
    wx.navigateTo({
      url: '/pages/table/mdzlCvr',
    })
  },
  goJsyjReport() {
    wx.navigateTo({
      url: '/pages/table/jsyjReport',
    })
  },
  goJsGrade(){
    wx.navigateTo({
      url: '/pages/table/jsGrade',
    })
  },
  goSecGrade() {
    wx.navigateTo({
      url: '/pages/section/secGrade',
    })
  },
  goSecPage() {
    wx.navigateTo({
      url: '/pages/section/secPage',
    })
  },
  goSecRem() {
    wx.navigateTo({
      url: '/pages/section/secRem',
    })
  },
  goCasReport() {
    wx.navigateTo({
      url: '/pages/newLable/casReport',
    })
  },
  goGradeReport() {
    wx.navigateTo({
      url: '/pages/newLable/gradeReport',
    })
  },
  goMdKeLiu(){
    wx.navigateTo({
      url: '/pages/newLable/mdKeLiu',
    })
  },
  goKeLiuReport() {
    wx.navigateTo({
      url: '/pages/newLable/keLiuReport',
    })
  },
  goKeDanJiaRiReport() {
    wx.navigateTo({
      url: '/pages/newLable/keDanJiaRiReport',
    })
  },
  
  goHuiYuanKaBaoBiao() {
    wx.navigateTo({
      url: '/pages/newLable/huiYuanKaBaoBiao',
    })
  },
  goHuiYuanKaGl() {
    wx.navigateTo({
      url: '/pages/newLable/huiYuanKaGl',
    })
  },
  goKeDanJiaFx() {
    wx.navigateTo({
      url: '/pages/newLable/keDanJiaFx',
    })
  },
  goPageLeiBiePm() {
    wx.navigateTo({
      url: '/pages/newLable/pageLeiBiePm',
    })
  },
  goPageShouRuPm() {
    wx.navigateTo({
      url: '/pages/newLable/pageShouRuPm',
    })
  },
 
  //员工报表
  goStaTiCheng() {
    wx.navigateTo({
      url: '/pages/staff/staTiCheng',
    })
  },
  goStaTiChengXx() {
    wx.navigateTo({
      url: '/pages/staff/staTiChengXx',
    })
  },
  goStaXiaoShou() {
    wx.navigateTo({
      url: '/pages/staff/staXiaoShou',
    })
  },
  goStaYeJi() {
    wx.navigateTo({
      url: '/pages/staff/staYeJi',
    })
  },

  goRoom(e){
    console.log(e)
    let fId = e.detail.formId;
    console.log(fId)
    this.getformId(fId)
    wx.navigateTo({
      url: '/pages/clock/newClock',
    })
  },
  
  getformId(formId){
    console.log(formId)
    wx.login({
      success: res => {
        const code=res.code
        console.log(code)
       
        const userId = wx.getStorageSync('userinfo').userId
        const companyCode = wx.getStorageSync('userinfo').companyCode
        const subFormid = Models.subFormid(formId, code, companyCode, userId)
        subFormid.then(res => {
          console.log(res)
        })
        }
        })
    
  },
  //获取门店id
  getIndex() {
    wx.showLoading({
      title: '获取授权中',
    })
    const that = this
    const userId = wx.getStorageSync('userinfo').userId
    wx.request({
      url: api.ajaxUrl,
      data: {
        operationType: 'xcxBossUserService',
        userId: userId,
        type: 'query'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success(res) {
        if (res.data.success) {
          const _data = JSON.parse(res.data.result)
          if (_data.length > 0) {
            that.setData({
              mdList: _data,
            })
            that.getShouQuan()
          } else {
            wx.showToast({
              title: '门店列表为空',
              icon: 'none',
              duration: 1000//持续的时间
            })
          }
        } else {
          wx.showToast({
            title: '获取失败',
            icon: 'none',
            duration: 1000//持续的时间
          })
        }
      }
    })

  },
  getShouQuan(){
    const that=this
    const userId = wx.getStorageSync('userinfo').userId
    const companyCode = wx.getStorageSync('userinfo').companyCode
    console.log(wx.getStorageSync('userinfo'))
    console.log(userId)
    const mdList = that.data.mdList
    //获取授权
    for(let i=0;i<mdList.length;i++){
      wx.request({
        url: api.url,
        data: {
          operationType: 'queryLocal',
          queryType: 'GetBossQuanXian',
          companyCode: mdList[i].companycode,
          // companyPwd: that.data.pwd,
          userId: userId
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'post',
        success(res) {
          console.log(res.data)



          if (res.data.success) {
            const sqList = that.data.sqList
            let list = res.data.result
            for (let v in list) {
              if (list[v]) {
                sqList[v] = list[v]
              }
            }
            console.log(sqList)
            that.setData({
              sqList: sqList
            })
            if(i==mdList.length){
              wx.hideLoading()
            }
            
          } else {
            wx.showToast({

              title: mdList[i].companyname+res.data.errorDesc,

              icon: 'none',

              duration: 1000//持续的时间

            })
          }

        }
      })
    }
    
    
  }
})

import {
  Model
} from '../../api/model.js'
const Models = new Model()
import {
  Datas
} from '../../utils/data.js'
const datas = new Datas()
var util = require('../../utils/util.js');
import * as echarts from '../../ec-canvas/echarts';
const app = getApp()
var k = 0;
var Chart = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
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
    this.echartsComponnet = this.selectComponent('#mychart-dom-bar');
    this.getList()
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
  getList: function() {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    let companyCode = wx.getStorageSync('userinfo').companyCode
    let techId = wx.getStorageSync('userinfo').userId
    console.log(techId)
    const bossHuiYuanTongJi = Models.bossHuiYuanTongJi(techId, companyCode)
    bossHuiYuanTongJi.then(res => {
      if (res.success) {
        wx.hideLoading()
        var huiyuanyue = res.result['会员余额']
        var huiyuanshuliang = res.result['会员数量']
        var chongzhixiaofeitongji = res.result['充值消费统计']
        var list = res.result
        var a = 0
        Object.keys(list).forEach(function(key) {
          var dui = {}
          dui.name = key
          dui.list = list[key]
          // listdate.push(key)
          // huiyuanxiaofei1.push(list[key])
          list[a] = dui
          a++
        });
        var card_type = []
        var heji_chongzhijine = 0
        var heji_xiaofeijine = 0
        var heji_zengsongjine = 0
        for (var i = 0; i < chongzhixiaofeitongji.length; i++) {
          card_type.push(chongzhixiaofeitongji[i].cardTypeName);
          heji_chongzhijine += chongzhixiaofeitongji[i]['充值金额'];
          heji_xiaofeijine += chongzhixiaofeitongji[i]['消费金额'];
          heji_zengsongjine += chongzhixiaofeitongji[i]['赠送金额']
        }
        var huiyuantongji = []
        var heji_count = 0
        var heji_yuE = 0
        var card_yuE = []
        var card_count = []
        for (var i = 0; i < card_type.length; i++) {
          var zhi = card_type[i]

          function pFn(p) {
            return p.cardTypeName == zhi;
          }
          let duixiang = {}
          duixiang.name = zhi
          duixiang.yuE = huiyuanyue[huiyuanyue.findIndex(pFn)].yuE
          heji_yuE += duixiang.yuE
          duixiang.count = huiyuanshuliang[huiyuanshuliang.findIndex(pFn)].count
          heji_count += duixiang.count
          console.log(duixiang)
          huiyuantongji.push(duixiang)
          card_count.push(duixiang.count)
          card_yuE.push(duixiang.yuE)
        }
        this.list = list
        this.setData({
          huiyuanyue: huiyuanyue,
          huiyuanshuliang: huiyuanshuliang,
          chongzhixiaofeitongji: chongzhixiaofeitongji,
          list: list,
          heji_chongzhijine: heji_chongzhijine,
          heji_xiaofeijine: heji_xiaofeijine,
          heji_zengsongjine: heji_zengsongjine,
          card_type: card_type,
          huiyuantongji: huiyuantongji,
          heji_count: heji_count,
          heji_yuE: heji_yuE,
          card_yuE: card_yuE,
          card_count: card_count
        })
        that.init_echarts_zhu()
      } else {
        wx.showToast({
          title: res.errorDesc,
          icon: 'none'
        })
      }
    })
  },
  init_echarts_zhu: function() {
    this.echartsComponnet.init((canvas, width, height) => {
      // 初始化图表
      Chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      this.setOption(Chart);
      return Chart;
    });
  },
  setOption: function(Chart) {
    Chart.clear(); // 清除
    Chart.setOption(this.getOption()); //获取新数据
  },
  // 客户消费
  getOption: function() {
    var that = this;
    // 指定图表的配置项和数据
    var colors = ['#ff8a00', '#2971f9', '#32cc94', '#f92929'];
    var option = {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        x: 'left',
        y: 'top',
        data: ['会员卡数', '账面总余额']
      },
      toolbox: {
        show: false,
      },
      calculable: true,
      xAxis: [{
        type: 'category',
        data: that.data.card_type,
        axisLine: {
          show: true,
          lineStyle: {
            color: '#999'
          }
        },
      }, ],
      yAxis: [{
        type: 'value',
        min: 0,
        interval: 100000,
        axisLabel: {
          formatter: '{value}'
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#999'
          }
        },
      }],
      grid: {
        left: '10%',
        right: '5%',
        bottom: '0%',
        top: '12%',
        containLabel: true
      },
      series: [{
          //center: ['48.5%', '45%'],  
          barWidth: "6",
          name: '会员卡数',
          itemStyle: {
            normal: {
              color: '#1ed1f8',
              barBorderRadius: [6, 6, 0, 0]
            }
          },
          type: 'bar',
          data: that.data.card_count
        },
        {
          //center: ['48.5%', '45%'],  
          barWidth: "6",
          name: '账面总余额',
          itemStyle: {
            normal: {
              color: '#febd25',
              barBorderRadius: [6, 6, 0, 0]
            }
          },
          type: 'bar',
          data: that.data.card_yuE
        },
      ]
    };
    return option;
  },
})
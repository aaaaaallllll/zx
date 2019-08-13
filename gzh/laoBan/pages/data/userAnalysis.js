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


function initChart2(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      x: 'left',
      y: 'top',
      data: ['充值金额', '消费金额']
    },
    toolbox: {
      show: false,
    },
    calculable: true,
    xAxis: [
      {
        type: 'category',
        data: ['12/21', '12/22', '12/23', '12/24', '12/25', '12/26'],
        axisLine: {
          show: true,
          lineStyle: {
            color: '#999'
          }
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        min: 0,
        max: 1,
        interval: .2,
        axisLabel: {
          formatter: '{value} 万元'
        }, axisLine: {
          show: false,
          lineStyle: {
            color: '#999'
          }
        },
      }
    ],
    grid: {
      left: '0%',
      right: '5%',
      bottom: '0%',
      top: '12%',
      containLabel: true
    },
    series: [
      {
        //center: ['48.5%', '45%'],  
        barWidth: "10",
        name: '充值金额',
        itemStyle: {
          normal: {
            color: '#1ed1f8',
            barBorderRadius: [6, 6, 0, 0]
          }
        },
        type: 'bar',
        data: [.3, .2, .3, .4, .5, .6]
      },
      {
        //center: ['48.5%', '45%'],  
        barWidth: "10",
        name: '消费金额',
        itemStyle: {
          normal: {
            color: '#febd25',
            barBorderRadius: [6, 6, 0, 0]
          }
        },
        type: 'bar',
        data: [.2, .3, .4, .5, .6, .3]
      },
    ]

  };

  chart.setOption(option);
  return chart;
}

// pages/data/businessAnalysis.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec2: {
      onInit: initChart2
    }, date: '2019-03-01',
    enddate: '2019-03-03',
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindDateChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      enddate: e.detail.value
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
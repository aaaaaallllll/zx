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
var dataList = [];
var k = 0;
var Chart = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // ec: {
    //   onInit: initChart
    // },
    ec: {
      lazyLoad: true // 延迟加载
    },
    date: '2019-03-27',
    status: false,
    begin: '',
    end: '',
    begintime: new Date().getTime(),
    endtime: new Date().getTime(),
    showbegin: false,
    showend: false,
    timeType: 1,
    fenxi: {},
    chuke: [],
    jinke: [],
    datelist: [],
    showchart: true,
    datetype:'date'
  },
  bindDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
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
    this.getyesterday()
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
    const quJianKeLiu = Models.quJianKeLiu(companyCode, techId, that.data.begin, that.data.end, that.data.timeType)
    quJianKeLiu.then(res => {
      if(res.success){
        wx.hideLoading()
        var chuke = res.result['出客']
        var jinke = res.result['进客']
        var chuke2 = []
        var datelist = []
        var jinke2 = []
        Object.keys(chuke).forEach(function (key) {
          datelist.push(key)
          chuke2.push(chuke[key])
        });
        Object.keys(jinke).forEach(function (key) {
          jinke2.push(jinke[key])
        });
        console.log(jinke2)
        console.log(chuke2)
        console.log(datelist)
        that.setData({
          fenxi: res.result['分析'],
          chuke: chuke2,
          jinke: jinke2,
          datelist: datelist
        })
        this.init_echarts();
      }else{
        wx.showToast({
          title: res.errorDesc,
          icon:'none'
        })
      }
    })
  },
  checkdata: function(e) {
    var that = this;
    console.log(e)
    var type = e.currentTarget.dataset.id
    that.setData({
      type: type
    })
    if (type == 0) {
      this.getToday()
    } else if (type == 1) {
      this.getyesterday()
    } else if (type == 2) {
      this.getCurrentMonth()
    } else {
      this.getlastMonth()
    }
  },
  getToday() {
    var that = this;
    let timeType = 1;
    let end = that.checkdatatime(datas.gettoday())
    let begin = that.checkdatatime(datas.gettoday())
    let begin1 = begin.replace(/-/g, '/');  
    let end1 = end.replace(/-/g, '/'); 
    console.log(end,'0000000000')
    that.setData({
      timeType: timeType,
      begin: begin,
      end: end,
      begintime: new Date(begin1).getTime(),
      endtime: new Date(end1).getTime()
    })
    console.log(that.data.begintime, begin,'2222')
    this.getList()

  },
  todetail(e) {
    let begin = e.currentTarget.dataset.begin
    let end = e.currentTarget.dataset.end
    let type = e.currentTarget.dataset.type
    wx.navigateTo({
      url: '/pages/webpage/statisticsdetail?type=' + type + '&begin=' + begin + '&end=' + end,
    })
  },
  changedata() {
    var status = this.data.status
    this.setData({
      status: !status
    })
  },
  getdata: function(e) {
    console.log(e)
    this.setData({
      begin: e.detail.begin,
      end: e.detail.end,
      begintime: e.detail.begintime,
      endtime: e.detail.endtime
    })
    this.getList()
  },
  getdatatimebegin: function(e) {
    console.log(e)
    this.setData({
      begin: e.detail.data,
      begintime: e.detail.datatime
    })
  },
  getdatatimeend: function(e) {
    console.log(e)
    this.setData({
      end: e.detail.data,
      endtime: e.detail.datatime
    })
  },
  init_echarts: function() {
    this.echartsComponnet.init((canvas, width, height) => {
      // 初始化图表
      Chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      // Chart.setOption(this.getOption());
      this.setOption(Chart);
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return Chart;
    });
  },
  setOption: function(Chart) {
    Chart.clear(); // 清除
    Chart.setOption(this.getOption()); //获取新数据
  },

  getOption: function() {
    var that = this;
    // 指定图表的配置项和数据
    var colors = ['#ff8a00', '#2971f9', '#32cc94', '#f92929'];
    var option = {
      color: colors,
      title: {
        textStyle: {
          fontStyle: 'normal', //风格
          fontWeight: 'normal', //粗细
          fontSize: 10, //大小
          rich: {},
          // lineHeight: 1000,
        }
      },
      
      tooltip: {
        trigger: 'axis',
        // confine: false,
        position: ['12%', '8%'],
        // alwaysShowContent: false, 
      },
      legend: {
        data: ['进客', '出客'],
        x: 'left',
      },
      grid: {
        left: '0%',
        right: '5%',
        bottom: '0%',
        top: '8%',
        containLabel: true,
        // show:true,
        tooltip:{
          show:true,
          confine: false,
          
        }
      },
      toolbox: {
        show: false,
        feature: {
          dataView: {
            show: true,
            readOnly: false
          },
          restore: {
            show: true
          },
          saveAsImage: {
            show: true
          }
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        axisLine: {
          show: true,
          lineStyle: {
            color: '#999'
          }
        },
        data: that.data.datelist
      },
      yAxis: {
        type: 'value',
        min: 'dataMin',
        // min: 0,
        // interval: 30,
        max:'dataMax',
        splitNumber:2,
        axisLabel: {
          formatter: '{value} ',
          fontSize: 10, //大小,
          // height: 20,
          // lineHeight: 20,
          // backgroundColor: '#FFF',
        },
       
        axisLine: {
          show: false,
          lineStyle: {
            color: '#999'
          },
        },
        axisTick: {
          // lineStyle: {
          //   color: 'yellow'
          // },
          
        },
        splitLine:{
          // lineStyle: {
          //   color: 'red'
          // },
          // interval :1,
        }
      },
      series: [{
          name: '进客',
          smooth: true,
          symbol: 'none',
          type: 'line',
          itemStyle: {
            normal: {
              lineStyle: {
                color: '#ff8a00'
              }
            }
          },
          data: that.data.jinke
        },
        {
          name: '出客',
          smooth: true,
          symbol: 'none',
          type: 'line',
          itemStyle: {
            normal: {
              lineStyle: {
                color: '#2971f9'
              }
            }
          },
          data: that.data.chuke
        },
      ]
    };
    return option;
  },
  resshow: function(e) {
    this.setData({
      showchart: !e.detail.show
    })
  },
  checkdatatime: function (e) {
    var time = new Date(e.replace(/-/g, '/'));
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    if (this.data.datetype == 'date') {
      var datas = y + '-' + this.add0(m) + '-' + this.add0(d)
    } else {
      var datas = y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s)
    }
    console.log(datas,'999999999')
    return datas
  },
  add0: function (m) {
    return m < 10 ? '0' + m : m
  },
  getyesterday() {
    var that = this;
    let timeType = 1;
    let end = that.checkdatatime(datas.getyesterday())
    let begin = that.checkdatatime(datas.getyesterday())
    let begin1 = begin.replace(/-/g, '/');
    let end1 = end.replace(/-/g, '/');
    that.setData({
      timeType: timeType,
      begin: begin,
      end: end,
      begintime: new Date(begin1).getTime(),
      endtime: new Date(end1).getTime()
    })
  },
  resdata: function () {
    console.log('resdata')
    this.triggerEvent('resdata', {
      begin: this.data.begin,
      end: this.data.end,
      begintime: this.data.begintime,
      endtime: this.data.endtime
    })
  },
  checkdatatime: function (e) {
    var time = new Date(e.replace(/-/g, '/'));
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    if (this.data.datetype == 'date') {
      var datas = y + '-' + this.add0(m) + '-' + this.add0(d)
    } else {
      var datas = y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s)
    }

    return datas
  },
})
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
    date: '2019-03-01',
    enddate: '2019-03-03',
    type: 0,
    typelist: [{
      title: '客户分析',
      id: 1
    }, {
      title: '会员分析',
      id: 1
    }],
    begin: '',
    end: '',
    begintime: new Date().getTime(),
    endtime: new Date().getTime(),
    radarImg: '',
    showchart: true,
    chongzhijine: '',
    xiaofeijine: '',
    qichuyue: '',
    qimoyue: '',
    xinzenghuiyuan: '',
    chongzhijine: '',
    show:false
  },
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindDateChange2: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      enddate: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function() {
    this.echartsComponnet = this.selectComponent('#mychart-dom-bar');
    this.echartsComponnet2 = this.selectComponent('#mychart-dom-bar2');
    this.getToday()
    this.getList()
  },

  switchRightTab: function(e) {
    let id = e.target.dataset.id
    console.log(e)
    this.setData({
      type: id
    })
    wx.setNavigationBarTitle({
      title: e.currentTarget.dataset.title
    })
    this.getList()
  },
  getToday() {
    var that = this;
    let timeType = 1;
    let end = that.checkdatatime(datas.getCurrentseven()[0])
    let begin = that.checkdatatime(datas.getCurrentseven()[1])
    let begin1 = begin.replace(/-/g, '/');
    let end1 = end.replace(/-/g, '/');
    console.log(end, '0000000000')
    that.setData({
      begin: begin,
      end: end,
      begintime: new Date(begin1).getTime(),
      endtime: new Date(end1).getTime()
    })
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
  resshow: function(e) {
    this.setData({
      showchart: !e.detail.show
    })
    this.getList()
  },
  getList: function() {
    if (this.data.type == 0) {
      this.getkehu()
    } else {
      this.gethuiyuan()
    }
  },
  getkehu: function() {
    console.log('1')
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    let companyCode = wx.getStorageSync('userinfo').companyCode
    let techId = wx.getStorageSync('userinfo').userId
    console.log(techId)
    const bossKeHuFenXi = Models.bossKeHuFenXi(techId, companyCode, that.data.begin, that.data.end)
    bossKeHuFenXi.then(res => {
      console.log(res)
      if (res.success) {
        wx.hideLoading()
        var data = res.result
        var chongzhijine = data['充值金额']
        var xiaofeijine = data['消费金额']
        var huiyuanxiaofei = data['会员消费']
        var feihuiyuanxiaofei = data['非会员消费']
        var listdate = []
        var huiyuanxiaofei1 = []
        var feihuiyuanxiaofei1 = []
        var xiaofeizonge = []
        var a = 0
        Object.keys(huiyuanxiaofei).forEach(function(key) {
          listdate.push(key)
          huiyuanxiaofei1.push(huiyuanxiaofei[key])
        });
        Object.keys(feihuiyuanxiaofei).forEach(function(key) {
          xiaofeizonge.push(Math.floor(huiyuanxiaofei1[a] + feihuiyuanxiaofei[key]))
          feihuiyuanxiaofei1.push(Math.floor(feihuiyuanxiaofei[key]))
          a++
        });
        var xiaofeizonge_count = 0
        for (var i = 0; i < xiaofeizonge.length; i++) {
          xiaofeizonge_count += xiaofeizonge[i]
        }
        var huiyuanxiaofei_count = 0
        for (var i = 0; i < huiyuanxiaofei1.length; i++) {
          huiyuanxiaofei_count += huiyuanxiaofei1[i]
        }
        var feihuiyuanxiaofei_count = 0
        for (var i = 0; i < feihuiyuanxiaofei1.length; i++) {
          feihuiyuanxiaofei_count += feihuiyuanxiaofei1[i]
        }
        console.log(listdate)
        console.log(huiyuanxiaofei1)
        console.log(feihuiyuanxiaofei1)
        this.setData({
          chongzhijine: chongzhijine,
          xiaofeijine: xiaofeijine,
          listdate: listdate,
          huiyuanxiaofei: huiyuanxiaofei1,
          feihuiyuanxiaofei: feihuiyuanxiaofei1,
          xiaofeizonge: xiaofeizonge,
          xiaofeizonge_count: xiaofeizonge_count,
          huiyuanxiaofei_count: huiyuanxiaofei_count,
          feihuiyuanxiaofei_count: feihuiyuanxiaofei_count
        })
        that.init_echarts_kehu()
      } else {
        wx.showToast({
          title: res.errorDesc,
          icon: 'none'
        })
      }
    })
  },
  gethuiyuan: function() {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    let companyCode = wx.getStorageSync('userinfo').companyCode
    let techId = wx.getStorageSync('userinfo').userId
    console.log(techId)
    const bossHuiYuanFenXi = Models.bossHuiYuanFenXi(techId, companyCode, that.data.begin, that.data.end)
    bossHuiYuanFenXi.then(res => {
      if (res.success) {
        wx.hideLoading()
        var data = res.result
        var xinzenghuiyuan = data['新增会员数']
        var chongzhijine = data['充值金额']
        var qichuyue = data['期初余额']
        var qimoyue = data['期末余额']
        var xiaofeijine = data['消费金额']
        var huiyuanchongzhilist = data['会员充值']
        var huiyuanxiaofeilist = data['会员充值']
        var huiyuanlistdate = []
        var huiyuanchongzhilist1 = []
        var huiyuanxiaofeilist1 = []
        var a = 0
        Object.keys(huiyuanchongzhilist).forEach(function(key) {
          huiyuanlistdate.push(key)
          huiyuanchongzhilist1.push(huiyuanchongzhilist[key])
        });
        Object.keys(huiyuanxiaofeilist).forEach(function(key) {
          huiyuanxiaofeilist1.push(huiyuanxiaofeilist[key])
        });
        this.setData({
          chongzhijine: chongzhijine,
          xiaofeijine: xiaofeijine,
          qichuyue: qichuyue,
          qimoyue: qimoyue,
          xinzenghuiyuan: xinzenghuiyuan,
          huiyuanlistdate: huiyuanlistdate,
          huiyuanchongzhilist: huiyuanchongzhilist1,
          huiyuanxiaofeilist: huiyuanxiaofeilist1
        })
        that.init_echarts_huiyuan()
      } else {
        wx.showToast({
          title: res.errorDesc,
          icon: 'none'
        })
      }
    })
  },
  init_echarts_kehu: function() {
    this.echartsComponnet.init((canvas, width, height) => {
      // 初始化图表
      Chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      // Chart.setOption(this.getOption());
      // 月分析
      this.setOption(Chart);
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return Chart;
    });
  },
  init_echarts_huiyuan: function() {
    this.echartsComponnet2.init((canvas, width, height) => {
      // 初始化图表
      Chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      // Chart.setOption(this.getOption());
      // 月分析
      this.setOption2(Chart);
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return Chart;
    });
  },
  setOption: function(Chart) {
    Chart.clear(); // 清除
    Chart.setOption(this.getOption()); //获取新数据
  },
  setOption2: function (Chart) {
    Chart.clear(); // 清除
    Chart.setOption(this.getOption2()); //获取新数据
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
        data: ['会员消费', '非会员消费']
      },
      toolbox: {
        show: false,
      },
      calculable: true,
      xAxis: [{
        type: 'category',
        data: that.data.listdate,
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
        interval: 20000,
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
          barWidth: "10",
          name: '会员消费',
          itemStyle: {
            normal: {
              color: '#1ed1f8',
              barBorderRadius: [6, 6, 0, 0]
            }
          },
          type: 'bar',
          data: that.data.huiyuanxiaofei
        },
        {
          //center: ['48.5%', '45%'],  
          barWidth: "10",
          name: '非会员消费',
          itemStyle: {
            normal: {
              color: '#febd25',
              barBorderRadius: [6, 6, 0, 0]
            }
          },
          type: 'bar',
          data: that.data.feihuiyuanxiaofei
        },
      ]

    };
    return option;
  },
  // 会员消费
  getOption2: function () {
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
        data: ['会员充值', '会员消费']
      },
      toolbox: {
        show: false,
      },
      calculable: true,
      xAxis: [{
        type: 'category',
        data: that.data.huiyuanlistdate,
        axisLine: {
          show: true,
          lineStyle: {
            color: '#999'
          }
        },
      },],
      yAxis: [{
        type: 'value',
        min: 0,
        interval: 10000,
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
        barWidth: "10",
        name: '会员充值',
        itemStyle: {
          normal: {
            color: '#1ed1f8',
            barBorderRadius: [6, 6, 0, 0]
          }
        },
        type: 'bar',
        data: that.data.huiyuanchongzhilist
      },
      {
        //center: ['48.5%', '45%'],  
        barWidth: "10",
        name: '会员消费',
        itemStyle: {
          normal: {
            color: '#febd25',
            barBorderRadius: [6, 6, 0, 0]
          }
        },
        type: 'bar',
        data: that.data.huiyuanxiaofeilist
      },
      ]

    };
    return option;
  },
  checkdatatime: function(e) {
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
    console.log(datas, '999999999')
    return datas
  },
  add0: function(m) {
    return m < 10 ? '0' + m : m
  },
  showTg() {
    console.log('1')
    this.setData({
      show: true
    })
  },
  showCg() {
    console.log('2')
    this.setData({
      show: false
    })
  },
})
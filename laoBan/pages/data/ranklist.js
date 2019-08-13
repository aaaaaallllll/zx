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
    date: '2019-03-27',
    status: false,
    begin: '',
    end: '',
    begintime: new Date().getTime(),
    endtime: new Date().getTime(),
    showbegin: false,
    showend: false,
    timeType: 1,
    xiaofei: [],
    jishi: [],
    xiangmu: [],
    datelist: [],
    showchart: true,
    datetype: 'date',
    yuefenxi: [],
    rifenxi: [],
    yuefenxititle: ['会员充值', '实际收入', '总收入', '技师项目收入']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function() {
    this.echartsComponnet = this.selectComponent('#mychart-dom-bar');
    this.echartsComponnet2 = this.selectComponent('#mychart-dom-bar2');
    this.getyesterday()
    this.getList()
  },

  getList: function() {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    let companyCode = wx.getStorageSync('userinfo').companyCode
    let techId = wx.getStorageSync('userinfo').userId
    console.log(techId)
    const bossPaiHangBang = Models.bossPaiHangBang(techId, companyCode, that.data.begin, that.data.end)
    bossPaiHangBang.then(res => {
      if (res.success) {
        wx.hideLoading()
        var xiaofei = res.result['消费品前十']
        var jishi = res.result['技师前六']
        var xiangmu = res.result['项目前十']
        // 消费前十
        console.log(xiaofei)
        for (var i = 0; i < xiaofei.length; i++) {
          // xiaofei[0].numer
          xiaofei[i].width = (xiaofei[i].numer / xiaofei[0].numer) * 100
        }
        var xiangmuname = []
        var xiangmunum = []
        var xiangmu3 = []

        for (var i = 0; i < xiangmu.length; i++) {
          xiangmuname.push(xiangmu[i].menu)
          xiangmunum.push(xiangmu[i].number)
          var xiangmu4 = {}
          xiangmu4.name = xiangmu[i].menu
          xiangmu4.value = xiangmu[i].number
          xiangmu3.push(xiangmu4)
        }
        // 获取技师前六
        var jishiqianliutitle = []
        // 横轴
        var jishiqianliuheng = []
        var jishisever = []
        var a = 0
        Object.keys(jishi).forEach(function(key) {
          var dui = {}
          dui.barWidth = "3"
          dui.name = key
          dui.type = 'bar'
          jishiqianliutitle.push(key)
          var list = jishi[key]
          var li = []
          Object.keys(list).forEach(function(key) {
            // 获取横向标题 只获取一次
            if (a == 0) {
              jishiqianliuheng.push(key)
            }
            li.push(list[key])
          });
          dui.data = li
          jishisever[a] = dui
          a++
        });
        that.setData({
          xiaofei: xiaofei,
          jishi: jishi,
          xiangmu: xiangmu3,
          xiangmunum: xiangmunum,
          xiangmuname: xiangmuname,
          jishiqianliutitle: jishiqianliutitle,
          jishiqianliuheng: jishiqianliuheng,
          jishisever: jishisever
        })
        this.init_echarts_bing();
        this.init_echarts_zhu();
      } else {
        wx.showToast({
          title: res.errorDesc,
          icon: 'none'
        })
      }
    })
  },
  getToday() {
    var that = this;
    let timeType = 1;
    let end = that.checkdatatime(datas.gettoday())
    let begin = that.checkdatatime(datas.gettoday())
    let begin1 = begin.replace(/-/g, '/');
    let end1 = end.replace(/-/g, '/');
    console.log(end, '0000000000')
    that.setData({
      timeType: timeType,
      begin: begin,
      end: end,
      begintime: new Date(begin1).getTime(),
      endtime: new Date(end1).getTime()
    })
    console.log(that.data.begintime, begin, '2222')
    this.getList()

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
  init_echarts_bing: function() {
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
  init_echarts_zhu: function() {
    this.echartsComponnet2.init((canvas, width, height) => {
      // 初始化图表
      Chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      this.setOption2(Chart);
      return Chart;
    });
  },
  setOption: function(Chart) {
    Chart.clear(); // 清除
    Chart.setOption(this.getOption()); //获取新数据
  },
  // 柱状图
  setOption2: function(Chart) {
    Chart.clear(); // 清除
    Chart.setOption(this.getOption2()); //获取新数据
  },
  // 饼状图
  getOption: function() {
    var that = this;
    // 指定图表的配置项和数据
    var colors = ['#ff8a00', '#2971f9', '#32cc94', '#f92929'];
    var option = {
      tooltip: {
        trigger: 'item',
        formatter: "{a} {b}: {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        x: 'right',
        y: "center",
        data: that.data.xiangmuname
      },
      color: ['#8ac1fa', '#ff759f', '#cc7bee', '#ef93f6', '#5095f2', '#7adaaa', '#f8d591', '#8ac1fa', '#7adad4', '#91e8f8'],
      grid: {
        left: '0%',
        containLabel: true
      },
      series: [{
        name: '访问来源',
        type: 'pie',
        radius: ['40%', '60%'],
        center: ['35%', '50%'],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: false,
            position: 'center'
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '16',
              fontWeight: 'bold'
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: that.data.xiangmu
      }]
    };
    return option;
  },
  // 柱状图
  getOption2: function() {
    var that = this;
    // 指定图表的配置项和数据
    var colors = ['#ff8a00', '#2971f9', '#32cc94', '#f92929'];
    var option = {
      tooltip: {
        trigger: 'axis',
        position:['12%','8%']
      },
      legend: {
        x: 'center',
        y: 'top',
        data: that.data.jishiqianliutitle
      },
      toolbox: {
        show: false,
        feature: {
          dataView: {
            show: true,
            readOnly: false
          },
          magicType: {
            show: true,
            type: ['line', 'bar']
          },
          restore: {
            show: true
          },
          saveAsImage: {
            show: true
          }
        }
      },
      calculable: true,
      xAxis: [{
        type: 'category',
        data: that.data.jishiqianliuheng,
        axisLine: {
          show: true,
          lineStyle: {
            color: '#999'
          }
        },
      }],
      yAxis: [{
        type: 'value',
        min: 0,
        interval: 50,
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
        left: '0%',
        right: '5%',
        bottom: '0%',
        top: '22%',
        containLabel: true
      },
      series: that.data.jishisever
    };
    return option;
  },
  resshow: function(e) {
    this.setData({
      showchart: !e.detail.show
    })
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
    that.getList()
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
})
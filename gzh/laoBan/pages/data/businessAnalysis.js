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
    datetype: 'date',
    yuefenxi: [],
    rifenxi: [],
    yuefenxititle: ['会员充值', '实际收入', '总收入', '技师项目收入'],
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
    this.echartsComponnet = this.selectComponent('#mychart-dom-bar1');
    this.echartsComponnet2 = this.selectComponent('#mychart-dom-bar2');
    this.getToday()
    // this.getList()
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
    const bossYingYeBaoBiaoFenXi = Models.bossYingYeBaoBiaoFenXi(techId, companyCode, that.data.begin, that.data.end)
    bossYingYeBaoBiaoFenXi.then(res => {
      if (res.success) {
        wx.hideLoading()
        var rifenxi = res.result['日分析']
        var yuefenxi = res.result['月分析']
        var huiyuanchongzhi = res.result['月分析']['会员充值']
        var shijishouru = res.result['月分析']['实际收入']
        var zongshouru = res.result['月分析']['总收入']
        var xiangmushouru = res.result['月分析']['技师项目收入']
        var rihuiyuanchongzhi = res.result['日分析']['会员充值']
        var rishijishouru = res.result['日分析']['实际收入']
        var rizongshouru = res.result['日分析']['总收入']
        var rixiangmushouru = res.result['日分析']['技师项目收入']
        var yuefenxidaylist = []
        var yuefenxidatalist = []
        var rifenxidatalist = []
        var yue_data1 = []
        var yue_data2 = []
        var yue_data3 = []
        var yue_data4 = []
        var ri_data1 = []
        var ri_data2 = []
        var ri_data3 = []
        var ri_data4 = []
        var ri_time_list = []
        var datelist = []
        var jinke2 = []

        // 获取月数据
        Object.keys(huiyuanchongzhi).forEach(function(key) {
          yuefenxidaylist.push(key)
          yue_data1.push(Math.floor(huiyuanchongzhi[key]))
        });
        Object.keys(shijishouru).forEach(function(key) {
          yue_data2.push(Math.floor(shijishouru[key]))
        });
        Object.keys(zongshouru).forEach(function(key) {
          yue_data3.push(Math.floor(zongshouru[key]))
        });
        Object.keys(xiangmushouru).forEach(function(key) {
          yue_data4.push(Math.floor(xiangmushouru[key]))
        });

        // 日统计
        Object.keys(rihuiyuanchongzhi).forEach(function(key) {
          ri_time_list.push(key)
          ri_data1.push(Math.floor(rihuiyuanchongzhi[key]))
        });
        Object.keys(rishijishouru).forEach(function(key) {
          ri_data2.push(Math.floor(rishijishouru[key]))
        });
        Object.keys(rizongshouru).forEach(function(key) {
          ri_data3.push(Math.floor(rizongshouru[key]))
        });
        Object.keys(rixiangmushouru).forEach(function(key) {
          ri_data4.push(Math.floor(rixiangmushouru[key]))
        });
        that.setData({
          yuefenxidaylist: yuefenxidaylist,
          yuefenxidatalist: yuefenxidatalist,
          yue_data1: yue_data1,
          yue_data2: yue_data2,
          yue_data3: yue_data3,
          yue_data4: yue_data4,
          ri_time_list: ri_time_list,
          ri_data1: ri_data1,
          ri_data2: ri_data2,
          ri_data3: ri_data3,
          ri_data4: ri_data4
        })
        this.init_echarts();
        this.init_echarts_ri();
      } else {
        wx.showToast({
          title: res.errorDesc,
          icon: 'none'
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
    let end = that.checkdatatime(datas.getCurrentseven()[0])
    let begin = that.checkdatatime(datas.getCurrentseven()[1])
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
    this.echartsComponnet2.init((canvas, width, height) => {
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
  init_echarts_ri: function() {
    this.echartsComponnet.init((canvas, width, height) => {
      // 初始化图表
      Chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      // Chart.setOption(this.getOption());
      // 月分析
      this.setOption2(Chart);
      // 日分析
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return Chart;
    });
  },
  setOption: function(Chart) {
    Chart.clear(); // 清除
    Chart.setOption(this.getOption()); //获取新数据
  },
  // 折线图
  setOption2: function(Chart) {
    Chart.clear(); // 清除
    Chart.setOption(this.getOption2()); //获取新数据
  },
  // 柱状图
  getOption: function() {
    var that = this;
    // 指定图表的配置项和数据
    var colors = ['#ff8a00', '#2971f9', '#32cc94', '#f92929'];
    var option = {
      title: {
        textStyle: {
          fontStyle: 'normal', //风格
          fontWeight: 'normal', //粗细
          fontSize: 10, //大小
        }
      },
      tooltip: {
        trigger: 'axis',
        position: ['14%', '8%'],
      },
      legend: {
        x: '0',
        y: 'top',
        textStyle: {
          fontStyle: 'normal', //风格
          fontWeight: 'normal', //粗细
          fontSize: 10, //大小
        },
        data: that.data.yuefenxititle
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
        data: that.data.yuefenxidaylist,
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
        interval: 200000,
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
        top: '12%',
        containLabel: true
      },
      series: [{
          //center: ['48.5%', '45%'],  
          barWidth: "6",
          name: '会员充值',
          itemStyle: {
            normal: {
              color: '#1ed1f8',
              barBorderRadius: [6, 6, 0, 0]
            }
          },
          type: 'bar',
          data: that.data.yue_data1
        },
        {
          //center: ['48.5%', '45%'],  
          barWidth: "6",
          name: '实际收入',
          itemStyle: {
            normal: {
              color: '#febd25',
              barBorderRadius: [6, 6, 0, 0]
            }
          },
          type: 'bar',
          data: that.data.yue_data2
        },
        {
          name: '总收入',
          barWidth: "6",
          type: 'bar',
          data: that.data.yue_data3,
          itemStyle: {
            normal: {
              color: '#df72fd',
              barBorderRadius: [6, 6, 0, 0]
            }
          },
        },
        {
          name: '技师项目收入',
          barWidth: "6",
          type: 'bar',
          itemStyle: {
            normal: {
              color: '#f77f6e',
              barBorderRadius: [6, 6, 0, 0]
            }
          },
          data: that.data.yue_data4,
        },
      ]

    };
    return option;
  },
  // 折线图
  getOption2: function() {
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
        }
      },
      tooltip: {
        trigger: 'axis',
        position: ['14%', '8%'],
      },
      legend: {
        textStyle: {
          fontStyle: 'normal', //风格
          fontWeight: 'normal', //粗细
          fontSize: 10, //大小
        },
        data: that.data.yuefenxititle
      },
      grid: {
        left: '0%',
        right: '5%',
        bottom: '0%',
        top: '12%',
        containLabel: true
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
        },
      
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: that.data.ri_time_list,
        axisLine: {
          show: true,
          lineStyle: {
            color: '#999'
          }
        },
      },
      yAxis: {
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
      },
      series: [{
          name: '会员充值',
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
          data: that.data.ri_data1
        },
        {
          name: '实际收入',
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
          data: that.data.ri_data2
        },
        {
          name: '总收入',
          smooth: true,
          symbol: 'none',
          type: 'line',
          itemStyle: {
            normal: {
              lineStyle: {
                color: '#32cc94'
              }
            }
          },
          data: that.data.ri_data3
        },
        {
          name: '技师项目收入',
          smooth: true,
          symbol: 'none',
          type: 'line',
          itemStyle: {
            normal: {
              lineStyle: {
                color: '#f92929'
              }
            }
          },
          data: that.data.ri_data4
        }
      ]
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
})
import {
  Model
} from '../../api/model.js'
const Models = new Model()
import {
  Datas
} from '../../utils/data.js'
import {
  api
} from '../../api/config.js'
const datas = new Datas()
var util = require('../../utils/util.js');
import * as echarts from '../../ec-canvas/echarts';
var dataList = [];
var k = 0;
var Chart = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      lazyLoad: true // 延迟加载
    },
    type: 0,
    status: false,
    begin: '',
    end: '',
    begintime: new Date().getTime(),
    endtime: new Date().getTime(),
    showbegin: false,
    showend: false,
    timeType: 1,
    show:false,
    // reqIndex:0,
    mdList:[],
    outlist:[],
    sumList:[],
    reaList:[],
    shopNames:[],
    shopTitle:[],
    shopData:[]
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
    this.getIndex()
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
    // console.log('111')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    // console.log('111')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  getIndex(){
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
            let shopNames=[]
            // that.getList()
            that.getyesterday()
            for (let i = 0; i < _data.length;i++){
              shopNames.push(that.formatter(_data[i].companyname))
            } 
            that.setData({
              shopNames:shopNames
            }) 
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
  formatter: function (val) {
    var strs = val.split(''); //字符串数组
    var str = ''
    for (var i = 0, s; s = strs[i++];) { //遍历字符串数组
      str += s;
      if (!(i % 4)) str += '\n'; //按需要求余
    }
    return str
  },
  getdata: function(e) {

  },
  resdata: function(e) {
    console.log(e)
    this.setData({
      begin: e.detail.begin,
      end: e.detail.end,
      begintime: e.detail.begintime,
      endtime: e.detail.endtime
    })
    this.getList()
  },
  getList: function() {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    // let companyCode = wx.getStorageSync('userinfo').companyCode
    let techId = wx.getStorageSync('userinfo').userId
    const mdList=that.data.mdList
    // const mdList = [{
    //   companyname:'赵飞',
    //   companycode: 'm44gwOk2PSU4cMtqHiEw007'
    // },
    //   {
    //     companyname: '赵飞',
    //     companycode: 'm44gwOk2PSU4cMtqHiEw007'
    //   }]
    console.log(mdList)
    let outList=[]
    let goList = []
    let sumList = []
    let reaList = []
    let nrList=[]
    // mdList[i].companycode
    for (let i = 0; i < mdList.length;i++){
      console.log(mdList[i].companycode)
      const shouKuanTongJi = Models.shouKuanTongJi(mdList[i].companycode, techId, that.data.begin, that.data.end)
      shouKuanTongJi.then(res => {
       console.log(res)
        if (res.success){
          goList.push(Math.floor(res.result.data.进客))
          outList.push(Math.floor(res.result.data.出客))
          sumList.push(Math.floor(res.result.data.总收入))
          reaList.push(Math.floor(res.result.data.实际收入))
          wx.hideLoading()
          const shopTitle = res.result.title
          let list3 = []
          // var titlelist = res.result.title
          // var datalist = res.result.data
          // var listpro = []
          // let list3 = {}
          // for (var s = 0; s < titlelist.length; s++) {
          //   let d = titlelist[s]
          //   list3[s] = datalist[d]
          //   console.log(list3)
          // }
          // wx.hideLoading()
          // that.setData({
          //   listdata: list3,
          //   listtitle: res.result.title
          // })
          // console.log(that.data.listtitle)
          for (let s = 0; s < shopTitle.length; s++) {
            let d = shopTitle[s]
            list3.push(res.result.data[d])
          }
          console.log(list3)
          let josn = {
            name: mdList[i].companyname,
            list: list3
          }
          nrList.push(josn)
          that.setData({
            outList: outList,
            goList: goList,
            sumList: sumList,
            reaList: reaList,
            shopTitle: shopTitle,
            shopData: nrList
          })
          console.log(that.data.shopData)
          // console.log(that.data.goList)
          // console.log(that.data.sumList)
          // console.log(that.data.reaList)
          this.getData(); //获取数据
        }else{
          wx.showToast({
            title: mdList[i].companynameres.errorDesc,
            icon: 'none'
          })
        }
        

      })
    }
    
    
  },
 
  // 柱状图
  getData: function () {
    if (k % 2) {
      dataList = [1, 2, 3, 4, 5, 6];
    } else {
      dataList = [7, 6, 9, 2, 5, 6];
    }
    k++;
    //如果是第一次绘制
    this.init_echarts_ri();
    this.init_echarts(); //初始化图表
    // if (!Chart) {
     
    // } else {
    //   console.log('hhh')
    //   // this.setOption(Chart); //更新数据
    // }
   
  },
  //初始化图表
  init_echarts: function () {
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
  init_echarts_ri: function () {
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
  setOption: function (Chart) {
    Chart.clear();  // 清除
    Chart.setOption(this.getOption());  //获取新数据
  },
  setOption2: function (Chart) {
    Chart.clear(); // 清除
    Chart.setOption(this.getOption2()); //获取新数据
  },
  getOption: function () {
    const that=this
    // 指定图表的配置项和数据
    var option = {
      color: ['#37a2da', '#32c5e9', '#67e0e3','#079992'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        },
        confine: true
      },
      legend: {
        data: ['进客', '出客']
      },
      grid: {
        left: 20,
        right: 20,
        bottom: 15,
        top: 40,
        containLabel: true
      },
      xAxis: [
        {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisLabel: {
            color: '#666',
            fontSize:10
          }
        }
      ],
      yAxis: [
        {
          type: 'category',
          axisTick: { show: false },
          data: that.data.shopNames,
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisLabel: {
            color: '#666',
            fontSize: 10
          }
        }
      ],
      series: [
        {
          name: '进客',
          type: 'bar',
          label: {
            normal: {
              show: true,
              position: 'inside',
              rich: {},
              fontSize: 10
            }
          },
          data: that.data.goList,
          itemStyle: {
            // emphasis: {
            //   color: '#37a2da'
            // }
          }
        },
        
        {
          name: '出客',
          type: 'bar',
          label: {
            normal: {
              show: true,
              position: 'inside',
              rich: {},
              fontSize: 10
            }
          },
          data: that.data.outlist,
          itemStyle: {
            // emphasis: {
            //   color: '#32c5e9'
            // }
          }
        },
        
      ]
    }
    return option;
  },
  getOption2: function () {
    const that = this
    // 指定图表的配置项和数据
    var option = {
      color: ['#ff6348', '#ff6b81'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        },
        confine: true
      },
      legend: {
        data: ['实际收入', '总收入']
      },
      grid: {
        left: 20,
        right: 20,
        bottom: 15,
        top: 40,
        containLabel: true
      },
      xAxis: [
        {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisLabel: {
            color: '#666',
            fontSize: 10
          }
        }
      ],
      yAxis: [
        {
          type: 'category',
          axisTick: { show: false },
          data: that.data.shopNames,
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisLabel: {
            color: '#666',
            fontSize: 10
          }
        }
      ],
      series: [
        {
          name: '实际收入',
          type: 'bar',
          label: {
            normal: {
              show: true,
              position: 'inside',
              rich: {},
              fontSize: 10
            }
          },
          data: that.data.reaList,
          itemStyle: {
            // emphasis: {
            //   color: '#37a2da'
            // }
          }
        },
        {
          name: '总收入',
          type: 'bar',
          label: {
            normal: {
              show: true,
              position: 'inside',
              rich: {},
              fontSize:10
            }
          },
          data: that.data.sumList,
          itemStyle: {
            // emphasis: {
            //   color: '#37a2da'
            // }
          }
        },
      ]
    }
    return option;
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
    let end = datas.gettoday()
    let begin = datas.gettoday()
    let begin1 = begin.replace(/-/g, '/');
    let end1 = end.replace(/-/g, '/');
    that.setData({
      timeType: timeType,
      begin: begin,
      end: end,
      begintime: new Date(begin1).getTime(),
      endtime: new Date(end1).getTime()
    })
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
  add0: function (m) {
    return m < 10 ? '0' + m : m
  },
})
// pages/table/mdfwCvr.js
// pages/table/mdywCvr.js
import {
  Datas
} from '../../utils/data.js'
import {
  api
} from '../../api/config.js'
const datas = new Datas()
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: false,
    begin: '',
    end: '',
    begintime: new Date().getTime(),
    endtime: new Date().getTime(),
    shopTitle: ['按摩', '助浴', '足浴'],
    // shopTitle: ['本日金额', '本月累计', '本月指标', '本月指标完成度', '本月累计', '本月指标', '本月指标完成度', '本月累计', '本月指标', '本月指标完成度'],
    gradeData: [],
    total: [],
    shopNames: [],
    companyList: [],
    datetype: 'date',
    showLable: false,
    left: 0,
    offsetTop: 10000,
    scrollTop: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getToday()

    
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
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0
    })
    const that = this
    that.getIndex()

    var query = wx.createSelectorQuery()//创建节点查询器 query
    query.select('#title').boundingClientRect()//这段代码的意思是选择Id=the-id的节点，获取节点位置信息的查询请求
    query.selectViewport().scrollOffset()//这段代码的意思是获取页面滑动位置的查询请求
    query.exec(function (res) {
      // res[0].top       // #the-id节点的上边界坐标
      // res[1].scrollTop // 显示区域的竖直滚动位置
      console.log(res)
      that.setData({
        offsetTop: res[0].top,
      })
      // console.log(res[0].top)
      // console.log(res[0].left)
    })
  },
  onPageScroll: function (e) {
    // console.log(e)//{scrollTop:99}
    this.setData({
      scrollTop: e.scrollTop
    })
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
  //获取日期
  resdata: function (e) {
    console.log(e)
    this.setData({
      begin: e.detail.begin,
      end: e.detail.end,
      begintime: e.detail.begintime,
      endtime: e.detail.endtime
    })
    // this.getList()
  },
  //切换查询方式
  changedata() {
    var status = this.data.status
    this.setData({
      status: !status
    })
  },
  //时段查询
  // checkdata: function (e) {
  //   var that = this;
  //   console.log(e)
  //   var type = e.currentTarget.dataset.id
  //   that.setData({
  //     type: type
  //   })
  //   if (type == 0) {
  //     this.getToday()
  //   } else if (type == 1) {
  //     this.getyesterday()
  //   } else if (type == 2) {
  //     this.getCurrentMonth()
  //   } else {
  //     this.getlastMonth()
  //   }
  // },
  // getToday() {
  //   var that = this;
  //   let timeType = 1;
  //   let end = datas.gettoday()
  //   let begin = datas.gettoday()
  //   let begin1 = begin.replace(/-/g, '/');
  //   let end1 = end.replace(/-/g, '/');
  //   that.setData({
  //     timeType: timeType,
  //     begin: begin,
  //     end: end,
  //     begintime: new Date(begin1).getTime(),
  //     endtime: new Date(end1).getTime()
  //   })
  //   this.getList()
  // },
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
  getdata: function (e) {
    console.log(e)
    this.setData({
      begin: e.detail.begin,
      end: e.detail.end,
      begintime: e.detail.begintime,
      endtime: e.detail.endtime
    })
    this.getList()
  },
  getdatatimebegin: function (e) {
    console.log(e)
    this.setData({
      begin: e.detail.data,
      begintime: e.detail.datatime
    })
  },
  getdatatimeend: function (e) {
    console.log(e)
    this.setData({
      end: e.detail.data,
      endtime: e.detail.datatime
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
  getList() {
    console.log('1')
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    // let companyCode = wx.getStorageSync('userinfo').companyCode
    let userId = wx.getStorageSync('userinfo').userId
    const companyList = that.data.companyList
    // const companyList = ['m44gwOk2PSU4cMtqHiEw007', 'm44gwOk2PSU4cMtqHiEw007']
    const shopNames = that.data.shopNames
    // const shopNames = ['1','2']


    let dList = []
    let qiuHe = []

    console.log(companyList)

    // mdList[i].companycode

    for (let i = 0; i < companyList.length; i++) {
      wx.request({
        url: api.url,
        data: {
          operationType: 'queryLocal',
          companyCode: companyList[i],
          queryType: 'YeWuZhuanHuaLv',
          end: that.data.end,
          begin: that.data.begin,
          // begin: "2019-06-02",
          // date: "2019-06-02",
          type: '服务',
          userId: userId
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'post',
        success(res) {
          wx.hideLoading()
          console.log(res.data)

          if (res.data.success) {
            const list = res.data.result
            let list2 = []
            //获取主要标题
            for (let j = 0; j < list.length; j++) {
              const son = {
                proCat: list[j].proCat,
                list: [list[j].proName],
                data: [list[j].proVal]
              }

              list2.push(son)
            }
            // console.log(list2)
            let tList = []
            let lsList = []
            //标题去重
            for (let j = 0; j < list2.length; j++) {
              let index = lsList.indexOf(list2[j].proCat)
              if (index == -1) {
                lsList.push(list2[j].proCat)
                tList.push(list2[j]);
              } else {
                tList[index].list.push(list2[j].list[0])
                tList[index].data.push(list2[j].data[0])
              }
            }
            // console.log(tList)
            //标题排序
            let oneList = []
            let twoList = []
            let senList = []
            let fourList = []
            let pxList = []
            for (let j = 0; j < tList.length; j++) {
              if (tList[j].proCat.indexOf('结账人数') != -1) {
                oneList.push(tList[j])
              } else if (tList[j].proCat.indexOf('式') != -1) {
                twoList.push(tList[j])
              } else if (tList[j].proCat.indexOf('助浴') != -1) {
                fourList.push(tList[j])
              } else {
                senList.push(tList[j])
              }
            }
            let numb = ['十', '九', '八', '七', '六', '五', '四', '三', '二', '一']
            twoList.sort((a, b) => {
              return numb.indexOf(b.proCat.slice(0, 1)) - numb.indexOf(a.proCat.slice(0, 1))
            })
            console.log(oneList)
            pxList.push.apply(pxList, oneList)
            pxList.push.apply(pxList, twoList)
            pxList.push.apply(pxList, senList)
            pxList.push.apply(pxList, fourList)
            console.log(pxList)
            // dList.push(pxList)
            //往里面改数据那
            //求和数据
            let qhlist = []
            for (let j = 0; j < pxList.length; j++) {
              qhlist.push.apply(qhlist, pxList[j].data)
            }
            qiuHe.push(qhlist)

            //出现位置数据
            let bfbLIst = []
            for (let j = 0; j < pxList.length; j++) {
              bfbLIst.push.apply(bfbLIst, pxList[j].list)
            }
            let n = 0;
            let n2 = 0;
            let arr1 = [];
            let arr2 = [];

            while (bfbLIst.indexOf('转化率', n) != -1) {
              var m = bfbLIst.indexOf('转化率', n);
              n = m + 1;
              arr1.push(m);
            }
            while (bfbLIst.indexOf('会员占比', n2) != -1) {
              var m = bfbLIst.indexOf('会员占比', n2);
              n2 = m + 1;
              arr2.push(m);
            }
            console.log(arr2)
            //转换百分比


            for (let j = 0; j < pxList.length; j++) {
              if (pxList[j].list.indexOf('转化率') != -1) {
                let ys = pxList[j].data[pxList[j].list.indexOf('转化率')] * 100 + '%'
                pxList[j].data[pxList[j].list.indexOf('转化率')] = ys

              }
            }
            for (let j = 0; j < pxList.length; j++) {
              if (pxList[j].list.indexOf('会员占比') != -1) {
                let index = pxList[j].list.indexOf('会员占比')
                let ls = pxList[j].data[index] * 100 + '%'
                pxList[j].data[pxList[j].list.indexOf('会员占比')] = ls
              }
            }
            console.log(pxList)
            let shujuList = []
            let pxList2 = pxList

            for (let j = 0; j < pxList.length; j++) {
              shujuList.push.apply(shujuList, pxList2[j].data)
            }
            // console.log(shujuList)
            // dList.push(shujuList)
            //求和
            let qiuHeList = []
            for (let j = 0; j < qiuHe.length; j++) {
              qiuHe[j].forEach((value, index) => {
                if (qiuHeList[index] == null || qiuHeList[index] == '') {
                  qiuHeList[index] = 0;
                }
                qiuHeList[index] += value;
              })
            }
            // gradeList.push(dlist)

            for (let j = 0; j < arr1.length; j++) {
              qiuHeList[arr1[j]] = qiuHeList[arr1[j]] * 100 + '%'
            }
            for (let j = 0; j < arr2.length; j++) {
              qiuHeList[arr2[j]] = qiuHeList[arr2[j]] * 100 + '%'
            }
            let bson = {
              name: shopNames[i],
              list: shujuList
            }
            dList.push(bson)
            console.log(qiuHeList)
            //添加数据
            if (pxList.length>0){
              that.setData({
                shopTitles: pxList
              })
            }
            that.setData({
              
              total: qiuHeList,
              gradeData: dList
            })

          } else {
            wx.showToast({

              title: shopNames[i] +res.data.errorDesc,

              icon: 'none',

              duration: 1000//持续的时间

            })
          }
        }
      })
    }

  },
  toYinYeReport(e) {
    const companyCode = e.currentTarget.id
    const userId = wx.getStorageSync('userinfo').userId
    const pwd = wx.getStorageSync('userinfo').pwd
    const companyName = e.currentTarget.dataset.name
    console.log(companyCode)
    console.log(companyName)
    let list = {
      companyCode: companyCode,
      userId: userId,
      pwd: pwd,
      companyName: companyName
    }
    wx.setStorageSync("userinfo", list);
    console.log(wx.getStorageSync('userinfo'))
    wx.navigateTo({
      url: '/pages/table/yinYeReport',
    })
  },
  toSyingReport(e) {
    const companyCode = e.currentTarget.id
    const techId = wx.getStorageSync('userinfo').techId
    const pwd = wx.getStorageSync('userinfo').pwd
    const companyName = e.currentTarget.dataset.name
    console.log(companyCode)
    console.log(companyName)
    let list = {
      companyCode: companyCode,
      techId: techId,
      pwd: pwd,
      companyName: companyName
    }
    wx.setStorageSync("userinfo", list);
    console.log(wx.getStorageSync('userinfo'))
    wx.navigateTo({
      url: '/pages/table/syingReport',
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
  checkdatatime: function (e) {
    var time = new Date(e.replace(/-/g, '/'));
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    var datas = y + '-' + this.add0(m) + '-' + this.add0(d)
    return datas
  },
  add0: function (m) {
    return m < 10 ? '0' + m : m
  },
  //获取门店id
  getIndex() {
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
            let shopNames = []
            let companyList = []
            // that.getList()

            for (let i = 0; i < _data.length; i++) {
              shopNames.push(_data[i].companyname)
              companyList.push(_data[i].companycode)
            }
            that.setData({
              shopNames: shopNames,
              companyList: companyList
            })
            that.getyesterday()
          } else {
            wx.showToast({
              title: res.data.errorDesc,
              icon: 'none',
              duration: 1000//持续的时间
            })
          }
        }
      }
    })

  },
  getLeft(e) {
    // console.log(e.detail.scrollLeft)
    // console.log(e.currentTarget.offsetTop)
    let left = e.detail.scrollLeft
    let offsetTop = e.currentTarget.offsetTop
    this.setData({
      left: left,

    })
  },
})
// pages/section/secPage.js
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
    shopTitles: ['本日数量', '本日应收业绩', '本日实收业绩', '服务人数', '服务转化率', '累计数量', '累计应收业绩', '累计实收业绩','本月指标','指标完成率'],
    gradeData: [{
      bumenName: '足疗部',
      leiBie: '一式',
      benRiShuLian: 5,
      benRiYingShouYeJi: 5,
      benYueYingShouYeJi: 5,
      fuWuRenShu:23,
      fuWuZhuanHuaLv:'50%',
      leiJiShuLian:5,
      leiJiYingShouYeJi:5,
      benYueZhiBiao:5,
      zhiBiaoWangChengLv:'20%'
    }],
    total: [],
    shopNames: [],
    companyList: [],
    datetype: 'date',
    left: 0,
    offsetTop: 10000,
    scrollTop: 0,
    shopName: '',
    yuEType: '全部',
    yuEList: [],
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
    let companyName = wx.getStorageSync('userinfo').companyName
    that.setData({
      shopName: companyName
    })
    var query = wx.createSelectorQuery()//创建节点查询器 query
    query.select('#title').boundingClientRect()//这段代码的意思是选择Id=the-id的节点，获取节点位置信息的查询请求
    query.selectViewport().scrollOffset()//这段代码的意思是获取页面滑动位置的查询请求
    query.exec(function (res) {
      // res[0].top       // #the-id节点的上边界坐标
      // res[1].scrollTop // 显示区域的竖直滚动位置
      // console.log(res)
      that.setData({
        offsetTop: res[0].top,
      })
      // console.log(res[0].top)
      // console.log(res[0].left)
    })
    that.getyesterday()
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
  toSecRem() {
    // wx.navigateTo({
    //   url: '/pages/section/secRem',
    // })
  },
  changedata() {
    var status = this.data.status
    this.setData({
      status: !status
    })
  },
  getdata: function (e) {
    // console.log(e)
    this.setData({
      begin: e.detail.begin,
      end: e.detail.end,
      begintime: e.detail.begintime,
      endtime: e.detail.endtime
    })
    this.getList()
  },
  getdatatimebegin: function (e) {
    // console.log(e)
    this.setData({
      begin: e.detail.data,
      begintime: e.detail.datatime
    })
  },
  getdatatimeend: function (e) {
    // console.log(e)
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
    // console.log('1')
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    let companyCode = wx.getStorageSync('userinfo').companyCode
    let userId = wx.getStorageSync('userinfo').userId
    let buMen = that.data.yuEType
    if(buMen=='全部'){
      buMen=' '
    }

    wx.request({
      url: api.url,
      data: {
        operationType: 'queryLocal',
        companyCode: companyCode,
        queryType: 'BuMenXiangMuBaoBiao',
        date: that.data.begin,
        buMen: buMen,
        userId: userId
        // date: "2019-06-02 00:00:00"
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success(res) {
        wx.hideLoading()
        console.log(res.data)
        
        if (res.data.success) {
          let data = res.data.result
         
          //部门列表
          let list=[]
          for(let i=0;i<data.length;i++){
            list.push(data[i].buMen)
          }
          var temp = []; //一个新的临时数组
          for (var i = 0; i < list.length; i++) {
            if (temp.indexOf(list[i]) == -1) {
              temp.push(list[i]);
          }
          }
          let list2=[]
          for (let i = 0; i < temp.length;i++){
            let son={
              name: temp[i]
            }
            list2.push(son)
          }
          list2.unshift({
            name:'全部'
          })
          console.log(temp)
          //排序+求和
          let qiuHe=[0,0,0,0,'',0,0,0,0,'']
          for(let i=0;i<data.length;i++){
            let index = temp.indexOf(data[i].buMen)
            data[i].px=index
            qiuHe[0] += Math.floor(data[i].benRiShuLiang)
            qiuHe[1] += Math.floor(data[i].benRiYingShou)
            qiuHe[2] += Math.floor(data[i].benRiShiShou)
            qiuHe[3] += Math.floor(data[i].fuWuRenShu)
            qiuHe[5] += Math.floor(data[i].benYueShuLiang)
            qiuHe[6] += Math.floor(data[i].benYueYingShou)
            qiuHe[7] += Math.floor(data[i].benYueShiShou)
            qiuHe[8] += Math.floor(data[i].benYueZhiBiao)
          }
          if (qiuHe[8]!=0){
            qiuHe[9] = (Math.floor((qiuHe[7] / qiuHe[8]) * 10000)) / 100 + '%'
          }
          
          let qbList = data.sort((a,b)=>{
            return a.px - b.px
          })
          console.log(qbList)
          that.setData({
            gradeData: qbList,
            total:qiuHe
          })
          
          if (that.data.yuEType=='全部'){
            that.setData({
              yuEList: list2,
            })
          }
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
  getLeft(e) {
    // console.log(e.detail.scrollLeft)
    // console.log(e.currentTarget.offsetTop)
    let left = e.detail.scrollLeft
    let offsetTop = e.currentTarget.offsetTop
    this.setData({
      left: left,

    })
  },
  bindPickeryuEtype(e) {
    var that = this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    that.setData({
      yuEType: that.data.yuEList[e.detail.value].name
    })
    console.log('1')
  },
})
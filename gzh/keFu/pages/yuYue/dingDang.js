// pages/yuYue/dingDang.js
import {
  Datas
} from '../../utils/data2.js'
import {
  api
} from '../../api/config.js'
const datas = new Datas()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    begin: '',
    end: '',
    bgcolor:"#ccc",
    begintime: new Date().getTime(),
    endtime: new Date().getTime(),
    shopTitles: ['预约类型','预约状态', '预约姓名', '人数', '预约电话','房间号', '服务技师', '服务项目'],
    gradeData: [{
      bumenName: '2015-5-5',
      benRiLeiJi: 0,
      benYueLeiJi: 5,
      zhiBiaoWangChenLv: '100%'
    },
    {
      bumenName: '2015-5-5',
      benRiLeiJi: 0,
      benYueLeiJi: 5,
      zhiBiaoWangChenLv: '100%'
    },
    {
      bumenName: '2015-5-5',
      benRiLeiJi: 0,
      benYueLeiJi: 5,
      zhiBiaoWangChenLv: '100%'
    },
    {
      bumenName: '2015-5-5',
      benRiLeiJi: 0,
      benYueLeiJi: 5,
      zhiBiaoWangChenLv: '500%'
    },
    {
      bumenName: '2015-5-5',
      benRiLeiJi: 0,
      benYueLeiJi: 5,
      zhiBiaoWangChenLv: '100%'
    },
    {
      bumenName: '2015-5-5',
      benRiLeiJi: 0,
      benYueLeiJi: 3,
      zhiBiaoWangChenLv: '100%'
    }],
    left: 0,
    offsetTop: 10000,
    scrollTop: 0,
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
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0
    })
    const that = this
    
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
    that.getToday()
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
  getList(){
    const that=this
    const companyCode = wx.getStorageSync('userinfo').companyCode
    // console.log(companyCode)
    const userId = wx.getStorageSync('userinfo').techId
    const openid = wx.getStorageSync('openid')
    console.log(companyCode, openid)
    wx.request({
      url: api.url,
      data: {
        companyCode: companyCode,
        // openid: that.openid,
        userId: userId,
        begin:that.data.begin,
        end: that.data.end,
        operationType: 'queryLocal',
        queryType: 'GetYuYueList',
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success(res) {
        console.log(res)

        if (res.data.success) {
          const list = res.data.result
          let yyList=[]
          for(let i=0;i<list.length;i++){
            let num = list[i].createTime.replace(/[^0-9]/ig, "");
            let ydate = parseInt(num)
            let time = new Date(ydate);
            let num2 = list[i].yuJiDaoDa.replace(/[^0-9]/ig, "");
            let ydate2 = parseInt(num2)
            let time2 = new Date(ydate2);
            
            let son={
              createTime: time.getFullYear() + "-" + `${parseInt(time.getMonth()) + 1}` + "-" + time.getDate() + ' ' +  that.PrefixInteger(time.getHours(), 2) + ':' + that.PrefixInteger(time.getMinutes(), 2) + ':' + that.PrefixInteger(time.getSeconds(), 2),
              dianZhongTechId: list[i].dianZhongTechId,
              keName: list[i].keName,
              kePhone: list[i].kePhone,
              roomNo: list[i].roomNo,
              menuName: list[i].menuName,
              remark: list[i].remark!=null?list[i].remark:list[i].number,
              stat:list[i].stat,
              yuYueLeiXing: list[i].yuYueLeiXing,
              yuJiDaoDa: time2.getFullYear() + "-" + `${parseInt(time2.getMonth()) + 1}` + "-" + time2.getDate() + ' ' + that.PrefixInteger(time2.getHours(), 2) + ':' + that.PrefixInteger(time2.getMinutes(), 2) + ':' + that.PrefixInteger(time2.getSeconds(), 2),
            }
            yyList.push(son)
          }
          console.log(yyList)
          that.setData({
            gradeData: yyList
          })
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
  PrefixInteger(num, m) {
    return (Array(m).join(0) + num).slice(-m);
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
    console.log(e)
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
  getCurrentMonth() {
    var that = this;
    let timeType = 1;
    let end = that.checkdatatime(datas.getCurrentMonth()[0]);
    let begin = that.checkdatatime(datas.getCurrentMonth()[1]);
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
  getToday() {
    var that = this;
    let timeType = 1;
    let end = datas.gettoday()
    let begin = datas.getyesterday()
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
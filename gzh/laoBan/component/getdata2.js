import {
  Model
} from '../api/model.js'
const Models = new Model()
import {
  Datas
} from '../utils/data.js'
const datas = new Datas()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    datetype: {
      type: String,
      value: 'datetime',
      observer: function (newval, oldval) {
        // 第一种方式通过参数传递的方式触发函数的执行
        this.isgettoday();
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    timeType: 1,
    index: 0,
    type: 0,
    typelist: [{
      title: '今日',
      id: '1'
    }, {
      title: '昨日',
      id: '2'
    }, {
      title: '本月',
      id: '3'
    }, {
      title: '上月',
      id: '4'
    }],
    showbegin: false,
    showend: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    isgettoday: function (e) {
      if (this.data.type == 0) {
        this.resdata()
        this.getToday()
      }
    },
    checkdata: function (e) {
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
      this.resdata()
    },
    getlastMonth() {
      var that = this;
      let timeType = 1;
      let end = that.checkdatatime(datas.getPreviousMonth()[0]);
      let begin = that.checkdatatime(datas.getPreviousMonth()[1]);
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
    getToday() {
      var that = this;
      let timeType = 1;
      let end = that.checkdatatime(datas.gettoday())
      let begin = that.checkdatatime(datas.gettoday())
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
    add0: function (m) {
      return m < 10 ? '0' + m : m
    },
  }
})
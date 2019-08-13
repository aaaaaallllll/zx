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
      this.resdata()
    },
    getlastMonth() {
      var that = this;
      let timeType = 1;
      let end = datas.getPreviousMonth()[0];
      let begin = datas.getPreviousMonth()[1];
      that.setData({
        timeType: timeType,
        begin: begin,
        end: end,
        begintime: new Date(begin).getTime(),
        endtime: new Date(end).getTime()
      })
    },
    getToday() {
      var that = this;
      let timeType = 1;
      let end = datas.gettoday()
      let begin = datas.gettoday()
      that.setData({
        timeType: timeType,
        begin: begin,
        end: end,
        begintime: new Date(begin).getTime(),
        endtime: new Date(end).getTime()
      })
    },
    getCurrentMonth() {
      var that = this;
      let timeType = 1;
      let end = datas.getCurrentMonth()[0];
      let begin = datas.getCurrentMonth()[1];
      that.setData({
        timeType: timeType,
        begin: begin,
        end: end,
        begintime: new Date(begin).getTime(),
        endtime: new Date(end).getTime()
      })
    },
    getyesterday() {
      var that = this;
      let timeType = 1;
      let end = datas.getyesterday()
      let begin = datas.getyesterday()
      that.setData({
        timeType: timeType,
        begin: begin,
        end: end,
        begintime: new Date(begin).getTime(),
        endtime: new Date(end).getTime()
      })
    },
    resdata: function() {
      this.triggerEvent('resdata', {
        begin: this.data.begin,
        end: this.data.end,
        begintime: this.data.begintime,
        endtime: this.data.endtime
      })
    },
  }
})
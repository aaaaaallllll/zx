// component/getdatatime.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: '开始时间',
    },
    data: {
      type: String,
      value: '',
    },
    datatime: {
      type: Number,
      value: '',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    showbegin: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    checkdatatime: function(e) {
      var time = new Date(e);
      var y = time.getFullYear();
      var m = time.getMonth() + 1;
      var d = time.getDate();
      var h = time.getHours();
      var mm = time.getMinutes();
      var s = time.getSeconds();
      var datas = y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s)
      return datas
    },
    add0: function(m) {
      return m < 10 ? '0' + m : m
    },
    showtimebegin: function() {
      this.setData({
        showbegin: true,
      })
      this.resshow()
    },
    hidetimebegin: function () {
      this.setData({
        showbegin: false,
      })
      this.resshow()
    },
    checkbegin: function(e) {
      var start = e.detail
      this.setData({
        datatime: start,
        data: this.checkdatatime(start),
        showbegin: false
      })
      this.resdata()
      this.resshow()
    },
    resdata: function() {
      this.triggerEvent('resdata', {
        data: this.data.data,
        datatime: this.data.datatime,
      })
    },
    resshow: function () {
      this.triggerEvent('resshow', {
        show: this.data.showbegin
      })
    },
  }
})
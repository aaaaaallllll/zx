// component/select/select.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: '项目分类',
    },
    value: {
      type: String,
      value: '',
    },
    placeholder: {
      type: String,
      value: '请选择项目分类',
    },
    index:{
      type: Number,
      value: 0,
    },
    data: {
      type: Array
    },
    name: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindPickerChange: function(e) {
      console.log(e)
      this.setData({
        index: e.detail.value
      })
      this.resdata()
    },
    resdata: function() {
      this.triggerEvent('resdata', {
        index: this.data.index,
        title: this.data.data[this.data.index]
      })
    },
  }
})
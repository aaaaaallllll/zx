// component/input.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type: {
      type: String,
      value: 'text',
    },
    icon: {
      type: String,
      value: ''
    },
    value: {
      type: String,
      value: ''
    },
    placeholder: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    passwordshow: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    updateValue(e) {
      let name = e.currentTarget.dataset.name;
      let nameMap = {}
      nameMap[name] = e.detail && e.detail.value
      this.setData(nameMap)
      this.resdata()
    },
    clearValue(e) {
      let name = e.currentTarget.dataset.name;
      let nameMap = {}
      nameMap[name] = ''
      this.setData(nameMap)
      this.resdata()
    },
    hidepassword: function() {
      this.setData({
        passwordshow: false
      })
    },
    showpassword: function() {
      this.setData({
        passwordshow: true
      })
    },
    resdata: function() {
      this.triggerEvent('input', this.data.value)
    },
  }
})
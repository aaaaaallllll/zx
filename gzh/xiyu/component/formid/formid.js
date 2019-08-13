import {
  Model
} from '../../api/model.js'
const Models = new Model()
import {
  Datas
} from '../../utils/data.js'
const datas = new Datas()
var util = require('../../utils/util.js');
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    
    saveFormId(v) {
      this.wxlogin(v.detail.formId)
      this.resdata()
    },
    wxlogin(id) {
      var that = this;
      wx.login({
        success: res => {
          let companyCode = wx.getStorageSync('userinfo').companyCode
          let techId = wx.getStorageSync('userinfo').techId
          const subFormid = Models.subFormid(id, res.code, companyCode, techId)
          subFormid.then(res => {

          })
        }
      })
    },
    resdata: function() {
      this.triggerEvent('resdata', 1)
    },
  }
})
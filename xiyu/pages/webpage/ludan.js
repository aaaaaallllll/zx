import {
  Login
} from '../../utils/login.js'
const login = new Login()
import {
  Model
} from '../../api/model.js'
const Models = new Model()
Page({
  data: {
    list: [],
    list2: [],
    curNav: 1,
    curIndex: 0,
    catName: '',
    listpro: [],
    selectnumber: 0,
    show: false,
    seatText: '',
    roomNo: '',
    mannumber: '',
    status: 0,
    jslist: [],
    jsnumber: 0,
    jsprice: 0,
    menus: [],
    renShu:''
  },
  // 清空
  qingkong: function() {
    var that = this;
    let list = that.data.listpro
    for (var x in list) {
      for (var i = 0; i < list[x].length; i++) {
        list[x][i].num = 0
      }
    }
    var list2 = that.data.list
    for (var i = 0; i < list2.length; i++) {
      list2.num = 0
    }
    that.setData({
      listpro: list,
      jslist: [],
      list: list2
    })
    that.jisuan()
  },
  //事件处理函数  
  switchRightTab: function(e) {
    // 获取item项的id，和数组的下标值  
    let id = e.target.dataset.id,
      index = parseInt(e.target.dataset.index);
    // 把点击到的某一项，设为当前index  
    this.setData({
      curNav: id,
      curIndex: index,
      catName: id
    })
    console.log(id)
    console.log(this.data.listpro[id])
    if (this.data.listpro[id] == undefined) {
      this.queryCatMenus()
    } else {
      this.setData({
        list: this.data.listpro[id]
      })
    }
  },
  onLoad: function(options) {
    let companyName = wx.getStorageSync('userinfo').companyName
    this.setData({
      companyName: companyName
    })
    this.queryCats()
  },
  // 获取分类
  queryCats: function() {
    var that = this;
    let companyCode = wx.getStorageSync('userinfo').companyCode
    let techId = wx.getStorageSync('userinfo').techId
    const queryCats = Models.queryCats(companyCode)
    queryCats.then(res => {
      if (res.success) {
        that.setData({
          list2: res.result,
          catName: res.result[0]
        })
        that.queryCatMenus()
      } else {
        wx.showToast({
          title: res.errorDesc,
        })
      }
    })
  },

  // 获取分类下的产品
  queryCatMenus: function() {
    var that = this;
    let companyCode = wx.getStorageSync('userinfo').companyCode
    let techId = wx.getStorageSync('userinfo').techId
    const queryCatMenus = Models.queryCatMenus(companyCode, that.data.catName)
    queryCatMenus.then(res => {
      if (res.success) {
        var list = []
        for (let i = 0; i < res.result.length; i++) {
          res.result[i].num = 0;
          list[i] = res.result[i]
        }
        var listpro = that.data.listpro
        listpro[that.data.catName] = list
        that.setData({
          listpro: listpro,
          list: res.result
        })
        console.log(that.data.listpro)
      } else {
        wx.showToast({
          title: res.errorDesc,
        })
      }
    })
  },
  jian: function(e) {
    console.log(e)
    var that = this;
    let index = e.currentTarget.dataset.index
    let id = e.currentTarget.dataset.id
    var list = that.data.list
    list[index].num--
      var listpro = that.data.listpro
    // listpro[id][index].num++
    this.setData({
      list: list,
      listpro: listpro
    })
    console.log(that.data.listpro)
    that.jisuan()
  },
  // 购物车归零
  tozo: function() {

  },
  add: function(e) {
    console.log(e)
    var that = this;
    let index = e.currentTarget.dataset.index
    let id = e.currentTarget.dataset.id
    var list = that.data.list
    list[index].num++
      var listpro = that.data.listpro
    // listpro[id][index].num++
    this.setData({
      list: list,
      listpro: listpro
    })
    console.log(that.data.listpro)
    that.jisuan()
  },
  jisuan: function() {
    var that = this;
    let num = 0
    var jslist = []
    var jsnumber = 0
    var jsprice = 0
    let list = that.data.listpro
    var list11 = []
    for (var x in list) {
      for (var i = 0; i < list[x].length; i++) {
        if (list[x][i].num > 0) {
          num++
          list[x][i].index = i
          list[x][i].catName = x
          jslist.push(list[x][i])
          jsnumber += list[x][i].num
          jsprice += list[x][i].num * list[x][i].price
          var list10 = {}
          list10.menu = list[x][i].name
          list10.number = list[x][i].num
          list11.push(list10)
          console.log(list10)
        }

      }
    }
    console.log(jsnumber, jsprice, list11)
    that.setData({
      selectnumber: num,
      jslist: jslist,
      jsnumber: jsnumber,
      jsprice: jsprice,
      menus: list11
    })
    console.log(that.data.menus)
  },
  // 点击购物车操作
  jiesuan: function() {
    this.setData({
      status: 1
    })
  },
  onClose: function() {
    this.setData({
      show: false
    })
  },
  diandan: function() {
    this.setData({
      status: 0
    })
  },
  sub: function() {
    if (this.data.jslist.length == 0) {
      wx.showToast({
        title: '还没有商品，快去选择商品吧',
        icon: 'none'
      })
      return
    }
    this.setData({
      show: true
    })
  },
  updateValue(e) {
    let name = e.currentTarget.dataset.name;
    let nameMap = {}
    nameMap[name] = e.detail && e.detail.value
    this.setData(nameMap)
  },
  sublist: function() {
    var that = this;
    console.log(that.data.menus)
    let companyCode = wx.getStorageSync('userinfo').companyCode
    let techId = wx.getStorageSync('userinfo').techId
    const luDan = Models.luDan(companyCode, that.data.seatText, JSON.stringify(that.data.menus), techId, that.data.zhuoTai, that.data.renShu)
    luDan.then(res => {
      if (res.success) {
        wx.switchTab({
          url: '/pages/home/home',
          success: function(res) {
            wx.showToast({
              title: '提交成功',
            })
          },
        })
      } else {
        wx.showToast({
          title: res.errorDesc,
          icon: 'none'
        })
      }
    })
  }
})
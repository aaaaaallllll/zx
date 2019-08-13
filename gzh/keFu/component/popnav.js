
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    flag: false
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 获取input内容
    clickMenu: function(e) {
      console.log(e)
      this.setData({
        flag: !this.data.flag
      })
      console.log('ceshi')
    },
    clickClose: function(e) {
      console.log(e)
      this.setData({
        flag: false
      })
      console.log('ceshi')
    },
    paiqian:function(e){
      wx.navigateTo({
        url: '/pages/webpage/dispatch',
      })
      this.clickClose()
    },
    xiazhong: function (e) {
      wx.navigateTo({
        url: '/pages/webpage/xiazhong',
      })
      this.clickClose()
    },
    shangzhong: function (e) {
      wx.navigateTo({
        url: '/pages/webpage/shangzhong',
      })
      this.clickClose()
    },
    jiazhong: function (e) {
      wx.navigateTo({
        url: '/pages/webpage/jiazhong',
      })
      this.clickClose()
    },
    fuwu: function (e) {
      wx.navigateTo({
        url: '/pages/webpage/call',
      })
      this.clickClose()
    },
    // 录单
    ludan: function (e) {
      wx.navigateTo({
        url: '/pages/webpage/ludan',
      })
      this.clickClose()
    },
    // 删除图片
    previewImg: function(e) {
      console.log(e.currentTarget.dataset.index);
      var index = e.currentTarget.dataset.index;
      var imgs = this.data.imgs;
      console.log(imgs, e)
      var imgArr = [];
      for (var i = 0; i < imgs.length; i++) {
        imgArr.push(imgs[i].img[0]);
      }
      console.log(imgArr)
      wx.previewImage({
        current: imgArr[index], //当前图片地址
        urls: imgArr, //所有要预览的图片的地址集合 数组形式
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    },
  }
})
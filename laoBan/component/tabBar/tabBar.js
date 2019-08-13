// component/tabBar/tabBar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showIndex: {
      type: Number,
      value: 0,
    },
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
    router(e) {
      const that = this;
      const name = e.currentTarget.dataset.name
      console.log(name)
      
      if(name==0){
        wx.redirectTo({
          url: '/pages/data/data',
          
        })
        return
      }else if(name==1){
        wx.redirectTo({
          url: '/pages/user/user',
         
        })
        return
      }else if(name == 2) {
        wx.redirectTo({
          url: '/pages/administer/administer',

        })
        return
      }
      
    }
  }
})
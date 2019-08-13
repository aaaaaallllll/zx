// import {
//   Login
// } from '../../utils/login.js'
// const login = new Login()
// import {
//   Model
// } from '../../api/model.js'
// const Models = new Model()
import {
  api
} from '../../api/config.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tagid: 0,
    menu: '',
    seatText: '',
    roomNo: '',
    roomNos: [],
    number: '',
    techMsgId: '',
    num: 1,
    minusStatus: 'disable',
    roomNosIndex: -1,
    techJobs: [],
    show: false,
    columns: [],
    techType: '',
    jishitype: [],
    listxiangmu: [],
    jishitypename: '',
    listxiangmuname: '',
    paiQianInfo: [],
    userId: '',
    dianTechId: '',
    xuanTechId: '',
    noGender: 0,
    nanJiShi: 0,
    nvJiShi: 0,
    indexs: -1,
    inputShowed: false,

    // 通过newclock传递的参数
    name:"",
    techId:""
  },
  tagcheck: function (e) {
    console.log(e)
    this.setData({
      tagid: e.currentTarget.dataset.id
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      roomNo:options.name,
      dianTechId:options.techId
    })
    this.getData()
    if(options.roomId){
      this.setData({
        roomNo: options.roomId
      })
    } else if (options.jishiId){
      this.setData({
        dianTechId: options.jishiId
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  //事件处理函数
  /*点击减号*/
  bindMinus: function () {
    var num = this.data.num;
    if (num > 1) {
      num--;
    }
    var minusStatus = num > 1 ? 'normal' : 'disable';
    this.setData({
      num: num,
      minusStatus: minusStatus
    })
  },
  /*点击加号*/
  bindPlus: function () {
    var num = this.data.num;
    num++;
    var minusStatus = num > 1 ? 'normal' : 'disable';
    this.setData({
      num: num,
      minusStatus: minusStatus
    })
  },
  /*输入框事件*/
  bindManual: function (e) {
    var num = e.detail.value;
    var minusStatus = num > 1 ? 'normal' : 'disable';
    this.setData({
      num: num,
      minusStatus: minusStatus
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  updateValue(e) {
    let name = e.currentTarget.dataset.name;
    let nameMap = {}
    nameMap[name] = e.detail && e.detail.value
    this.setData(nameMap)
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
  // 提交
  getData: function () {
    var that = this;
    let companyCode = wx.getStorageSync('userinfo').companyCode
    let techId = wx.getStorageSync('userinfo').techId
    wx.request({
      url: api.url,
      data: {
        operationType: 'queryLocal',
        queryType: 'paiQianInfo',
        companyCode: companyCode,
        techId: techId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success(data) {
        // console.log(res.data.result);
        const res=data.data
        console.log(res)
        if (res.result) {
          let list = []
          let jishitype = []
          for (var key in res.result.techJobs) {
            console.log(key); //键名
            console.log(res.result.techJobs[key]); //键值
            var lists = {
              name: key,
              list: res.result.techJobs[key]
            }
            list.push(lists)
          }
          that.setData({
            roomNos: res.result.roomNos,
            techJobs: res.result.techJobs,
            jishitype: list
          })
          console.log(that.data.jishitype, '1111')
          const techJobs = res.result.techJobs
          that.setData({
            columns: [{
              values: Object.keys(techJobs),
              className: 'column1'
            },
            {
              values: techJobs[list[0].name],
              className: 'column2',
              defaultIndex: 0
            }
            ],
          })
          console.log(that.data.techJobs)
        } else {
          wx.showToast({
            title: res.errorDesc,
          })
        }
      }
    })
  },

  bindPickerChange(e) {
    var that = this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    that.setData({
      roomNo: that.data.roomNos[e.detail.value]
    })
  },
  bindPickerjishitype(e) {
    var that = this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    that.setData({
      jishixiangmu: that.data.jishitype[e.detail.value].list,
      techType: that.data.jishitype[e.detail.value].name
    })
  },
  bindPickerjishixiangmu(e) {
    var that = this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    that.setData({
      menuName: that.data.jishixiangmu[e.detail.value],
    })
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  checkjs() {
    // this.setData({
    //   show: true
    // });
  },
  onCancel() {

  },
  onChange(event) {
    var that = this;
    const {
      picker,
      value,
      index
    } = event.detail;
    picker.setColumnValues(1, that.data.techJobs[value[0]]);
  },
  onConfirm(event) {
    console.log(event)
    const {
      picker,
      value,
      index
    } = event.detail;
    this.setData({
      techType: value[1]
    })
    // console.log(`当前值：${value}, 当前索引：${index}`)
    // Toast(`当前值：${value}, 当前索引：${index}`);
    this.onClose()
  },
  changenoGender: function (e) {
    this.setData({
      noGender: e.detail
    })
  },
  changenanJiShi: function (e) {
    console.log(e)
    this.setData({
      nanJiShi: e.detail
    })
  },
  changenvJiShi: function (e) {
    this.setData({
      nvJiShi: e.detail
    })
  },
  addlist() {
    console.log('ceshi')
    // let techId = wx.getStorageSync('userinfo').techId
    let techId = '002'
    let paiQianInfo = this.data.paiQianInfo
    let paiq = {
      roomNo: this.data.roomNo,
      menuName: this.data.menuName,
      shouPaiHao: this.data.seatText,
      dianTechId: this.data.dianTechId,
      xuanTechId: this.data.xuanTechId,
      techType: this.data.techType,
      noGender: this.data.noGender,
      nanJiShi: this.data.nanJiShi,
      nvJiShi: this.data.nvJiShi
    }
    paiQianInfo.push(paiq)
    console.log(paiQianInfo)
    this.setData({
      paiQianInfo: paiQianInfo
    })
  },
  paiQianInfocheck: function (e) {
    console.log(e)
    this.setData({
      indexs: e.currentTarget.dataset.id
    })
  },
  delitem: function (e) {
    if (this.data.indexs == -1) {
      wx.showToast({
        title: '请选择要删除的行',
      })
      return
    }
    console.log(e.currentTarget.dataset.id)
    var index = e.currentTarget.dataset.id
    var list = this.data.paiQianInfo
    if (this.data.paiQianInfo.length > 0) {
      list.splice(index, 1)
      this.setData({
        paiQianInfo: list
      })
    } else {
      wx.showToast({
        title: '没有可以删除的内容',
        icon: 'none'
      })
    }
  },
  sub: function (c = 1) {
    var that = this;
    let companyCode = wx.getStorageSync('userinfo').companyCode
    let userId = wx.getStorageSync('userinfo').techId
    let huanTechId = '0'
    let choice = c
    let yuYueId = '0'
    let paiqian = JSON.stringify(that.data.paiQianInfo)
    let techId = wx.getStorageSync('userinfo').techId
    console.log(wx.getStorageSync('userinfo'))

    wx.request({
      url: api.url,
      data: {
        operationType: 'queryLocal',
        queryType: 'paiQianJiShi',
        companyCode: companyCode,
        techId: techId,
        paQianInfo: paiqian,
        userId: userId,
        huanTechId: huanTechId,
        choice: choice,
        yuYueId: yuYueId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success(data) {
        // console.log(res.data.result);
        const res = data.data
        console.log(res)
        if (res.success) {
          wx.switchTab({
            url: '/pages/home/home',
            success: function () {
              wx.showToast({
                title: '派遣信息提交成功',
              })
            },
          })
          that.setData({
            paiQianInfo: [],
            tagid: 0,
            menu: '',
            seatText: '',
            roomNo: '',
            roomNos: [],
            number: '',
            techMsgId: '',
            num: 1,
            minusStatus: 'disable',
            roomNosIndex: -1,
            techJobs: [],
            show: false,
            columns: [],
            techType: '',
            jishitype: [],
            listxiangmu: [],
            jishitypename: '',
            listxiangmuname: '',
            paiQianInfo: [],
            userId: '',
            dianTechId: '',
            xuanTechId: '',
            noGender: 0,
            nanJiShi: 0,
            nvJiShi: 0,
            indexs: -1
          })
        } else {
          var str = res.errorDesc;
          console.log();
          if (str.indexOf("是否预约") != -1) {
            wx.showModal({
              title: '提示',
              content: res.errorDesc,
              success: function (sm) {
                if (sm.confirm) {
                  that.sub(3)
                } else if (sm.cancel) {
                  wx.switchTab({
                    url: '/pages/home/home',
                    success: function () {
                      wx.showToast({
                        title: '已取消派遣',
                      })
                    },
                  })
                }
              }
            })
          } else {
            wx.showToast({
              title: res.errorDesc,
              icon: 'none'
            })
          }

        }
      }
    })
  },
  changeselect() {
    this.setData({
      inputShowed: !this.data.inputShowed
    })
  }
})
// pages/control/control.js
import {
  api
} from '../../api/config.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    roomNo:'',//房间号
    mosIndex:0,//灯光模式
    msIndex:0,//总模式
    newWenDu:16,//房间现场温度
    qjIndex:0,//情景模式
    qjText: '进客模式',//情景模式
    ktIsOn:false,//空调开关
    wendu:16,//空调温度
    fengSu:1,//空调风速
    wenduBl:false,//温度是否经过移动
    vol: 15,//音量
    musicBl: false,//音乐开关
    ktMoshi:'制冷',//空调模式
    ktShaoFenS:false,//上下扫风
    ktShaoFenZ: false,//左右扫风
    ktMsIndex:0,//空调模式指数
    ktMsList:[
      {
        name:'自动',
        id:'00'
      },
      {
        name: '制冷',
        id: '01'
      },
      {
        name: '除湿',
        id: '02'
      },
      {
        name: '送风',
        id: '03'
      },
      {
        name: '制热',
        id: '04'
      }
    ],//空调模式集
    dengList:[
      {
        deng1Name: '射灯',
        deng2Name: '阅读灯',
        deng1ck: false,
        deng2ck: false,
      },
      {
        deng1Name: '夜灯',
        deng2Name: '卫灯',
        deng1ck: false,
        deng2ck: false,
      },
      {
        deng1Name: '激光灯',
        deng2Name: '顶灯',
        deng1ck: false,
        deng2ck: false,
      },
      {
        deng1Name: '灯带',
        deng2Name: '梳洗灯',
        deng1ck: false,
        deng2ck: false,
      }
    ],
    angle:-20,
    goreX:228,
    goreY:314,
    yMin:345,
    //音量自适应
    yinSY:0,
    yinZX: 0,
    yinXY: 0,
    yinYX: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.roomNo)
    this.setData({
      roomNo: options.roomNo
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const that=this
    wx.getSystemInfo({
      success(res) {
        console.log(res)
        if (res.windowWidth<350){
          that.setData({
            goreX: 190,
            goreY: 260,
            yMin: 290,
          })
        } else if (res.windowWidth > 400){
          that.setData({
            goreX: 245,
            goreY: 340,
            yMin:370
          })
        }
        that.setData({
          yinSY: res.windowHeight * 0.58,
          yinZX: res.windowWidth * 0.48,
          yinXY: res.windowHeight * 0.73,
          yinYX: res.windowWidth * 0.7,
        })
      }
    })
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
  //控制总模式
  msDeploy(e){
    const id = e.currentTarget.dataset.id

    this.setData({
      msIndex: id
    })
  },
  //控制情景模式
  qjDeploy(e) {
    wx.showLoading({
      // title: '加载中',
    })
    const id = e.currentTarget.dataset.id
    let msId = '0' + id
    let msText=''

    switch (msId) {
      case '00':
        msText = '进客模式';
        break;
      case '01':
        msText = '开房模式';
        break;
      case '02':
        msText = '服务模式';
        break;
      case '03':
        msText = '待清模式';
        break;
      case '04':
        msText = '休息模式';
        break;
      case '05':
        msText = '空房模式';
        break;
    }
    
    const that = this
    let companyCode = wx.getStorageSync('userinfo').companyCode
    let techId = wx.getStorageSync('userinfo').userId
    console.log(msId)
    wx.request({
      url: api.url,
      data: {
        companyCode: companyCode,
        operationType: 'queryLocal',
        // queryType: 'FangKongGetStatus',
        // userId: techId,
        queryType: 'FangKongSetMode',
        roomNo: that.data.roomNo,
        mode: msId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success(res) {
        wx.hideLoading()
        if (res.data.success) {
          console.log(res.data);
          // const data = res.data.result
          that.setData({
            qjIndex: id,
            qjText:msText
          })
        } else {
          wx.showToast({

            title: res.data.errorDesc,

            icon: 'none',

            duration: 1000//持续的时间

          })
        }

      }
    })
  },
  // 控制灯光模式
  deploy(e){
    const that = this
    // console.log(e)
    const id = e.currentTarget.dataset.id
    if(id==0){
      that.setData({
        mosIndex: id
      })
      return
    }
    console.log(id)
   
    
    let companyCode = wx.getStorageSync('userinfo').companyCode
    let techId = wx.getStorageSync('userinfo').userId
    let dengList = that.data.dengList
    let sonList=[false,false,false,false,false,false,false,false]
    switch (id) {
      case '1':
        sonList = [true, true, true, true, true, true, true, true]
        break;
      case '2':
        sonList = [false, true, false, false, false, false, false, false]
        break;
      case '3':
        sonList = [false, false, true, false, false, false, false, false]
        break;
      case '4':
        sonList = [false, false, false, true, false, false, false, false]
        break;
      case '5':
        sonList = [false, false, false, false, false, false, false, false]
        break;
    }
    // console.log(sonList)
    // return
    for(let i=0;i<sonList.length;i++){
      let denId='0'+i
      let denBl='00'
      console.log(sonList[i])
      if (sonList[i]){
        denBl='01'
        switch (i) {
          case 0:
            dengList[0].deng1ck = true
            break;
          case 1:
            dengList[0].deng2ck = true
            break;
          case 2:
            dengList[1].deng1ck = true
            break;
          case 3:
            dengList[1].deng2ck = true
            break;
          case 4:
            dengList[2].deng1ck = true
            break;
          case 5:
            dengList[2].deng2ck = true
            break;
          case 6:
            dengList[3].deng1ck = true
            break;
          case 7:
            dengList[3].deng2ck = true
            break;
        }
      }else{
        switch (i) {
          case 0:
            dengList[0].deng1ck = false
            break;
          case 1:
            dengList[0].deng2ck = false
            break;
          case 2:
            dengList[1].deng1ck = false
            break;
          case 3:
            dengList[1].deng2ck = false
            break;
          case 4:
            dengList[2].deng1ck = false
            break;
          case 5:
            dengList[2].deng2ck = false
            break;
          case 6:
            dengList[3].deng1ck = false
            break;
          case 7:
            dengList[3].deng2ck = false
            break;
        }
      }
      
      wx.request({
        url: api.url,
        data: {
          companyCode: companyCode,
          operationType: 'queryLocal',
          // queryType: 'FangKongGetStatus',
          // userId: techId,
          queryType: 'FangKongLight',
          roomNo: that.data.roomNo,
          lightNo: denId,
          lightStatus: denBl
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'post',
        success(res) {
          
          if (res.data.success) {
            console.log(res.data);
            // const data = res.data.result
            that.setData({
              dengList: dengList,
              mosIndex: id
            })
          } else {
            wx.showToast({

              title: res.data.errorDesc,

              icon: 'none',

              duration: 1000//持续的时间

            })
          }

        }
      })
    }
    

  },
  //控制灯光
  deployDeng(e){
    wx.showLoading({
      // title: '加载中',
    })
    const that = this
    let companyCode = wx.getStorageSync('userinfo').companyCode
    let techId = wx.getStorageSync('userinfo').userId
    const id = e.currentTarget.dataset.id
    const ed = e.currentTarget.dataset.ed
    const dengList = that.data.dengList
    if(ed==0){
      console.log('1')
      dengList[id].deng1ck = !dengList[id].deng1ck
      let denId = '0' + (id*2)
      let denBl = '00'
      if (dengList[id].deng1ck){
        denBl = '01'
      }
      wx.request({
        url: api.url,
        data: {
          companyCode: companyCode,
          operationType: 'queryLocal',
          // queryType: 'FangKongGetStatus',
          // userId: techId,
          queryType: 'FangKongLight',
          roomNo: that.data.roomNo,
          lightNo: denId,
          lightStatus: denBl
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'post',
        success(res) {
          wx.hideLoading()
          if (res.data.success) {
            console.log(res.data);
            // const data = res.data.result
            that.setData({
              dengList: dengList
            })
          } else {
            wx.showToast({

              title: res.data.errorDesc,

              icon: 'none',

              duration: 1000//持续的时间

            })
          }

        }
      })
    }else{
      console.log('2')
      dengList[id].deng2ck = !dengList[id].deng2ck
      let denId = '0' + (id*2+1)
      let denBl = '00'
      if (dengList[id].deng2ck) {
        denBl = '01'
      }
      wx.request({
        url: api.url,
        data: {
          companyCode: companyCode,
          operationType: 'queryLocal',
          // queryType: 'FangKongGetStatus',
          // userId: techId,
          queryType: 'FangKongLight',
          roomNo: that.data.roomNo,
          lightNo: denId,
          lightStatus: denBl
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'post',
        success(res) {
          wx.hideLoading()
          if (res.data.success) {
            console.log(res.data);
            // const data = res.data.result
            that.setData({
              dengList: dengList
            })
          } else {
            wx.showToast({

              title: res.data.errorDesc,

              icon: 'none',

              duration: 1000//持续的时间

            })
          }

        }
      })
    }
   
   
  },
  cscs(e){
    console.log(e)
  },
  // 控制背景音乐
  // volAdd(){
  //   console.log('1')
  // },
  toMusic(e){
    wx.showLoading({
      // title: '加载中',
    })
    const that = this
    let companyCode = wx.getStorageSync('userinfo').companyCode
    let techId = wx.getStorageSync('userinfo').userId
    // let xz = e.detail.x
    // let yz = e.detail.y
    let id = e.currentTarget.dataset.id
    let vol = that.data.vol
    // console.log('x='+xz)
    // console.log('y='+yz)
    // return
    if (id == 0){
      console.log('+')
      if(vol==30){
        wx.showToast({

          title: '音量已达到最大',

          icon: 'none',

          duration: 1000//持续的时间

        })
        return
      }
      vol++
      wx.request({
        url: api.url,
        data: {
          companyCode: companyCode,
          operationType: 'queryLocal',
          // queryType: 'FangKongGetStatus',
          // userId: techId,
          queryType: 'FangKongSetVolumn',
          roomNo: that.data.roomNo,
          volumn: vol
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'post',
        success(res) {
          wx.hideLoading()
          if (res.data.success) {
            console.log(res.data);
            // const data = res.data.result
            that.setData({
              vol: vol,
            })
          } else {
            wx.showToast({

              title: res.data.errorDesc,

              icon: 'none',

              duration: 1000//持续的时间

            })
          }

        }
      })
      return
    } else if (id == 1){
      console.log('|<')
      wx.request({
        url: api.url,
        data: {
          companyCode: companyCode,
          operationType: 'queryLocal',
          // userId: techId,
          queryType: 'FangKongPlayPrevious',
          roomNo: that.data.roomNo,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'post',
        success(res) {
          wx.hideLoading()
          console.log(res.data);
          if (res.data.success) {
            
            // const data = res.data.result
            // that.setData({
            //   dengList: dengList
            // })
          } else {
            wx.showToast({

              title: res.data.errorDesc,

              icon: 'none',

              duration: 1000//持续的时间

            })
          }

        }
      })
      return
    } else if (id == 4) {
      console.log('||')
      let msText ='FangKongStartPlay'
      if (that.data.musicBl){
        msText = 'FangKongStopPlay'
      }
      let msBl=!that.data.musicBl
      wx.request({
        url: api.url,
        data: {
          companyCode: companyCode,
          operationType: 'queryLocal',
          // userId: techId,
          queryType: msText,
          roomNo: that.data.roomNo,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'post',
        success(res) {
          wx.hideLoading()
          console.log(res.data);
          if (res.data.success) {

            // const data = res.data.result
            that.setData({
              musicBl: msBl
            })
          } else {
            wx.showToast({

              title: res.data.errorDesc,

              icon: 'none',

              duration: 1000//持续的时间

            })
          }

        }
      })
      return
    } else if (id == 2) {
      console.log('>|')
      wx.request({
        url: api.url,
        data: {
          companyCode: companyCode,
          operationType: 'queryLocal',
          // userId: techId,
          queryType: 'FangKongPlayNext',
          roomNo: that.data.roomNo,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'post',
        success(res) {
          wx.hideLoading()
          console.log(res.data);
          if (res.data.success) {

            // const data = res.data.result
            // that.setData({
            //   dengList: dengList
            // })
          } else {
            wx.showToast({

              title: res.data.errorDesc,

              icon: 'none',

              duration: 1000//持续的时间

            })
          }

        }
      })
      return
    } else if (id == 3) {
      console.log('-')
      if (vol == 0) {
        wx.showToast({

          title: '音量已达到最小',

          icon: 'none',

          duration: 1000//持续的时间

        })
        return
      }
      vol--
      wx.request({
        url: api.url,
        data: {
          companyCode: companyCode,
          operationType: 'queryLocal',
          // queryType: 'FangKongGetStatus',
          // userId: techId,
          queryType: 'FangKongSetVolumn',
          roomNo: that.data.roomNo,
          volumn: vol
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'post',
        success(res) {
          wx.hideLoading()
          if (res.data.success) {
            console.log(res.data);
            // const data = res.data.result
            that.setData({
              vol: vol,
            })
          } else {
            wx.showToast({

              title: res.data.errorDesc,

              icon: 'none',

              duration: 1000//持续的时间

            })
          }

        }
      })
    }
  },
  //控制空调开关
  toKtBtn(){
    
    wx.showLoading({
      // title: '加载中',
    })
    const that = this
    let isOn = !that.data.ktIsOn
    let companyCode = wx.getStorageSync('userinfo').companyCode
    let techId = wx.getStorageSync('userinfo').userId
    let onIndex=''
    if(isOn){
      onIndex = '01'
    }else{
      onIndex = '00'
    }
    console.log(onIndex)
    wx.request({
      url: api.url,
      data: {
        companyCode: companyCode,
        operationType: 'queryLocal',
        // queryType: 'FangKongGetStatus',
        // userId: techId,
        queryType: 'FangKongAirPower',
        roomNo: that.data.roomNo,
        status: onIndex
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success(res) {
        wx.hideLoading()
        if (res.data.success) {
          console.log(res.data);
          // const data = res.data.result
          that.setData({
            ktIsOn: isOn
          })
        } else {
          wx.showToast({

            title: res.data.errorDesc,

            icon: 'none',

            duration: 1000//持续的时间

          })
        }

      }
    })
    
  },
  //空调坐标
  coorMove(e){
    const that=this
    if (!that.data.ktIsOn) {
      wx.showToast({

        title: '请先打开空调开关',

        icon: 'none',

        duration: 1000//持续的时间

      })
      return
    }
    let px = e.touches[0].pageX
    let py = e.touches[0].pageY
    this.getAngle(px, py,false)
    // console.log(e)
    // console.log('x=' + e.touches[0].pageX)
    // console.log('y=' + e.touches[0].pageY)
    // let absX = Math.abs(e.touches[0].pageX - 228)
    // let absY = Math.abs(e.touches[0].pageY - 314)
    // let gorean = Math.floor(Math.sqrt(absX * absX + absY * absY));
    
    // if (gorean < 100 && gorean > 85 && e.touches[0].pageY<350){
    //   console.log(gorean)
    // }
      // console.log('1')
  },
  coor(e){
    // console.log('x='+e.detail.x)
    // console.log('y=' + e.detail.y)
    const that = this
    if (!that.data.ktIsOn) {
      wx.showToast({

        title: '请先打开空调开关',

        icon: 'none',

        duration: 1000//持续的时间

      })
      return
    }
    let px = e.detail.x
    let py = e.detail.y
    this.getAngle(px,py,true)
    
  },
  coorOut(){
    const that = this
    if (!that.data.wenduBl){
      return
    }
    that.setData({
      wenduBl:false
    })
    console.log('11')
    if (!that.data.ktIsOn) {
      return
    }
    wx.showLoading({
      // title: '加载中',
    })
    
    let companyCode = wx.getStorageSync('userinfo').companyCode
    let techId = wx.getStorageSync('userinfo').userId
    wx.request({
      url: api.url,
      data: {
        companyCode: companyCode,
        operationType: 'queryLocal',
        // userId: techId,
        queryType: 'FangKongAirTemp',
        roomNo: that.data.roomNo,
        temp: that.data.wendu
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success(res) {
        wx.hideLoading()
        if (res.data.success) {
          console.log(res.data);
          // const data = res.data.result
          that.setData({
            newWenDu: that.data.wendu
          })
        } else {
          wx.showToast({

            title: res.data.errorDesc,

            icon: 'none',

            duration: 1000//持续的时间

          })
        }

      }
    })
  },
  getAngle(px,py,lx){
    // let mx = 228
    // let my = 314
    // let mx = 245
    // let my = 340
    let mx = this.data.goreX
    let my = this.data.goreY
    let absX = Math.abs(px - mx)
    let absY = Math.abs(py - my)
    console.log('x=' + px)
    console.log('y=' + py)
    
    let gorean = Math.floor(Math.sqrt(absX * absX + absY * absY));
    console.log('距离=' + gorean)
    if (gorean < 126 && gorean > 66 && py < this.data.yMin) {
      console.log(1)
      // console.log('y=' + my)
      let cos = absY / gorean
      let radina = Math.acos(cos)//用反三角函数求弧度
      let zz = Math.PI / radina
      let angle = Math.floor(180 / zz)
      if (mx > px && my > py) {//鼠标在第四象限
        angle = 180 - angle;
      }

      if (mx == px && my > py) {//鼠标在y轴负方向上
        angle = 180;
      }

      if (mx > px && my == py) {//鼠标在x轴正方向上
        angle = 90;
      }

      if (mx < px && my > py) {//鼠标在第三象限
        angle = 180 + angle;
      }

      if (mx < px && my == py) {//鼠标在x轴负方向
        angle = 270;
      }

      if (mx < px && my < py) {//鼠标在第二象限
        angle = 360 - angle;
      }
      angle -= 90
      //数字温度
      
      let angle_z = angle+20
      let wendu = Math.floor(angle_z/15.2)
      if (wendu<0){
        wendu+=17
      }else{
        wendu += 16
      }
      if (wendu >= 16 && wendu<=30){
        this.setData({
          angle: angle,
          wendu: wendu,
          wenduBl:true
        })
        if(lx){
          this.coorOut()
        }
        // console.log('角度=' + (angle))
      }
      
    }

  },
  //控制空调扫风
  toShaoFenS(){
    
    const that = this
    if (!that.data.ktIsOn) {
      wx.showToast({

        title: '请先打开空调开关',

        icon: 'none',

        duration: 1000//持续的时间

      })
      return
    }
    wx.showLoading({
      // title: '加载中',
    })
    let companyCode = wx.getStorageSync('userinfo').companyCode
    let techId = wx.getStorageSync('userinfo').userId
    let ktShaoFenS = !that.data.ktShaoFenS
    let status = '00'
    if (ktShaoFenS) {
      status = '01'
    }
    wx.request({
      url: api.url,
      data: {
        companyCode: companyCode,
        operationType: 'queryLocal',
        // userId: techId,
        queryType: 'FangKongAirUpDown',
        roomNo: that.data.roomNo,
        status: status
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success(res) {
        wx.hideLoading()
        if (res.data.success) {
          console.log(res.data);
          // const data = res.data.result
          that.setData({
            ktShaoFenS: ktShaoFenS
          })
        } else {
          wx.showToast({

            title: res.data.errorDesc,

            icon: 'none',

            duration: 1000//持续的时间

          })
        }

      }
    })

  
  },
  toShaoFenZ() {
   
    const that = this
    if (!that.data.ktIsOn) {
      wx.showToast({

        title: '请先打开空调开关',

        icon: 'none',

        duration: 1000//持续的时间

      })
      return
    }
    wx.showLoading({
      // title: '加载中',
    })
    let companyCode = wx.getStorageSync('userinfo').companyCode
    let techId = wx.getStorageSync('userinfo').userId
    let ktShaoFenZ = !that.data.ktShaoFenZ
    let status='00'
    if (ktShaoFenZ){
      status='01'
    }
    wx.request({
      url: api.url,
      data: {
        companyCode: companyCode,
        operationType: 'queryLocal',
        // userId: techId,
        queryType: 'FangKongAirLeftRight',
        roomNo: that.data.roomNo,
        status: status
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success(res) {
        wx.hideLoading()
        if (res.data.success) {
          console.log(res.data);
          // const data = res.data.result
          that.setData({
            ktShaoFenZ: ktShaoFenZ
          })
        } else {
          wx.showToast({

            title: res.data.errorDesc,

            icon: 'none',

            duration: 1000//持续的时间

          })
        }

      }
    })
  },
  //控制空调风速
  fenShuAdd(){
   
    const that = this
    if (!that.data.ktIsOn) {
      wx.showToast({

        title: '请先打开空调开关',

        icon: 'none',

        duration: 1000//持续的时间

      })
      return
    }
    wx.showLoading({
      // title: '加载中',
    })
    let companyCode = wx.getStorageSync('userinfo').companyCode
    let techId = wx.getStorageSync('userinfo').userId
    let fengSu = that.data.fengSu
    if (fengSu < 4 ){
      
      fengSu++
    }
    if(fengSu == '自动'){
      fengSu = 1
    }
    if(fengSu==4){
      fengSu='自动'
    }

    let fsIndex='00'
    switch (fengSu) {
      case 1:
        fsIndex = '01';
        break;
      case 2:
        fsIndex = '02';
        break;
      case 3:
        fsIndex = '03';
        break;
    }

    wx.request({
      url: api.url,
      data: {
        companyCode: companyCode,
        operationType: 'queryLocal',
        // userId: techId,
        queryType: 'FangKongAirVelo',
        roomNo: that.data.roomNo,
        velo: fsIndex
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success(res) {
        wx.hideLoading()
        if (res.data.success) {
          console.log(res.data);
          // const data = res.data.result
          that.setData({
            fengSu: fengSu
          })
        } else {
          wx.showToast({

            title: res.data.errorDesc,

            icon: 'none',

            duration: 1000//持续的时间

          })
        }

      }
    })
    
  },
  fenShuRemove(){
    
   
    const that = this
    if (!that.data.ktIsOn){
      wx.showToast({

        title:'请先打开空调开关',

        icon: 'none',

        duration: 1000//持续的时间

      })
      return
    }
    wx.showLoading({
      // title: '加载中',
    })
    let companyCode = wx.getStorageSync('userinfo').companyCode
    let techId = wx.getStorageSync('userinfo').userId
    let fengSu = that.data.fengSu
    if (0<fengSu) {
      fengSu--
    }
    if (fengSu == '自动') {
      fengSu = 3
    }
    if (fengSu==0){
      fengSu='自动'
    }
  
    let fsIndex = '00'
    switch (fengSu) {
      case 1:
        fsIndex = '01';
        break;
      case 2:
        fsIndex = '02';
        break;
      case 3:
        fsIndex = '03';
        break;
    }

    wx.request({
      url: api.url,
      data: {
        companyCode: companyCode,
        operationType: 'queryLocal',
        // userId: techId,
        queryType: 'FangKongAirVelo',
        roomNo: that.data.roomNo,
        velo: fsIndex
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success(res) {
        wx.hideLoading()
        if (res.data.success) {
          console.log(res.data);
          // const data = res.data.result
          that.setData({
            fengSu: fengSu
          })
        } else {
          wx.showToast({

            title: res.data.errorDesc,

            icon: 'none',

            duration: 1000//持续的时间

          })
        }

      }
    })
  },
  //空调模式
  toKtMs(e){
    const that = this
    if (!that.data.ktIsOn) {
      wx.showToast({

        title: '请先打开空调开关',

        icon: 'none',

        duration: 1000//持续的时间

      })
      return
    }
    wx.showLoading({
      // title: '加载中',
    })
    let companyCode = wx.getStorageSync('userinfo').companyCode
    let techId = wx.getStorageSync('userinfo').userId
    
    let lx = e.currentTarget.dataset.lx
    let index = that.data.ktMsIndex
    if(lx==0){
      index++
      if(index==5){
        index = 0
      }
    }else{
      index--
      if (index == -1) {
        index = 4
      }
    }
    wx.request({
      url: api.url,
      data: {
        companyCode: companyCode,
        operationType: 'queryLocal',
        // userId: techId,
        queryType: 'FangKongAirMode',
        roomNo: that.data.roomNo,
        mode: that.data.ktMsList[index].id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success(res) {
        wx.hideLoading()
        if (res.data.success) {
          console.log(res.data);
          // const data = res.data.result
          that.setData({
            ktMoshi: that.data.ktMsList[index].name,
            ktMsIndex:index
          })
        } else {
          wx.showToast({

            title: res.data.errorDesc,

            icon: 'none',

            duration: 1000//持续的时间

          })
        }

      }
    })

  },
})
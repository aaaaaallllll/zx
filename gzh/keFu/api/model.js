import {
  HTTP
} from './http.js'

import {
  api
} from './config.js'

class Model extends HTTP {
  // 登录
  /*
  companyCode:门店代码
  userId:用户名
  pwd:密码
  openId：小程序 openid
  */
  dengLu(companyCode, userId, pwd, code) {
    return this.request({
      url: api.getcode,
      data: {
        "operationType": 'xcxLogIn',
        companyCode: companyCode,
        userId: userId,
        pwd: pwd,
        code: code,
        type:'3'
      }
    })
  }

  // 预约查询
  /*
  companyCode:门店代码
  userId:用户名
  chaXunType:技师或者房间
  */
  yuYueChaXun(companyCode, userId, chaXunType) {
    return this.request({
      url: api.getcode,
      data: {
        "operationType": 'queryLocal',
        queryType: 'yuYueChaXun',
        companyCode: companyCode,
        userId: userId,
        chaXunType: chaXunType,
      }
    })
  }

  /*
  新增预约
  companyCode:门店代码
  userId:用户名
  chaXunType:技师或者房间
  operationType
   kePhone 电话号码
    roomNo 房间,房间号和技师可 以二选一
    techType 技师类型
    number 需要技师数量
    techId 预约点钟技师号
    gender 预约技师性别
    yuJiDaoDa 预计到达时 间 ,yyyy-MM-dd HH:mm:ss
  */
  addYuYue(companyCode, userId, kePhone, roomNo, techType, number, techId, gender, yuJiDaoDa) {
    return this.request({
      url: api.getcode,
      data: {
        "operationType": 'queryLocal',
        queryType: 'addYuYue',
        companyCode: companyCode,
        userId: userId,
        kePhone: kePhone,
        roomNo: roomNo,
        techType: techType,
        number: number,
        techId: techId,
        gender: gender,
        yuJiDaoDa: yuJiDaoDa,
      }
    })
  }
  addYuYue1(companyCode, userId, kePhone, yuJiDaoDa) {
    return this.request({
      url: api.getcode,
      data: {
        "operationType": 'queryLocal',
        queryType: 'addYuYue',
        companyCode: companyCode,
        userId: userId,
        kePhone: kePhone,
        yuJiDaoDa: yuJiDaoDa,
        techId: userId
      }
    })
  }
  addYuYue2(companyCode, userId, kePhone, yuJiDaoDa, roomNo) {
    return this.request({
      url: api.getcode,
      data: {
        "operationType": 'queryLocal',
        queryType: 'addYuYue',
        companyCode: companyCode,
        userId: userId,
        kePhone: kePhone,
        yuJiDaoDa: yuJiDaoDa,
        roomNo: roomNo,

      }
    })
  }

  /*
  获取技师类型
  companyCode:门店代码
  userId:用户名
  companyCode:门店代码
  */
  queryTechJobs(companyCode) {
    return this.request({
      url: api.getcode,
      data: {
        "operationType": 'queryLocal',
        queryType: 'queryTechJobs',
        companyCode: companyCode,
      }
    })
  }

  /*
  排钟表获取
  companyCode:门店代码
  userId:用户名
  chaXunType:门店代码
  techJob 技师类型
  */
  paiZhongBiao(companyCode, techJob) {
    return this.request({
      url: api.getcode,
      data: {
        "operationType": 'queryLocal',
        queryType: 'paiZhongBiao',
        companyCode: companyCode,
        techJob: techJob
      }
    })
  }


  /*
  订单管理
  companyCode:门店代码
  userId:用户名
  companyCode:门店代码
  techId:技师号
  yeMa 页码,每页 10 条记录， 提示下拉查看更多记 录,从 1 开始
  */
  jiShiDingDan(companyCode, techId, yeMa) {
    return this.request({
      url: api.getcode,
      data: {
        "operationType": 'queryLocal',
        queryType: 'jiShiDingDan',
        companyCode: companyCode,
        techId: techId,
        yeMa: yeMa,
      }
    })
  }


  /*
   订单评价
  companyCode:门店代码
  userId:用户名
  companyCode:门店代码
  sofaTechId：技师号
  pingJia:ABCD
  */
  dingDanPingJia(companyCode, sofaTechId, pingJia) {
    return this.request({
      url: api.getcode,
      data: {
        "operationType": 'queryLocal',
        queryType: 'dingDanPingJia',
        companyCode: companyCode,
        sofaTechId: sofaTechId,
        pingJia: pingJia,
      }
    })
  }

  /*
   业绩统计
      companyCode 门店代码
      techId 技师号
      timeType 时间类型:时间段||时 间
      begin 如果是时间，则是具 体的是时间，如果是 时间段，则是今日， 昨日，本月，上月
      end 对于 timeType 是时间 有效，具体的结束时 间
  */
  jiShiYeJi(companyCode, techId, timeType, begin, end) {
    return this.request({
      url: api.getcode,
      data: {
        "operationType": 'queryLocal',
        queryType: 'jiShiYeJi',
        companyCode: companyCode,
        techId: techId,
        timeType: timeType,
        begin: begin,
        end: end,
      }
    })
  }

  /*
   上下钟提醒
      companyCode 门店代码
      techId 技师号
  */
  queryTechMsg(companyCode, techId, yeMa) {
    return this.request({
      url: api.getcode,
      data: {
        "operationType": 'queryLocal',
        queryType: 'queryTechMsg',
        companyCode: companyCode,
        techId: techId,
        yeMa: yeMa
      }
    })
  }

  /*
   上钟被取消信息查询
      companyCode 门店代码
      techId 技师号
  */
  queryReturnedTechMsg(companyCode, techId, yeMa) {
    return this.request({
      url: api.getcode,
      data: {
        "operationType": 'queryLocal',
        queryType: 'queryReturnedTechMsg',
        companyCode: companyCode,
        techId: techId,
        yeMa: yeMa,
      }
    })
  }


  /*
   派遣技师
      companyCode 门店代码
      techId 技师号
      paQianInfo 派遣信息
      userId 派遣员工工号
      huanTechId 更换技师技师号
      choice 派遣选项
      yuYueId 预约技师号
      其中,paiQianInfo 是类 paiQianInfo 的 List 的 JSON 串，paiQianInfo 的结构如下
          roomNo 房间号
          menuName 派钟项目
          techType 派钟类型
          shouPaiHao 手牌号
          dianTechId 点钟技师号，用’.’号隔开
          xuanTechId 选钟技师号，用’.’号隔开
          noGender
          int
          所需不区分性别技师数量
          nanJiShi
          int
          所需男技师数量
          nvJiShi
          int
          所需女技师数量
   Choice 为派钟选项，其参考值如下
      1
      取消派遣
      2
      派遣空闲技师
      3
      预约派遣
      4
      空派
  */
  paiQianJiShi(companyCode, techId, paQianInfo, userId, huanTechId, choice, yuYueId) {
    return this.request({
      url: api.getcode,
      data: {
        "operationType": 'queryLocal',
        queryType: 'paiQianJiShi',
        companyCode: companyCode,
        techId: techId,
        paQianInfo: paQianInfo,
        userId: userId,
        huanTechId: huanTechId,
        choice: choice,
        yuYueId: yuYueId
      }
    })
  }


  /*
       上钟
          companyCode
          string
          门店代码
          techId
          string
          技师号
          menu
          String
          项目
          seatText
          String
          手牌
          roomNo
          String
          房间号
          techMsgId
  String
  派钟信息 id 号，用户 可以收到派钟信息， 点击派钟信息之后， 可以进行上钟操作， 在这个界面，用户可 以选择性输入项目名 称，如果不输入项目， 则会按照派遣信息的 项目进行上钟
      */
  shangZhong(companyCode, techId, menu, seatText, roomNo, number, techMsgId) {
    return this.request({
      url: api.getcode,
      data: {
        "operationType": 'queryLocal',
        queryType: 'shangZhong',
        companyCode: companyCode,
        techId: techId,
        menu: menu,
        seatText: seatText,
        roomNo: roomNo,
        number: number,
        techMsgId: techMsgId
      }
    })
  }
  shangZhong2(companyCode, techId, techMsgId) {
    return this.request({
      url: api.getcode,
      data: {
        "operationType": 'queryLocal',
        queryType: 'shangZhong',
        companyCode: companyCode,
        techId: techId,
        techMsgId: techMsgId
      }
    })
  }


  /*
   加钟
      companyCode
      string
      门店代码
      techId
      string

      技师号
      menu
      String

      项目
      number
      string

      数量
  */
  jiaZhong(companyCode, techId, menu, number) {
    return this.request({
      url: api.getcode,
      data: {
        "operationType": 'queryLocal',
        queryType: 'jiaZhong',
        companyCode: companyCode,
        techId: techId,
        menu: menu,
        number: number,
      }
    })
  }


  /*
   正在上钟信息获取
      companyCode
      string
      门店代码
      techId
      string

      技师号
      menu
      String

      项目
      number
      string

      数量
  */
  querySofaTechIng(companyCode, techId) {
    return this.request({
      url: api.getcode,
      data: {
        "operationType": 'queryLocal',
        queryType: 'querySofaTechIng',
        companyCode: companyCode,
        techId: techId,
      }
    })
  }

  /*
   正在上钟信息获取
      companyCode
      string
      门店代码
      techId
      string

      技师号
      menu
      String

      项目
      number
      string

      数量
  */
  querySofaTechIng(companyCode, techId) {
    return this.request({
      url: api.getcode,
      data: {
        "operationType": 'queryLocal',
        queryType: 'querySofaTechIng',
        companyCode: companyCode,
        techId: techId,
      }
    })
  }

  /*
   下钟
      companyCode
      string
      门店代码
      techId
      string

      技师号
      menu
      String

      项目
      number
      string

      数量
  */
  xiaZhong(companyCode, techId) {
    return this.request({
      url: api.getcode,
      data: {
        "operationType": 'queryLocal',
        queryType: 'xiaZhong',
        companyCode: companyCode,
        techId: techId,
      }
    })
  }


  /*
   强制下钟
      companyCode
      string
      门店代码
      techId
      string

      技师号
      menu
      String

      项目
      number
      string

      数量
  */
  qiangZhiXiaZhong(companyCode, techId) {
    return this.request({
      url: api.getcode,
      data: {
        "operationType": 'queryLocal',
        queryType: 'qiangZhiXiaZhong',
        companyCode: companyCode,
        techId: techId,
      }
    })
  }
  xiaZhongShenQing(companyCode, techId) {
    return this.request({
      url: api.getcode,
      data: {
        "operationType": 'queryLocal',
        queryType: 'xiaZhongShenQing',
        companyCode: companyCode,
        techId: techId,
      }
    })
  }

  /*
   下钟预约处理
      companyCode
      string
      门店代码
      techId
      string

      技师号
      menu
      String

      项目
      number
      string

      数量
  */
  xiaZhongYuYueChuLi(companyCode, techId, accept) {
    return this.request({
      url: api.getcode,
      data: {
        "operationType": 'queryLocal',
        queryType: 'xiaZhongYuYueChuLi',
        companyCode: companyCode,
        techId: techId,
        accept: accept
      }
    })
  }

  yuYueChuLi(companyCode, techId, accept, yuYueId) {
    return this.request({
      url: api.getcode,
      data: {
        "operationType": 'queryLocal',
        queryType: 'yuYueChuLi',
        companyCode: companyCode,
        techId: techId,
        accept: accept,
        yuYueId: yuYueId
      }
    })
  }

  /*
   录单
      companyCode
      string
      门店代码
      techId
      string

      技师号
      menu
      String

      项目
      number
      string

      数量
  */
  luDan(companyCode, seatText, menus, userId, zhuoTai, renShu) {
    return this.request({
      url: api.getcode,
      data: {
        "operationType": 'queryLocal',
        queryType: 'luDan',
        companyCode: companyCode,
        seatText: seatText,
        pcName: '小程序',
        menus: menus,
        userId: userId,
        zhuoTai: zhuoTai,
        renShu: renShu
      }
    })
  }

  /*
   获取项目类别
      companyCode
      string
      门店代码
      techId
      string

      技师号
      menu
      String

      项目
      number
      string

      数量
  */
  queryCats(companyCode) {
    return this.request({
      url: api.getcode,
      data: {
        "operationType": 'queryLocal',
        queryType: 'queryCats',
        companyCode: companyCode,
      }
    })
  }

  /*
   获取项目类别下面的项目
      companyCode
      string
      门店代码
      techId
      string

      技师号
      menu
      String

      项目
      number
      string

      数量
  */
  queryCatMenus(companyCode, catName) {
    return this.request({
      url: api.getcode,
      data: {
        "operationType": 'queryLocal',
        queryType: 'queryCatMenus',
        companyCode: companyCode,
        catName: catName
      }
    })
  }

  /*
   获取技师做钟项目
      companyCode
      string
      门店代码
      techId
      string

      技师号
      menu
      String

      项目
      number
      string

      数量
  */
  queryCats(companyCode, techId) {
    return this.request({
      url: api.getcode,
      data: {
        "operationType": 'queryLocal',
        queryType: 'queryCats',
        companyCode: companyCode,
        techId: techId
      }
    })
  }

  // 提交formid
  subFormid(formId, code, companyCode, techId) {
    return this.request({
      url: api.getcode,
      data: {
        "operationType": 'xcxFormId',
        formId: formId,
        code: code,
        companyCode: companyCode,
        techId: techId
      }
    })
  }

  /*
   获取项目类别
      companyCode
      string
      门店代码
      techId
      string

      技师号
      menu
      String

      项目
      number
      string

      数量
  */
  queryCats(companyCode) {
    return this.request({
      url: api.getcode,
      data: {
        "operationType": 'queryLocal',
        queryType: 'queryCats',
        companyCode: companyCode,
      }
    })
  }

  /*
  获取项目类别
    companyCode
    string
    门店代码
    techId
    string

    技师号
    menu
    String

    项目
    number
    string

    数量
  */
  queryTechMenus(companyCode, techId) {
    return this.request({
      url: api.getcode,
      data: {
        "operationType": 'queryLocal',
        queryType: 'queryTechMenus',
        companyCode: companyCode,
        techId: techId
      }
    })
  }

  /*
   获取项目类别下面的项目
      companyCode
      string
      门店代码
      techId
      string

      技师号
      menu
      String

      项目
      number
      string

      数量
  */
  queryCats(companyCode, catName) {
    return this.request({
      url: api.getcode,
      data: {
        "operationType": 'queryLocal',
        queryType: 'queryCats',
        companyCode: companyCode,
        catName: catName
      }
    })
  }

  /*
   派遣信息
      companyCode
      string
      门店代码
      techId
      string

      技师号
      menu
      String

      项目
      number
      string

      数量
  */
  paiQianInfo(companyCode, techId) {
    return this.request({
      url: api.getcode,
      data: {
        "operationType": 'queryLocal',
        queryType: 'paiQianInfo',
        companyCode: companyCode,
        techId: techId
      }
    })
  }

  /*
     呼叫服务获取
  queryType:huJiaoFuWu
  type:add   query
  seatText:手牌号
  roomNo：房间号
    */
  huJiaoFuWu() {
    let companyCode = wx.getStorageSync('userinfo').companyCode
    return this.request({
      url: api.getcode,
      data: {
        "operationType": 'queryLocal',
        queryType: 'huJiaoFuWu',
        companyCode: companyCode,
        type: 'query'
      }
    })
  }

  /*
   呼叫服务提交
  queryType:huJiaoFuWu
  type:add   query
  seatText:手牌号
  roomNo：房间号
  */
  huJiaoFuWupost(seatText, roomNo, items) {
    let companyCode = wx.getStorageSync('userinfo').companyCode
    return this.request({
      url: api.getcode,
      data: {
        "operationType": 'queryLocal',
        queryType: 'huJiaoFuWu',
        type: 'add',
        companyCode: companyCode,
        seatText: seatText,
        roomNo: roomNo,
        items: items
      }
    })
  }
  // 取消上钟
  quXiaoTechMsg(techId, techMsgId) {
    let companyCode = wx.getStorageSync('userinfo').companyCode
    return this.request({
      url: api.getcode,
      data: {
        "operationType": 'queryLocal',
        queryType: 'quXiaoTechMsg',
        companyCode: companyCode,
        techId: techId,
        techMsgId: techMsgId
      }
    })
  }
  // 获取banner
  xcxAdImg() {
    let companyCode = wx.getStorageSync('userinfo').companyCode
    return this.request({
      url: api.getcode,
      data: {
        "operationType": 'xcxAdImg',
        companyCode: companyCode,
      }
    })
  }
  // 业绩统计
  jiShiYeJiXq(techId, begin, end, type) {
    let companyCode = wx.getStorageSync('userinfo').companyCode
    return this.request({
      url: api.getcode,
      data: {
        "operationType": 'queryLocal',
        queryType: 'jiShiYeJiXq',
        companyCode: companyCode,
        techId: techId,
        timeType: 1,
        begin: begin,
        end: end,
        type: type
      }
    })
  }
}

export {
  Model
}
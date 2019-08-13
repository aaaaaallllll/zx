/**
 * 微信js-sdk
 * 参考文档：https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115
 */
import qs from	'qs'
import Axios from 'axios'
const wxApi = {
  /**
   * [wxRegister 微信Api初始化]
   * @param  {Function} callback [ready回调函数]
   */
  wxRegister (callback,companyCode,url) {
    const api='http://intereek.natapp1.cc/'
    // const api='/api'
    Axios.post(
     api + "pangu/xcx.do",
      qs.stringify({
        operationType: "wxShare",
        companyCode: companyCode,
        // "url":local// 获取页面当前链接
        url: url // 获取页面当前链接
      })
    ).then((res) => {
      console.log(res);
      const data=res.data
      wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId:data.result["appid"], // 必填，公众号的唯一标识
        timestamp: data.result["timestamp"], // 必填，生成签名的时间戳
        nonceStr: data.result["nonceStr"], // 必填，生成签名的随机串
        signature: data.result["signature"],// 必填，签名
        jsApiList: ["onMenuShareTimeline"
          ,"onMenuShareQQ"
          ,"onMenuShareAppMessage"] // 必填，需要使用的JS接口列表
      });
    }).catch((error) => {
      console.log(error)
    })
  },
  /**
   * [ShareTimeline 微信分享到朋友圈]
   * @param {[type]} option [分享信息]
   * @param {[type]} success [成功回调]
   * @param {[type]} error   [失败回调]
   */
  ShareTimeline (option) {
    wx.onMenuShareTimeline({
      title: option.title, // 分享标题
      link: option.link, // 分享链接
      imgUrl: option.imgUrl, // 分享图标
      success () {
        // 用户成功分享后执行的回调函数
        option.success()
      },
      cancel () {
        // 用户取消分享后执行的回调函数
        option.error()
      }
    })
  },
  /**
   * [ShareAppMessage 微信分享给朋友]
   * @param {[type]} option [分享信息]
   * @param {[type]} success [成功回调]
   * @param {[type]} error   [失败回调]
   */
  ShareAppMessage (option) {
    wx.onMenuShareAppMessage({
      title: option.title, // 分享标题
      desc: option.desc, // 分享描述
      link: option.link, // 分享链接
      imgUrl: option.imgUrl, // 分享图标
      success () {
        // 用户成功分享后执行的回调函数
        option.success()
      },
      cancel () {
        // 用户取消分享后执行的回调函数
        option.error()
      }
    })
  }
}
export default wxApi

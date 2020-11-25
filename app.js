//app.js
App({
  onLaunch: function (options) {
  //   var scene = decodeURIComponent(options.query)
  //  console.log(options)
  //   console.log(scene)
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    //用户信息
    userInfo: {},
    //用户地理位置
    latitude:"",//纬度
    longitude:"",//经度
    //未受理的订单数
    createdOrderCount:0,
    createdOrder: [],
    //进行中的订单数
    processingOrderCount:0,
    processingOrder: [],
    //处理完成等待评价的订单数
    evaluatedOrderCount:0,
    evaluatedOrder: [],
    //评论完成，结束任务
    overOrderCount:0,
    overOrder: [],
    //openid
    openid:null,
    //订单保修用户姓名
    wechatUserName:null,
    //订单保修用户电话
    wechatUserPhoneNumber:null,
  }
})
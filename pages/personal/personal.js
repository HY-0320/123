// pages/mine/mine.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用户信息
    userInfo: {},
    gender: '',
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    //授权界面的显示
    login: false,
    //展示界面的昵称
    showNickname: '登录后即可获得',
    //完成订单数
    showNumber:0,
    //性别
    showGender:'',
    

  },
  //事件处理函数
  //退出登录
  //index界面需要openid启动
  //强制清除opendi
  outlogin:function(){
    app.globalData.openid=null
      this.setData({
        login:true
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // 已经获取过授权的用户登陆
  onLoad: function () {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      //授权成功调用
      success: function (res) {
        // 已经授权可以直接调用 getUserInfo 获取头像昵称
        if (res.authSetting['scope.userInfo']) {
           // 获取用户信息
          wx.getUserInfo({
            success: function (res) {
              //赋值全局变量userInfo
              app.globalData.userInfo = res.userInfo
              that.setData({
                userInfo: res.userInfo,
                login:true
              })
               //调用微信的 wx.login 接口获取code
              wx.login({
                success: res => {
                  // 获取到用户的 code 之后
                  // 传给后台，再经过解析获取用户openid
                  wx.request({
                      url: 'https://i-review.xyz/api/v1/wechat/applet/info?code=' + res.code,
                      success: res => {
                        app.globalData.openid = res.data.openid 
                      }
                  });
                }
              });
              //授权后获取用户位置信息
              wx.getLocation({
                type: 'gcj02',
                success (res) {
                  app.globalData.latitude=res.latitude
                  app.globalData.longitude=res.longitude
                }
               })
            }
          });
        } else {
          // 用户没有授权
          // 显示授权页面
          that.setData({
            login: false 
          });
        }
      }
    });
  },
  // 第一次登陆
  // 获取用户信息
  bindGetUserInfo: function (e) {
    console.log(e)
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      // 获取到用户的信息了，打印到控制台上看下
      console.log(e.detail.userInfo);
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      that.setData({
        login: true,
        userInfo: e.detail.userInfo
      });
      //第一次赋值给app.globalData
      app.globalData.userInfo = e.detail.userInfo
      //显示界面的展示
      this.setData({
        //昵称展示
        showNickname: app.globalData.userInfo.nickName
      })
        //性别展示
      if (app.globalData.userInfo.gender == '1') {
        this.setData({
          showGender: '男'
        })
      }
      else {
        this.setData({
          showGender: '女'
        })
      }
      //调用微信的 wx.login 接口获取code
      wx.login({
        success: res => {
          // 获取到用户的 code 之后
          // 传给后台，再经过解析获取用户openid
          wx.request({
            url: 'https://i-review.xyz/api/v1/wechat/applet/info?code=' + res.code,
            success: res => {
              app.globalData.openid = res.data.openid
            }
          });
        }
      });
      //获取用户位置信息
      wx.getLocation({
        type: 'gcj02',
        success (res) {
          console.log(res)
          app.globalData.latitude=res.latitude
          app.globalData.longitude=res.longitude
        }
       })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '如果您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
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
    this.setData({
      showNickname: app.globalData.userInfo.nickName
    })
    if(app.globalData.userInfo.gender=='1')
    {
      this.setData({
        showGender:'男'
      })
    }
    else{
      this.setData({
        showGender:'女'
      })
    }

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
  }
})

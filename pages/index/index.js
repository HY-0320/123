const app = getApp()
import Toast from '../../miniprogram_npm/vant-weapp/toast/toast' 
Page({
  data: {
    //已完成数据展示
   filishNumber:0,
  //  待处理数据展示
   readyNumber:0,
   //进行中数据展示
   progressingNumber:0,
   //弹出框
   dialog:false,
   isReady:false
  },
  /**
     * 事件调用函数
     */
    //跳转到故障报修界面
  torepair: function (options) {
     wx.navigateTo({
       url: '/pages/repair/repair'
     })
  }, 
  //跳转到查看进度界面 
  tocheck:function(){
    wx.navigateTo({
      url: '/pages/checkorder/checkorder'
    })
  },
  //跳转到服务评价界面
  toevaluate: function (options) {
    wx.navigateTo({
      url: '/pages/evaluate/evaluate'
    })
  },
  //跳转到更多界面
  tomore: function (options) {
    wx.navigateTo({
      url: '/pages/more/more'
    })
  },
  //关闭弹出框
  close:function(){
    wx.switchTab({
      url: '/pages/personal/personal',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // 获取openid
    //如果没有就去个人中心界面获取
    var openid=app.globalData.openid
    if (openid==null) {
      this.setData({
        dialog: true
      }) 
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
    var that=this
    var openid = app.globalData.openid
    //没有openid返回个人中心登录获取
    if (openid == null) {
      this.setData({
        dialog: true
      })
      return
      }
      else
    {
      this.setData({
        dialog: false
      })
    }
    this.setData({
      isReady:true
    })
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      mask:true,
      loadingType:'spinner'
    });
    var 
      createdOrderCount,
      processingOrderCount,
      evaluatedOrderCount,
      overOrderCount;
    //获取数据展示
    wx.request({
      url: 'https://i-review.xyz/api/v1/service/order/user?openId=' + openid,
      method: "get",
      success: function (res) {
        console.log(res)
        if(res.data.status==200){
          that.setData({
            isReady:true
          })
        createdOrderCount = res.data.data.createdOrderCount,
        processingOrderCount = res.data.data.processingOrderCount,
        evaluatedOrderCount = res.data.data.evaluatedOrderCount,
        overOrderCount = res.data.data.overOrderCount;

        }else{
          wx.showToast({
            title: '获取失败',
            icon: 'none',
            duration: 1500,
            mask: true
          })
        }
        that.setData({
          readyNumber: createdOrderCount,
          progressingNumber: processingOrderCount + evaluatedOrderCount,
          filishNumber: overOrderCount
        })
        //传到app.globa去给进度查看界面保留
          app.globalData.createdOrder=res.data.data.createdOrder
          app.globalData.createdOrderCount = res.data.data.createdOrderCount
          app.globalData.processingOrder = res.data.data.processingOrder
          app.globalData.processingOrderCount = res.data.data.processingOrderCount
          app.globalData.evaluatedOrder = res.data.data.evaluatedOrder
          app.globalData.evaluatedOrderCount = res.data.data.evaluatedOrderCount
          app.globalData.overOrder = res.data.data.overOrder
          app.globalData.overOrderCount = res.data.data.overOrderCount
      }
    });
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
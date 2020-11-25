// pages/orderdetails/orderdetails.js
const app =getApp()
var time = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    overOrder:[],
    overOrderCount:0,
    isHide:false
  },
  toevaluate: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/evaluateOrder/evaluateOrder?id=' + e.currentTarget.dataset.id + '&serviceorderid=' + e.currentTarget.dataset.serviceorderid + '&serviceTaskId=' + e.currentTarget.dataset.servicetaskid + '&wechatUserName=' + e.currentTarget.dataset.wechatusername + '&wechatUserPhoneNumber=' + e.currentTarget.dataset.wechatuserphonenumber + '&serviceorderarrivetime=' + e.currentTarget.dataset.serviceorderarrivetime + "&serviceordercreatetime=" + e.currentTarget.dataset.serviceordercreatetime + '&serviceOrderStatus=' + e.currentTarget.dataset.serviceorderstatus,
     })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var overOrder = app.globalData.overOrder
    var overOrderCount = app.globalData.evaluatedOrderCount
    if (overOrderCount==0)
    {
        this.setData({
          isHide:true
        })
    }
    else
    {
      this.setData({
        isHide: false
      })
    }
       //overOrder的时间转化
       for (var m = 0; m < app.globalData.overOrder.length; m++) {
        var creatdate = app.globalData.overOrder[m].serviceOrderCreateTime;
        var arrivedate = app.globalData.overOrder[m].serviceOrderArriveTime;
        overOrder[m].serviceOrderCreateTime = time.formatTimeTwo(creatdate, 'Y/M/D h:m:s')
        overOrder[m].serviceOrderArriveTime = time.formatTimeTwo(arrivedate, 'Y/M/D h:m:s')
      }
    this.setData({
      overOrder: overOrder
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
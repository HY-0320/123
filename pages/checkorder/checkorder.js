// pages/checkorder/checkorder.js
const app = getApp()
var time = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    createdOrder: [],
    createdOrderCount:0,
    processingOrder:[],
    processingOrderCount: 0,
    evaluatedOrder:[],
    evaluatedOrderCount:0,
    overOrder:[],
    overOrderCount: 0,
    option: [
      { text: '待处理', value: 0 },
      { text: '进行中', value: 1 },
      { text: '未评论', value: 2 }
    ],
    value:0
  },
  toevaluate:function(e){
   console.log(e)
    wx.navigateTo({
      url: '/pages/evaluateOrder/evaluateOrder?id=' + e.currentTarget.dataset.id + '&serviceorderid=' + e.currentTarget.dataset.serviceorderid + '&serviceTaskId=' + e.currentTarget.dataset.servicetaskid + '&wechatUserName=' + e.currentTarget.dataset.wechatusername + '&wechatUserPhoneNumber=' + e.currentTarget.dataset.wechatuserphonenumber + '&serviceorderarrivetime=' + e.currentTarget.dataset.serviceorderarrivetime + "&serviceordercreatetime=" + e.currentTarget.dataset.serviceordercreatetime + '&serviceOrderStatus=' + e.currentTarget.dataset.serviceorderstatus + '&engineerId=' + e.currentTarget.dataset.engineerid
     })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  //数据赋值
  onLoad: function () {
    //从app.global获取到订单信息
    var createdOrder = app.globalData.createdOrder,
      createdOrderCount = app.globalData.createdOrderCount,
      processingOrder = app.globalData.processingOrder,
      processingOrderCount = app.globalData.processingOrder,
      evaluatedOrder = app.globalData.evaluatedOrder,
      evaluatedOrderCount = app.globalData.evaluatedOrderCount,
      overOrder = app.globalData.overOrder,
      overOrderCount = app.globalData.overOrderCount;
      //时间戳转化为    Y/M/D h:m:s
      //createdOrder的转化
    for (var i = 0; i < app.globalData.createdOrder.length;i++){
      var creatdate = app.globalData.createdOrder[i].serviceOrderCreateTime ;
      var arrivedate = app.globalData.createdOrder[i].serviceOrderArriveTime;
      createdOrder[i].serviceOrderCreateTime = time.formatTimeTwo(creatdate, 'Y/M/D h:m:s')
      createdOrder[i].serviceOrderArriveTime = time.formatTimeTwo(arrivedate, 'Y/M/D h:m:s')
    }
    //processingOrder的时间转化
    for (var j = 0; j < app.globalData.processingOrder.length; j++) {
      var creatdate = app.globalData.processingOrder[j].serviceOrderCreateTime;
      var arrivedate = app.globalData.processingOrder[j].serviceOrderArriveTime;
      processingOrder[j].serviceOrderCreateTime = time.formatTimeTwo(creatdate, 'Y/M/D h:m:s')
      processingOrder[j].serviceOrderArriveTime = time.formatTimeTwo(arrivedate, 'Y/M/D h:m:s')
    }
    //evaluatedOrder的时间转化
    for (var k = 0; k < app.globalData.evaluatedOrder.length; k++) {
      var creatdate = app.globalData.evaluatedOrder[k].serviceOrderCreateTime;
      var arrivedate = app.globalData.evaluatedOrder[k].serviceOrderArriveTime;
      evaluatedOrder[k].serviceOrderCreateTime = time.formatTimeTwo(creatdate, 'Y/M/D h:m:s')
      evaluatedOrder[k].serviceOrderArriveTime = time.formatTimeTwo(arrivedate, 'Y/M/D h:m:s')
    }
    //overOrder的时间转化
    for (var m = 0; m < app.globalData.overOrder.length; m++) {
      var creatdate = app.globalData.overOrder[m].serviceOrderCreateTime;
      var arrivedate = app.globalData.overOrder[m].serviceOrderArriveTime;
      overOrder[m].serviceOrderCreateTime = time.formatTimeTwo(creatdate, 'Y/M/D h:m:s')
      overOrder[m].serviceOrderArriveTime = time.formatTimeTwo(arrivedate, 'Y/M/D h:m:s')
    }
    this.setData({
      createdOrder: createdOrder,
      createdOrderCount: createdOrderCount,
      processingOrder: processingOrder,
      processingOrderCount: processingOrderCount,
      evaluatedOrder: evaluatedOrder,
      evaluatedOrderCount: evaluatedOrderCount,
      overOrder: overOrder,
      overOrderCount: overOrderCount
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
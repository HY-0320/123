//app.js
App({
  onLaunch: function (options) {
    let roomid ;
    let that = this;
    if(options.query.scene == null){
      wx.scanCode({
        success (res) {
        roomid = res.path.substring(24)
        that.getRoomInfo(roomid)
        }
      })
    }
    else{
      roomid = options.query.scene
      this.getRoomInfo(roomid);
      
    }
    console.log(options)
  },
  getRoomInfo:function(roomId){
    let that = this;
      wx.request({
        url: 'https://i-review.xyz/api/v1/room/'+ roomId,
        method:'GET',
        success:function(res){
          console.log(res);
          that.globalData.roomId = res.data.data.roomId;
          that.globalData.roomAddress = res.data.data.roomAddress
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
    //房间id
    roomId:"",
    //房间地址
    roomAddress:""
  }
})
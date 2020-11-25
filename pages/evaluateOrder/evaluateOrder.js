 // pages/evaluateOrder/evaluateOrder.js
const app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    engineer:{},
    active:0,
    isMap:true,
    isloading:false,
    disable:false,
    //di
    engineerLongitude:'',
    engineerLatitude:'',
    marks:[],
    //步骤条
    steps: [
      {
        text: '已提交订单',
      },
      {
        text: '订单进行中',
    
      },
      {
        text: '订单未评论',
      },
      {
        text: '订单结束',
      },
    ],
    // 评论完上传的参数
    serviceEvaluateAttitude:5,
    serviceEvaluateTechnology:5,
    serviceEvaluateSpeed: 5,
    serviceEvaluateSolution: 5,
    serviceEvaluateNote: "",
  },
  // 星星点击事件
starTap1:function(e){
this.setData({
  serviceEvaluateAttitude:e.detail
})
},
starTap2:function(e){
  this.setData({
    serviceEvaluateTechnology:e.detail
  })
},
starTap3:function(e){
  this.setData({
    serviceEvaluateSpeed:e.detail
  })
},
starTap4:function(e){
  this.setData({
    serviceEvaluateSolution:e.detail
  })
},
  // 留言
  note:function(e){
     let note = e.detail
     this.setData({
      serviceEvaluateNote:note
     })
  },
  handleBtn(){   
    var that = this
    this.setData({
      isloading:true
    })
    var subdata={
      openId: app.globalData.openid,
      serviceTaskId: this.data.engineer.serviceTaskId,
      serviceOrderId: this.data.engineer.serviceorderid,
      serviceEvaluateAttitude:this.data.serviceEvaluateAttitude,
      serviceEvaluateTechnology:this.data.serviceEvaluateTechnology,
      serviceEvaluateSpeed:this.data.serviceEvaluateSpeed,
      serviceEvaluateSolution:this.data.serviceEvaluateSolution,
      serviceEvaluateNote:this.data.serviceEvaluateNote
    };
      wx.request({
        url: 'https://i-review.xyz/api/v1/service/evaluate',
        data:subdata,
        method: "post",
        success: function (res) {
          console.log(res)
          if(res.data.status==200){
               that.setData({
                 isloading:false
               })
               wx.showToast({
                title: '提交成功',
                icon: 'none',
                duration: 1500,
                mask: true
              })
              setTimeout(function() {
                wx.switchTab({
                  url: '/pages/index/index',
                })
             }, 1500); 
          }else{
            wx.showToast({
              title: '提交失败',
              icon: 'none',
              duration: 1500,
              mask: true
            })
            return
          }
        }
      })
  },
  getEngineerLocaton(engineerId){
    wx.request({
      url: 'https://i-review.xyz/api/v1/engineer/location/'+ engineerId,
      method:'GET',
      success:(res) =>{
        console.log(res)
        let engineerLatitude = res.data.data.staffPositionLat,
            engineerLongitude = res.data.data.staffPositionLng;
        let marks = [{
          id:0,
          latitude:engineerLatitude,
          longitude: engineerLongitude,
          iconPath:'../../images/engineerLocation.png',
       
        }]
        this.setData({
          engineerLatitude:engineerLatitude,
          engineerLongitude:engineerLongitude,
          marks:marks
        })  
      console.log(this.data.marks)

      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options) 
    var value=this.data.active
     if(options.serviceOrderStatus == 0){
       value=0
       this.getEngineerLocaton(options.engineerId);
     } 
    if (options.serviceOrderStatus == 1) {
      value=1
      this.getEngineerLocaton(options.engineerId);
    } 
    if (options.serviceOrderStatus == 3) {
      value=2
      this.setData({
        isMap:false
      })
    } 
    if(options.serviceOrderStatus == 4){
      value=3
      wx.request({
        url: 'https://i-review.xyz/api/v1/service/order/evaluate/'+ options.serviceorderid,
        method: "get",
        success: (res) => {
          that.setData({
            serviceEvaluateAttitude:res.data.data.serviceEvaluateAttitude,
            serviceEvaluateTechnology:res.data.data.serviceEvaluateTechnology,
            serviceEvaluateSpeed: res.data.data.serviceEvaluateSpeed,
            serviceEvaluateSolution: res.data.data.serviceEvaluateSolution,
            serviceEvaluateNote: res.data.data.serviceEvaluateNote,
            isMap:false,
            disable:true
          })
        }
      })

      
    }
    this.setData({
      active:value,
      engineer:options
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
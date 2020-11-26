const app = getApp()
import Toast from '../../miniprogram_npm/vant-weapp/toast/toast' 
Page({
  /**
   * 页面的初始数据
   */
  data: {
    realname:null,
    phonenumber:null,
    roomAddress:"",
    roomId:"",
    //当前选中数组的下标值
    customIndex: [0,0],
    //当前选中数组
    onlyArray: [
      [],
      []
    ],
    //故障类型
    customArray: [{
      name: '有线网络故障',
      serviceTaskType:10,
      dept: [{
        name: '办公室所有有线无法上网'
      },
      {
        name: '电脑上不了网或无反应'
      },
      {
        name: '墙孔网络面板损坏'
      },
      {
        name: '增补或更换损坏的网线'  
      },
      {
        name: '网络卡顿或运行速度慢'
      },
      {
        name: '网络掉线丢包严重'
      },
      {
        name: '其他故障'
      }
      ]
    },
      {
        name: '无线网络故障',
        serviceTaskType: 11,
        dept: [{
          name: '连不上或搜索不到无线网络'
        },
        {
          name: '弹不出登录页面或登录无反应'
        },
        {
          name: '网络卡顿或运行速度慢'
        },
        {
          name: '网络掉线丢包严重'
        },
        {
          name: '其他故障'
        }
        ]
      },
    {
      name: '办公电脑故障',
      serviceTaskType: 12, 
      dept: [{
        name: '开不了机'
      },
      {
        name: '蓝屏死机'
      },
      {
        name: '声音网络用不了'
      },
      {
        name: '运行速度慢'
      },
      {
        name: '其他故障'
      }
      ]
  },
      {
        name: '网络服务与应用系统',
        serviceTaskType: 13, 
        dept: [{
          name: '办公OA系统异常'
        },
        {
          name: 'VPN登录异常'
        },
        {
          name: '财务管理系统异常'
        },
        {
          name: '教务系统异常'
        },
        {
          name: '数字后勤系统异常'
        },
        {
          name: '其他网络服务与应用系统异常'
        },
        {
          name: '其他故障'
        }
        ]
      },
      {
        name: '其他办公设备故障',
        serviceTaskType: 14,
        dept: [{
          name: '设备耗材添加（备注设备品牌型号）'
        },
        {
          name: '设备网络链接与共享故障'
        },
        {
          name: '打印机复印机扫描仪故障'
        },
        {
          name: '其他办公设备故障'
        }
        ]
      },
      {
        name: '其他故障',
        serviceTaskType: 18,
        dept: [{
          name: '自行描述'
        }
        ]
      }
  ]
  },
  //选中值的下标
  bindCustomPickerChange: function (e) {
    this.setData({
      customIndex: e.detail.value
    })
  },
  //滑动列时改变值
  bindCustomPickerColumnChange: function (e) {  
    // 所有类型
    var customArray = this.data.customArray,
    //暂存下标值
        customIndex = this.data.customIndex,
    // 暂存选中数组
        onlyArray = this.data.onlyArray;
        var column=e.detail.column
        var value=e.detail.value
        var arr=[]
        if(column==0)
        {
          customIndex[0]=value;
          for(var k=0;k< customArray[value].dept.length;k++)
          { 
            arr.push(customArray[value].dept[k].name);
          }
          onlyArray[1]=arr
        }
        else{
          customIndex[1] = value;
        }    
    this.setData({
      onlyArray: onlyArray,
      customIndex: customIndex
    });     
  },
  formSubmit: function (e) {
    var customIndex=this.data.customIndex
    //定义提交的参数
    var serviceTaskType = this.data.customArray[customIndex[0]].serviceTaskType
    var wechatUserName = e.detail.value.realname
    var wechatUserPhoneNumber = e.detail.value.phonenumber
    var wechatAppletOpenId = app.globalData.openid
    var roomId = this.data.roomId
    app.globalData.wechatUserName = e.detail.value.realname
    app.globalData.wechatUserPhoneNumber = e.detail.value.phonenumber
    //简单判断订单填写
    let str = /^1[3|4|5|7|8][0-9]{9}$/ //手机号不足11位正则
    let name = /^[\u4E00-\u9FA5]{2,4}$///姓名正则 2-4 位中文
    //验证规则
    //验证表单是否填写完整
    if ( wechatUserName == "" || wechatUserPhoneNumber==""){
      wx.showToast({
        title: '请完整填写完表格后提交',
        icon: 'none',
        duration: 1500,
        mask: true
      })
      return;
    }
    //验证真实姓名格式是否正确
    if(!name.test(e.detail.value.realname))
    {
      wx.showToast({
        title: '真实姓名格式不正确',
        icon: 'none',
        duration: 1500,
        mask: true
      })
      return 
    }
    //验证电话号码格式是否正确
    if(!str.test(e.detail.value.phonenumber))
    {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none',
        duration: 1500,
        mask: true
      })
      return 
    }
   //提交表单
    wx.request({
      url: 'https://i-review.xyz/api/v1/service/task',
      data: {
        serviceTaskType: serviceTaskType,
        wechatUserName: wechatUserName,
        wechatUserPhoneNumber: wechatUserPhoneNumber,
        wechatAppletOpenId: wechatAppletOpenId,
        roomId: roomId
      },
      method: "post",
      success: function (res) {
        if(res.data.status == 200)
        {
          Toast.success({
            message: '报修成功',
            duration: 1500,
            loadingType: 'spinner',
            mask:true,
          }); 
          setTimeout(function() {
            wx.switchTab({
              url: '/pages/index/index',
            })
         }, 1500); 
        }else{
          wx.showToast({
            title:'报修失败',
            icon: 'none',
            duration: 1500,
            mask: true
          }) 

        }

        }
    })
  }, 
  getRoomInfo:function(roomId){
    let that = this;
      wx.request({
        url: 'https://i-review.xyz/api/v1/room/'+ roomId,
        method:'GET',
        success:function(res){
          console.log(res);
          that.setData({
          roomId: res.data.data.roomId,
          roomAddress: res.data.data.roomAddress
          })
         
        }
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  //picker赋值
  onLoad: function (options) {
    var that = this
    var openid=app.globalData.openid
    if(app.globalData.roomId == ""){
      wx.scanCode({
        success (res) {
          let  roomid = res.path.substring(24)
          that.getRoomInfo(roomid);
        }
      })
    }
    wx.request({
      url: 'https://i-review.xyz/api/v1/wechat/applet/user/info?openId='+ openid,
      method:'post',
      success:function(res){
        that.setData({
          realname: res.data.data.wechatUserName,
          phonenumber: res.data.data.wechatUserPhoneNumber,
          roomAddress:app.globalData.roomAddress
        })
      }
    })
    var data = {
      customArray: this.data.customArray,
      customIndex: this.data.customIndex,
      onlyArray: this.data.onlyArray,
    };
    for (var i = 0; i < data.customArray.length; i++) {
      data.onlyArray[0].push(data.customArray[i].name);
    }
    for (var j = 0; j < data.customArray[data.customIndex[0]].dept.length; j++) {
      data.onlyArray[1].push(data.customArray[data.customIndex[0]].dept[j].name);
    }
    this.setData(data);
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
    //获取上次用户保修信息
    var that = this
    var openid = app.globalData.openid
    wx.request({
      url: 'https://i-review.xyz/api/v1/wechat/applet/user/info?openId=' + openid,
      method: 'post',
      success: function (res) {
        that.setData({
          realname: res.data.data.wechatUserName,
          phonenumber: res.data.data.wechatUserPhoneNumber,
          roomAddress:app.globalData.roomAddress
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

  }
})
//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    photo:'',
    name:''
  },
  onLoad: function (e) {
    console.log(e)
    var that = this;
    wx.setStorageSync('topid', e.scene)
    // 请求邀请人
    wx.request({
      url: 'https://exam.qhynice.top/index.php/Api/User/userinfo',
      method: 'POST',
      data: {
        uid: wx.getStorageSync('topid')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        console.log(res)
        that.setData({
          userinfo: res.data.userinfo,
          photo: res.data.userinfo.photo,
          name: res.data.userinfo.name,
          types: res.data.userinfo.type
        })
      }
    })
    // 判断当前用户是否存在
    if(!wx.getStorageSync('id')){
      wx.navigateTo({
        url: '../empower/empower'
      })
    }else{
      // 获取用户信息
      wx.request({
        url: 'https://exam.qhynice.top/index.php/Api/User/userinfo',
        data: {
          uid: wx.getStorageSync('id')
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: res => {
          console.log(res)
          wx.setStorageSync('type', res.data.userinfo.type)
        }
      })
    }
  },
  onShow:function(){
   
  },
  // 点击加入我们按钮
  joinus:function(){
    var that = this
    var type = wx.getStorageSync('type')
    if (type == 1) {
      wx.switchTab({
        url: '../index/index',
      })
    } else {
      if (that.data.types == 1) {
        wx.request({
          url: 'https://exam.qhynice.top/index.php/Api/User/user_edit',
          method: 'POST',
          data: {
            uid: wx.getStorageSync('id'),
            tel: wx.getStorageSync('phoneNumber'),
            spread_id: that.data.userinfo.spread_id,
            secondary_id: that.data.userinfo.secondary_id,
            third_id: that.data.userinfo.third_id,
            initial_id: that.data.userinfo.spread_id
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: res => {
            wx.switchTab({
              url: '../index/index',
            })
          }
        })
      } else {
        wx.request({
          url: 'https://exam.qhynice.top/index.php/Api/User/user_edit',
          method: 'POST',
          data: {
            uid: wx.getStorageSync('id'),
            tel: wx.getStorageSync('phoneNumber'),
            spread_id: that.data.userinfo.spread_id,
            secondary_id: that.data.userinfo.secondary_id,
            third_id: that.data.userinfo.third_id,
            initial_id: that.data.userinfo.initial_id
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: res => {
            wx.switchTab({
              url: '../index/index',
            })
          }
        })
      }
    }
  }
})

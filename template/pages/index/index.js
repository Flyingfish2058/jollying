//index.js
//获取应用实例
const app = getApp();
Page({
   // 解密用户敏感信息获取手机号接口
  getPhoneNumber(e) {
    var that = this
    console.log(e.detail.errMsg == "getPhoneNumber:ok")
    if (e.detail.errMsg == "getPhoneNumber:ok"){
      wx.request({
        url: 'https://exam.qhynice.top/index.php/Api/User/deciphering',
        method: 'GET',
        data: {
          sessionID: wx.getStorageSync('session_key'),
          encryptedDataStr: e.detail.encryptedData,
          iv: e.detail.iv
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res)
          var phoneNumber = res.data.phoneNumber
          wx.setStorageSync('phoneNumber', res.data.phoneNumber)
          // wx.navigateTo({
          //   url: '../bindleader/bindleader',
          // })
        }
      })
    }else{
      wx.showToast({
        title: '获取手机号失败',
        duration: 2000,
        icon: 'none'
      })
    }
  },
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    motto: 'Hi 开发者！',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    TabCur: 0,
    ColorList: app.globalData.ColorList,
    cardCur: 0
  },
  isCard(e) {
    this.setData({
      isCard: e.detail.value
    })
  },
  //事件处理函数
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  onLoad: function() {
    // 轮播接口
    var that = this
    wx.request({
      url: 'https://exam.qhynice.top/index.php/Api/Index/index',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        console.log(res)
        that.setData({
          ggtop:res.data.ggtop,
          prolist:res.data.prolist
        })
      }
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  // 点击微信授权
  // getUserInfo: function(e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // },
  tabSelect(e) {
    console.log(e);
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  // 进入详情页
  detail: function(e) {
    var id =e.currentTarget.dataset.id
    wx.setStorageSync('sp_id', e.currentTarget.dataset.id)
    // console.log(id)
    wx.navigateTo({
      url: '../details/details'
    })
  }
})
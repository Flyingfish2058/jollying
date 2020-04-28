// pages/integral/integral.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    phone: '',
    account: '',
    money: '',
    jifen:'',
    daishen:''
  },
  // 姓名
  name:function(e) {
    this.setData({
      name:e.detail.value
    })
    if (this.data.name == "" || this.data.name == null) {
      wx.showToast({
        title: '收款人姓名必填',
        duration: 2000,
        icon: 'none'
      })
      return false;
    } else if (!(/^[\u4E00-\u9FA5]{2,4}$/.test(this.data.name))) {
      wx.showToast({
        title: '姓名有误',
        duration: 2000,
        icon: 'none'
      })
      return false;
    }
  },
  // 收款人电话
  phone: function(e) {
    this.setData({
      phone:e.detail.value
    })
    if (this.data.phone == "" || this.data.phone == null){
      wx.showToast({
        title: '收款人电话不能为空',
        duration: 2000,
        icon: 'none'
      });
    }else if(!(/^1[34578]\d{9}$/.test(this.data.phone))) {
      wx.showToast({
        title: '手机号码有误',
        duration: 2000,
        icon: 'none'
      });
      return false;
    }
  },
  // 提现账户
  account: function(e) {
    this.setData({
      account:e.detail.value
    })
    if (this.data.account == "" || this.data.account == null){
      wx.showToast({
        title: '请填写账户',
        duration: 2000,
        icon: 'none'
      });
    }else if (!(/^(?:\w+\.?)*\w+@(?:\w+\.)+\w+|\d{9,11}$/.test(this.data.account))) {
      wx.showToast({
        title: '银行卡号/支付宝账号有误',
        duration: 2000,
        icon: 'none'
      });
      return false;
    }
  },
  // 提现金额
  money: function(e) {
    this.setData({
      // 提现金额
      money: e.detail.value,
      // 实际到账金额
      moneys:+e.detail.value-e.detail.value*0.1
    })

    if (this.data.money == "" || this.data.money == null){
      wx.showToast({
        title: '请输入金额',
        duration: 2000,
        icon: 'none'
      });
    }else if (!(/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(this.data.money))) {
      wx.showToast({
        title: '提现金额有误',
        duration: 2000,
        icon: 'none'
      });
    } else if (this.data.money < 100){
      wx.showToast({
        title: '提现不能低于100',
        duration: 2000,
        icon: 'none'
      });
    }
    return false;
  },
  // 提交申请
  but: function(e) {
    var name = this.data.name
    var phone = this.data.phone
    var account = this.data.account
    var money = this.data.money
    var jifen = this.data.jifen
    var that = this
    if(name == "" || name == null){
      wx.showToast({
        title: '姓名不能为空',
        duration: 2000,
        icon: 'none'
      });
      return false;
    }else if(phone == "" || phone == null){
      wx.showToast({
        title: '电话不能为空',
        duration: 2000,
        icon: 'none'
      });
      return false;
    } else if (account == "" || account == null){
      wx.showToast({
        title: '提现账户不能为空',
        duration: 2000,
        icon: 'none'
      });
      return false;
    }else if(money == "" || money == null){
      wx.showToast({
        title: '提现金额不能为空',
        duration: 2000,
        icon: 'none'
      });
      return false;
    }else if (money > jifen) {
      wx.showToast({
        title: '余额不足',
        duration: 2000,
        icon: 'none'
      });
      return false;
    } 
    // 提现申请接口
    wx.request({
        url: 'https://exam.qhynice.top/index.php/Api/User/withdraw',
        method: 'POST',
        data: {
          uid: wx.getStorageSync('id'),
          name:name,
          tel:phone,
          jifen: moneys,
          num:money,
          account:account
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function(res) {
            wx.redirectTo({
              url: 'integral',
            })
        } 
      })
  },
  modalinput: function(e) {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this
    console.log(wx.getStorageSync('id'))
    // 用户信息接口
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
        that.setData({
          jifen: res.data.userinfo.jifen
        })
      }
    })
    // 未审核提现接口
    wx.request({
      url: 'https://exam.qhynice.top/index.php/Api/User/pending',
      data: {
        uid: wx.getStorageSync('id')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: res => {
        console.log(res.data)
        that.setData({
          daishen: res.data.data
        })
       
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
// pages/tack/tack.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    phone:'',
    sheng:[],
    sheng_name:[],
    sheng_id:null,
    index:null,
    cheng:[],
    cheng_name:[],
    cheng_id:null,
    indexs:null,
    xian:[],
    xian_name:[],
    xian_id:null,
    indexv: null,
    detailed:'',
    remark:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://exam.qhynice.top/index.php/Api/Address/get_province',
      method:'POST',
      data:{},
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
        var sheng = res.data.list
        var sheng_name = []
        for (var i in sheng) {
          sheng_name.push(sheng[i].name)
        }
        that.setData({
          sheng: sheng,
          sheng_name: sheng_name
        })
      }
    })
  },
  // 省份选择
  PickerChange(e) {
    let that = this
    var sheng_id = that.data.sheng[e.detail.value].id
    let indexs = 0
    that.setData({
      index: e.detail.value,
      sheng_id: sheng_id,
      indexs : indexs
    })
    that.data.index++
    wx.request({
      url: 'https://exam.qhynice.top/index.php/Api/Address/get_city',
      method:'POST',
      data:{
        sheng: that.data.index
      },
      header:{
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
        var cheng = res.data.city_list
        var cheng_name = []
        for (var i in cheng) {
          cheng_name.push(cheng[i].name)
        }
        that.setData({
          cheng: cheng,
          cheng_name: cheng_name
        })
      }
    })
  },
  // 城市选择
  PickerChangeTo(e){
    let that = this
    var cheng_id = that.data.cheng[e.detail.value].id
    that.setData({
      indexs: e.detail.value,
      cheng_id: cheng_id
    })
    that.data.indexs++
    wx.request({
      url: 'https://exam.qhynice.top/index.php/Api/Address/get_area',
      method: 'POST',
      data: {
        city: cheng_id,
        sheng: that.data.index
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // console.log(res)
        var xian = res.data.area_list
        var xian_name = []
        for (var i in xian) {
          xian_name.push(xian[i].name)
        }
        that.setData({
          xian: xian,
          xian_name: xian_name
        })
      }
    })
  },
  PickerChangeXo(e){
    let that = this
    var xian_id = that.data.xian[e.detail.value].id
    that.setData({
      indexv: e.detail.value,
      xian_id:xian_id
    })
    that.data.indexv++
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

  },
  // 地址选择事件
  // 收货人姓名判断
  name:function(e){
    this.setData({
      name: e.detail.value
    })
    if (!(/^[\u4E00-\u9FA5]{2,4}$/.test(this.data.name))) {
      wx.showToast({
        title: '姓名有误',
        duration: 2000,
        icon: 'none'
      });
      return false;
    }
  },
  // 手机号码判断
  phone:function(e){
    this.setData({
      phone: e.detail.value
    })
    if (!(/^1[34578]\d{9}$/.test(this.data.phone))) {
      wx.showToast({
        title: '手机号码有误',
        duration: 2000,
        icon: 'none'
      });
      return false;
    }
  },
  // 详细地址
  detailed:function(e){
    this.setData({
      detailed: e.detail.value
    })
    var detailed = this.data.detailed
    if (detailed == '') {
      wx.showToast({
        title: '请填写详细地址',
        duration: 2000,
        icon: 'none'
      });
      return false;
    }
    else if (detailed == '') {
      wx.showToast({
        title: '请填写详细地址',
        duration: 2000,
        icon: 'none'
      });
      return false;
    }
  },
  // 备注信息
  remark:function(e){
    this.setData({
      remark: e.detail.value
    })
  },
  // 保存地址按钮
  preserve:function(){
    var name = this.data.name
    var phone = this.data.phone
    var sheng = this.data.sheng_id
    var cheng = this.data.cheng_id
    var xian = this.data.xian_id
    var detailed = this.data.detailed
    var remark = this.data.remark
    console.log(wx.getStorageSync('id'))
    wx.request({
      url: 'https://exam.qhynice.top/index.php/Api/Address/add_adds',
      method:'POST',
      data:{
        user_id: wx.getStorageSync('id'),
        receiver:name,
        tel:phone,
        sheng:sheng,
        city:cheng,
        quyu:xian,
        adds: detailed,
        code:remark
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
        console.log(res)
        wx.redirectTo({
          url: '../addres/addres'
        })
      }
    })
  }
})
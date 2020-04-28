// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    photo_x:'',
    name:'',
    icons:'https://i1.fuimg.com/704744/2b152bfed42d4245.png',
    site:'',
    price_yh:'',
    shu:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 订单页面的商品信息
    // console.log(wx.getStorageSync('num'))
    var shu =  options.shu
    var jg = options.price_yh
    var nums = +shu*jg+'.00'
    this.setData({
      name: options.name,
      photo_x:options.photo_x,
      price_yh: options.price_yh,
      num:options.num,
      nums:nums,
      shu:wx.getStorageSync('num')
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
    // console.log(wx.getStorageSync('id'))
    // 默认地址显示
    var that = this
    wx.request({
      url: 'https://exam.qhynice.top/index.php/Api/Address/index',
      method: "POST",
      data: {
        user_id: wx.getStorageSync('id')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var site = res.data.adds[0]
        that.setData({
          site: res.data.adds[0],
          site_id:res.data.adds[0].id
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

  },
  // 点击收获地址，进入地址列表页面
  addres:function(){
    wx.navigateTo({
      url: '../addres/addres'
    })
  },
  // 支付按钮
  payment:function(){
    console.log(wx.getStorageSync('sp_id'))
    var that = this
    wx.request({
      url: 'https://exam.qhynice.top/index.php/Api/Payment/pay_now',
      method:'POST',
      data:{
        uid: wx.getStorageSync('id'),
        pid: wx.getStorageSync('sp_id'),
        type:	1,
        price: this.data.nums,
        aid: this.data.site_id,
        num: wx.getStorageSync('num')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
        console.log(res)
        // var order_id = res.data.arr.order_id;
        // var order_sn = res.data.arr.order_sn;
        that.setData({
          order_id : res.data.arr.order_id,
          order_sn : res.data.arr.order_sn
        })
        wx.showToast({
          title:'订单ID：'+ res.data.arr.order_id +'  '+'   '+'   '+ '订单号码：'+
           res.data.arr.order_sn,
          duration: 2000,
          icon: 'none'
        });
        return false;
      }
    })
  }
})
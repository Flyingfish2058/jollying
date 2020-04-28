// pages/addres/addres.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    adds:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 地址列表请求接口
    var that = this
    wx.request({
      url: 'https://exam.qhynice.top/index.php/Api/Address/index',
      method:'POST',
      data:{
        user_id: wx.getStorageSync('id')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
        // console.log(res)
        that.setData({
          adds:res.data.adds
        })
        that.onLoad();
      }
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

  },
  // 点击添加地址按钮，跳转地址选择页面
  add:function(){
    wx.navigateTo({
      url: '../tack/tack'
    })
  },
  // 点击默认按钮，设置为默认收货地址
  tacit:function(e){
    // console.log(e)
    var arrid = e.currentTarget.dataset.id
    var that = this
    wx.request({
      url: 'https://exam.qhynice.top/index.php/Api/Address/set_default',
      method:'POST',
      data:{
        uid: wx.getStorageSync('id'),
        addr_id: arrid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
        // 实时刷新页面
        that.onLoad();
      }
    })
  },
  // 点击删除按钮，对地址信息进行删除
  reset:function(e){
    // console.log(e)
    var arrid = e.currentTarget.dataset.id
    // console.log(arrid)
    var that = this
    wx.request({
      url: 'https://exam.qhynice.top/index.php/Api/Address/del_adds',
      method:'POST',
      data:{
        user_id:wx.getStorageSync('id'),
        id_arr: arrid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
        // 实时刷新页面
        that.onLoad();
      }
    })
  }
})
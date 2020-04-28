// pages/team/team.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    TabCur: 0,
    tabNav: ['Flex布局', 'Grid布局', '辅助布局'],
    // 标签页下标
    active: 0,
    yh:'',
    length:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://exam.qhynice.top/index.php/Api/User/tree',
      method:'POST',
      data:{
        uid:44,
        level:this.data.active
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:res =>{
        console.log(res)
        that.setData({
          yh:res.data.data,
          length: res.data.data.length
        })
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
  tabSelect(e) {
    console.log(e);
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  // 标签页事件
  onChange(event) {
    var that = this
    that.setData({
      active:event.detail.index
    })
    that.onLoad();
  }
})
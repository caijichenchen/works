// pages/movie/movie-more/movie-more.js
var { getMoiveList } = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var type = options.type
    var _this = this
    var requestUrl = ''
    switch (type) {
      case 'inTheaters':
        requestUrl = 'http://t.yushu.im/v2/movie/in_theaters'
        break
      case 'comingSoon':
        requestUrl = 'http://t.yushu.im/v2/movie/coming_soon'
        break
      case 'top250':
        requestUrl = 'http://t.yushu.im/v2/movie/top250'
        break
    }
    getMoiveList(requestUrl, function (data) {
      _this.setData({ movies: data })
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
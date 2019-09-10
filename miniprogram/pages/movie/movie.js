// pages/movie/movie.js
var { getMoiveList } = require('../../utils/util.js')
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
    var _this = this
    var inTheatersUrl = 'http://t.yushu.im/v2/movie/in_theaters?start=0&count=3'
    var comingSoonUrl = 'http://t.yushu.im/v2/movie/coming_soon?start=0&count=3'
    var top250Url = 'http://t.yushu.im/v2/movie/top250?start=0&count=3'

    getMoiveList(inTheatersUrl, function (data) {
      _this.setData({ inTheatersMovies: data })
    })
    getMoiveList(comingSoonUrl, function (data) {
      _this.setData({ comingSoonMovies: data })
    })
    getMoiveList(comingSoonUrl, function (data) {
      _this.setData({ comingSoonMovies: data })
    })
    getMoiveList(top250Url, function (data) {
      _this.setData({ top250Movies: data })
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
  tapMore: function (ev) {
    var type = ev.currentTarget.dataset.type
    wx.navigateTo({
      url: '/pages/movie/movie-more/movie-more?type=' + type,
    })
  }
})
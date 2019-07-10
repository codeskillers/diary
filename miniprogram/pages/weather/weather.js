// miniprogram/pages/weather/weather.js
var amapFile = require('../../amap-wx.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      city:'',
      livewea:'',
      temperature:'',
      windpower:'',
      winddirection:'',
      humidity:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    var myAmapFun = new amapFile.AMapWX({key:'9a9dfc1d1286d2f3c6e7615a3df63a48'});
    myAmapFun.getWeather({
      success: function(res){
        that.setData({
           city:res.liveData.city,
           livewea:res.liveData.weather,
           temperature:res.liveData.temperature,
           windpower:res.liveData.windpower,
           winddirection:res.liveData.winddirection,
           humidity:res.liveData.humidity
        })
      },
      fail: function(info){
        //失败回调
        console.log(info)
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

  }
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    texts: "至少5个字",
    min: 5,//最少字数
    max: 110, //最多字数 (根据自己需求改变) 
    files: [],
    txtvalue: '',
    id:''
  },
  inputs: function (e) {
    // 获取输入框的内容
    var value = e.detail.value;
    this.setData({
      txtvalue: value
    })
    // 获取输入框内容的长度
    var len = parseInt(value.length);

    //最少字数限制
    if (len <= this.data.min)
      this.setData({
        texts: "你确定? 写这么少"
      })
    else if (len > this.data.min)
      this.setData({
        texts: " "
      })

    //最多字数限制
    if (len > this.data.max) return;
    // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
    this.setData({
      currentWordNumber: len //当前字数  
    });
  },
  upload() {
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log(res)
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        })
      }
    })
  },
  toFinish(e) {
    console.log(e)
    var that = this
    for (let i = 0; i < that.data.files.length; i++) {
      const filePath = that.data.files[i]
      let a = filePath.lastIndexOf('.')
      let b = filePath.lastIndexOf('.', a - 1)
      let c = filePath.substring(b + 1, a)
      const cloudPath = c + filePath.match(/\.[^.]+?$/)
      wx.cloud.uploadFile({
        // 文件上传路径
        filePath,
        cloudPath,
        success(res) {
          var chars = 'ABCDEFGHJKMNPQ'
          for(var i=0;i<chars.length;i++){
          that.data.id=that.data.id+chars.charAt(Math.floor(Math.random() * chars.length))
          }
          wx.cloud.callFunction({
            name: 'upTxtImg',
            data: {
              fileID: res.fileID,
              txtvalue: that.data.txtvalue,
              id:that.data.id
            }
          })
          wx.redirectTo({
            url: '/pages/index/index',
          })
        },
        fail(err) {
          console.log('上传失败', err)
        }
      })
    }
  },
  previewImage(e) {
    console.log(e)
    wx.previewImage({
      current: e.currentTarget.id,
      urls: this.data.files
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
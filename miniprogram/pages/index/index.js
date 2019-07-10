var amapFile = require('../../amap-wx.js');
var util = require('../../util/util.js');
Page({
  data: {
    src: '',
    bgmPath: '',
    isPlayingMusic: false,
    address: '',
    showView: false,
    TxtImg: [],
    imageArr: [],
    toView: ''
  },
  onChangeShowState() {
    var that = this
    setTimeout(() => {
      if (that.data.showView) {
        that.data.showView = true
        that.setData({
          showView: false
        })
      } else {
        that.data.showView = false
        that.setData({
          showView: true
        })
      }
    }, 220)
  },
  upload() {
    var that = this
    wx.chooseImage({
      count: 4,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        const tempFilePaths = res.tempFilePaths
        for (let i = 0; i < tempFilePaths.length; i++) {
          // 随机文件名
          let randString = Math.floor(Math.random() * 1000000).toString() + '.png'
          wx.showToast({
            icon: "loading",
            title: "正在上传"
          }),
            wx.cloud.uploadFile({
              filePath: tempFilePaths[i],
              // 相传到云端所在路径 fileID后面的后缀
              cloudPath: randString,
              // 上传成功后 回调
              success: res => {
                console.log(res)
                this.setData({
                  src: res.fileID
                })
                wx.cloud.callFunction({
                  name: 'getBgimg',
                  data: {
                    fileID: res.fileID,
                  }
                })
                  .then(res => {
                    wx.showToast({
                      title: '上传成功',
                      icon: 'success'
                    })
                  })
              },
              fail: err => {
                console.log(err)
                wx.showToast({
                  title: '提示',
                  content: '上传失败',
                  showCancel: false
                })
              },
              complete: function () {
                 //隐藏Toast
                wx.hideToast(); 
              }
            })
        }
      }
    })
  },
  onLoad: function () {
    let that = this
    var myAmapFun = new amapFile.AMapWX({ key: '9a9dfc1d1286d2f3c6e7615a3df63a48' });
    myAmapFun.getRegeo({
      success: function (data) {
        console.log(data)
        that.setData({
          address: data[0].regeocodeData.addressComponent.district
        })
      },
      fail: function (info) {
        console.log(info)
      }
    }),
      myAmapFun.getWeather({
        success: function (data) {
          console.log('wea', data)
        },
        fail: function (info) {
          console.log(info)
        }
      })
    wx.cloud.callFunction({
      name: 'getMsg',
      success(res) {
        let len = res.result.data.length
        that.setData({
          src: res.result.data[len - 1].image
        })
      }
    })
    wx.cloud.callFunction({
      name: 'getTxtImg',
      success: res => {
        console.log('txtimg', res)
        var datas = res.result.data;
        for (var i in datas) {
          datas[i].createTime = util.date_time(datas[i].createTime)
        }
        that.setData({
          TxtImg: datas,
          toView:datas[datas.length-1].id
          //  imageArr:new Array('datas.image')
        })
      }
    })
  },
  onMusicTap: function () {
    var that = this
    wx.cloud.callFunction({
      name: 'getBgm',
      success(res) {
        console.log('Bgm', res);
        var len = res.result.data
        const backgroundAudioManager = wx.getBackgroundAudioManager()
        var isPlayingMusic = that.data.isPlayingMusic;
        if (isPlayingMusic) {
          backgroundAudioManager.pause()
          that.setData({
            isPlayingMusic: false
          })
        } else {
          backgroundAudioManager.src = len[Math.floor(Math.random() * len.length)].music
          backgroundAudioManager.title = '歌名你猜'
          backgroundAudioManager.coverImgUrl = ''
          backgroundAudioManager.play()
          backgroundAudioManager.onPlay(() => {
            console.log("音乐播放开始");
          })
          backgroundAudioManager.onPause(() => {
            console.log('播放暂停')
          })
          backgroundAudioManager.onEnded(() => {
            console.log("音乐播放结束");
            that.setData({
              isPlayingMusic: false
            })
          })
          that.setData({
            isPlayingMusic: true
          })
        }
      }
    })
  },
  Topublish() {
    wx.navigateTo({
      url: '/pages/publish/publish'
    })
  },
  Toweather() {
    wx.navigateTo({
      url: '/pages/weather/weather'
    })
  },
  onShow: function () {
    wx.cloud.callFunction({
      name: 'getTxtImg',
      success: res => {
        var datas = res.result.data;
        for (var i in datas) {
          datas[i].createTime = util.date_time(datas[i].createTime)
        }
        this.setData({
          TxtImg: datas,
          toView: datas[datas.length - 1].id
        })
        for (var i = 0; i < datas.length; i++) {
          this.setData({
            imageArr: this.data.imageArr.concat(datas[i].image)
          })
        }
        console.log('toView', this.data.toView)
      }
    })
  },
  previewImage(e) {
    wx.previewImage({
      current: e.currentTarget.id,
      urls: this.data.imageArr
    })
  },
  onReady(e) {
  },
  onPullDownRefresh: function () {

  }
})

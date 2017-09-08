//index.js
//获取应用实例
const app = getApp()
var { formatTime } = require("../../utils/util.js");

Page({
  data: {
    nowDay: formatTime(new Date()),
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    crashList: wx.getStorageSync('crashList') || [],
    tip: ''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../news/news'
    })
  },
  bindAddItem: function() {
    console.dir(this.data);
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  formSubmit: function (e) {
    if (e.detail.value.msg == '' || e.detail.value.account == '') {
      this.setData({tip: '请填写完整'});
      return false;
    }
    let obj = {
      msg: e.detail.value.msg,
      account: e.detail.value.account,
      time: formatTime(new Date())
    };
    let list = this.data.crashList;
    list.unshift(obj);
    this.setData({ crashList: list, tip: ''});
    wx.setStorageSync('crashList', list);
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '欢迎来到danea的小屋，这是v0.0.1版，后期会不断更新',
      path: '/page/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})

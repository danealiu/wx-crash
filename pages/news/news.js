var app = getApp()
var { request } = require('../../utils/util')
var url = 'https://v.juhe.cn/toutiao/index'
Page({
  data: {
    page: 1,
    loadingHide: false,
    hideFooter: true,
    picList: [],
    picDetail: []
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    //请求笑话列表
    request(url, this.data.page, function (dataJson) {
      that.setData({
        picList: that.data.picList.concat(dataJson.result.data),
        loadingHide: true
      })
    }, function (reason) {
      console.log(reason)
      that.setData({
        loadingHide: true
      })
    })
  },

  /**
   * 滑动到底部加载更多
   */
  loadMore() {
    //请求笑话列表
    var that = this
    //显示footer
    this.setData({
      hideFooter: !this.data.hideFooter
    })
    request(url, ++this.data.page, function (dataJson) {
      that.setData({
        picList: that.data.picList.concat(dataJson.result.data),
        hideFooter: !that.data.hideFooter
      })
    }, function (reason) {
      console.log(reason)
      that.setData({
        hideFooter: !that.data.hideFooter
      })
    })
  },

  toDetail(e) {
    console.log(e.target.dataset.url)
  }
})

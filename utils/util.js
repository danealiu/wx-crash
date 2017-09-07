const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
/**
 * 请求网络
 */
const request = function (url, page, success, fail) {
  if (typeof success != 'function' || typeof fail != 'function') {
    return
  }
  var app = getApp()
  wx.request({
    url: url,
    data: {
      key: app.globalData.appkey,
      page: page,
      pagesize: app.globalData.pagesize
    },
    success: function (res) {
      if (res.data.error_code == 0) {
        success(res.data)
      } else {
        fail(res.data.reason)
      }
    },
    fail: function () {
      fail('网络错误')
    }

  })
}
module.exports = {
  formatTime: formatTime,
  request
}

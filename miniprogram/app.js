//app.js
App({
  onLaunch: function () {
      if(!wx.cloud){
          console.error("请使用2.2.3或以上的基础库使用云函数")
      }
      else{
          wx.cloud.init({
              env: 'wordreview127', //环境配置
              traceUser: true
          })
      }
  },
  globalData: {
    userInfo: null,
    diary: null
  }
})
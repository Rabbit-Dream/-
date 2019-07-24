//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        button1_name: "复习",
        button2_name: "测试",
        button3_name: "日记"

    },

    jump_review: function(e){
        var app = getApp();
        app.globalData.checkMark = e.currentTarget.id;
        wx.navigateTo({
            url: '/pages/check/check'
        })
    },

    jump_test: function () {
        wx.navigateTo({
            url: '/pages/test/test'
        })
    },

    jump_note: function(e) {
        var app = getApp();
        app.globalData.checkMark = e.currentTarget.id;
        wx.navigateTo({
            url: '/pages/note/note'
        })
    },

    onLoad: function(){
        // 返回首页时，全局变量恢复默认值
        var app = getApp();
        app.globalData.checkMark = null;
        app.globalData.unitId = null;
        app.globalData.noteClass = null;
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

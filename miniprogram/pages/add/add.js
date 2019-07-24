// miniprogram/pages/add/add.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        unitId: "",
        chinese: "",
        english: ""
    },

    getInput1:function(e){
        var that = this;
        var english = e.detail.value;
        that.setData({
            english: english
        })
    },

    getInput2:function(e){
        var that = this;
        var chinese = e.detail.value;
        that.setData({
            chinese: chinese
        })
    },

    save: function() {
        var app = getApp();
        var that = this;
        var unitId = app.globalData.unitId;
        const db = wx.cloud.database();
        db.collection(unitId).add({
            // 添加数据（文本和日期）
            data: {
                chinese: this.data.chinese,
                english: this.data.english,
                times: 10
            },
            success: function (res) {
                console.log(res)
            },
            fail: console.error
        })
        wx.showModal({
            title: '提示',
            content: '保存成功，是否继续添加',
            success(res) {
                if (res.confirm) {
                    console.log("用户点击确定");
                    that.setData({
                        word_value: "",
                        text: "",
                    })
                }
                else if (res.cancel) {
                    console.log("用户点击取消");
                    wx.redirectTo({
                        url: '/pages/index/index',
                    })
                }
            }
        })

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var app = getApp();
        var unitId = app.globalData.unitId;
        this.setData({
            unitId: unitId
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
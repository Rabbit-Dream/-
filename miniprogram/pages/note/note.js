// pages/note/note.js

Page({

    /**
     * 页面的初始数据
     */

    data: {
        date: null,
        note: null,
        array: null
    },

    diary:function(e){
        var that = this;
        var i = e.currentTarget.id;
        var app = getApp();
        app.globalData.diary = that.data.note[i];
        wx.redirectTo({
            url: '/pages/show/show',
        })
    },

    add: function(){
        wx.redirectTo({
            url: '/pages/write/write',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        var app = getApp();
        var name = app.globalData.checkMark;
        const db = wx.cloud.database();
        // 调用云函数获取全部数据，突破20限制
        wx.cloud.callFunction({
            // 要调用函数名字
            name: 'getAllData',
            // 传参数给云函数
            data: {
                name: 'Diary'
            },
            success: res => {
                console.log("调用云函数成功")
                var note = res.result.data;
                var array = new Array(note.length);
                var date = new Array(note.length);
                for (var i = 0; i < note.length; i++) {
                    array[i] = i;
                    date[i] = note[i].date;
                }
                that.setData({
                    array: array,
                    date: date,
                    note: note
                })
                
            },
            fail: console.error
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
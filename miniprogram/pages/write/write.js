// miniprogram/pages/write/write.js

var util = require('../../utils/util.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        date: "",
        text:""
    },

    getInput:function(e){
        var text = e.detail.value;
        var that = this;
        that.setData({
            text: text
        })
    },

    save: function(){
        var app = getApp();
        var name = app.globalData.checkMark;
        const db = wx.cloud.database();
        var that = this;
        db.collection(name).add({
            // 添加数据（文本和日期）
            data:{
                text: that.data.text,
                date: that.data.date
            },
            success:function(res){
                console.log(res)
            },
            fail:console.error
        })
        wx.showModal({
            title: '提示',
            content: '保存成功，是否返回首页',
            success(res){
                if(res.confirm){
                    console.log("用户点击确定");
                    wx.redirectTo({
                        url: '/pages/index/index',
                    })
                }
                else if(res.cancel){
                    console.log("用户点击取消");
                    that.setData({
                        text: ""
                    })
                }
            }
        })
      
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 调用函数时，传入new Date()参数，返回值是日期和时间
        var date = util.formatTime(new Date());
        var that  = this;
        // 再通过setData更改Page()里面的data，动态更新页面的数据
        that.setData({
            date: date
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
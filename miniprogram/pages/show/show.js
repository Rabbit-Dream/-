// miniprogram/pages/show/show.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        date:"",
        text:""
    },

    remove: function(){
        var app = getApp();
        var diary = app.globalData.diary;
        var dbname = app.globalData.checkMark;
        wx.showModal({
            title: '提示',
            content: '确定删除这条日志',
            success(res){
                if(res.confirm){
                    wx.cloud.callFunction({
                        // 云函数名称
                        name: 'remove',
                        // 传给云函数参数
                        data: {
                            name: dbname,
                            id: diary._id
                        },
                        success: function (res) {
                            console.log("移除成功");
                            wx.redirectTo({
                                url: '/pages/note/note',
                            })
                        },
                        fail: console.error
                    })
                }
                else if(res.cancel){
                    console.log("用户取消删除操作")
                }
            }
        })
    },
    
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        var app = getApp();
        var diary = app.globalData.diary;
        that.setData({
            date: diary.date,
            text: diary.text
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
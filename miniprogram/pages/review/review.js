// pages/word/word.js

var i = 0;  //记录当前页面

Page({
    /**
     * 页面的初始数据
     */
    data: {
        content: null,
        chinese: null,
        english: null,
        maxLength: 0,
        current: 0,
    },

    add:function(){
        wx.redirectTo({
            url: '/pages/add/add',
        })
    },

    // del:function(){
    //     const db = wx.cloud.database();
    //     var that = this;
    //     wx.cloud.callFunction({
    //         // 要调用函数名字
    //         name: 'remove',
    //         // 传参数给云函数
    //         data: {
    //             name: "Note",
    //             id: that.data.content[i]._id
    //         },
    //         success: function (res) {
    //             console.log("移除成功");
    //         },
    //         fail: console.error
    //     })
    // },

    // modify:function(){
    //     var that = this;
    //     const db = wx.cloud.database();
    //     wx.cloud.callFunction({
    //         // 云函数名称
    //         name: 'update',
    //         // 传给云函数参数
    //         data: {
    //             name: unitId,
    //             id: that.data.content[i]._id,
    //             times: that.data.content[i].times + 2,
    //         },
    //         success: function (res) {
    //             console.log("成功");
    //         },
    //         fail: console.error
    //     })
    // },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        i = 0;
        const db = wx.cloud.database();
        var that = this;
        // 调用云函数获取全部数据，突破20限制
        wx.cloud.callFunction({
            // 要调用函数名字
            name: 'getAllData',
            // 传参数给云函数
            data: {
                name: "Note"
            },
            success: res => {
                console.log("调用云函数成功")
                console.log(res.result)
                that.setData({
                    english: res.result.data[0].english,
                    chinese: res.result.data[0].chinese,
                    maxLength: res.result.data.length,
                    content: res.result.data,
                    current: i + 1
                })
            },
            fail: console.error
        })
    },

    Previous: function(){
        var that = this;
        if (--i >= 0) {
            that.setData({
                english: that.data.content[i].english,
                chinese: that.data.content[i].chinese
            })
        }
        else {
            console.log(i);
            console.log("数组越下界");
            i++;
        }
        that.setData({
            current: i + 1
        })

    },

    Next: function(){
        var that = this;
        if (++i < that.data.content.length) { //每次移动中且滑动时不超过最大值 只执行一次

            that.setData({
                english: that.data.content[i].english,
                chinese: that.data.content[i].chinese
            })
        }
        else {
            console.log(i);
            console.log("数组越上界");
            i--;
        }
        that.setData({
            current: i + 1
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
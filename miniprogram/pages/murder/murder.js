// pages/murder/murder.js

var i = 0;
var word_input = null;
var flag = true;

Page({
    /**
     * 页面的初始数据
     */
    data: {
        content: null,
        chinese: null,
        english: "",
        maxLength: 0,
        word_value: "",
        current: 0
    },

    // 获取 input 输入内容
    getInput: function(e){
        word_input = e.detail.value;
    },

    ok: function(){
        var that = this;
        if(flag){
            if (word_input == that.data.content[i].english){
                const db = wx.cloud.database();
                if (that.data.content[i].times - 5 <= 0) {
                    wx.cloud.callFunction({
                        // 云函数名称
                        name: 'remove',
                        // 传给云函数参数
                        data: {
                            name: 'Note',
                            id: that.data.content[i]._id,
                        },
                        success: function (res) {
                            console.log("移除成功");
                        },
                        fail: console.error
                    })
                }
                else {
                    wx.cloud.callFunction({
                        // 云函数名称
                        name: 'update',
                        // 传给云函数参数
                        data: {
                            name: 'Note',
                            id: that.data.content[i]._id,
                            times: that.data.content[i].times - 5,
                        },
                        success: function (res) {
                            console.log("填写正确，time更新成功");
                        },
                        fail: console.error
                    })
                }
                if (++i < that.data.content.length){
                    that.setData({
                        word_value: "",
                        chinese: that.data.content[i].chinese,
                        current: i + 1
                    })
                }
                else{
                    wx.navigateTo({
                        url: '/pages/warn/warn'
                    })
                    console.log("识记完成")
                }
            }
            else{
                flag = false;
                that.setData({
                    english: that.data.content[i].english,
                })
                const db = wx.cloud.database();
                wx.cloud.callFunction({
                    // 云函数名称
                    name: 'update',
                    // 传给云函数参数
                    data: {
                        name: 'Note',
                        id: that.data.content[i]._id,
                        times: that.data.content[i].times + 2,
                    },
                    success: function (res) {
                        console.log("填写错误，time更新成功");
                    },
                    fail: console.error
                })
            } 
        }
        else{
            flag = true;
            if (++i < that.data.content.length){
                that.setData({
                    word_value: "",
                    english: "",
                    chinese: that.data.content[i].chinese,
                    current: i + 1
                })
            }
            else{
                wx.redirectTo({
                    url: '/pages/warn/warn'
                })
                console.log("识记完成")
            }
            
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        i = 0;
        var that = this;
        const db = wx.cloud.database();
        // 调用云函数获取全部数据，突破20限制
        wx.cloud.callFunction({
            // 要调用函数名字
            name: 'getAllData',
            // 传参数给云函数
            data: {
                name: 'Note'
            },
            success: res => {
                console.log("调用云函数成功")
                console.log(res.result)
                that.setData({
                    chinese: res.result.data[0].chinese,
                    maxLength: res.result.data.length,
                    content: res.result.data,
                    current: i + 1
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
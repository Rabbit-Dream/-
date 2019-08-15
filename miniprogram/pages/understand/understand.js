// pages/understand/understand.js

var i = 0;
var flag = true;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        content: null,
        english: null,
        chinese: "",
        maxLength: 0,
        current: 0,
        button1_name: "不认识",
        button2_name: "认识"
    },

    remind: function () {
        var that = this;
        if (flag) {
            flag = false;
            that.setData({
                button1_name: "继续",
                chinese: that.data.content[i].chinese
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
                    console.log("成功");
                },
                fail: console.error
            })

        }
        else {
            flag = true;
            if (i + 1 < that.data.content.length){
                that.setData({
                    english: that.data.content[++i].english,
                    current: i+1,
                    button1_name: "不认识",
                    chinese: ""
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

    next: function () {
        var that = this;
        if (!flag) {
            flag = true;
            that.setData({
                english: that.data.content[++i].english,
                button1_name: "不认识",
                chinese: ""
            })
        }
        else {
            const db = wx.cloud.database();
            if (that.data.content[i].times - 2 <= 0){
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
            else{
                wx.cloud.callFunction({
                    // 云函数名称
                    name: 'update',
                    // 传给云函数参数
                    data: {
                        name: 'Note',
                        id: that.data.content[i]._id,
                        times: that.data.content[i].times - 2,
                    },
                    success: function (res) {
                        console.log("更新成功");
                    },
                    fail: console.error
                })
            }
            if (++i < that.data.content.length){
                that.setData({
                    english: that.data.content[i].english,
                    chinese: "",
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

    look:function(){
        var that = this;
        var j = i;
        if(i = 0){
            j = i+1
        }
        that.setData({
            chinese: that.data.content[j].chinese
        })
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
                that.setData({
                    english: res.result.data[0].english,
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
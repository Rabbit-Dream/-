// pages/word/word.js

var touchDot = 0;//触摸时的原点
var time = 0;//  时间记录，用于滑动时且时间小于1s则执行左右滑动
var interval = "";// 记录/清理 时间记录
var i = 0;  //记录当前页面

Page({
    /**
     * 页面的初始数据
     */
    data: {
        content: null,
        unitId: null,
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

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        i = 0;
        const db = wx.cloud.database();
        var app = getApp();
        console.log(app.globalData.unitId);
        var unitId = this.data.unitId;
        unitId = app.globalData.unitId;
        this.setData({
            unitId: unitId
        })
        db.collection(unitId).orderBy('times', 'desc').get({
            success: res => {
                console.log(res);
                this.setData({
                    english: res.data[0].english,
                    chinese: res.data[0].chinese,
                    maxLength: res.data.length,
                    content: res.data,
                    current: i + 1
                })
            },
            fail: function (res) {
                console.log("获取数据失败")
            },
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

    // 滑动页面数据更新

    // 触摸开始事件
    touchStart: function (e) {
        touchDot = e.touches[0].pageX; // 获取触摸时的原点
        // 使用js计时器记录时间    
        interval = setInterval(function () {
            time++;
        }, 100);
    },
    // 触摸结束事件
    touchEnd: function (e) {
        var touchMove = e.changedTouches[0].pageX;
        console.log("touchMove:" + touchMove + " touchDot:" + touchDot + " diff:" + (touchMove - touchDot));
        // 向左滑动   
        console.log(this.data.content.length);
        if (touchMove - touchDot <= -40 && time < 10) {
            if (++i < this.data.content.length) { //每次移动中且滑动时不超过最大值 只执行一次

                this.setData({
                    english: this.data.content[i].english,
                    chinese: this.data.content[i].chinese
                })
            }
            else {
                console.log(i);
                console.log("数组越上界");
                i--;
            }
            this.setData({
                current: i + 1
            })
        }
        // 向右滑动
        if (touchMove - touchDot >= 40 && time < 10) {
            if (--i >= 0) {
                this.setData({
                    english: this.data.content[i].english,
                    chinese: this.data.content[i].chinese
                })
            }
            else {
                console.log(i);
                console.log("数组越下界");
                i++;
            }
            this.setData({
                current: i + 1
            })
        }
        clearInterval(interval); // 清除setInterval
        time = 0;
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
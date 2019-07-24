// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
    try {
        return await db.collection(event.name).doc(event.id).remove({
            
        })
    } catch (e) {
        console.log(event.name);
        console.error(e);
    }
}
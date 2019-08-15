// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
const db = cloud.database()
const _ = db.command

const MAX_LIMIT = 100
exports.main = async (event, context) => {
    if(event.name == 'Note'){
        index = 'data';
    }
    else{
        index = 'times';
    }
    // 先取出集合记录总数
    const countResult = await db.collection(event.name).count()
    const total = countResult.total
    // 计算需分几次取
    const batchTimes = Math.ceil(total / 100)
    // 承载所有读操作的 promise 的数组
    const tasks = []
    for (let i = 0; i < batchTimes; i++) {
        const promise = db.collection(event.name).skip(i * MAX_LIMIT).limit(MAX_LIMIT).orderBy(index, 'desc').get()
        tasks.push(promise)
    }
    // 等待所有
    return (await Promise.all(tasks)).reduce((acc, cur) => {
        return {
            data: acc.data.concat(cur.data),
            errMsg: acc.errMsg,
        }
    })
}
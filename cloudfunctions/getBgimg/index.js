// 云函数入口文件
const cloud = require('wx-server-sdk')
const env='mywxapp-q9yc8'
cloud.init()
const db=cloud.database({env})
// 云函数入口函数
exports.main = async (event, context) => {
   const userInfo=event.userInfo
   return await db.collection('photos').add({
     data:{
       _openID:userInfo.openId,
       createTime:new Date(),
       image:event.fileID  
     }
   })
}
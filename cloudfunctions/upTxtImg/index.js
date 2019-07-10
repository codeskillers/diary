// 云函数入口文件
const cloud = require('wx-server-sdk')
const env = 'mywxapp-q9yc8'
cloud.init()
const db = cloud.database({ env })
const mapper = db.collection('upTxtImg');
exports.main = async (event, context) => {
  const { userInfo, fileID, txtvalue,id} = event
  return await db.collection('upTxtImg').add({
    data:{
      _openID:userInfo.openId,
      createTime:new Date(),
      image:fileID,
      txtvalue,
      id,
    }
  })

  // let result;
  // let files = await mapper.where({
  //   openID:userInfo.openId
  // }).get()
  // console.log("--------",files);

  // // 判断集合中是否已存在,如果存在
  // if(files.data.length){
  //   let images = files.data[0].images,txtvalues=files.data[0].txtvalues,msg = [];
  //   images.push(fileID);
  //   msg = txtvalues
  //   msg.push(txtvalue)
  //   console.log(images,txtvalue);
  //   result = await mapper.where({
  //     openID:userInfo.openId
  //   }).update({
  //     data:{
  //       images,
  //       txtvalues: msg,
  //       updateTime: new Date()
  //     }
  //   })

  // }else {
  //   // 如果不存在
  //   result =  await mapper.add({
  //     data: {
  //       openID:userInfo.openId,
  //           createTime:new Date(),
  //           images:[
  //             fileID
  //           ], 
  //           /* txtvalue:txtvalue, */
  //           txtvalues:[
  //              txtvalue
  //           ],
  //           updateTime: new Date()
  //     }
  //   })
  // }

  // return {  
  //   result
  // }
}
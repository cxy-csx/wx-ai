// 云函数入口文件
const cloud = require('wx-server-sdk');
const request = require('request-promise');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const imageUrl = event.imageUrl; // 获取小程序端传递的图片链接
  try {
    // 使用 request-promise 库下载图片到云存储
    const imageBuffer = await request.get({
      url: imageUrl,
      encoding: null // 获取原始的二进制图片数据
    });

    // 将图片上传到云存储
    const result = await cloud.uploadFile({
      cloudPath: 'images/' + Date.now() + '.jpg', // 云存储路径，这里以当前时间作为文件名
      fileContent: imageBuffer // 图片的二进制数据
    });

    return result.fileID; // 返回上传后的云存储文件 ID
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
}
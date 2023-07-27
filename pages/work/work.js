// pages/index/plugin/waterfall/waterfall.js
let leftHeight = 0;
let rightHeight = 0;
let leftData = [];
let rightData = [];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftData: [],
    rightData: [],
    orgData: [{
        title: "瀑布流示例1",
        name: "WaterFall",
        image: "https://image.meiye.art/pic_0NF_MgX2DptxYFGoM0SUv?imageMogr2/thumbnail/450x/interlace/1"
      },
      {
        title: "瀑布流示例2",
        name: "WaterFall",
        image: "https://image.meiye.art/pic_AcXKfK5Fr6Dl5i_tr5Vwy?imageMogr2/thumbnail/450x/interlace/1"
      },
      {
        title: "瀑布流示例3",
        name: "WaterFall",
        image: "https://image.meiye.art/pic_6vP65kAdE8pqGbI9cqYNm?imageMogr2/thumbnail/450x/interlace/1"
      },
      {
        title: "瀑布流示例4",
        name: "WaterFall",
        image: "https://image.meiye.art/pic__Y1hiTPzdjSL1bvsUODgK?imageMogr2/thumbnail/450x/interlace/1"
      },
      {
        title: "瀑布流示例4",
        name: "WaterFall",
        image: "https://image.meiye.art/pic_z7UntCMyEWdzIGVQUhfBu?imageMogr2/thumbnail/450x/interlace/1"
      },
      {
        title: "瀑布流示例4",
        name: "WaterFall",
        image: "https://image.meiye.art/pic_sKe8npGuQpHFSHa3HS91t?imageMogr2/thumbnail/450x/interlace/1"
      },
      {
        title: "瀑布流示例4",
        name: "WaterFall",
        image: "https://image.meiye.art/pic_j-BV0e4xP0zOHz2WNgBac?imageMogr2/thumbnail/450x/interlace/1"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let imgs = JSON.parse(options.imgs);
    let orgData = []
    for(let key in imgs){
      console.log(imgs[key])
      orgData.push({
        name: imgs[key]['_id'],
        image: imgs[key]['content'],
        title: imgs[key]['_id']
      })
    }
    this.setData({
      imgs: orgData
    })
    this.create(orgData)
  },

  ViewImage(e) {
    console.log(e)
    var viewImgList = []
    // if(e.currentTarget.dataset.pos == 'left'){
    //   this.data.leftData.forEach((item)=>{
    //     viewImgList.push(item.image)
    //   })
    // }else{
    //   this.data.rightData.forEach((item)=>{
    //     viewImgList.push(item.image)
    //   })
    // }
    this.data.imgs.forEach((item)=>{
      viewImgList.push(item.image)
    })
    console.log(viewImgList)
    console.log(e.currentTarget.dataset.url)
    wx.previewImage({
      urls: viewImgList,
      current: e.currentTarget.dataset.url
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    leftHeight = 0;
    rightHeight = 0;
    leftData = [];
    rightData = [];
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  create(data) {
    let promiseArr = [];
    for (let i in data) {
      let p = new Promise((resolve, reject) => {
        wx.getImageInfo({
          src: data[i].image,
          complete: (res) => {
            let proportion = res.height / res.width;
            data[i].height = 375 * proportion;
            resolve(data[i])
          }
        })
      })
      promiseArr.push(p)
    }
    Promise.all(promiseArr).then(res => {
      this.sort(res);
      this.setData({
        leftData,
        rightData
      })
    })
  },
  sort(data) {
    data.forEach(item => {
      if (leftHeight <= rightHeight) {
        leftHeight += item.height;
        leftData.push(item)
      } else {
        rightHeight += item.height;
        rightData.push(item);
      }
    });
  }
})
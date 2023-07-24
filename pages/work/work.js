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
        image: "https://cxy-csx.top/13334597216923945.jpeg"
      },
      {
        title: "瀑布流示例2",
        name: "WaterFall",
        image: "https://cxy-csx.top/13334597212878479.jpeg"
      },
      {
        title: "瀑布流示例3",
        name: "WaterFall",
        image: "https://cxy-csx.top/13334597202859053.jpeg"
      },
      {
        title: "瀑布流示例4",
        name: "WaterFall",
        image: "https://cxy-csx.top/13334597705129774.jpeg"
      },
      {
        title: "瀑布流示例4",
        name: "WaterFall",
        image: "https://cxy-csx.top/13334597693669650.jpeg"
      },
      {
        title: "瀑布流示例4",
        name: "WaterFall",
        image: "https://cxy-csx.top/13334597676831426.jpeg"
      },
      {
        title: "瀑布流示例4",
        name: "WaterFall",
        image: "https://cxy-csx.top/13334597669567060.jpeg"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.create(this.data.orgData)
  },

  ViewImage(e) {
    console.log(e)
    var viewImgList = []
    if(e.currentTarget.dataset.pos == 'left'){
      this.data.leftData.forEach((item)=>{
        viewImgList.push(item.image)
      })
    }else{
      this.data.rightData.forEach((item)=>{
        viewImgList.push(item.image)
      })
    }
  
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
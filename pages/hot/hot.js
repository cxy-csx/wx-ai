// pages/index/component/nav/nav.js
const dateUtil = require('../../utils/date.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    scrollLeft: 0,
    hotList: [
      {
        name: "zhihu",
        tag: "知乎"
      },
      {
        name: "weibo",
        tag: "微博"
      },
      {
        name: "baidu",
        tag: "百度"
      },
      {
        name: "toutiao",
        tag: "头条"
      }
    ],
    content: "",
    header: [{
      name: '序号',
      title: '标题',
      heat: '热度',
      publicTime: "发布时间"
    }],
    score: [{
        name: "重庆大学",
        address: '重庆市',
        tag: [985, 211],
        detail: [{
            year: 2019,
            top_rank: 3499,
            low_rank: 3579,
            avg_rank: 3895
          },
          {
            year: 2018,
            top_rank: 3499,
            low_rank: 3579,
            avg_rank: 3895
          }
        ]
      },
      {
        name: "四川大学",
        address: '成都市',
        tag: [985, 211],
        detail: [{
            year: 2019,
            top_rank: 3499,
            low_rank: 3579,
            avg_rank: 3895
          },
          {
            year: 2018,
            top_rank: 3499,
            low_rank: 3579,
            avg_rank: 3895
          }
        ]
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.loadData('zhihu')
    // let list = [];
    // for (let i = 1; i <= 12; i++) {
    //   let obj = {
    //     number: '分数',
    //     score: i
    //   }
    //   list.push(obj)
    // }
    // this.setData({
    //   list
    // })
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

  tabSelect(e) {
    console.log(e)
    console.log(dateUtil.formatDate(1690434483000))
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
    this.loadData(e.currentTarget.dataset.name)
    
  },

  loadData(tag){
    wx.request({
      url: `https://www.anyknew.com/api/v1/sites/${tag}`,
      success: res=> {
        let data = res.data.data.site.subs[0].items;
        let list = []
        for(let index in data){
          console.log(data[index])
          let heat = '';
          if(data[index]['more']){
            heat = data[index]['more']
          }
          list.push({
            title: data[index]['title'],
            heat: heat ? heat : '-',
            updateTime: dateUtil.formatDate(data[index]['add_date'] * 1000)
          })
        }
        this.setData({
          list: list
        })
      }
    })
  }
})
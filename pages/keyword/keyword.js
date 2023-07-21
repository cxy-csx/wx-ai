// pages/index/component/form/form.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    index: null,
    picker: ['喵喵喵', '汪汪汪', '哼唧哼唧'],
    multiArray: [
      ['无脊柱动物', '脊柱动物'],
      ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'],
      ['猪肉绦虫', '吸血虫']
    ],
    content: "",
    objectMultiArray: [
      [{
          id: 0,
          name: '无脊柱动物'
        },
        {
          id: 1,
          name: '脊柱动物'
        }
      ],
      [{
          id: 0,
          name: '扁性动物'
        },
        {
          id: 1,
          name: '线形动物'
        },
        {
          id: 2,
          name: '环节动物'
        },
        {
          id: 3,
          name: '软体动物'
        },
        {
          id: 3,
          name: '节肢动物'
        }
      ],
      [{
          id: 0,
          name: '猪肉绦虫'
        },
        {
          id: 1,
          name: '吸血虫'
        }
      ]
    ],
    multiIndex: [0, 0, 0],
    time: '13:01',
    date: '2022-12-25',
    region: ['北京市', '北京市', '朝阳区'],
    imgList: [],
    modalName: null,
    textareaAValue: '',
    textareaBValue: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
  MultiChange(e) {
    this.setData({
      multiIndex: e.detail.value
    })
  },
  MultiColumnChange(e) {
    let data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'];
            data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
            break;
          case 1:
            data.multiArray[1] = ['鱼', '两栖动物', '爬行动物'];
            data.multiArray[2] = ['鲫鱼', '带鱼'];
            break;
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
      case 1:
        switch (data.multiIndex[0]) {
          case 0:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
                break;
              case 1:
                data.multiArray[2] = ['蛔虫'];
                break;
              case 2:
                data.multiArray[2] = ['蚂蚁', '蚂蟥'];
                break;
              case 3:
                data.multiArray[2] = ['河蚌', '蜗牛', '蛞蝓'];
                break;
              case 4:
                data.multiArray[2] = ['昆虫', '甲壳动物', '蛛形动物', '多足动物'];
                break;
            }
            break;
          case 1:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['鲫鱼', '带鱼'];
                break;
              case 1:
                data.multiArray[2] = ['青蛙', '娃娃鱼'];
                break;
              case 2:
                data.multiArray[2] = ['蜥蜴', '龟', '壁虎'];
                break;
            }
            break;
        }
        data.multiIndex[2] = 0;
        break;
    }
    this.setData(data);
  },
  TimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  RegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  ChooseImage() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '提示',
      content: '确定要删除图片吗？',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  textareaAInput(e) {
    console.log()
    this.setData({
      textareaAValue: e.detail.value,
      content: ''
    })
    const that = this;
    const requestTask = wx.request({
      url: 'https://openaiproxy.cloud/v1/chat/completions', // 替换为您的服务器端处理 ChatGPT 的 URL
      enableChunked: true,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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'
      },
      data: {
        "model": "gpt-3.5-turbo",
        "messages": [
          {
            "role": "system",
            "content": `
            请你深度学习搜索次：
            我需要找到` + e.detail.value + `相关的搜索词，包括核心关键词、关联关键词、高转化词和热搜词。请帮我生成这些搜索词。
            `
          },
          {
            "role": "user",
            "content": e.detail.value
          }
        ],
        "stream": true
      },
      success: (res) => {
        // 处理每个部分响应并拼接
        if (res.data.choices && res.data.choices.length > 0) {
          console.log(res.data.choices)
          const assistantMessage = res.data.choices[0].message.content;
          this.setData({
            responseText: this.data.responseText + assistantMessage
          });
        }
      },
      fail: (err) => {
        console.error('HTTP 请求失败:', err);
      }
    });


    requestTask.onHeadersReceived(function (r) {
      console.log(r);
    });
    requestTask.onChunkReceived(function (r) {
      // let decoder = new TextDecoder('utf-8');
      // let str = decoder.decode(new Uint8Array(r.data));

      // let en = String.fromCharCode.apply(null,new Uint8Array(r.data));
      // let de = decodeURIComponent(escape(en));

      // console.log("onChunkReceived", str);

      console.log(r.data)
      const data16 = that.arrayBufferToHex(r.data)	// ArrayBuffer转16进制
      const requestData = that.hexToString(data16) // 16进制转字符串
      let content = JSON.parse(requestData.replace("data: ", ''))['choices'][0]['delta']['content'];
      console.log(content);
      let temp = that.data.content += content 
      that.setData({
        content: temp
      })
    });

    

   




  },

 arrayBufferToHex(arrayBuffer) {
    const byteArray = new Uint8Array(arrayBuffer);
    let hexString = '';
  
    for (let i = 0; i < byteArray.length; i++) {
      const hex = byteArray[i].toString(16);
      hexString += (hex.length === 1 ? '0' : '') + hex;
    }
  
    return hexString;
  },

hexToString(hexString) {
    const hexArray = hexString.match(/.{1,2}/g);
    const byteArray = new Uint8Array(hexArray.map(byte => parseInt(byte, 16)));
    const decodedString = new TextDecoder().decode(byteArray);
    return decodedString;
  },

  textareaBInput(e) {
    this.setData({
      textareaBValue: e.detail.value
    })
  },
  copyText: function (e) {
    console.log(e)
    var textToCopy = this.data.content; // 替换为您想复制的文本
    wx.setClipboardData({
      data: textToCopy,
      success: function () {
        wx.showToast({
          title: '文本已复制',
          icon: 'success',
          duration: 2000
        })
      }
    })
  }

})
// pages/index/component/form/form.js
const app = getApp();
let leftHeight = 0;
let rightHeight = 0;
let leftData = [];
let rightData = [];
let loading = true;
let loadingTop = true;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ColorList: app.globalData.ColorList,
    color: 'red',
    canvasW: 220,
    canvasH: 220,
    data_list: [{
        value: 0,
        lineColor: 'red',
        lineWidth: 2
      },
      {
        value: 10,
        lineColor: 'red',
        lineWidth: 2
      },
      {
        value: 20,
        lineColor: 'red',
        lineWidth: 2
      },
      {
        value: 30,
        lineColor: 'red',
        lineWidth: 3
      },
      {
        value: 40,
        lineColor: 'green',
        lineWidth: 3
      },
      {
        value: 50,
        lineColor: 'green',
        lineWidth: 3
      },
      {
        value: 60,
        lineColor: 'green',
        lineWidth: 3
      },
      {
        value: 70,
        lineColor: 'green',
        lineWidth: 4
      },
      {
        value: 80,
        lineColor: '#37c0fe',
        lineWidth: 4
      },
      {
        value: 90,
        lineColor: '#37c0fe',
        lineWidth: 4
      },
      {
        value: 100,
        lineColor: '#37c0fe',
        lineWidth: 4
      },
      {
        value: 101,
        lineColor: '#37c0fe',
        lineWidth: 5
      },
    ],
    // 环形进度条参数
    circleDiam: 80, // 圆环直径
    cententDiam: 70, // 中心圆直径
    bgColor: '#e9e9e9',
    curColor: 'linear-gradient(#7affaf, #7a88ff)',
    value: 70,
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    sex: "女",
    b1: true,
    b2: true,
    b3: true,
    process: '0%',
    ischecked: undefined,
    index: null,
    picker: ['喵喵喵', '汪汪汪', '哼唧哼唧'],
    multiArray: [
      ['无脊柱动物', '脊柱动物'],
      ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'],
      ['猪肉绦虫', '吸血虫']
    ],
    imgs: ['cloud://dev-8gcnkqqr1adb949a.6465-dev-8gcnkqqr1adb949a-1317235824/images/1690291908444.jpg'],
    leftData: [],
    rightData: [],
    orgData: [
      // {
      //   title: "瀑布流示例1",
      //   name: "WaterFall",
      //   image: "https://cxy-csx.top/13334597216923945.jpeg"
      // },
      // {
      //   title: "瀑布流示例2",
      //   name: "WaterFall",
      //   image: "https://cxy-csx.top/13334597212878479.jpeg"
      // },
      // {
      //   title: "瀑布流示例3",
      //   name: "WaterFall",
      //   image: "https://cxy-csx.top/13334597202859053.jpeg"
      // },
      // {
      //   title: "瀑布流示例4",
      //   name: "WaterFall",
      //   image: "https://cxy-csx.top/13334597705129774.jpeg"
      // },
      // {
      //   title: "瀑布流示例4",
      //   name: "WaterFall",
      //   image: "https://cxy-csx.top/13334597693669650.jpeg"
      // },
      // {
      //   title: "瀑布流示例4",
      //   name: "WaterFall",
      //   image: "https://cxy-csx.top/13334597676831426.jpeg"
      // },
      // {
      //   title: "瀑布流示例4",
      //   name: "WaterFall",
      //   image: "https://cxy-csx.top/13334597669567060.jpeg"
      // }
    ],
    flag: true,
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
  },
  onLoad(options) {

    // wx.cloud.callFunction({
    //   name: 'upload',
    //   data: {
    //     imageUrl: 'https://6465-dev-8gcnkqqr1adb949a-1317235824.tcb.qcloud.la/images/1690291908444.jpg'
    //   },
    //   success: res => {

    //     console.log('上传成功，云存储文件 ID:', res.result);
    //     console.log(res)
    //     console.log('上传成功，云存储文件 ID:', res.result);
    //     // imgs.push(res.result);
    //     // this.setData({
    //     //   imgs: imgs,
    //     //   // orgData: orgData
    //     // })
    //   },
    //   fail: err => {
    //     console.error('上传失败:', err);
    //   }
    // });

    // wx.cloud.getTempFileURL({
    //   fileList: ['cloud://dev-8gcnkqqr1adb949a.6465-dev-8gcnkqqr1adb949a-1317235824/images/1690291908444.jpg'], // 传入文件 ID 数组
    //   success: res => {
    //     console.log(res.fileList[0].tempFileURL); // 返回的结果包含文件的 HTTP 链接
    //     // 在这里处理文件链接
    //   },
    //   fail: err => {
    //     console.error(err);
    //   }
    // });



    // this.create(this.data.orgData)
    let that = this;
    setTimeout(function () {
      that.setData({
        loading: true
      })
    }, 500);
    this.rotateCircle(that.data.value);

    // uploadImageToCloud: function () {
      // const imageUrl = 'https://example.com/image.jpg'; // 外部图片地址，替换为你的图片链接
  
      

    // wx.downloadFile({
    //   url: 'https://cdn.discordapp.com/attachments/1133239262922412074/1133282468380803172/charlesrogers__312b6cce-5e59-4a1b-be76-82d8467c2943.png',
    //   success: res => {
    //     console.log(res)
    //   }
    // })

    // }
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
  SetColor(e) {
    this.setData({
      color: e.currentTarget.dataset.color,
      modalName: null
    })
  },

  SetActive(e) {
    this.setData({
      active: e.detail.value
    })
  },
  getRings() {
    this.data.data_list.forEach((item, index) => {
      this.canvasRing = this.selectComponent("#can" + index);
      this.canvasRing.showCanvasRing()
    })

  },
  drawNew(step) {
    const query = wx.createSelectorQuery().in(this);
    query.select('#myCanvas')
      .fields({
        node: true,
        size: true
      })
      .exec(this.init.bind(this))
  },
  init(res) {
    const canvas = res[0].node
    const ctx = canvas.getContext('2d');
    const dpr = wx.getSystemInfoSync().pixelRatio
    canvas.width = res[0].width * dpr
    canvas.height = res[0].height * dpr
    ctx.scale(dpr, dpr)
    var gradient = ctx.createLinearGradient(200, 100, 100, 200);
    gradient.addColorStop("0", "#a57b5f");
    gradient.addColorStop("0.5", "#cc9ad1");
    gradient.addColorStop("1.0", "#b84e88");
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(110, 110, 100, 0, 2 * Math.PI, false);
    ctx.stroke();
  },
  // 环形进度条
  rotateCircle(value) {
    let rotateLeft = '';
    let rotateRight = '';
    let backgroundRight = '';
    let durationLeft = '0s';
    let durationRight = '0s';

    if (value >= 50) {
      rotateLeft = `rotate(${((value - 50) / 100) * 360}deg)`;
      rotateRight = `rotate(0deg)`;
      backgroundRight = 'inherit';
      durationLeft = '0.25s';
      durationRight = '0s';
    } else {
      rotateLeft = 'rotate(0deg)';
      rotateRight = `rotate(${(value / 100) * 360}deg)`;
      backgroundRight = this.data.bgColor;
      durationLeft = '0';
      durationRight = '0.25s';
      if (this.oldValue >= 50) {
        durationRight = '0s';
      }
    }
    // 记录上次的值
    this.oldValue = value;
    this.setData({
      rotateLeft,
      rotateRight,
      backgroundRight,
      durationLeft,
      durationRight
    });
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
  ChooseImage(e) {

    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        console.log(res)

        // 上传到云开发平台
        wx.cloud.uploadFile({
          cloudPath: 'imgs', // 云存储保存路径
          filePath: res.tempFilePaths[0], // 图片临时路径
          success: res => {
            console.log(res)
          },
          fail: res => {
            console.log(res)
          }
        })

        this.setData({
          tempUrl: res.tempFilePaths[0]
        })
        



        




        // // 图片转base64
        // wx.getFileSystemManager().readFile({
        //   filePath: res.tempFilePaths[0],
        //   encoding: 'base64',
        //   success: res => {
        //     let base64 = 'data:image/jpeg;base64,' + res.data; //不加上这串字符，在页面无法显示
        //     console.log(this.data.b1)
        //     let b1 = this.data.b1 ? "是" : "否";
        //     let b2 = this.data.b2 ? "是" : "否";
        //     let b3 = this.data.b3 ? "是" : "否";
        //     console.log(b1, b2, b3)
        //     wx.request({
        //       // url: 'https://api.replicate.com/v1/predictions',
        //       url: 'https://modelscope.cn/api/v1/studio/damo/old_photo_restoration/gradio/run/predict',
        //       method: 'POST',
        //       // header: {
        //       //   "Authorization": "Token r8_QJDy8ZahAPEQZ9fuEwF5dYjA9nLLRBj29pU8w",
        //       //   "Content-Type": "application/json"
        //       // },
        //       data: {
        //         // "version": "7de2ea26c616d5bf2245ad0d5e24f0ff9a6204578a5c876db53142edd9d2cd56",
        //         // "input": {
        //         //   "image": base64,
        //         //   "background_enhance": true,
        //         //   "codeformer_fidelity": 0.7,
        //         //   "face_upsample": true,
        //         //   "upscale": 1
        //         // }
        //         "fn_index":0,"data":[base64,b1,b2,b3],"dataType":["image","radio","radio","radio"],"event_data":null
        //       },
        //       success: (res) => {

        //         wx.hideLoading({
        //           title: '生成中...',
        //         })

        //         console.log()

        //         this.getTempUrl(res['data']['data'][0], res=> {
        //           this.setData({
        //             output: res
        //           })
        //         })
               
                
        //         // let index = 1
        //         // while (index < 50 && !this.data.output) {
        //         //   console.log("获取图片")

        //         //   var resp = this.getPhoto(res['data']['urls']['get'])
        //         //   console.log(resp)
                 
        //         //   index += 5 
        //         //   this.sleep(5000)
        //         //   console.log(this.data.output)
        //         // }




        //         //  this.getPhoto(res['data']['urls']['get']).then(res => {
        //         //    console.log("==========result==========")
        //         //   console.log(res)
        //         //   console.log("==========result==========")
        //         //   if(!res['data']['output']){
        //         //     this.getPhoto(res['data']['urls']['get'])
        //         //   }else{
        //         //   console.log("==========url==========")
        //         //   console.log(res['data']['output'])
        //         //   console.log("==========url==========")
        //         //   }
        //         //  });

        //         // if(!resp['data']['output']){
        //         //   console.log("重新获取")
        //         // this.getPhoto(res['data']['urls']['get']);
        //         // }

        //         // console.log(res)
        //       },
        //       fail: (err) => {
        //         console.error('HTTP 请求失败:', err);
        //       }
        //     });

        //   }
        // })




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

  gen(e){
    wx.showLoading({
          title: '等待任务队列执行...',
        })
    console.log(this.data.tempUrl)
    wx.getFileSystemManager().readFile({
      filePath: this.data.tempUrl,
      encoding: 'base64',
      success: res => {
        let base64 = 'data:image/jpeg;base64,' + res.data;
        wx.request({
          url: 'https://mj.cxy-csx.top/mj/submit/imagine',
          method: 'POST',
          header: {
            'content-type': 'application/json',
          },
          data: {
            'base64': base64,
            'notifyHook': '',
            'prompt': this.data.textareaAValue,
            'state': '',
          },
          success: (res => {

            wx.showToast({
              title: '等待执行...',
            })

            console.log(res);
            console.log(res.data.result);

            this.getUrl(res.data.result, this.callback)
            
          })
          
      

        })
       }
      })
    
  },

callback(res){
  this.setData({
    process: res.progress
  })
  console.log("2222222222222222222")
  console.log(res)
  console.log("2222222222222222222")
  if(res.progress != '100%'){
    this.getUrl(res.id, this.callback)
  } else {
    for(let index=1; index<=4; index++){
      // 获取高清图片
    wx.request({
      url: 'https://mj.cxy-csx.top/mj/submit/change',
      method: 'post',
      data: {
        'action': 'UPSCALE',
        'index': index,
        'notifyHook': '',
        'state': '',
        'taskId': res.id,
      },
      success: (res => {
        console.log("获取高清大图url")
        console.log(res)
        console.log("获取高清大图url")
        // this.sleep(5)
        this.getImgUrl(res.data.result, this.handel)
      }
    )
    })
    }
    console.log(res)
  }
 
},

sleep(milliSeconds) {
  var startTime = new Date().getTime();
  while (new Date().getTime() < startTime + milliSeconds);
},

getImgUrl(taskId, callback){
  wx.request({
    url: `https://mj.cxy-csx.top/mj/task/${taskId}/fetch`,
    success: (res => {
      callback(res)
    })
  })
},
click1() {
  this.setShow("success", "提交成功，等待任务执行...");
},
setShow(status, message, time = 2000, fun = false) {
  if (loading) {
    return
  }
  loading = true;
  try {
    this.setData({
      status,
      message,
      time,
      show: true,
    })
    setTimeout(() => {
      this.setData({
        show: false,
      })
      loading = false;
      // 触发回调函数
      if (fun) {
        this.end()
      }
    }, time)
  } catch {
    loading = false;
  }
},

handel(res){
  console.log("===================")
  console.log(res)
  console.log("===================")
  if(res.data.progress != '100%'){
    this.getImgUrl(res.data.id, this.handel)
  } else {
    console.log("获取到图片")
    console.log(res)
    let imgs = this.data.imgs;
    let leftData = this.data.leftData;
    let rightData = this.data.rightData;
    console.log(res.data.imageUrl)
    let newUrl = res.data.imageUrl.replace("https://cdn.discordapp.com/", 'http://www.jxit114.xyz:8082/cdndiscordapp/')
    console.log(newUrl)

    console.log(imgs)
    wx.cloud.callFunction({
      name: 'upload',
      data: {
        imageUrl: newUrl
      },
      success: res => {

        console.log('上传成功，云存储文件 ID:', res.result);
        console.log(res)
        console.log('上传成功，云存储文件 ID:', res.result);

        wx.cloud.getTempFileURL({
          fileList: [res.result], // 传入文件 ID 数组
          success: res => {
            console.log(res.fileList[0].tempFileURL); // 返回的结果包含文件的 HTTP 链接
            // 在这里处理文件链接
            imgs.push(res.fileList[0].tempFileURL);
        this.setData({
          imgs: imgs,
          // orgData: orgData
        })
          },
          fail: err => {
            console.error(err);
          }
        });


        // wx.cloud.getTempFileURL({
        //     fileList: [res.result], // 传入文件 ID 数组
        //     success: res => {
        //       console.log(res.fileList[0]); // 返回的结果包含文件的 HTTP 链接
        //       // 在这里处理文件链接
        //     },
        //     fail: err => {
        //       console.error(err);
        //     }
        //   });



        
      },
      fail: err => {
        console.error('上传失败:', err);
      }
    });
    
    // this.create(orgData)
    console.log("11111111111111111111")
    console.log(this)
    console.log("11111111111111111111")
    
    // if(leftData.length %2 == 0){
    //   leftData.push({
    //     image: res.data.imageUrl
    //   });
    // }else{
    //   rightData.push({
    //     image: res.data.imageUrl
    //   });
    // }
    // let pos = orgData.indexOf(res.data.imageUrl)
    // if (pos < 0){
      
    // }
    
  }
  
  // if(!res.imageUrl){
  //   this.getImgUrl(res.id, this.handel)
  // } else {
    
  // }
},



getUrl(taskId, callback){
  wx.request({
    url: `https://mj.cxy-csx.top/mj/task/${taskId}/fetch`,
    method: "get",
    success: (res => {
      callback(res.data);
    })
  })
},

  sleep(milliSeconds) {
    var startTime = new Date().getTime();
    while (new Date().getTime() < startTime + milliSeconds);
  },


  async getPhoto(url){
    const promise = new Promise(function (resolve, reject) {
      wx.request({
        url: url,
        method: 'GET',
        header: {
          "Authorization": "Token r8_b0Hb6tYG2w1RUuZUHOTF3mHkoDfu82t1vKVu7",
          "Content-Type": "application/json"
        },
        success: res => {
          console.log("获取图片结束", that)
          console.log(res['data']['output'])
          resolve();
          // that.setData({
          //   output: res['data']['output'],
          //   flag: false
          // })
        },
        fail: res => {
          conole.log("获取失败")
        }
      })
    })
    return promise.then(function(res){
      return res;
     },function(){}) 
  },

  // wrapperPhoto(url){
  //   this.getPhoto(url).then(res => {
  //     return res;
  //   })
  // },

  getPhoto(url) {
    console.log("获取图片")
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        method: 'POST',
        header: {
          "Authorization": "Token r8_b0Hb6tYG2w1RUuZUHOTF3mHkoDfu82t1vKVu7",
          "Content-Type": "application/json"
        },
        success: res => {
          // console.log(res)
          // if (res.data && res.data.code === '0000000') {
          resolve(res)
          // }
        },
        fail: res => {
          conole.log("获取失败")
        }
      })
    })
  },


  ViewImage(e) {
    console.log(e)
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  ViewImage2(e){
    console.log(e)
    wx.previewImage({
      urls: this.data.imgs,
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
    this.setData({
      textareaAValue: e.detail.value
    })
  },
  textareaBInput(e) {
    this.setData({
      textareaBValue: e.detail.value
    })
  },
  showb1() {
    this.setData({
      styleA: 'transform:rotateY(180deg)',
      styleB: 'transform:rotateY(0deg)'
    })
  },
  showb2() {
    this.setData({
      styleA: 'transform:rotateY(0deg)',
      styleB: 'transform:rotateY(-180deg)'
    })
  },
  saveImg(e){
    wx.getImageInfo({
      src: this.data.output,//这里放你要下载图片的数组(多张) 或 字符串(一张) 下面代码不用改动
      success: function (ret) {
        var path = ret.path;
        wx.saveImageToPhotosAlbum({
          filePath: path,
          success(result) {
            console.log("成功");
            wx.hideLoading();
            wx.showToast({
              title: '下载图片成功',
              duration: 2000,
              mask: true,
            });
          },
          fail(result) {
            console.log("失败,你取消了")
            console.log(path);
            wx.openSetting({
              success: (res) => {
                console.log(res);
              }
            })
          }
        });
      },
      fail: function(res){
        console.log(res)
      }
    });
  },
  getTempUrl(base64data, fun){
    const base64 = base64data; //base64格式图片
    const time = new Date().getTime();
    const imgPath = wx.env.USER_DATA_PATH + "/cxycsx" + time  + ".jpg";
    const imageData = base64.replace(/^data:image\/\w+;base64,/, "");
    const file = wx.getFileSystemManager();
    file.writeFileSync(imgPath, imageData, "base64");
    fun(imgPath);
  },

  b1(e){
    console.log(e.detail.value)
    this.setData({
      b1: e.detail.value
    })
  },
  b2(e){
    console.log(e.detail.value)
    this.setData({
      b2: e.detail.value
    })
  },
  b3(e){
    
    this.setData({
      b3: e.detail.value
    })
    
  },
  switchSex: function (e) {
    if (e.detail.value) {
      this.setData({
        sex: "男"
      });
    } else {
      this.setData({
        sex: "女"
      });
    }
  },
  // 蛋黄派开关
  eggClick() {
    this.setData({
      ischecked: !this.data.ischecked
    })
  },
})
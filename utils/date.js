function zeroPad(number, width) {
  const str = number.toString();
  return str.length >= width ? str : '0'.repeat(width - str.length) + str;
}

function formatDate(timestamp){
 
  var date = new Date(timestamp);
    var Y = date.getFullYear();  
      //月  
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);  
      //日  
      var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      // console.log(D)
      //时  
      var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
      //分  
      var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();  
      //秒  
      var s = date.getSeconds();
      var time = Y + "/" + M + "/" + D + " " + h + ":" + m;
      return time;
}

module.exports.formatDate = formatDate;
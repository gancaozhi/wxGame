Date.prototype.Format = function (fmt) { //author: meizz   
  var o = {
    "M+": this.getMonth() + 1,                 //月份   
    "d+": this.getDate(),                    //日   
    "h+": this.getHours(),                   //小时   
    "m+": this.getMinutes(),                 //分   
    "s+": this.getSeconds(),                 //秒   
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
    "S": this.getMilliseconds()             //毫秒   
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
cc.Class({
  extends: cc.Component,

  properties: {

  },

  getMoney: function () {
    var m = 0
    if (cc.zy.userattributes.balance < 20) {
      var ran = cc.zy.utils.random(200, 300)
      m = ran / 100
    } else if (cc.zy.userattributes.balance < 50) {
      var ran = cc.zy.utils.random(50, 100)
      m = ran / 100
    } else {
      m = 0.001
    }
    return parseFloat(m).toFixed(3);
  },

  isToday: function (str) {
    var d = new Date(str.replace(/-/g, "/"));
    var todaysDate = new Date();
    if (d.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0)) {
      return true;
    } else {
      return false;
    }
  },

  popup: function (node) {
    node.opacity = 50
    node.scale = 0.1
    var spawn = cc.spawn(cc.scaleTo(0.5, 1, 1), cc.fadeIn(0.5))
    node.runAction(spawn);
  },
  //随机  
  random: function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  },
  getRandom: function (a) {
    return Math.floor(Math.random() * a);
  },
  getUserParam: function () {
    let str = cc.sys.localStorage.getItem('userParam');
    if (str == null || str == undefined) {
      var userParam = {
        tili: 6,//体力值  6点满
        pass: 0,//过关数  
        water: 100,//水滴值
        shuiguo: 0,//水果值  
        tishi: 3,//提示值 
        treeLevel: 0,//树的等级
        lowerLevelWater: 0,//上一个等级升满总水滴数
        totalWater: 0,//总浇水数
        tiliTime: (new Date()).valueOf(),//体力领取时间
        shuidiTime: (new Date()).valueOf(),//水滴领取时间
      }
      this.setUserParam(userParam)
      return userParam
    }
    let obj;
    //注意有取出的字符串不是json格式，需要try起来
    try {//将字符串转换成对象
      obj = JSON.parse(str);
      return obj;
    } catch (e) {
      var userParam = {
        tili: 6,//体力值  6点满
        pass: 0,//过关数  
        water: 100,//水滴值
        shuiguo: 0,//水果值  
        tishi: 3,//提示值 
        treeLevel: 0,//树的等级
        lowerLevelWater: 0,//上一个等级升满总水滴数
        totalWater: 0,//总浇水数
        tiliTime: (new Date()).valueOf(),//体力领取时间
        shuidiTime: (new Date()).valueOf(),//水滴领取时间
      }
      this.setUserParam(userParam)
      return userParam;
    }

  },
  setUserParam: function (obj) {
    // let obj = [1,2,3];
    //将对象转换成json字符串
    let str = JSON.stringify(obj);
    cc.sys.localStorage.setItem('userParam', str);
  },
  getWeekOfYear: function () {//以周一为每周的第一天。
    var today = new Date();
    var firstDay = new Date(today.getFullYear(), 0, 1);
    var dayOfWeek = firstDay.getDay();
    var spendDay = 1;
    if (dayOfWeek != 0) {
      spendDay = 7 - dayOfWeek + 1;
    }
    firstDay = new Date(today.getFullYear(), 0, 1 + spendDay);
    var d = Math.ceil((today.valueOf() - firstDay.valueOf()) / 86400000);
    var result = Math.ceil(d / 7);
    // cc.log("第"+result+"周");
    return result + 1;
  },
  getToday: function () {//以周一为每周的第一天。
    var today = new Date();
    // today.getFullYear();
    // today.getMonth(); //获取当前月份(0-11,0代表1月)
    // today.getDate(); //获取当前日(1-31)
    return today.getFullYear() + today.getMonth() + today.getDate();
  },
  getTodayStorage: function () {
    return cc.sys.localStorage.getItem("today")
  },
  setTodayStorage: function () {
    cc.sys.localStorage.setItem("today", this.getToday())
  },
  getZhuanshiStorage: function () {
    if (cc.sys.localStorage.getItem("zhuanshi") == null || cc.sys.localStorage.getItem("zhuanshi") == "") {//浏览器默认是null  微信是""
      this.setZhuanshiStorage(0)
    }
    return cc.sys.localStorage.getItem("zhuanshi")
  },
  setZhuanshiStorage: function (zhuanshi) {
    cc.sys.localStorage.setItem("zhuanshi", zhuanshi)
  },
  toast: function (parent, text, x, y, t) {
    var node = new cc.Node("toast")
    var nodesprite = new cc.Node("nodesprite")
    nodesprite.width = 600
    nodesprite.height = 200
    nodesprite.opacity = 100
    nodesprite.parent = node
    nodesprite.color = cc.color(0, 0, 0, 255)
    var sprite = nodesprite.addComponent(cc.Sprite)
    sprite.spriteFrame = new cc.SpriteFrame(cc.url.raw('resources/singleColor.png'));
    node.x = x
    node.y = y
    var lable = node.addComponent(cc.Label)
    lable.string = text
    node.parent = parent
    node.runAction(cc.sequence(
      cc.fadeOut(t),
      cc.removeSelf(true)
    ))
  },

  // 显示一个tip
  showTip: function (title, content, btnlable, eventName) {
    var tip = cc.find("Canvas/tip");
    tip.active = true;
    tip.getChildByName("title").getComponent(cc.Label).string = title;
    tip.getChildByName("content").getComponent(cc.Label).string = content;
    tip.getChildByName("btnlable").getComponent(cc.Label).string = btnlable;
    tip.getChildByName("btn").on(cc.Node.EventType.TOUCH_START, function (e) {
      if (eventName) {
        cc.game.emit(eventName);
      }
      tip.active = false;
    });
  },


  initScore: function () {

  },

  setStorage: function (key, value) {
    cc.sys.localStorage.setItem(key, value)
  },
  getStorage: function (key, def) {
    if (cc.sys.localStorage.getItem(key) == null || cc.sys.localStorage.getItem(key) == "") {
      cc.sys.localStorage.setItem(key, def)
    }
    return cc.sys.localStorage.getItem(key)
  },
  isFirst: function (key) {
    if (cc.sys.localStorage.getItem(key) == null || cc.sys.localStorage.getItem(key) == "") {
      return true
    } else {
      return false
    }
  },
  isNewUser: function () {
    if (cc.sys.localStorage.getItem("newUser") == null || cc.sys.localStorage.getItem("newUser") == "") {
      return true
    } else {
      return false
    }
  },


  createImage(sp, url) {
    if (url == undefined) return;
    if (window[cc.zy.platform] != undefined) {
      try {
        let image = window[cc.zy.platform].createImage();
        image.onload = () => {
          try {
            let texture = new cc.Texture2D();
            texture.initWithElement(image);
            texture.handleLoadedTexture();
            sp.spriteFrame = new cc.SpriteFrame(texture);
          } catch (e) {
            cc.log(e);
            sp.node.active = false;
          }
        };
        image.src = url;
      } catch (e) {
        cc.log(e);
        sp.node.active = false;
      }
    } else {
      cc.loader.load({
        url: url, type: 'jpg'
      }, (err, texture) => {
        sp.spriteFrame = new cc.SpriteFrame(texture);
      });
    }
  },
  getYesTodayStr: function () {//昨天
    var myDate = new Date();//获取系统当前时间
    myDate.setTime(myDate.getTime()-24*60*60*1000);
    var yestodayStr = myDate.getFullYear() + '' + myDate.getMonth() + '' + myDate.getDate();
    return yestodayStr;
  },

  getTodayStr: function () {//今天
    var myDate = new Date();//获取系统当前时间
    var todayStr = myDate.getFullYear() + '' + myDate.getMonth() + '' + myDate.getDate();
    return todayStr;
  },
  getNeedTimeStr: function (needTime) {
    this.h = parseInt(needTime / 3600)
    this.m = parseInt((needTime - this.h * 3600) / 60)
    this.s = parseInt(needTime % 60)
    return this.twoNum(this.h) + ":" + this.twoNum(this.m) + ":" + this.twoNum(this.s);
  },

  getHongbao: function () {//完成任务次数
    // var key = "hongbaoyue"
    // var value = cc.sys.localStorage.getItem(key);
    // return value == null || value == "" ? 0 : value;
  },
  setHongbao: function (money) {
    // var key = "hongbaoyue"
    // cc.sys.localStorage.setItem(key, money)
    // cc.zy.money = cc.zy.utils.getHongbao()

    // if (cc.zy.moneyRecord == undefined) cc.zy.moneyRecord = []
    // cc.zy.moneyRecord.push({ t: new Date().Format("MMdd"), m: money });
    // if (cc.zy.moneyRecord.length > 20) cc.zy.moneyRecord.shift();
    // cc.zy.zySdk.setUserSetting();
  },


  twoNum: function (num) {
    if (num < 10) {
      return "0" + num;
    } else {
      return num;
    }
  },

  getId(len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    radix = radix || chars.length;

    if (len) {
      // Compact form
      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
    } else {
      // rfc4122, version 4 form
      var r;
      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';
      // Fill in random data.  At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random() * 16;
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
      }
    }
    return uuid.join('');
  },

  getDataPop: function () {
    let str = cc.sys.localStorage.getItem('dataPop');
    let obj;
    try {//将字符串转换成对象
      obj = JSON.parse(str);
      return obj;
    } catch (e) {
      return null;
    }

  },
  setDataPop: function (obj) {
    let str = JSON.stringify(obj);
    cc.sys.localStorage.setItem('dataPop', str);
  },


  getBestDataPop: function () {
    let str = cc.sys.localStorage.getItem('BestdataPop');
    let obj;
    try {//将字符串转换成对象
      obj = JSON.parse(str);
      return obj;
    } catch (e) {
      return null;
    }
  },
  setBestDataPop: function (obj) {
    let str = JSON.stringify(obj);
    cc.sys.localStorage.setItem('BestdataPop', str);
  },
  getIsRestartPop: function () {//是否重玩
    var key = "isrestartPop" + this.getTodayStr()
    var value = cc.sys.localStorage.getItem(key);
    return value == null || value == "" ? false : value;
  },
  setIsRestartPop: function (isrestart) {
    var key = "isrestartPop" + this.getTodayStr()
    cc.sys.localStorage.setItem(key, isrestart)
  },

  getDayBestScorePop: function () {
    var key = "bestScorePop" + this.getTodayStr()
    var value = cc.sys.localStorage.getItem(key);
    return value == null || value == "" ? 0 : value;
  },
  setDayBestScorePop: function (bestScore) {
    var key = "bestScorePop" + this.getTodayStr()
    cc.sys.localStorage.setItem(key, bestScore)
  },
  getBestScorePop: function () {
    if (cc.sys.localStorage.getItem("bestScorePop") == null || cc.sys.localStorage.getItem("bestScorePop") == "") {//浏览器默认是null  微信是""
      this.setBestScorePop(0)
    }
    return cc.sys.localStorage.getItem("bestScorePop")
  },
  setBestScorePop: function (bestScorePop) {
    cc.sys.localStorage.setItem("bestScorePop", bestScorePop)
    // if (window.wx != undefined) {
    //   window.wx.postMessage({
    //     messageType: 3,
    //     MAIN_MENU_NUM: "bestScorePop",
    //     score: bestScorePop,
    //   });
    // }
  },
  getBestScorePopWeek: function () {
    var week = this.getWeekOfYear()
    var key = "bestScorePop" + week
    if (cc.sys.localStorage.getItem(key) == null || cc.sys.localStorage.getItem(key) == "") {//浏览器默认是null  微信是""
      this.setBestScorePopWeek(0)
    }
    return cc.sys.localStorage.getItem(key)
  },
  setBestScorePopWeek: function (bestScorePopWeek) {
    var week = this.getWeekOfYear()
    var key = "bestScorePop" + week
    cc.sys.localStorage.setItem(key, bestScorePopWeek)

    if (window.wx != undefined) {
      window.wx.postMessage({
        messageType: 3,
        MAIN_MENU_NUM: key,
        score: bestScorePopWeek,
      });
    }
  },
});

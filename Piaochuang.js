

cc.Class({
  extends: cc.Component,

  properties: {
    piao: cc.Node,
    piaoSprite: cc.Sprite,
  },

  start() {
    var self = this
    var dis = 20
    var t = 0.2
    var m1 = cc.moveBy(t, 0, dis);
    var m2 = cc.moveBy(t, 0, -dis);
    var m = cc.moveBy(2, 0, 0);
    var sequence = cc.sequence(m1, m2, m1, m2, m1, m2, m)
    var repeat = cc.repeatForever(sequence)
    this.node.runAction(repeat);

    self.piao.on(cc.Node.EventType.TOUCH_START, function (event) {
      var parma = ""
      var parmastr = ""
      if (self.param != "") {
        parma = JSON.parse(self.param) //解析自定义参数 
        for (var key in parma) {
          parmastr += key + "=" + parma[key] + "&"
        }
      }
      if (parmastr.charAt(parmastr.length - 1) == "&") {//最后的"&"去掉
        parmastr = parmastr.substr(0, parmastr.length - 1)
      }
      wx.navigateToMiniProgram({
        appId: self.appId,
        path: self.url + parmastr,
        extraData: parma,
        envVersion: 'release',
        // envVersion: 'trial',
        success(res) {
          cc.zy.zySdk.clickToOtherGame(self.appId, self.likeGameName);
          cc.zy.wxApi.aldSendEvent('跳转' + self.likeGameName);
          cc.sys.localStorage.setItem(self.appId + cc.zy.utils.getTodayStr(), 1);
          cc.zy.zySdk.dadian(4)//游戏跳转
        },
        fail(res) {
          console.log("打开失败")
        },
      })

    });

    var ret = cc.zy.likeGameList
    if (ret != undefined) {
      var piaoList = []
      for (let index = 0; index < ret.length; index++) {
        var lickgame = ret[index]
        var isShow=true
        if(lickgame.ios!="1"){
           if(cc.zy.isIos){
            isShow=false//不支持ios
           }
        }
        if (lickgame.piao == "1"&&isShow) {
          piaoList.push(lickgame)
        }
      }
      this._piaoList = piaoList
      this.run()
    }

  },

  setPiaochuang: function () {
    var self = this
    var piaoList = this._piaoList
    if (piaoList.length > 0) {
      //  var random=cc.zy.utils.getRandom(piaoList.length)
      var random = this.time % piaoList.length
      var lickgame = piaoList[random]
      cc.zy.utils.createImage(self.piaoSprite, lickgame.piaoUrl)
      this.appId = lickgame.to_gameid
      this.param = lickgame.param
      this.url = lickgame.url
      this.likeGameName = lickgame.likeGameName
    }
  },

  run: function () {
    this.time = 0;
    var piaoTime = 10
    this.setPiaochuang()
    if (cc.zy.globle.piaoTime) piaoTime = cc.zy.globle.piaoTime
    this.schedule(this.tick, piaoTime);
  },
  tick: function () {
    this.time++;
    this.setPiaochuang()
  },
  stop: function () {
    this.unschedule(this.tick);
  },

});

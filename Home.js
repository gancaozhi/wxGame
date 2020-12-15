
cc.Class({
  extends: cc.Component,

  properties: {
    zhuanshilabel: cc.Label,
    audiooff: cc.Node,
  },

  onLoad() {
    var zhuanshi = parseInt(cc.zy.utils.getZhuanshiStorage())
    this.zhuanshilabel.string = zhuanshi

    cc.zy.zySdk.sendEv(0, "进入首页", "", "")//在线时长
    cc.zy.wxApi.aldSendEvent2("进入首页", { "channel": cc.sys.localStorage.getItem("channel") })

    let yue = cc.find("Canvas/pan_huafei/yue")
    let yueLable = yue.getComponent(cc.Label)
    var old = parseFloat(cc.zy.utils.getHongbao())
    yueLable.string = old.toFixed(2) + "元"
    if (!cc.zy.globle.isShow) {
      let pan_huafei = cc.find("Canvas/pan_huafei")
      pan_huafei.active = false
      let zhuanshi = cc.find("Canvas/zhuanshi")
      zhuanshi.active = false
      let kefu = cc.find("Canvas/kefu")
      kefu.active = false


      let rank = cc.find("Canvas/rank")
      rank.active = false
    }

    if (!cc.zy.showHongbao && cc.zy.utils.getHongbao() <= 0){
      let pan_huafei = cc.find("Canvas/pan_huafei")
      pan_huafei.active = false
    }


    if (cc.zy.audio) {
      this.audiooff.active = false;
    } else {
      this.audiooff.active = true;
    }

    // cc.zy.zySdk.getWorlRank()
    // cc.zy.zySdk.getGkWorlRank()
    cc.zy.zySdk.worldRankingsAdd("xxxxbestScore", cc.zy.utils.getBestScorePop())
    cc.zy.zySdk.worldRankingsAdd("xxxxbestScoreGK", cc.zy.storageMgr.getKey("bestStage", 1))

    this.loginhuafei()
    this.sortLikegam()
  },
  loginhuafei: function () {//重新排序
    if (!cc.zy.showHongbao && cc.zy.utils.getHongbao() <= 0) return
    var key1 = "loginHbao" + cc.zy.utils.getTodayStr()
    if (cc.zy.storageMgr.isFist(key1)) {
      cc.zy.wxApi.aldSendEvent2("弹出登陆话费", { "channel": cc.sys.localStorage.getItem("channel") })
      cc.zy.zySdk.sendEv(0, "弹出登陆话费", "", "")//在线时长
      let page =cc.find("Canvas/loginhuafei")
      page.active = true
      cc.zy.storageMgr.setKey(key1, 1)
    }
  },
  sortLikegam: function () {//重新排序
    if (cc.zy.globle.likeran == "1") {//重新排序
      var ret = cc.zy.likeGameList
      if (ret == undefined) {
        return;
      }
      for (let index = 0; index < ret.length; index++) {//每点击过
        var lickgame = ret[index]
        var sort = lickgame.sort
        sort = sort * 10 + cc.zy.utils.random(1, 9)
        lickgame.sort = parseInt(sort)
      }

      function sortId(a, b) {
        return a.sort - b.sort
      }
      ret.sort(sortId);
      // console.log(ret)
      // //  ##上面排完序后返回排序完成的属性数组
      // //  ##a-b是升序   b-a是降序
      // //  ##sorted_keys_array:['朝阳','昌平','海淀']
      // console.log(cc.zy.likeGameList)
    }
  },
  share: function () {
    cc.zy.wxApi.share()
  },
  audio: function () {
    if (cc.zy.audio) {
      cc.zy.audio = false;
      cc.zy.music = false;
      this.audiooff.active = true;
      cc.zy.audioMgr.pauseBg()
    } else {
      cc.zy.audio = true;
      cc.zy.music = true;
      this.audiooff.active = false;
      cc.zy.audioMgr.playBg()
    }
  },





  openKefu: function () {//进入客服会话
    if (cc.zy.globle.gzh == 1) {
      var self = this
      wx.showModal({
        title: '提示',
        content: "进入客服回复“1”，即可兑换话费哦！",
        confirmText: '去兑换',
        // cancelText: '取消',
        confirmColor: '#3cc51f',
        // cancelColor: '#3cc51f',
        // showCancel: true,
        success(res) {
          if (res.confirm) {
            cc.zy.wxApi.openKefu();
          } else if (res.cancel) {
            cc.zy.wxApi.openKefu();
          }
        }
      })
    } else {
      wx.aldSendEvent("二维码进入公众号", { "channel": cc.sys.localStorage.getItem("channel") })
      wx.previewImage({
        current: cc.zy.globle.gzh, // 当前显示图片的http链接
        urls: [cc.zy.globle.gzh],// 需要预览的图片http链接列表
      })
    }
  },



  enterWoldRank: function () {
    cc.director.loadScene("WoldRank");
  },

  enterPopScene: function () {
    cc.director.loadScene("Game");
  },

  openshopPage: function () {
    var page = this.node.getChildByName("shopPage");
    page.active = true
  },
  openbestPage: function () {
    var page = this.node.getChildByName("bestPage");
    page.active = true
  },
  openchoujiangPage: function () {
    var page = this.node.getChildByName("choujiangPage");
    page.active = true
  },
  openPage: function (a,path) {
    var page = cc.find(path);
    page.active = true
  },

  update(dt) {
    // if (this.hongbaoN.active || this.hongbaoPage.active || this.gethongbao.active || this.yuehongbao.active) {
    //     cc.zy.ad.show()
    // } else {
    //     cc.zy.ad.hide()
    // }
  },
});


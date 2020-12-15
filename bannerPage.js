
cc.Class({
    extends: cc.Component,
  
    properties: {
    },
  
    onEnable() {
      cc.zy.zySdk.sendEv(0,"弹窗广告条","","")//跳转
      cc.zy.backgroundTime = 0;
      this.run()
    },
  
    onLoad() {
   
    },
  
    run2: function () {
      this.schedule(this.refreshBannerAd, 0.5);
    },
    refreshBannerAd: function () {
      if( cc.zy.globle.countTime>0){
        cc.zy.ad.refreshBannerAd()
        cc.zy.globle.countTime--
      }else{
        this.unschedule(this.refreshBannerAd);
      }
    },
    run: function () {
      this.schedule(this.tick, 0.1);
    },
    tick: function () {
      if (cc.zy.backgroundTime >= 6 && cc.zy.backgroundTime < 600) {
        cc.zy.backgroundTime = 0;
        this.doTask()
      } else {
        if (cc.zy.backgroundTime > 0 && cc.zy.backgroundTime < 6) {
          cc.zy.wxApi.tip("还没体验六秒哦！")
          cc.zy.backgroundTime = 0;
        }
      }
    },
  
  
    doTask: function () {
        var self = this
        cc.zy.zySdk.sendEv(0,"点击广告条","","")//跳转
        let page = cc.find("Canvas/openhuafei")
        page.active = true
        self.node.active = false;
    },
    close() {
      var self = this
      this.unschedule(this.tick);
      this.unschedule(this.refreshBannerAd);
      self.node.active = false;
    },
  });
  
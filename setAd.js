
cc.Class({
     extends: cc.Component,

     properties: {
          //    y:1000,
          adpos: cc.Node,
          exitpos: cc.Node,
     },


     onEnable() {
          if (cc.zy.isShow) {
               cc.zy.ad.setTop(-this.adpos.y)
          }
     },
     onDisable() {
          //  cc.zy.ad.destroyBannerAd()
          // if(  cc.zy.ad.time%3==2){
          //      cc.zy.ad.refreshBannerAd()
          // }
          //  cc.zy.ad.time++
          if (this.exitpos) {
               cc.zy.ad.setTop(-this.exitpos.y)
          } else {
               cc.zy.ad.setTop(-2000)
          }
     },

});


cc.Class({
     extends: cc.Component,

     properties: {
     },


     onEnable() {
          if( cc.zy.isShow){
               this.bottom=true
               this.schedule(this.freshAd,5);
               this.freshAd()
               this.scheduleOnce(() => {
                    this.bottom=false
                    cc.zy.ad.setBottom();
                }, 3);
          }
          
     },
     onDisable() {
          this.unschedule(this.tick);
          cc.zy.ad.setTop(-2000)
     },
     freshAd: function() {
          if(this.bottom){
               this.bottom=false
               cc.zy.ad.setBottom();
          }else{
               this.bottom=true
               cc.zy.ad.setTop(-5000)
          }
      },
     
});

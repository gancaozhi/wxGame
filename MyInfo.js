
cc.Class({
    extends: cc.Component,

    properties: {
        wxsprite:cc.Sprite,
    },

  

    start () {
        cc.zy.utils.createImage(this.wxsprite, cc.sys.localStorage.getItem("avatarUrl"))
    },

   
});

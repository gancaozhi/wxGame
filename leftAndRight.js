

cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    onLoad: function() {
        var moveBy1 = cc.moveBy(0.15, -50, 0);
        var moveBy2 = cc.moveBy(0.15, 50, 0);
        var sequence = cc.sequence(moveBy1, moveBy2,moveBy1, moveBy2,moveBy1, moveBy2,moveBy1, moveBy2,moveBy1, moveBy2,cc.delayTime(1))
        var repeat = cc.repeatForever(sequence)
        this.node.runAction(repeat);
        if(this.isGetAddToMyMiniSuccess())this.node.destroy()
    },

    isGetAddToMyMiniSuccess: function () {
        if (cc.sys.localStorage.getItem("addToMyMiniSuccess") == null || cc.sys.localStorage.getItem("addToMyMiniSuccess") == "") {//浏览器默认是null  微信是""
            return false
        } else {
            return true
        }
    },


    start () {
        
    },

   
});

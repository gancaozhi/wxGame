

cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    onLoad: function() {
        this.node.opacity=50
        this.node.scale=0.1
        var spawn = cc.spawn(cc.scaleTo(0.5, 1, 1), cc.fadeIn(0.5))
        this.node.runAction(spawn);
    },


    start () {

    },

   
});

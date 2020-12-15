

cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    onLoad: function() {
        // var scaleTo1 = cc.scaleTo(1, 1.1, 0.9);
        // var scaleTo2 = cc.scaleTo(1, 1, 1);
        // var sequence  =cc.sequence(scaleTo1,scaleTo2)
        var repeat= cc.repeatForever(cc.rotateBy(4,360,360))
        this.node.runAction(repeat);
    },


    start () {

    },

   
});

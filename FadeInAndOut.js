

cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    onLoad: function() {
        var scaleTo1 = cc.fadeOut(1);
        var scaleTo2 = cc.fadeIn(1);
        var sequence  =cc.sequence(scaleTo1,scaleTo2)
        var repeat= cc.repeatForever(sequence)
        this.node.runAction(repeat);
    },

    start () {

    },
});

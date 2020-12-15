

cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    onLoad: function() {
        var scaleTo1 = cc.scaleTo(0.5, 1.5, 1.5);
        var scaleTo2 = cc.scaleTo(0.5, 1, 1);
        var sequence  =cc.sequence(scaleTo1,scaleTo2)
        var repeat= cc.repeatForever(sequence)
        this.node.runAction(repeat);
    },


    start () {

    },

   
});



cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    onLoad: function() {
        var rotateTo1 = cc.rotateTo(1, -30,-30);
        var rotateTo2 = cc.rotateTo(1, 0, 0);
        var sequence  =cc.sequence(rotateTo1,rotateTo2)
        var repeat= cc.repeatForever(sequence)
        this.node.runAction(repeat);
    },


    start () {

    },

   
});



cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    onLoad: function() {
        var time=0.5+Math.random()
        var fadeOut = cc.fadeOut(time);
        var fadeIn = cc.fadeIn(time);
        var sequence  =cc.sequence(fadeOut,fadeIn,cc.delayTime(0.2))
        var repeat= cc.repeatForever(sequence)
        this.node.runAction(repeat);
    },


    start () {

    },

   
});

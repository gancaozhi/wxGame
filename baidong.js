

cc.Class({
    extends: cc.Component,

    properties: {
        mydelay:1,
       mytime:2,
       myrotate:10,
       myrotate2:-10,
    },

    onLoad: function() {
     

        var rotateTo1 = cc.rotateTo(this.mytime, this.myrotate, this.myrotate);
        var rotateTo2 = cc.rotateTo(this.mytime,0, 0);
        var rotateTo3 = cc.rotateTo(this.mytime, this.myrotate2, this.myrotate2);
        var rotateTo4 = cc.rotateTo(this.mytime,0, 0);
        var sequence = cc.sequence(rotateTo1, rotateTo2,rotateTo3, rotateTo4,cc.delayTime(this.mydelay))
        var repeat = cc.repeatForever(sequence)
        this.node.runAction(repeat);
    },


    start () {

    },

   
});

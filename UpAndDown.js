

cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    onLoad: function() {
        var dis=20
      var t=0.2
      var m1 = cc.moveBy(t, 0, dis);
      var m2 = cc.moveBy(t, 0, -dis);
      var m = cc.moveBy(2, 0, 0);
      var sequence  =cc.sequence(m1,m2,m1,m2,m1,m2,m)
      var repeat= cc.repeatForever(sequence)
      this.node.runAction(repeat);
    },


    start () {
        
    },

   
});



cc.Class({
    extends: cc.Component,
    properties: {
        timerLabel:cc.Label,
    },
    run: function() {
        this.time = 15;
        this.timerLabel.string = this.time.toFixed(0) + "";
        this.schedule(this.tick,1);
    },
    tick: function() {
        this.time -= 1;
        this.timerLabel.string = this.time.toFixed(0) + "";
        if(this.time<=0){
            cc.director.loadScene("Home")
        }
    },
    stop: function() {
        this.unschedule(this.tick);
    },
   
});

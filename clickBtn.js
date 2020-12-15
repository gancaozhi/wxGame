
cc.Class({
    extends: cc.Component,

    properties: {
        emitEventName:"" 
    },
    start() {
        var self=this
        if(self.emitEventName=="")self.emitEventName=self.node.name;
        this.node.on(cc.Node.EventType.TOUCH_START, function (e) {
            console.log("触发事件："+self.emitEventName)
            cc.game.emit(self.emitEventName);
        });
    },
    hideParent() {
        this.node.parent.active = false
    },

});

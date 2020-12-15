
cc.Class({
    extends: cc.Component,

    properties: {

    },
    start() {
        var self = this
        this.node.on(cc.Node.EventType.TOUCH_END, function (e) {
            self.hideParent()
        });
    },
    hideParent() {
        if (this.node.y < 500) {
            this.scheduleOnce(() => {
                this.node.parent.active = false
            }, 2);
        } else {
            this.node.parent.active = false
        }
    },

});

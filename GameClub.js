
cc.Class({
    extends: cc.Component,

    properties: {

    },

    onEnable() {
        if (window.wx != undefined) {
            this.createGameClubButtons()
        }
    },

    createGameClubButtons() {
        var self = this
        var width = 25
        let x = this.node.x
        let y = this.node.y
        wx.getSystemInfo({
            success: function (res) {
                self.windowWidth = res.windowWidth
                self.windowHeight = res.windowHeight
            }
        })
        this.realHeight = 720 * self.windowHeight / self.windowWidth
        let left = this.windowWidth * (x + 360) / 720
        let top = this.windowHeight * (-y + this.realHeight / 2) / this.realHeight
        this.GameClubButton = wx.createGameClubButton({
            icon: 'white',
            style: {
                left: left - width / 2,
                top: top - width / 2,
                width: width,
                height: width
            }
        })
    },

    onDisable() {
        if (window.wx != undefined) {
            this.GameClubButton.destroy()
        }
    },
});

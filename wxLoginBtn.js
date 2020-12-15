
cc.Class({
    extends: cc.Component,

    properties: {
        // avatarUrl: cc.Sprite,
        // // avatarUrl2: cc.Sprite,
        // nickName: cc.Label,
    },

    start() {
        var self = this
        if (window.wx != undefined) {
            if( cc.zy.nickName){
                    // self.nickName.string = cc.zy.nickName
                    // cc.zy.utils.createImage(self.avatarUrl, cc.sys.localStorage.getItem("avatarUrl"))
            }else{
                this.createUserInfoButton()
            }
        }
    },

    createUserInfoButton() {
        var self = this
        var width = 50
        let x = this.node.x
        let y = this.node.y
        wx.getSystemInfo({
            success: function (res) {
                self.windowWidth = res.windowWidth
                self.windowHeight = res.windowHeight
            }
        })
        this.realHeight = 1080 * self.windowHeight / self.windowWidth
        let left = this.windowWidth * (x + 540) / 1080
        let top = this.windowHeight * (-y + this.realHeight / 2) / this.realHeight
        this.buttonUserInfo = wx.createUserInfoButton({
             type: 'image',
            image: "touming.png",
            style: {
                left: left - width / 2,
                top: top - width / 2,
                width: width,
                height: width
            }
        })

        this.buttonUserInfo.onTap((res) => {
            console.log("createUserInfoButtononTap", res);
            if (self.buttonUserInfo)self.buttonUserInfo.destroy()
            var userInfo = res.userInfo
            var nickName = userInfo.nickName
            var avatarUrl = userInfo.avatarUrl
            cc.zy.nickName = nickName;
            cc.zy.avatarUrl = avatarUrl;
            cc.sys.localStorage.setItem("nickName", nickName)//保存到本地
            cc.sys.localStorage.setItem("avatarUrl", avatarUrl)
            cc.zy.api.updateUserInfo(userInfo, null);
            cc.game.emit("refreshUserInfo");
            // self.nickName.string = cc.zy.nickName
            // cc.zy.utils.createImage(self.avatarUrl, cc.sys.localStorage.getItem("avatarUrl"))
        })
    },

    
});

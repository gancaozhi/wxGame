// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        avatarUrl: cc.Sprite,
        avatarUrl2: cc.Sprite,
        nickName: cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    getUserInfo() {
        var self = this
        cc.zy.wxApi.getUserInfo(function () {
            self.nickName.string = cc.sys.localStorage.getItem("nickName")
            cc.zy.utils.createImage(self.avatarUrl, cc.sys.localStorage.getItem("avatarUrl"))
            cc.zy.utils.createImage(self.avatarUrl2, cc.sys.localStorage.getItem("avatarUrl"))
        })
    },

    start() {
        cc.zy.nickName = cc.sys.localStorage.getItem("nickName")
        cc.zy.avatarUrl = cc.sys.localStorage.getItem("avatarUrl")
        if (cc.zy.nickName) {
            this.nickName.string = cc.zy.nickName
            cc.zy.utils.createImage(this.avatarUrl, cc.sys.localStorage.getItem("avatarUrl"))
            cc.zy.utils.createImage(self.avatarUrl2, cc.sys.localStorage.getItem("avatarUrl"))
        }
    },

    onEnable() {
        var self = this;
        if (cc.zy.platform == "wx" || cc.zy.platform == "qq" ) {
            var width = 1000;
            var height = 1000;
            var windowWidth = 300;
            var windowHeight = 500;
            window[cc.zy.platform].getSystemInfo({
                success: function (res) {
                    windowWidth = res.windowWidth
                    windowHeight = res.windowHeight
                }
            })
            this.buttonUserInfo = window[cc.zy.platform].createUserInfoButton({
                type: 'image',
                image: "touming.png",
                style: {
                    left: windowWidth / 2 - width / 2,
                    top: windowHeight / 2 - height / 2 + 15 / 2,
                    width: width,
                    height: height,
                }
            })
            this.buttonUserInfo.onTap((res) => {
                console.log("createUserInfoButtononTap", res);
                self.buttonUserInfo.destroy()
                var userInfo = res.userInfo
                var nickName = userInfo.nickName
                var avatarUrl = userInfo.avatarUrl
                cc.zy.nickName = nickName;
                cc.zy.avatarUrl = avatarUrl;
                cc.sys.localStorage.setItem("nickName", nickName)//保存到本地
                cc.sys.localStorage.setItem("avatarUrl", avatarUrl)
                cc.zy.api.updateUserInfo(userInfo, null);
                self.node.active = false
            })
        }
    },
    onDisable() {
        if (this.buttonUserInfo) this.buttonUserInfo.destroy()
    },
    // update (dt) {},
});


cc.Class({
    extends: cc.Component,

    properties: {
        jiantou: cc.Node,
        bg: cc.Node,
        content: cc.Node,
        gamePre: cc.Prefab,
    },



    start() {
        if (window.wx != undefined) {
            var ret = cc.zy.likeGameList
            if (ret == undefined) {
                this.getLikeGameList()
            } else {
                this.getLikeGame()
            }
        }
    },

    getLikeGame: function () {
        var self = this
        var ret = cc.zy.likeGameList

        if (ret == undefined) {
            return;
        }
        self.content.removeAllChildren()
        // self.content.height = 150 * (ret.length + 1.5)
        var count = 0
        for (let index = 0; index < ret.length; index++) {//每点击过
            var lickgame = ret[index]
            var isShow = true
            if (lickgame.ios != "1") {
                if (cc.zy.isIos) {
                    isShow = false//不支持ios
                }
            }
            var isClick = cc.sys.localStorage.getItem(lickgame.to_gameid + cc.zy.utils.getTodayStr());
            if (lickgame.sort != "0" && isShow && (isClick == null || isClick == "")) {
                var game = cc.instantiate(self.gamePre)
                var name = game.getChildByName("name").getComponent(cc.Label)
                name.string = lickgame.likeGameName
                game.appId = lickgame.to_gameid
                game.url = lickgame.url
                game.likeGameName = lickgame.likeGameName
                var icon = game.getChildByName("icon").getChildByName("icon").getComponent(cc.Sprite)
                cc.zy.utils.createImage(icon, lickgame.iconUrl)
                var i = count % 4
                var j = parseInt(count / 4)
                game.setPosition(i * 130 + 100, -j * 200 - 150);
                game.parent = self.content
                count++;
                game.piaoUrl = lickgame.piaoUrl
                game.sort = lickgame.sort
                game.on(cc.Node.EventType.TOUCH_END, function (event) {
                    if (event.target.sort >= 50) {//二维码
                        wx.previewImage({
                            current: event.target.piaoUrl, // 当前显示图片的http链接
                            urls: [event.target.piaoUrl],// 需要预览的图片http链接列表
                        })
                    } else {
                        wx.navigateToMiniProgram({
                            appId: event.target.appId,
                            path: event.target.url,
                            extraData: "",
                            envVersion: 'release',
                            success(res) {
                                self.getLikeGame()//刷新
                                cc.sys.localStorage.setItem(event.target.appId, 1);
                            },
                        })
                    }

                });

            }
        }
        var countHasclick = 0
        for (let index = 0; index < ret.length; index++) {//每点击过
            var lickgame = ret[index]
            var isShow = true
            if (lickgame.ios != "1") {
                if (cc.zy.isIos) {
                    isShow = false//不支持ios
                }
            }
            var isClick = cc.sys.localStorage.getItem(lickgame.to_gameid + cc.zy.utils.getTodayStr());
            if (lickgame.sort != "0" && isShow && (isClick != null && isClick != "")) {
                var game = cc.instantiate(self.gamePre)
                var name = game.getChildByName("name").getComponent(cc.Label)
                name.string = lickgame.likeGameName
                var icon = game.getChildByName("icon").getChildByName("icon").getComponent(cc.Sprite)
                cc.zy.utils.createImage(icon, lickgame.iconUrl)
                // game.y = (-countHasclick - count) * 150 - 80
                var total = countHasclick + count
                var i = total % 4
                var j = parseInt(total / 4)
                game.setPosition(i * 130 + 100, -j * 200 - 150);
                game.parent = self.content
                countHasclick++;
                // var hasget = game.getChildByName("hasget")
                // hasget.active = true
                game.appId = lickgame.to_gameid
                game.url = lickgame.url
                game.piaoUrl = lickgame.piaoUrl
                game.sort = lickgame.sort
                game.on(cc.Node.EventType.TOUCH_END, function (event) {
                    // cc.zy.wxApi.showToast2("该任务已经完成！")
                    if (event.target.sort >= 50) {//二维码
                        wx.previewImage({
                            current: event.target.piaoUrl, // 当前显示图片的http链接
                            urls: [event.target.piaoUrl],// 需要预览的图片http链接列表
                        })
                    } else {
                        wx.navigateToMiniProgram({
                            appId: event.target.appId,
                            path: event.target.url,
                            extraData: "",
                            envVersion: 'release',
                        });
                    }
                });
            }
        }

    },

    
    getLikeGameList: function () {//游戏配置
        var self = this
        cc.zy.http.url = "https://game.xcxvs.com/api/likegame";
        var onBackFun = function (ret) {
            cc.zy.likeGameList = ret
            self.getLikeGame()
        };
        cc.zy.http.sendRequest("",
            {
                gameid: cc.zy.appid
            }, onBackFun);
    },

    clickJiantou() {
        var t = 0.4
        if (this.node.x < -300) {//打开
            this.bg.scale = 1.1
            this.node.runAction(cc.moveTo(t, -20, 0));
            this.jiantou.runAction(cc.rotateTo(t / 2, -180, -180));
        } else {//关闭
            this.bg.scale = 0
            this.node.runAction(cc.moveTo(t, -595, -22));
            this.jiantou.runAction(cc.rotateTo(t / 2, 0, 0));
        }
    },
});

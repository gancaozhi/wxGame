

cc.Class({
    extends: cc.Component,

    properties: {
        content: cc.Node,
        gamePre: cc.Prefab,
    },

    start() {
        // if (!cc.zy.globle.showLikeGame) {
        //   this.node.active = false;
        //   return;
        // }

        var ret = cc.zy.likeGameList
        if (ret == undefined) {
            this.getLikeGameList()
        } else {
            this.getLikeGame()
        }
        //  if (!cc.zy.globle.isShow1&& cc.zy.globle.city.indexOf(cc.zy.mycity)!=-1) {
        //     let morepannel = cc.find("Canvas/morepannel")
        //     morepannel.active = false
        // } 
        // if (cc.zy.hasBanner||!cc.zy.globle.isShow1&& cc.zy.globle.city.indexOf(cc.zy.mycity)!=-1) {
        //     let morepannel = cc.find("Canvas/morepannel")
        //     morepannel.active = false
        //     morepannel.y=-1000
        // } else {
        //     let morepannel = cc.find("Canvas/morepannel")
        //     morepannel.active = true
        //     morepannel.y=-512
        // }
    },

    openKefu: function () {//进入客服会话
        cc.zy.wxApi.openKefu()
    },
    // getLikeGame: function () {
    //   var self = this
    //   var ret = cc.zy.likeGameList
    //   if (ret == undefined) {
    //     return;
    //   }
    //   self.content.width = 150 * (ret.length + 0.5)
    //   var count = 0
    //   for (let index = 0; index < ret.length; index++) {
    //     var lickgame = ret[index]
    //     var isShow = true
    //     if (lickgame.ios != "1") {
    //       if (cc.zy.isIos) {
    //         isShow = false//不支持ios
    //       }
    //     }
    //     if (lickgame.sort != "0" && isShow) {

    //       var game = cc.instantiate(self.gamePrefab)
    //       var name = game.getChildByName("name").getComponent(cc.Label)
    //       name.string = lickgame.likeGameName
    //       game.appId = lickgame.to_gameid
    //       game.param = lickgame.param
    //       game.url = lickgame.url
    //       game.likeGameName = lickgame.likeGameName
    //       var icon = game.getChildByName("iconNode").getChildByName("icon").getComponent(cc.Sprite)
    //       cc.zy.utils.createImage(icon, lickgame.iconUrl)
    //       game.x = count * 150 + 70
    //       game.parent = self.content
    //       count++;
    //       game.on(cc.Node.EventType.TOUCH_END, function (event) {
    //         var parma = ""
    //         var parmastr = ""
    //         if (event.target.param != "") {
    //           parma = JSON.parse(event.target.param) //解析自定义参数 
    //           for (var key in parma) {
    //             parmastr += key + "=" + parma[key] + "&"
    //           }
    //         }

    //         if (parmastr.charAt(parmastr.length - 1) == "&") {//最后的"&"去掉
    //           parmastr = parmastr.substr(0, parmastr.length - 1)
    //         }
    //         wx.navigateToMiniProgram({
    //           appId: event.target.appId,
    //           path: event.target.url + parmastr,
    //           extraData: parma,
    //           envVersion: 'release',
    //           //  envVersion: 'trial',
    //           success(res) {
    //             cc.zy.zySdk.clickToOtherGame(event.target.appId, event.target.likeGameName)
    //             cc.zy.wxApi.aldSendEvent('跳转' + event.target.likeGameName)
    //             cc.zy.zySdk.dadian(4)//游戏跳转
    //           },
    //         })

    //       });
    //     }
    //   }
    // },


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
                // console.log(lickgame.iconUrl)
                game.likeGameName = lickgame.likeGameName
                var icon = game.getChildByName("icon").getChildByName("icon").getComponent(cc.Sprite)
                cc.zy.utils.createImage(icon, lickgame.iconUrl)
                game.x = count * 150 + 70
                game.parent = self.content
                count++;
                game.piaoUrl = lickgame.piaoUrl
                game.sort = lickgame.sort
                game.jumptype = lickgame.jumptype
                game.on(cc.Node.EventType.TOUCH_END, function (event) {
                    if (event.target.jumptype!=1) {//二维码
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
                game.x = total * 150 + 70
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
                    if (event.target.jumptype!=1) {//二维码
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
});

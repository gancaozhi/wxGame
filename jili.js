

//规则  优先视频  广告主  分享到群（每天三次）
const platform = {
    pc: "pc",
    wx: "wx",
    tt: "tt",
    qq: "qq",
    swan: "swan",
    qg: "qg",
}


const adConfig = {
    "wx": {
        "videoId": "adunit-485ea3a6a7dc3ace",
        "bannerId": "adunit-f9521c8d7e47d63c",
        "chapingId": "adunit-35dcefd36c070749",
        "geziId": "adunit-d670f1d980f47a4a",
    },
    "tt": {
        "bannerId": "40kjknf0h0bl5gelcd",
        "videoId": "81mn7qj4ph5buh7pmc",
        "chapingId": "296n7nfnjlhda95dl8",
    },
    "qq": {
        "bannerId": "d12f99c3e26f1ce2f6e62e6cb199cebe",
        "videoId": "88e18f65e5471e201349f70d753a6ee8",
        "chapingId": "dd25d2e8c865000a619ebd244ae1b704",
        "heziId": "df81e5d40af51beee965040c5bac65fd",
        "jimuId": "23a75693fa1b209978af74b8b972d18b",
    },
    "swan": {
        "videoId": "",
        "bannerId": "",
        "chapingId": "",
    },
    "qg": {//oppo
        "videoId": "",
        "bannerId": "",
        "chapingId": "",
    },
}
cc.Class({
    extends: cc.Component,

    properties: {
        _onCloseCallBack: null,
    },

    init() {
        var self = this
        if (!window.wx && !window.tt && !window.swan && !window.qq && !window.qg) {
            cc.zy.platform = "pc";
            return
        }
        console.log("videoId" + adConfig[cc.zy.platform].videoId);
        this.createRewardedVideoAd();
        this.createInterstitialAd();
        this.createAppBox();
        // 插屏广告仅今日头条安卓客户端支持
        // if (cc.zy.platformApi.createInterstitialAd) {

        // }
        // 插屏广告仅今日头条安卓客户端支持
        // if (tt.createAppBox) {
        //     this.appbox =window[cc.zy.platform].createAppBox({ adUnitId: cc.zy.heziId })
        // }
        // console.log("cc.zy.platformApi" + cc.zy.platformApi);
    },
    createAppBox() {
        if ( window[cc.zy.platform].createAppBox) {
            this.appbox = window[cc.zy.platform].createAppBox({
                adUnitId: adConfig[cc.zy.platform].heziId
            });
        }

    },
    createInterstitialAd() {
        // if (cc.zy.platformApi.createInterstitialAd) {
        //     this.interstitialAd = cc.zy.platformApi.createInterstitialAd({
        //         adUnitId: adConfig[cc.zy.platform].chapingId
        //     });
        // }
        if ( window[cc.zy.platform].createInterstitialAd) {
            this.interstitialAd = window[cc.zy.platform].createInterstitialAd({
                adUnitId: adConfig[cc.zy.platform].chapingId
            });
        }
        // switch (cc.zy.platform) {
        //     case "tt":
        //         this.interstitialAd =window[cc.zy.platform].createInterstitialAd({
        //             adUnitId: adConfig[cc.zy.platform].chapingId
        //         });
        //         break;
        //     case "wx":
        //         this.interstitialAd = wx.createInterstitialAd({
        //             adUnitId: adConfig[cc.zy.platform].chapingId
        //         });
        //         break;
        //     case "qq":
        //         this.interstitialAd = qq.createInterstitialAd({
        //             adUnitId: adConfig[cc.zy.platform].chapingId
        //         });
        //         break;
        //     case "qg":
        //         this.interstitialAd = qg.createInterstitialAd({
        //             adUnitId: adConfig[cc.zy.platform].chapingId
        //         });
        //         break;
        //     case "swan":
        //         this.interstitialAd = swan.createInterstitialAd({
        //             adUnitId: adConfig[cc.zy.platform].chapingId
        //         });
        //         break;
        //     default:
        //         this.interstitialAd = null;
        //         break;
        // }
    },
    createRewardedVideoAd() {
        // if(cc.zy.platform=="tt"){

        // }
        if ( window[cc.zy.platform].createRewardedVideoAd) {
            this._videoAd = window[cc.zy.platform].createRewardedVideoAd({
                adUnitId: adConfig[cc.zy.platform].videoId
            });
            console.log("videoId" + adConfig[cc.zy.platform].videoId);
            // switch (cc.zy.platform) {
            //     case "tt":
            //         if (!tt.createRewardedVideoAd)return
            //         console.log(tt);
            //         this._videoAd =window[cc.zy.platform].createRewardedVideoAd({
            //             adUnitId: "adConfig[cc.zy.platform].videoId"
            //         });
            //         break;
            //     case "wx":
            //         this._videoAd = wx.createRewardedVideoAd({
            //             adUnitId: adConfig[cc.zy.platform].videoId
            //         });
            //         break;
            //     case "qq":
            //         this._videoAd = qq.createRewardedVideoAd({
            //             adUnitId: adConfig[cc.zy.platform].videoId
            //         });
            //         break;
            //     case "qg":
            //         this._videoAd = qg.createRewardedVideoAd({
            //             adUnitId: adConfig[cc.zy.platform].videoId
            //         });
            //         break;
            //     case "swan":
            //         this._videoAd = swan.createRewardedVideoAd({
            //             adUnitId: adConfig[cc.zy.platform].videoId
            //         });
            //         break;
            //     default:
            //         this._videoAd = null;
            //         break;
            // }

            this._videoAd.onClose(res => {
                cc.zy.api.sendEv(1, "打开视频", "", "")//打开视频
                if (res && res.isEnded || res === undefined) {
                    if (this._onCloseCallBack) {
                        cc.zy.api.sendEv(2, "完整看视频", "", "")//完整看视频
                        this._onCloseCallBack()
                        this._onCloseCallBack = null
                        // if (cc.zy.tastkey != "") {
                        //     console.log("跳转抽奖任务完成");
                        //     var data = {
                        //         action: "set",
                        //         key: cc.zy.tastkey,
                        //         value: 1
                        //     };
                        //     cc.zy.api.jsonRequest("app-api/storage.php", data, function (ret) {
                        //         console.log("tastkey", ret);
                        //     });
                        //     cc.zy.tastkey = ""
                        // }
                    }
                } else {
                    this.onCloseNotFinish();
                }
            })
            this._videoAd.onError(err => {
                console.log(err);
                if (err.errMsg == "no advertisement") {
                    this.share();
                    cc.zy.wxApi.aldSendEvent2("视频广告异常", { "channel": cc.sys.localStorage.getItem("channel") })
                }
            })
        }
    },
    hezi() {
        var self = this
        if (this.appbox && window[cc.zy.platform]) {
            this.appbox.load().then(() => { self.appbox.show() })
        }
    },
    showInterstitialAd() {
        var self = this
        if (this.interstitialAd && window[cc.zy.platform]) {
            this.interstitialAd
                .load()
                .then(() => {
                    this.interstitialAd.show();
                })
                .catch(err => {
                    // if (cc.zy.param.hezi) self.hezi()
                });
        }
    },

    gezi: function () {
        this.gridAd.show()
    },

    chaping: function () {
        var self = this
        if (this.interstitialAd && window[cc.zy.platform]) {
            this.interstitialAd
                .load()
                .then(() => {
                    this.interstitialAd.show();
                })
                .catch(err => {
                //    self.hezi()
                });
        }
    },

    jili: function (_onCloseCallBack) {
        this._onCloseCallBack = _onCloseCallBack
        // var key = "jiliTime" + cc.zy.utils.getTodayStr()
        // var jiliTime = parseInt(cc.zy.storageMgr.getKey(key, 0))
        // jiliTime++;
        // cc.zy.storageMgr.setKey(key, jiliTime)

        // var str = cc.zy.globle.share + ""//分享
        // let strArray = str.split("*");
        // var isshare = false
        // for (let index = 0; index < strArray.length; index++) {
        //     const element = strArray[index];
        //     if (parseInt(element) == jiliTime) {
        //         isshare = true
        //     }
        // }

        // var key = "shareJili" + cc.zy.utils.getTodayStr()
        // var time = cc.zy.storageMgr.getKey(key, 0)
        // if (isshare && time < parseInt(cc.zy.globle.shareTime)) {
        //     this.share();
        //     return
        // }


        // var strOther = cc.zy.globle.other + ""//广告主
        // let strArrayOther = strOther.split("*");
        // var isOther = false
        // for (let index = 0; index < strArrayOther.length; index++) {
        //     const element = strArrayOther[index];
        //     if (parseInt(element) == jiliTime) {
        //         isOther = true
        //     }
        // }
        // if (isOther) {
        //     this.noAd();
        //     return
        // }

        // cc.zy.ad.hide()
        this._videoAd.load()
            .then(() => this._videoAd.show())
            .catch(err => {
            }
            )
    },

    onCloseNotFinish: function () {
        var self = this;
       window[cc.zy.platform].showModal({
            title: '提示',
            content: "您需要看完视频才可以获得奖励哦!",
            confirmText: '继续观看',
            cancelText: '取消',
            confirmColor: '#3cc51f',
            showCancel: true,
            success(res) {
                if (res.confirm) {
                    self.jili()
                } else if (res.cancel) {

                }
            }
        })
    },

    noAd: function () {
        var self = this
        cc.zy.ad.show()
        // self.toOtherGame();
       window[cc.zy.platform].showModal({
            title: '提示',
            content: "体验赞助方游戏20秒以上即可获得奖励哦！",
            confirmText: '去体验',
            cancelText: '取消',
            confirmColor: '#3cc51f',
            showCancel: true,
            success(res) {
                if (res.confirm) {
                    self.toOtherGame();
                } else if (res.cancel) {
                }
            }
        })
    },


    share() {
        var self = this
        if (!cc.zy.isShow) {
            self._onCloseCallBack()
            return;
        }
        var key = "shareJili" + cc.zy.utils.getTodayStr()
        var time = cc.zy.storageMgr.getKey(key, 0)
        if (time < parseInt(cc.zy.globle.shareTime)) {
            time++
            cc.zy.storageMgr.setKey(key, time)
            var success = function () {
                if (time % 3 == 2) {
                   window[cc.zy.platform].showModal({
                        title: '提示',
                        content: "分享群失败！请分享另外一个新群试试吧！",
                        confirmText: '分享到群',
                        cancelText: '放弃奖励',
                        confirmColor: '#3cc51f',
                        showCancel: true,
                        success(res) {
                            if (res.confirm) {
                                self.share2();
                            } else if (res.cancel) {
                            }
                        }
                    })
                } else {
                    cc.zy.wxApi.aldSendEvent2("分享获得道具成功", { "channel": cc.sys.localStorage.getItem("channel") })
                    self._onCloseCallBack()
                    self._onCloseCallBack = null
                }
            };
            var fail = function () {
               window[cc.zy.platform].showModal({
                    title: '提示',
                    content: "分享群失败！请分享另外一个新群试试吧！",
                    confirmText: '分享到群',
                    cancelText: '放弃奖励',
                    confirmColor: '#3cc51f',
                    showCancel: true,
                    success(res) {
                        if (res.confirm) {
                            self.share2();
                        } else if (res.cancel) {
                        }
                    }
                })
            };
            cc.zy.shareClass.showShare(success.bind(this), fail.bind(this))
        } else {
            // cc.zy.wxApi.showToast("今天的分享机会用完了！召唤您的朋友点击您的分享链接！即可获得邀请大礼包哦！")
            this.noAd()
        }
    },


    share2() {
        var self = this
        var success = function () {
            cc.zy.wxApi.aldSendEvent2("分享获得奖励成功", { "channel": cc.sys.localStorage.getItem("channel") })
            self._onCloseCallBack()
            this._onCloseCallBack = null

        };
        var fail = function () {
           window[cc.zy.platform].showModal({
                title: '提示',
                content: "分享群失败！请分享另外一个新群试试吧！",
                confirmText: '分享到群',
                cancelText: '放弃奖励',
                confirmColor: '#3cc51f',
                showCancel: true,
                success(res) {
                    if (res.confirm) {
                        self.share2();
                    } else if (res.cancel) {
                    }
                }
            })
        };
        cc.zy.shareClass.showShare(success.bind(this), fail.bind(this))
    },


    toOtherGame: function () {
        if (!cc.zy.tiyanGame) {
            cc.zy.wxApi.showToast("今天的领取奖励的机会已经用完！请明天再来");
            return;
        }

        var self = this
        var ret = cc.zy.likeGameList
        if (ret == undefined) return;
        var tiyan = false
        for (let index = 0; index < ret.length; index++) {
            var lickgame = ret[index]
            var isShow = true
            if (lickgame.ios != "1") {
                if (cc.zy.isIos) {
                    isShow = false//不支持ios
                }
            }
            if (lickgame.sort != "0" && isShow) {
                var id = lickgame.id
                var appId = lickgame.to_gameid
                var name = lickgame.likeGameName
                var sort = lickgame.sort
                var jumptype = lickgame.jumptype
                var isClick = cc.sys.localStorage.getItem(id + cc.zy.utils.getTodayStr());
                if (isClick == null || isClick == "") {//如果没点过
                    var parma = ""
                    var parmastr = ""
                    if (lickgame.param != "") {
                        parma = JSON.parse(lickgame.param) //解析自定义参数 
                        for (var key in parma) {
                            parmastr += key + "=" + parma[key] + "&"
                        }
                    }
                    if (parmastr.charAt(parmastr.length - 1) == "&") {//最后的"&"去掉
                        parmastr = parmastr.substr(0, parmastr.length - 1)
                    }
                    tiyan = true
                    if (jumptype == 2) {//二维码
                       window[cc.zy.platform].previewImage({
                            current: lickgame.piaoUrl, // 当前显示图片的http链接
                            urls: [lickgame.piaoUrl], // 需要预览的图片http链接列表
                            success(res) {
                                cc.zy.api.sendEv(0, "跳转" + name, name, "")//跳转
                                cc.zy.wxApi.aldSendEvent2("点击广告主", { "游戏名字": name })
                                var openTime = (new Date()).valueOf();
                                self.scheduleOnce(function () {//两秒后打开
                                    var backTime = (new Date()).valueOf();
                                    var backsec = (backTime - openTime) / 1000;//秒
                                    if (backsec < 22) {
                                        cc.zy.wxApi.showToast("亲，需要进入小游戏体验20秒，才能完成任务哦，请理解~")
                                    } else {
                                        self._onCloseCallBack()
                                        this._onCloseCallBack = null
                                        cc.zy.zySdk.clickToOtherGame(appId, name)
                                        cc.zy.wxApi.aldSendEvent('跳转' + name)
                                        cc.sys.localStorage.setItem(id + cc.zy.utils.getTodayStr(), 1);
                                    }
                                }, 2);
                            },
                        })
                    } else {
                        cc.zy.wxApi.aldSendEvent2("点击广告主", { "游戏名字": name })
                       window[cc.zy.platform].navigateToMiniProgram({
                            appId: appId,
                            path: lickgame.url + parmastr,
                            extraData: parma,
                            envVersion: 'release',
                            success(res) {
                                cc.zy.refreshBanner = false
                                cc.zy.api.sendEv(0, "跳转" + name, name, "")//跳转
                                cc.zy.wxApi.aldSendEvent2("跳转广告主", { "游戏名字": name })
                                var openTime = (new Date()).valueOf();
                                self.scheduleOnce(function () {//两秒后打开
                                    var backTime = (new Date()).valueOf();
                                    var backsec = (backTime - openTime) / 1000;//秒
                                    if (backsec < 20) {
                                        cc.zy.wxApi.showToast("亲，需要进入小游戏体验20秒，才能完成任务哦，请理解~")
                                    } else {
                                        self._onCloseCallBack()
                                        this._onCloseCallBack = null
                                        cc.zy.zySdk.clickToOtherGame(appId, name)
                                        cc.zy.wxApi.aldSendEvent('跳转' + name)
                                        cc.zy.wxApi.aldSendEvent2("体验广告主成功", { "游戏名字": name });
                                        cc.sys.localStorage.setItem(id + cc.zy.utils.getTodayStr(), 1);
                                    }
                                }, 2);
                            },
                            fail(res) {
                                cc.zy.wxApi.showToast("体验失败！")
                                // cc.sys.localStorage.setItem(appId + cc.zy.utils.getTodayStr(), 1);
                            },
                        })
                    }
                    return;
                }
            }
        };
        if (!tiyan) {
            //window[cc.zy.platform].showModal({
            //     title: '提示',
            //     content: "今天的体验机会用完了!分享到不同群即可获得奖励哦！",
            //     confirmText: '分享',
            //     cancelText: '取消',
            //     confirmColor: '#3cc51f',
            //     showCancel: true,
            //     success(res) {
            //         if (res.confirm) {
            //             self.share();
            //         } else if (res.cancel) {
            //         }
            //     }
            // })
            // self.share();
            cc.zy.wxApi.showToast("今天的体验机会已经用完！请明天再来");
            cc.zy.tiyanGame = false
        }

    },


});

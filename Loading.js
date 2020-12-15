function initMgr() {
    cc.zy = {}//定义全局变量
    cc.zy.userinfo = {};
    cc.zy.music = true
    cc.zy.audio = true
    cc.zy.hasVideo = true
    cc.zy.hasBanner = true
    cc.zy.tiyanGame = true
    cc.zy.recoverTime = 1200
    cc.zy.coin = 0
    cc.zy.appid = "wx32d270c7c23c5b7f"
    cc.zy.platform = "wx"
    cc.zy.platformApi = wx
    cc.zy.appName = "星星消除"
    cc.zy.appname = "星星消除"
    cc.zy.bannerId = "adunit-f9521c8d7e47d63c"
    cc.zy.videoId = "adunit-485ea3a6a7dc3ace"
    cc.zy.chapingId = "adunit-35dcefd36c070749"
    cc.zy.geziId = "adunit-d670f1d980f47a4a"
    // cc.zy.heziId = "adunit-c214fe7d23263f9b"
    // cc.zy.jimuId = "b2b3445ff55650ff40421bb6fb1b6217"
    cc.zy.share = []
    cc.zy.moregameurl = []
    cc.zy.likegame = []
    cc.zy.inviterId = null;
    cc.zy.http = require("HTTP");
    cc.zy.globle = require("ZyGloble");
    var Utils = require("Utils");
    cc.zy.utils = new Utils();

    var ZySdk = require("ZySdk");
    cc.zy.zySdk = new ZySdk();

    var WxApi = require("WxApi");
    cc.zy.wxApi = new WxApi();


    var AudioMgr = require("AudioMgr");
    cc.zy.audioMgr = new AudioMgr();
    cc.zy.audioMgr.init()

    var StorageMgr = require("StorageMgr");
    cc.zy.storageMgr = new StorageMgr();

    var Share = require("Share");
    cc.zy.shareClass = new Share();
    cc.zy.shareClass.run()

    var jili = require("jili");
    cc.zy.jili = new jili();

    var api = require("api");
    cc.zy.api = new api();


    var Ad = require("Ad");
    cc.zy.ad = new Ad();
    cc.zy.ad.init();
    cc.zy.jili.init();




}

cc.Class({
    extends: cc.Component,

    properties: {
        progressBar: cc.ProgressBar
    },

    start() {
        console.log("loginScence");
        var self = this
        initMgr();
        cc.view.enableRetina(true);
        cc.zy.getNetSetting = false
        cc.zy.wxApi.getLaunchOptionsSync()//启动
        cc.zy.wxApi.showShareMenu()//菜单分享

        if (window[cc.zy.platform] != undefined) {
            // this.loadImg()
        } else {
            cc.zy.isShow = true
            cc.director.loadScene("Jinzhu");
            // cc.director.loadScene("game");
        }

        cc.director.preloadScene("Jinzhu", () => {//预加载
        });
      
        this.onShow();
        this.onHide();
        this.run();
        // this.scheduleOnce(function () {
        //     cc.director.loadScene("King");
        // }, 10);

        cc.zy.showTime = (new Date()).valueOf();
        cc.zy.lastLoginTime = cc.zy.storageMgr.getKey("lastLoginTime", cc.zy.showTime)
        cc.zy.lixianTime = (cc.zy.showTime - cc.zy.lastLoginTime) / 1000;//秒

        cc.zy.wxApi.aldSendEvent2("进入加载页", { "channel": cc.sys.localStorage.getItem("channel") })
    },

    tick2: function () {
        this.jiazaiTime++;
        // if(this.progressBar.progress<0.8)this.progressBar.progress+=0.1
        if (this.progressBar.progress < 1) {
            this.progressBar.progress += 0.05
        } else {
            this.stop();
            // cc.director.loadScene("Home");
        }
    },
    stop: function () {
        this.unschedule(this.tick2);
    },
    run: function () {
        this.schedule(this.tick, 20);
        this.jiazaiTime = 0;
        this.schedule(this.tick2, 0.03);
    },
    tick: function () {
        // cc.zy.wxApi.getLaunchOptionsSync()//启动
    },
    onShow: function () {
        if (window[cc.zy.platform] != undefined) {
           window[cc.zy.platform].onShow(function (res) {
                console.log("onShow")
                console.log(res)
                console.log(res.query)
                if (res.scene == 1104 || res.scene == 1103 || res.scene == 1023) {
                    cc.sys.localStorage.setItem("addToMyMiniSuccess", "true");
                    cc.zy.wxApi.aldSendEvent2("添加小程序成功", { "channel": cc.sys.localStorage.getItem("channel") })
                }
                // cc.zy.kefu = res.query.kefu ? res.query.kefu : null;
                cc.zy.fromScene = res.scene
                cc.zy.showTime = (new Date()).valueOf();
                cc.zy.onLineTime = 0;//在线时长
                cc.zy.lastLoginTime = cc.zy.storageMgr.getKey("lastLoginTime", cc.zy.showTime)
                cc.zy.backgroundTime = (cc.zy.showTime - cc.zy.hideTime) / 1000;//秒
                cc.zy.lixianTime = (cc.zy.showTime - cc.zy.lastLoginTime) / 1000;//秒

            });
        }
    },
    onHide: function () {
        if (window[cc.zy.platform] != undefined) {
           window[cc.zy.platform].onHide(function (res) {
                cc.zy.refreshBanner = true
                cc.zy.fromScene = 0
                cc.zy.hideTime = (new Date()).valueOf();
                cc.zy.storageMgr.setKey("lastLoginTime", (new Date()).valueOf())
                cc.zy.backgroundTime = 0;

                cc.zy.onLineTime = parseInt(((new Date()).valueOf() - cc.zy.showTime) / 1000);//在线时长
                cc.zy.api.sendEv(4, "在线时长", "", cc.zy.onLineTime)//在线时长
                cc.zy.onLineTime = 0;//在线时长
            });
        }
    },
    setIsIpx: function () {
        cc.zy.isIpx = false
        if (window[cc.zy.platform] != undefined) {
            var windowWidth = 720
            var windowHeight = 1280
           window[cc.zy.platform].getSystemInfo({
                success: function (res) {
                    windowWidth = res.windowWidth
                    windowHeight = res.windowHeight
                }
            })
            if (windowHeight / windowWidth > 1400 / 720) {
                cc.zy.isIpx = true
            }
        }
    },
    setIsIos: function () {
        cc.zy.isIos = false
        if (window[cc.zy.platform] != undefined) {
            var res =window[cc.zy.platform].getSystemInfoSync()
            var system = res.system
            if (system.indexOf("iOS") == -1) {
                cc.zy.isIos = false
            } else {
                cc.zy.isIos = true
            }
            // console.log("cc.zy.isIos" + cc.zy.isIos)
        }
    },

    update(dt) {
        if (cc.zy.login && !this.load) {
            this.load = true
            cc.director.loadScene("Jinzhu");
            //     this.progressBar.progress=0.9
            //     cc.zy.isShow=cc.zy.isShow1
            //     // if ( cc.zy.isShow ) {
            //         cc.director.loadScene("Home");
            //     // } else {
            //     //     cc.director.loadScene("Chengyu2");
            //     // }
        }
    },


});

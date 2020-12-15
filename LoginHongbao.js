
cc.Class({
    extends: cc.Component,

    properties: {
        // exitpos:cc.Node,
    },
    close() {
        if (cc.sys.localStorage.getItem("isauthorize") != 1) {
            cc.zy.wxApi.getUserInfo()//微信授权
        }
        this.node.active = false;
    },
    open() {
        this.node.active = true;
    },


    onLoad() {
        this._dailingqu = false
        this.fangqi = this.node.getChildByName("fangqi");
    },

    onEnable() {
        var key = "hongbaotime" + cc.zy.utils.getTodayStr()
        var time = cc.zy.storageMgr.getKey(key, 0)
        if (time > 15) {
            this.node.active = false;
            return
        }
        time++
        cc.zy.storageMgr.setKey(key, time)
        // this.fangqi.active=false
        this.scheduleOnce(function () {//两秒后打开
            cc.zy.ad.setTop(-2000);
        }, 0.1);
        // this.fangqi = this.node.getChildByName("fangqi");
        // this.fangqi.y = -480
        this._closeTime = 0;
        this._videoTime = 0;
        // cc.zy.ad.setTop(-2000);
        // if (cc.zy.globle.autoVideo) {
        //     this.scheduleOnce(function () {//两秒后打开
        //         this.getByVideo();
        //     }, 5);
        // }
    },

    getByVideo: function () {
        if (this._videoTime == 1){
            this._videoTime++;
            return
        } 
        this._videoTime++;
        var self = this
        var success = function () {
            cc.zy.wxApi.aldSendEvent2("领取话费成功", { "channel": cc.sys.localStorage.getItem("channel") })
            self.node.active = false;
            cc.zy.storageMgr.setKey("loginHbao", "true")
            let page = cc.find("Canvas/openhuafei")
            page.active = true
            self._dailingqu = false

            let btn_dailingqu = cc.find("Canvas/btn_dailingqu")
            let pan_huafei = cc.find("Canvas/pan_huafei")
            pan_huafei.active = true
            btn_dailingqu.active = false
        };
        cc.zy.jili.jili(success.bind(this));
    },
    dailingqu1() {
        // if (this._closeTime == 0) {
        //     this.scheduleOnce(function () {//1秒后打开
        //         // let adpos = this.node.getChildByName("adpos");
        //         // cc.zy.ad.setTop(-adpos.y)
        //         // this.fangqi.y = -380
        //         this._closeTime++
        //     }, 1);
        //     return;
        // } else {

        // }


        if (cc.sys.localStorage.getItem("isauthorize") != 1) {
            cc.zy.wxApi.getUserInfo()//微信授权
        }
        cc.zy.wxApi.aldSendEvent2("关闭登陆话费", { "channel": cc.sys.localStorage.getItem("channel") })
        this._dailingqu = true
        this.node.active = false;
        let btn_dailingqu = cc.find("Canvas/btn_dailingqu")
        let pan_huafei = cc.find("Canvas/pan_huafei")
        pan_huafei.active = true
        btn_dailingqu.scale = 5
        btn_dailingqu.x = 0
        btn_dailingqu.y = 100
        btn_dailingqu.active = true
        var scaleTo = cc.scaleTo(0.3, 1, 1);
        var moveTo = cc.moveTo(0.3, 274, 138);
        var sequence = cc.sequence(scaleTo, moveTo, cc.callFunc(function () {
            pan_huafei.active = false
        }))
        btn_dailingqu.runAction(sequence)
        //     if(this.exitpos){
        //         cc.zy.ad.setTop(-this.exitpos.y)
        //    }else{
        //         cc.zy.ad.setTop(-2000)
        //    }
    },
    dailingqu() {
        // if (this._closeTime == 0) {
        //     this.scheduleOnce(function () {//1秒后打开
        //         // let adpos = this.node.getChildByName("adpos");
        //         // cc.zy.ad.setTop(-adpos.y)
        //         // this.fangqi.y = -380
        //         this._closeTime++
        //     }, 1);
        //     return;
        // } else {

        // }
        this._dailingqu = true
        this.node.active = false;
        let btn_dailingqu = cc.find("Canvas/btn_dailingqu")
        let pan_huafei = cc.find("Canvas/pan_huafei")
        pan_huafei.active = true
        btn_dailingqu.scale = 5
        btn_dailingqu.x = 0
        btn_dailingqu.y = 200
        btn_dailingqu.active = true
        var scaleTo = cc.scaleTo(0.3, 1, 1);
        var moveTo = cc.moveTo(0.3, 293, 381);
        var sequence = cc.sequence(scaleTo, moveTo, cc.callFunc(function () {
            pan_huafei.active = false
        }))
        btn_dailingqu.runAction(sequence)
        cc.zy.ad.setTop(-2000);
    },

});

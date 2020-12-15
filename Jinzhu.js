var self
cc.Class({
    extends: cc.Component,
    properties: {
        goldLabel: cc.Label,
        balanceLabel: cc.Label,
        lvLabel: cc.Label,
        lvProgressLabel: cc.Label,
        caishenLabel: cc.Label,
        jinbiLabel: cc.Label,
        rongliangLabel: cc.Label,

        xjhbLabel: cc.Label,
        godLabel: cc.Label,
        sjjbVideo: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {

    // },
    btn_game() {//领取财神
        console.log("btn_game")
        cc.director.loadScene("Game");
    },
    btn_god() {//领取财神
        console.log("btn_god")
        if (self.godLabel.string != "可领取") return;
        var now = (new Date()).valueOf();
        cc.zy.caishenGetTime = now;
        cc.zy.api.setKeyByRedis("caishenGetTime", now, 10800);
        cc.zy.userattributes.caishen++;
        cc.zy.api.updateAttributes("caishen", cc.zy.userattributes.caishen);
        self.refreshText();
    },
    btn_xjhb() {//领取红包
        if (self.xjhbLabel.string != "可领取") return;
        console.log("btn_xjhb")
        var now = (new Date()).valueOf();
        cc.zy.xjhbGetTime = now;
        cc.zy.api.setKeyByRedis("xjhbGetTime", now, 10800);
        cc.zy.lingquBalance = cc.zy.utils.getMoney();
        cc.zy.userattributes.balance = parseFloat(cc.zy.userattributes.balance) + parseFloat(cc.zy.lingquBalance);
        cc.zy.api.updateAttributes("balance", cc.zy.userattributes.balance);
        self.refreshText();

        cc.zy.openPage = cc.find("Canvas/hbPage");
        cc.zy.openPage.getChildByName("tip").getComponent(cc.Label).string = cc.zy.lingquBalance;
        cc.zy.openPage.active = true

    },
    btn_sqjb() {//收集金币
        if (cc.zy.userattributes.level >= 5) {
            cc.zy.jili.jili(function name(params) {
                self.sqjb()
            });
        } else {
            self.sqjb()
        }
    },
    sqjb() {//收集金币
    
        var level = cc.zy.userattributes.level;
        var index = parseInt(level) - 1;
        var now = (new Date()).valueOf();
        cc.zy.goldGetTime = now;
        cc.zy.audioMgr.playAudio("gold");
        cc.game.emit("playGoldAnim");
        cc.zy.api.setKeyByRedis("goldGetTime", now, 86400 * 7);
        cc.zy.lingquGold = parseInt(self.jinbiLabel.string)
        cc.zy.userattributes.gold = parseInt(cc.zy.userattributes.gold) + cc.zy.lingquGold
        cc.zy.userattributes.xp = parseInt(cc.zy.userattributes.xp) + cc.zy.lingquGold
        if (cc.zy.userattributes.xp >= cc.zy.levelSetting.needXp[index]) {//升级
            cc.zy.userattributes.xp = cc.zy.userattributes.xp - cc.zy.levelSetting.needXp[index]
            cc.zy.userattributes.level++;
        }
        self.refreshText();
        var data = {
            action: "sqjb",
            gold: cc.zy.userattributes.gold,
            level: cc.zy.userattributes.level,
            xp: cc.zy.userattributes.xp,
            openid: cc.zy.openid
        };
        cc.zy.api.jsonRequest("app-api/xx_user.php", data, function (ret) {
            console.log("updateAttributes", ret);
            "function" == typeof fun && fun();
        });
        cc.zy.openPage = cc.find("Canvas/sqjbPage");
        cc.zy.openPage.getChildByName("tip").getComponent(cc.Label).string = "已领取" + cc.zy.lingquGold + "金币"
      
    },
    btn_shiyong() {//使用财神
        console.log("btn_shiyong")
        if (cc.zy.userattributes.caishen > 0) {
            cc.zy.userattributes.caishen--;
            cc.zy.api.updateAttributes("caishen", cc.zy.userattributes.caishen);
            cc.zy.api.setListByRedis("caishenList", (new Date()).valueOf(), 10800, function name(data) {
                cc.game.emit("refreshJiasu");
            });
            self.refreshText();
      
        }
    },
    btn_tixian() {//提现
        console.log("btn_tixian")
        if (cc.zy.openPage) cc.zy.openPage.active = false
        var tixianPage = cc.find("Canvas/tixianPage");
        tixianPage.active = true;
    },
    btn_duihuan() {//兑换金币
        console.log("btn_duihuan")
        if (cc.zy.openPage) cc.zy.openPage.active = false
        var duihuanPage = cc.find("Canvas/duihuanPage");
        duihuanPage.active = true;
    },
    btn_double_balance() {//双倍红包
        console.log("btn_double_balance")
        cc.zy.jili.jili(function name(params) {
            if (cc.zy.openPage) cc.zy.openPage.active = false
            cc.zy.userattributes.balance = parseFloat(cc.zy.userattributes.balance) + parseFloat(cc.zy.lingquBalance);
            cc.zy.api.updateAttributes("balance", cc.zy.userattributes.balance);
            self.refreshText();
        });
    },
    btn_videoHb() {//视频红包
        console.log("btn_double_balance")
        cc.zy.jili.jili(function name(params) {
            if (cc.zy.openPage) cc.zy.openPage.active = false
            cc.zy.lingquBalance = cc.zy.utils.getMoney();
            cc.zy.userattributes.balance = parseFloat(cc.zy.userattributes.balance) + parseFloat(cc.zy.lingquBalance);
            cc.zy.api.updateAttributes("balance", cc.zy.userattributes.balance);
            cc.game.emit("refreshText");

            cc.zy.openPage = cc.find("Canvas/hbPage");
            cc.zy.openPage.getChildByName("tip").getComponent(cc.Label).string = cc.zy.lingquBalance;
            cc.zy.openPage.active = true
            cc.find("Canvas/btn/btn_videoHb").active = false
            cc.zy.loginHb=1;
            cc.zy.api.setHashByRedis("jbrw" + cc.zy.utils.getTodayStr(), "loginHb", 1, 86400, function name(data) { });
        });
    },
    btn_double_gold() {//双倍收集金币
        console.log("btn_double_gold")
        cc.zy.jili.jili(function () {
            if (cc.zy.openPage) cc.zy.openPage.active = false
            cc.zy.audioMgr.playAudio("gold");
            cc.game.emit("playGoldAnim");
            var level = cc.zy.userattributes.level;
            var index = parseInt(level) - 1;
            cc.zy.userattributes.gold = parseInt(cc.zy.userattributes.gold) + parseInt(cc.zy.lingquGold)
            cc.zy.userattributes.xp = parseInt(cc.zy.userattributes.xp) + parseInt(cc.zy.lingquGold)
            if (cc.zy.userattributes.xp >= cc.zy.levelSetting.needXp[index]) {//升级
                cc.zy.userattributes.xp = cc.zy.userattributes.xp - cc.zy.levelSetting.needXp[index]
                cc.zy.userattributes.level++;
            }
            cc.game.emit("refreshText");
            var data = {
                action: "sqjb",
                gold: cc.zy.userattributes.gold,
                level: cc.zy.userattributes.level,
                xp: cc.zy.userattributes.xp,
                openid: cc.zy.openid
            };
            cc.zy.api.jsonRequest("app-api/xx_user.php", data, function (ret) {
                console.log("updateAttributes", ret);
                "function" == typeof fun && fun();
            });
        });
    },
    btn_jbrw() {//金币任务

        if (cc.zy.openPage) cc.zy.openPage.active = false
        var jbrwPage = cc.find("Canvas/jbrwPage");
        jbrwPage.active = true;
    },
    btn_kxzp() {//幸运抽奖

        cc.zy.openPage = cc.find("Canvas/choujiangPage");
        cc.zy.openPage.active = true
    },

    btn_jiasu() {//领取财神
        console.log("btn_god")
        cc.zy.jili.jili(function () {
            cc.zy.userattributes.caishen++;
            cc.zy.api.updateAttributes("caishen", cc.zy.userattributes.caishen);
            self.refreshText();
        });
    },
    btn_open_hb() {//视频红包
        console.log("btn_double_balance")
        cc.zy.jili.jili(function name(params) {
            if (cc.zy.openPage) cc.zy.openPage.active = false
            cc.zy.lingquBalance = cc.zy.utils.getMoney();
            cc.zy.userattributes.balance = parseFloat(cc.zy.userattributes.balance) + parseFloat(cc.zy.lingquBalance);
            cc.zy.api.updateAttributes("balance", cc.zy.userattributes.balance);
            self.refreshText();

            cc.zy.openPage = cc.find("Canvas/hbPage");
            cc.zy.openPage.getChildByName("tip").getComponent(cc.Label).string = cc.zy.lingquBalance;
            cc.zy.openPage.active = true
        });
    },
    start() {
        self = this
        cc.zy.zuanqianSudu = 1

        var day1 = new Date();
        day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000);//昨天的时间
        var now = (new Date()).valueOf();

        const eventList = ['refreshText', 'bubble-god', 'btn_god', 'btn_jbrw', 'btn_xjhb', 'btn_sqjb', 'btn_shiyong', 'btn_tixian',
            'btn_duihuan', 'btn_game', 'btn_double_gold', 'btn_double_balance', 'btn_videoHb', 'btn_kxzp', 'btn_jiasu', 'btn_open_hb']
        const eventNameCnList = ['刷新数值', '财神', '点击迎财神', '点击金币任务', '点击现金红包', '点击收取金币', '点击使用财神', '点击提现',
            '点击兑换', '点击开始游戏', '点击双倍金币', '点击双倍红包', '点击视频红包', '点击幸运抽奖', '点击视频加速', '点击打开红包']
        for (let index = 0; index < eventList.length; index++) {//监听事件
            const eventName = eventList[index];
            const eventNameCn = eventNameCnList[index];
            cc.game.on(eventName, () => {
                cc.zy.wxApi.aldSendEvent2(eventNameCn, { "channel": cc.sys.localStorage.getItem("channel") })
                self[eventName]();
                this.scheduleOnce(() => {
                    cc.zy.jili.chaping();
                }, 2);
            }, this);
        }
        self.refreshText();


        // cc.zy.api.setSetByRedis("sign", cc.zy.utils.getTodayStr(), 86400 * 2, function name(data) {

        // });
        cc.zy.sign = 1;
        cc.zy.api.getSetByRedis("sign", function name(data) {
            var signYestoday = 0
            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                if (element == cc.zy.utils.getYesTodayStr()) {
                    signYestoday = 1
                }
            }
            console.log("signYestoday", signYestoday);
            cc.zy.sign = data ? data.length : 0
            if (signYestoday == 0) {//昨天没签到  重置
                if (cc.zy.sign > 0) {
                    cc.zy.api.deleteByRedis("sign");
                }
                cc.zy.sign = 1;
                self.scheduleOnce(() => {
                    cc.zy.api.setSetByRedis("sign", cc.zy.utils.getTodayStr(), 86400 * 2, function name(data) {
                    });
                }, 0.5);
            } else {
                cc.zy.sign++;
                cc.zy.api.setSetByRedis("sign", cc.zy.utils.getTodayStr(), 86400 * 2, function name(data) {
                });
            }
        });

        cc.zy.api.getKeyByRedis("caishenGetTime", day1.getTime(), 10800, function name(data) {
            cc.zy.caishenGetTime = data;
        });
        cc.zy.api.getKeyByRedis("xjhbGetTime", day1.getTime(), 10800, function name(data) {
            cc.zy.xjhbGetTime = data;
        });

        cc.zy.api.getKeyByRedis("goldGetTime", now, 86400 * 7, function name(data) {
            cc.zy.goldGetTime = data;
        });


        cc.zy.api.getHashByRedis("jbrw" + cc.zy.utils.getTodayStr(), function name(data) {
            cc.zy.vedioTime = data && data.vedioTime ? data.vedioTime : 0;
            cc.zy.choujiangTime = data && data.useCaishen ? data.useCaishen : 0;
            cc.zy.loginHb = data && data.loginHb ? data.loginHb : 0;

            cc.zy.shareNewTodaySuccess = data && data.shareNewTodaySuccess ? data.shareNewTodaySuccess : 0;
            cc.zy.vedioTimeSuccess = data && data.vedioTimeSuccess ? data.vedioTimeSuccess : 0;
            cc.zy.callFriendSuccess = data && data.callFriendSuccess ? data.callFriendSuccess : 0;
            cc.zy.choujiangTimeSuccess = data && data.choujiangTimeSuccess ? data.choujiangTimeSuccess : 0;

            if(cc.zy.loginHb==0){
                cc.zy.openPage = cc.find("Canvas/openhbPage");
                cc.zy.openPage.active = true
            }else{
                cc.find("Canvas/btn/btn_videoHb").active = false
            }
        });


        // cc.zy.api.getTodayByRedis("getTodayByRedis", day1.getTime(), function name(data) {
        // });
        this.schedule(this.runEverySecond, 1);


    },
    refreshText() {
        console.log("cc.zy.userattributes.level_unlock", cc.zy.userattributes.level_unlock);
        console.log("cc.zy.userattributes.game_level_unlock", cc.zy.userattributes.game_level_unlock);
        var level = cc.zy.userattributes.level;
        var index = parseInt(level) - 1;
        cc.zy.curCapacity = cc.zy.levelSetting.capacity[index]
        self.goldLabel.string = parseInt(cc.zy.userattributes.gold);
        self.balanceLabel.string = parseFloat(cc.zy.userattributes.balance).toFixed(3);
        self.lvLabel.string = level;
        self.lvProgressLabel.string = parseFloat(cc.zy.userattributes.xp * 100 / cc.zy.levelSetting.needXp[index]).toFixed(2) + "%";
        self.caishenLabel.string = cc.zy.userattributes.caishen;
        self.jinbiLabel.string = 0;
        self.rongliangLabel.string = "容量" + cc.zy.curCapacity + "金币";
        if (cc.zy.userattributes.level >= 5) this.sjjbVideo.active = true;
    },



    runEverySecond: function () {//每秒执行
        var now = (new Date()).valueOf();
        if (cc.zy.caishenGetTime) {//财神领取
            var disCaishe = parseInt((now - cc.zy.caishenGetTime) / 1000);
            if (disCaishe >= 3600 * 3) {//3个小时
                self.godLabel.string = "可领取";
            } else {
                var needTime = 3600 * 3 - disCaishe;
                self.godLabel.string = cc.zy.utils.getNeedTimeStr(needTime);
            }
        }
        if (cc.zy.xjhbGetTime) {//财神领取
            var disXjhb = parseInt((now - cc.zy.xjhbGetTime) / 1000);
            if (disXjhb >= 3600 * 3) {//3个小时
                self.xjhbLabel.string = "可领取";
            } else {
                var needTime = 3600 * 3 - disXjhb;
                self.xjhbLabel.string = cc.zy.utils.getNeedTimeStr(needTime);
            }
        }

        if (cc.zy.goldGetTime) {//财神领取
            var disGold = parseInt((now - cc.zy.goldGetTime) / 1000) * cc.zy.zuanqianSudu;
            if (disGold > cc.zy.curCapacity) {
                self.jinbiLabel.string = cc.zy.curCapacity;
            } else {
                self.jinbiLabel.string = disGold;
            }
        }
    },

    // update (dt) {},
});

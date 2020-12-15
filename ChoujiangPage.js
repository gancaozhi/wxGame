
const jiangliList = [
    {
        name: "金币",
        num: 50,
        targetID: 1,
    },
    {
        name: "财神",
        num: 1,
        targetID: 2,
    },
    {
        name: "金币",
        num: 1000,
        targetID: 3,
    },
    {
        name: "金币",
        num: 100,
        targetID: 5,
    },
    {
        name: "财神",
        num: 2,
        targetID: 6,
    },
    {
        name: "金币",
        num: 500,
        targetID: 7,
    },
    {
        name: "金币",
        num: 50000,
        targetID: 4,
    },
    {
        name: "红包",
        num: 1,
        targetID: 0,
    }
];
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "H+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
cc.Class({
    extends: cc.Component,

    properties: {
        spinBtn: cc.Node,
        videoIcon: cc.Node,
        wheelSp: cc.Sprite,
        maxSpeed: {
            default: 5,
            type: cc.Float,
            max: 15,
            min: 2,
        },
        duration: {
            default: 3,
            type: cc.Float,
            max: 5,
            min: 1,
            tooltip: "减速前旋转时间"
        },
        acc: {
            default: 0.1,
            type: cc.Float,
            max: 0.2,
            min: 0.01,
            tooltip: "加速度"
        },
        targetID: {
            default: 0,
            type: cc.Integer,
            max: 5,
            min: 0,
            tooltip: "指定结束时的齿轮"
        },
        springback: {
            default: false,
            tooltip: "旋转结束是否回弹"
        },
        timeLabel: cc.Label,
        jiangliLabel: cc.Label,
        // zhuanshilabel: cc.Label,
    },
    onEnable() {
        cc.zy.wxApi.aldSendEvent("进入转盘")
    },



    // use this for initialization
    onLoad: function () {

        this.timeLabel.string = "抽奖次数: " + cc.zy.choujiangTime + "/3"
        // this._beishu = cc.zy.choujiangTime + 1
        // this.jiangliLabel.string = "奖励×" + this._beishu
        this.wheelState = 0;
        this.curSpeed = 0;
        this.spinTime = 0;                   //减速前旋转时间
        this.gearNum = 8;
        // this.defaultAngle = 360/6/2;        //修正默认角度
        this.defaultAngle = 0;        //修正默认角度
        this.gearAngle = 360 / this.gearNum;   //每个齿轮的角度
        this.wheelSp.node.rotation = this.defaultAngle;
        this.finalAngle = 0;                 //最终结果指定的角度
        this.effectFlag = 0;                 //用于音效播放
        if (cc.zy.choujiangTime > 0) {
            this.videoIcon.active = true
        }

    },
    playWheel: function () {
        if (this.wheelState !== 0) {
            return;
        }
        if (cc.zy.choujiangTime > 2) {
            cc.zy.utils.showTip("任务完成", "今天抽奖次数已经达到上限，明天再来哦~", "我知道了")
            return;
        }
        cc.zy.wxApi.aldSendEvent("抽奖")

        this.decAngle = 2 * 360;  // 减速旋转两圈
        this.wheelState = 1;
        this.curSpeed = 0;
        this.spinTime = 0;


        if (cc.zy.choujiangTime == 0 || cc.zy.choujiangTime == 1) {
            var index = cc.zy.utils.random(0, 5)
            this.zhongjiang = jiangliList[index]
            this.targetID = this.zhongjiang.targetID
        } else {
            if (cc.zy.userattributes.balance < 60) {
                this.zhongjiang = jiangliList[7]
                this.targetID = this.zhongjiang.targetID
            } else {
                var index = cc.zy.utils.random(0, 5)
                this.zhongjiang = jiangliList[index]
                this.targetID = this.zhongjiang.targetID
            }
        }
    },
    start: function () {
        // cc.log('....start');
    },

    caculateFinalAngle: function (targetID) {
        this.finalAngle = 360 - this.targetID * this.gearAngle + this.defaultAngle;
        if (this.springback) {
            this.finalAngle += this.gearAngle;
        }
    },
    editBoxDidBegin: function (edit) {
    },
    editBoxDidChanged: function (text) {
    },
    editBoxDidEndEditing: function (edit) {
        var res = parseInt(edit.string);
        if (isNaN(res)) {
            this.targetID = Math.round(Math.random() * (this.gearNum - 1));
            return;
        }
        this.targetID = res;
    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if (this.wheelState === 0) {
            return;
        }
        if (this.wheelState == 1) {
            // cc.log('....加速,speed:' + this.curSpeed);
            this.spinTime += dt;
            this.wheelSp.node.rotation = this.wheelSp.node.rotation + this.curSpeed;
            if (this.curSpeed <= this.maxSpeed) {
                this.curSpeed += this.acc;
            }
            else {
                if (this.spinTime < this.duration) {
                    return;
                }
                // cc.log('....开始减速');
                //设置目标角度
                this.finalAngle = 360 - this.targetID * this.gearAngle + this.defaultAngle;
                this.maxSpeed = this.curSpeed;
                if (this.springback) {
                    this.finalAngle += this.gearAngle;
                }
                this.wheelSp.node.rotation = this.finalAngle;
                this.wheelState = 2;
            }
        }
        else if (this.wheelState == 2) {
            // cc.log('......减速');
            var curRo = this.wheelSp.node.rotation; //应该等于finalAngle
            var hadRo = curRo - this.finalAngle;
            this.curSpeed = this.maxSpeed * ((this.decAngle - hadRo) / this.decAngle) + 0.2;
            this.wheelSp.node.rotation = curRo + this.curSpeed;

            if ((this.decAngle - hadRo) <= 0) {
                // cc.log('....停止');
                this.wheelState = 0;
                this.wheelSp.node.rotation = this.finalAngle;
                if (this.springback) {
                    //倒转一个齿轮
                    // var act = new cc.rotateBy(0.6, -this.gearAngle);
                    var act = cc.rotateBy(0.6, -this.gearAngle);
                    var seq = cc.sequence(cc.delayTime(0.2), act, cc.callFunc(this.getJiangli, this));
                    this.wheelSp.node.runAction(seq);
                }
                else {
                    this.getJiangli();
                }
            }
        }
    },
    close: function () {
        this.node.active = false
    },
    show: function () {
        this.node.active = true
    },
    showRes: function () {
        // var Config = require("Config");
        // if(cc.sys.isBrowser)
        // {
        //     alert('You have got ' + Config.gearInfo[this.targetID]);
        // }
        // else cc.log(Config.gearInfo[this.targetID]);
    },
    getJiangli: function () {

        cc.zy.choujiangTime++;
        cc.zy.api.setHashByRedis("jbrw" + cc.zy.utils.getTodayStr(), "choujiangTime", cc.zy.choujiangTime, 86400, function name(data) { });
        this.timeLabel.string = "抽奖次数: " + cc.zy.choujiangTime + "/3"
        this.videoIcon.active = true

        if (this.zhongjiang.name == "金币") {
            this.jinbiReward(this.zhongjiang.num, 1);
        }
        if (this.zhongjiang.name == "红包") {
            cc.zy.lingquBalance = cc.zy.utils.getMoney();
            cc.zy.userattributes.balance = parseFloat(cc.zy.userattributes.balance) + parseFloat(cc.zy.lingquBalance);
            cc.zy.api.updateAttributes("balance", cc.zy.userattributes.balance);
            cc.zy.openPage = cc.find("Canvas/hbPage");
            cc.zy.openPage.getChildByName("tip").getComponent(cc.Label).string = cc.zy.lingquBalance;
            cc.zy.openPage.active = true
            cc.game.emit("refreshText");
        }
        if (this.zhongjiang.name == "财神") {
            cc.zy.userattributes.caishen = parseInt(cc.zy.userattributes.caishen) + parseInt(this.zhongjiang.num);
            cc.zy.api.updateAttributes("caishen", cc.zy.userattributes.caishen);
            cc.zy.utils.showTip("恭喜您", "抽中了" + this.zhongjiang.name + "X" + this.zhongjiang.num, "我知道了")
            cc.game.emit("refreshText");
        }
    },

    playByVideo: function () {
        var self = this
        if (cc.zy.choujiangTime == 0) {
            this.playWheel()
        } else {
            cc.zy.jili.jili(function () {
                self.playWheel()
            });
        }
    },
    jinbiReward(jinbi, isDouble) {//金币奖励
        var level = cc.zy.userattributes.level;
        var index = parseInt(level) - 1;
        cc.zy.audioMgr.playAudio("gold");
        cc.zy.lingquGold = parseInt(jinbi)
        cc.zy.userattributes.gold = parseInt(cc.zy.userattributes.gold) + cc.zy.lingquGold
        cc.zy.userattributes.xp = parseInt(cc.zy.userattributes.xp) + cc.zy.lingquGold
        if (cc.zy.userattributes.xp >= cc.zy.levelSetting.needXp[index]) {//升级
            cc.zy.userattributes.xp = cc.zy.userattributes.xp - cc.zy.levelSetting.needXp[index]
            cc.zy.userattributes.level++;
        }
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
        if (isDouble) {
            cc.zy.openPage = cc.find("Canvas/sqjbPage");
            cc.zy.openPage.getChildByName("tip").getComponent(cc.Label).string = "已领取" + cc.zy.lingquGold + "金币"
            cc.zy.openPage.active = true
        }
        cc.game.emit("refreshText");
    },

});



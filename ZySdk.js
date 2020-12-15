cc.Class({
    extends: cc.Component,
    properties: {
        newapi: "https://game.xcxvs.com/api/",
    },
    initUserId: function () {
        if (cc.sys.localStorage.getItem("userid") == null || cc.sys.localStorage.getItem("userid") == "") {//浏览器默认是null  微信是""
            cc.sys.localStorage.setItem("userid", this.getUserId(16, 16))
            // cc.zy.wxApi.wxLogin()
            this.wxLogin()
        }
    },
    login: function () {//登陆
        if (cc.sys.localStorage.getItem("userid") == null || cc.sys.localStorage.getItem("userid") == "") {//浏览器默认是null  微信是""
            cc.sys.localStorage.setItem("userid", this.getUserId(16, 16))
            cc.zy.http.url = "https://game.xcxvs.com/api/gameuser";
            var onBackFun = function (ret) {
                // console.log(ret);
            };
            cc.zy.http.sendRequest("",
                {
                    userid: cc.sys.localStorage.getItem("userid"),
                    appid: cc.zy.appid,
                    appname: cc.zy.appName,
                }, onBackFun);
        }
    },

    wxLogin: function () {
        cc.zy.http.url = "https://game.xcxvs.com/api/gameuser";
        var onBackFun = function (ret) {
            // console.log(ret);
        };
        cc.zy.http.sendRequest("",
            {
                userid: cc.sys.localStorage.getItem("userid"),
                appid: cc.zy.appid,
                appname: cc.zy.appName,
                nickName: cc.sys.localStorage.getItem("nickName"),
                avatarUrl: cc.sys.localStorage.getItem("avatarUrl"),
                gender: cc.sys.localStorage.getItem("gender"),
                province: cc.sys.localStorage.getItem("province"),
                city: cc.sys.localStorage.getItem("city"),
                country: cc.sys.localStorage.getItem("country"),
                from: cc.sys.localStorage.getItem("channel"),
                fromappid: cc.sys.localStorage.getItem("fromappid"),
            }, onBackFun);
    },

    setChannel: function () {

    },
    getSessionkey: function (js_code) {

    },
    getGameSetting: function () {
        cc.zy.http.url = "https://game.xcxvs.com/api/my_game";
        var onBackFun = function (ret) {
            cc.zy.getNetSetting = true
            var param = JSON.parse(ret.param)
            // if (param.sussess) {
                cc.zy.globle = param
                cc.zy.isShow=cc.zy.isShow1
                // var channel=1
                // if(cc.sys.localStorage.getItem("channel"))channel=cc.sys.localStorage.getItem("channel")
                // if( cc.zy.globle["b"+channel])cc.zy.globle.bannerId=cc.zy.globle[b+channel]//设置渠道广告
                // if( cc.zy.globle["v"+channel]) cc.zy.globle.videoId=cc.zy.globle[v+channel]
            // }
        };
        cc.zy.http.sendRequest("",
            {
                appid: cc.zy.appid,
                action: "get",
            }, onBackFun);
    },
    getUserSetting: function () {
    }, 
    setUserSetting: function () {
        cc.zy.utils.setUserParam(cc.zy.userParam)
    },
    getLikeGameList: function () {
        var self = this
        cc.zy.http.url = "https://game.xcxvs.com/api/likegame";
        var onBackFun = function (ret) {
            cc.zy.likeGameList = ret
        };
        cc.zy.http.sendRequest("",
            {
                gameid: cc.zy.appid
            }, onBackFun);
    },

    dadian: function (type_id) {//自定义事件

    },

    share_record_ci: function (channel_id) {

    },
    share_record: function (channel_id) {

    },
    share_record_new: function (channel_id) {

    },

    getInterstitialList: function () {

    },
    getShareData: function () {
        cc.zy.http.url = "https://game.xcxvs.com/api/game_share";
        var onBackFun = function (ret) {
            console.log("getShare")
            console.log(ret);
            cc.zy.share = ret.data
        };
        cc.zy.http.sendRequest("",
            {
                appid: cc.zy.appid,
                action: "get",
            }, onBackFun);
    },
    setScore: function () {
        cc.zy.http.url = "https://game.xcxvs.com/api/gameuser";
        var onBackFun = function (ret) {
            // console.log(ret);
        };
        cc.zy.http.sendRequest("",
            {
                userid: cc.sys.localStorage.getItem("userid"),
                appid: cc.zy.appid,
                appname: cc.zy.appName,
                bestScore: cc.zy.utils.getBestScore(),
                bestWeekScore: cc.zy.utils.getBestScore2048()
            }, onBackFun);
    },
    submitEvent: function (type) {//自定义事件

    },
    worldRanAdd: function (key, score) {//提交分数
        // var nickName = cc.sys.localStorage.getItem("nickName") + ""
        // if (nickName == null || nickName == undefined || nickName == "" || nickName.indexOf("甘尬") >= 0 || nickName.indexOf("萤火虫") >= 0) return;
        cc.zy.http.url = "https://game.xcxvs.com/api/world_rankings.php";
        var onBackFun = function (ret) {
            // 
        };
        cc.zy.http.sendRequest("",
            {
                action: "add",
                userid: cc.sys.localStorage.getItem("userid"),
                appid: cc.zy.appid,
                appname: cc.zy.appName,
                nickName: cc.sys.localStorage.getItem("nickName"),
                avatarUrl: cc.sys.localStorage.getItem("avatarUrl"),
                key: key,
                score: score,
            }, onBackFun);
    },

    getWorlRank: function () {//游戏配置
        var self = this
        cc.zy.http.url = "https://game.xcxvs.com/api/world_rankings.php";
        var onBackFun = function (ret) {
            cc.zy.worlrankList = ret
        };
        cc.zy.http.sendRequest("",
            {
                action: "get",
                appid: cc.zy.appid,
                key: "chengyuLv",
                page: 1,
                limit: 50,
            }, onBackFun);
    },
    // getGkWorlRank: function () {//游戏配置
    //     var self = this
    //     cc.zy.http.url = "https://game.xcxvs.com/api/world_rankings.php";
    //     var onBackFun = function (ret) {
    //         cc.zy.gkWorlrankList = ret
    //     };
    //     cc.zy.http.sendRequest("",
    //         {
    //             action: "get",
    //             appid: cc.zy.appid,
    //             key: "chengyuLv",
    //             page: 1,
    //             limit: 50,
    //         }, onBackFun);
    // },

    zhijian: function () {//自定义事件

        var json = {
            "tel": "111",
            "name": "zhangyu"
        }

       window[cc.zy.platform].request({
            url: 'https://testweapp.whwangdoudou.cn/weapp.php',
            method: 'POST',
            data: {          //参数为json格式数据
                m: "send_event",
                uid: 6,
                weappid: "3",
                type: "play",
                content: JSON.stringify(json),   //
                // content:{
                //        "tel": "111",
                //        "name":"zhangyu"
                //         }, 
                openid: "oLrdV4y-rkCAUW852MWZbLz7sQK8",
            },
            header: {
                //设置参数内容类型为json
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
                console.log("res.data")
                console.log(res)
            }
        })

    },


    clickPlayGame: function (to_appid, to_appname) {//自定义事件

    },
    clickToOtherGame: function (to_appid, to_appname) {//跳转

    },
    getUserId(len, radix) {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var uuid = [], i;
        radix = radix || chars.length;

        if (len) {
            // Compact form
            for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
        } else {
            // rfc4122, version 4 form
            var r;
            // rfc4122 requires these characters
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';
            // Fill in random data.  At i==19 set the high bits of clock sequence as
            // per rfc4122, sec. 4.1.5
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random() * 16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }
        return uuid.join('');
    },




    subscription: function () {
        if (window[cc.zy.platform] == undefined) return
        var o = this;
       window[cc.zy.platform].request({
            url: o.newapi + "user_setting?appid=" + cc.zy.appid +
                "&openid=" + cc.sys.localStorage.getItem("openid") +
                "&nickname=" + cc.sys.localStorage.getItem("nickName") +
                "&avatarurl=" + cc.sys.localStorage.getItem("avatarUrl") +
                "&param=" + JSON.stringify(cc.zy.userParam),
            // "&fromopenid=" + cc.zy.inviterId,
            method: "POST",
            header: {
                "Content-Type": "application/json"
            },
            success: function (a) {
              
            }
        });
    },

    sendEv: function (eventId, eventName, shareAppName, onlineTime) {
        if (window[cc.zy.platform] == undefined) return
  
        if (cc.zy.inviterId == cc.sys.localStorage.getItem("userid")) cc.zy.inviterId = ""
        var o = this;
       window[cc.zy.platform].request({
            url: o.newapi + "sendEv?appid=" + cc.zy.appid +
                "&openid=" + cc.sys.localStorage.getItem("userid") +
                "&channelId=" + cc.sys.localStorage.getItem("channel") +
                "&eventId=" + eventId +
                "&eventName=" + eventName +
                "&fromopenid=" + cc.zy.inviterId +
                // "&fromopenid=" +  "test" +
                "&onlinetime=" + onlineTime +
                "&shareappname=" + shareAppName,
            // "&shareappname=" + "ddd",
            // "&fromopenid=" + cc.zy.inviterId,
            method: "POST",
            header: {
                "Content-Type": "application/json"
            },
            success: function (a) {
                // if (a.data.param != "") {
                //     cc.zy.userParam = JSON.parse(a.data.param)
                // } 
            }
        });
    },
    jsonRequest: function (e, t, o) {
        var self = this;
       window[cc.zy.platform].request({
            url: self.newapi + e,
            data: t,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded;charset=utf-8"
            },
            success: function (a) {
                200 == a.statusCode ? o(a.data) : n.ajaxFail();
            },
            fail: function (a) {
                n.ajaxFail();
            },
            complete: function (a) { }
        });
    },
    getUinfo: function () {

    },
    getmlist: function () {
    
      },
});

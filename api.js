const https = "https://www.xcxvs.com/mini-game.com/";
cc.Class({
    extends: cc.Component,

    properties: {

    },
    login: function (fun) {
        if (!window[cc.zy.platform]) return
        var self = this;
        cc.zy.param = {};
        cc.zy.userattributes = {};
        cc.zy.userinfo = {};
        cc.zy.openid = cc.sys.localStorage.getItem("openid")
        cc.zy.nickName = cc.sys.localStorage.getItem("nickName")
        cc.zy.avatarUrl = cc.sys.localStorage.getItem("avatarUrl")
        cc.zy.isShow = 1
        cc.zy.login = 0;
        cc.zy.money = 0;
        // cc.zy.userinfo.pass = 0;
        // cc.zy.userinfo.tili = 5;
        // cc.zy.userinfo.tishi = 1;
        // cc.zy.userinfo.water = 100;
        // cc.zy.userinfo.yangfen = 100;
        // cc.zy.userinfo.huafei = 0;
        // cc.zy.userinfo.shuiguo = 0;
        // cc.zy.userinfo.treeLevel = 0;
        // cc.zy.userinfo.lowerLevelWater = 0;
        // cc.zy.userinfo.totalwater = 0;
        // cc.zy.userinfo.tiliTime = (new Date()).valueOf();
        console.log("loginjsonRequest");
        window[cc.zy.platform].login({
            // force: false,
            success: function (ret) {
                console.log("wxloginsuccess");
                var data = {
                    action: "login",
                    platform: cc.zy.platform,
                    appid: cc.zy.appid,
                    appname: cc.zy.appname,
                    openid: cc.zy.openid,
                    fromopenid: cc.zy.fromopenid,
                    js_code: ret.code
                };
                self.jsonRequest("app-api/xx_user.php", data, function (ret) {
                    console.log("login", ret);
                    // console.log("ret.info", ret.info);
                    // console.log("ret.attributes", ret.attributes);
                    // console.log("ret.levelSetting.capacity", ret.levelSetting.capacity);
                    var param = JSON.parse(ret.setting.param)
                    cc.zy.param = param
                    cc.zy.isShow = param.isShow1
                    cc.zy.login = 1;
                    cc.zy.openid = ret.info.openid;
                    cc.sys.localStorage.setItem("openid", cc.zy.openid)
                    cc.sys.localStorage.setItem("userid", cc.zy.openid)
                    cc.zy.userinfo = ret.info;
                    cc.zy.userattributes = ret.attributes;
                    cc.zy.levelSetting = ret.levelSetting;
                    if (ret.info.nickName && ret.info.nickName != "") {
                        cc.sys.localStorage.setItem("nickName", ret.info.nickName)
                        cc.zy.nickName = cc.sys.localStorage.getItem("nickName")
                        cc.sys.localStorage.setItem("avatarUrl", ret.info.avatarUrl)
                        cc.zy.avatarUrl = cc.sys.localStorage.getItem("avatarUrl")
                    }
                    self.gameuser();//统计
                    self.insertShareClick();//分享点击
                    self.sendEv(0, "登录成功", "", "")////统计
                    "function" == typeof fun && fun(ret);
                });
            },
            fail: function (ret) {
                console.log("wxloginfail" + ret);
            }
        });
    },

    getInviteToday: function (fun) {
        var self = this;
        var data = {
            action: "getInviteToday",
            openid: cc.zy.openid,
        };
        self.jsonRequest("app-api/xx_user.php", data, function (ret) {
            window[cc.zy.platform].hideLoading()
            "function" == typeof fun && fun(ret.data);
        });
    },



    gameuser: function () {//统计
        var data = {
            userid: cc.zy.openid,
            appid: cc.zy.appid,
            appname: cc.zy.appname,
            nickName: cc.zy.nickName,
            avatarUrl: cc.zy.avatarUrl,
            gender: "",
            province: "",
            city: "",
            country: "",
            from: cc.zy.channel,
            fromappid: "",
        };
        window[cc.zy.platform].request({
            url: "https://game.xcxvs.com/api/gameuser",
            data: data,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded;charset=utf-8"
            },
            success: function (ret) {
                console.log("gameuser", ret);
            },
            fail: function (a) {
            },
            complete: function (a) { }
        });
    },





    updateAttributes: function (updatekey, updateval, fun) {//加法
        var self = this;
        var data = {
            action: "updateAttributes",
            updatekey: updatekey,
            updateval: updateval,
            openid: cc.zy.openid
        };
        self.jsonRequest("app-api/xx_user.php", data, function (ret) {
            console.log("updateAttributes", ret);
            "function" == typeof fun && fun();
        });
    },


    updatekey: function (updatekey, updateval, fun) {//加法
        var self = this;
        var data = {
            action: "updatekey",
            updatekey: updatekey,
            updateval: updateval,
            appname: cc.zy.appname,
            appid: cc.zy.appid,
            openid: cc.zy.openid
        };
        self.jsonRequest("app-api/xx_user.php", data, function (ret) {
            console.log("updatekey", ret);
            "function" == typeof fun && fun();
        });
    },
    updatekey2: function (updatekey, updateval, fun) {//只更新
        var self = this;
        var data = {
            action: "updatekey",
            updatetype: "1",
            updatekey: updatekey,
            updateval: updateval,
            appname: cc.zy.appname,
            appid: cc.zy.appid,
            openid: cc.zy.openid
        };
        self.jsonRequest("app-api/xx_user.php", data, function (ret) {
            console.log("updatekey2", ret);
            "function" == typeof fun && fun();
        });
    },

    insertDynamic: function (dynamic) {
        var self = this;
        var data = {
            action: "insertDynamic",
            dynamic: dynamic,
            openid: cc.zy.openid
        };
        self.jsonRequest("app-api/xx_user.php", data, function (ret) {
            console.log("updateTishi", ret);
        });
    },
    getDynamic: function (fun) {
        var self = this;
        var data = {
            action: "getDynamic",
            openid: cc.zy.openid
        };
        self.jsonRequest("app-api/xx_user.php", data, function (ret) {
            console.log("getDynamic", ret);
            "function" == typeof fun && fun(ret.data);
        });
    },
    updateUserInfo: function (UserInfo, fun) {
        var self = this;
        window[cc.zy.platform].setStorage({
            key: "userInfo",
            data: UserInfo
        })

        cc.sys.localStorage.setItem("nickName", UserInfo.nickName)
        cc.zy.nickName = cc.sys.localStorage.getItem("nickName")
        cc.sys.localStorage.setItem("avatarUrl", UserInfo.avatarUrl)
        cc.zy.avatarUrl = cc.sys.localStorage.getItem("avatarUrl")

        var data = {
            action: "auth",
            appname: cc.zy.appname,
            appid: cc.zy.appid,
            openid: cc.zy.openid,
            nickName: UserInfo.nickName,
            avatarUrl: UserInfo.avatarUrl,
            gender: UserInfo.gender,
            province: UserInfo.province,
            city: UserInfo.city,
            country: UserInfo.country
        };
        self.jsonRequest("app-api/xx_user.php", data, function (ret) {
            console.log("auth", ret);
            window[cc.zy.platform].hideLoading()
            cc.zy.nickName = UserInfo.nickName;
            cc.zy.avatarUrl = UserInfo.avatarUrl;
            self.sendEv(0, "授权成功", "", "")
            "function" == typeof fun && fun();
        });
    },




    getRobot: function (fun) {
        var self = this;
        var data = {
            action: "getRobot"
        };
        self.jsonRequest("bushu/user.php", data, function (ret) {
            console.log("getRobot", ret);
            window[cc.zy.platform].hideLoading()
            "function" == typeof fun && fun(ret.data);
        });
    },


    insertShareClick: function (fun) {
        if (cc.zy.shareopenid) {
            var self = this;
            var data = {
                action: "insertShareClick",
                shareopenid: cc.zy.shareopenid,
                openid: cc.zy.openid,
                nickName: cc.zy.nickName,
                avatarUrl: cc.zy.avatarUrl,
            };

            self.jsonRequest("app-api/xx_user.php", data, function (ret) {
                // console.log("getInvite", ret);
                window[cc.zy.platform].hideLoading()
                "function" == typeof fun && fun(ret.data);
            });
        }
    },

    getShareClickToday: function (fun) {
        var self = this;
        var data = {
            action: "getShareClickToday",
            shareopenid: cc.zy.openid,
        };
        console.log(data)
        self.jsonRequest("app-api/xx_user.php", data, function (ret) {
            // console.log("getInvite", ret);
            window[cc.zy.platform].hideLoading()
            "function" == typeof fun && fun(ret.data);
        });
    },
    getShareClick: function (fun) {
        var self = this;
        var data = {
            action: "getShareClick",
            shareopenid: cc.zy.openid,
        };
        console.log(data)
        self.jsonRequest("app-api/xx_user.php", data, function (ret) {
            // console.log("getInvite", ret);
            wx.hideLoading()
            "function" == typeof fun && fun(ret.data);
        });
    },
    getFiend: function (fun) {
        var self = this;
        var data = {
            action: "getFiend",
            shareopenid: cc.zy.openid,
        };
        console.log(data)
        self.jsonRequest("app-api/xx_user.php", data, function (ret) {
            // console.log("getInvite", ret);
            wx.hideLoading()
            "function" == typeof fun && fun(ret.data);
        });
    },
    getInvite: function (fun) {
        var self = this;
        var data = {
            action: "getInvite",
            openid: cc.zy.openid,
        };
        console.log(data)
        self.jsonRequest("bushu/user.php", data, function (ret) {
            // console.log("getInvite", ret);
            window[cc.zy.platform].hideLoading()
            "function" == typeof fun && fun(ret.data);
        });
    },


    getInviteCount: function (fun) {
        var self = this;
        var data = {
            action: "getInviteCount",
            openid: cc.zy.openid,
        };
        console.log(data)
        self.jsonRequest("bushu/user.php", data, function (ret) {
            // console.log("getInvite", ret);
            window[cc.zy.platform].hideLoading()
            "function" == typeof fun && fun(ret.count);
        });
    },



    setInvite: function (openid, fun) {
        var self = this;
        var data = {
            action: "setInvite",
            openid: openid,
        };
        console.log(data)
        self.jsonRequest("bushu/user.php", data, function (ret) {
            // console.log("setInvite", ret);
            window[cc.zy.platform].hideLoading()
            "function" == typeof fun && fun(ret.data);
        });
    },

    setInviteOk: function () {
        var self = this;
        var data = {
            action: "setInviteOk",
            openid: cc.zy.openid,
        };
        self.jsonRequest("bushu/user.php", data, function (ret) {
            console.log("setInviteOk", ret);
        });
    },



    addformid: function (formid) {
        var self = this;
        var data = {
            action: "add",
            appname: cc.zy.appname,
            appid: cc.zy.appid,
            openid: cc.zy.openid,
            formid: formid
        };
        self.jsonRequest("app-api/form.php", data, function (ret) {
            window[cc.zy.platform].hideLoading()
            console.log("addformid", ret);
        });
    },

    getSetting: function (fun) {
        var self = this;
        var data = {
            action2: "get",
            appid: cc.zy.appid
        };
        self.jsonRequest("app-api/my_game.php", data, function (ret) {
            window[cc.zy.platform].hideLoading()
            console.log("getSetting", ret);
            "function" == typeof fun && fun(ret);
        });
    },
    getKeyByRedis: function (key, value, second, fun) {
        var self = this;
        var data = {
            action: "get",
            key: cc.zy.openid + "_" + key,
            second: second ? second : 86400,
            value: value
        };
        self.jsonRequest("app-api/storageRedis.php", data, function (ret) {
            console.log("getKeyByRedis", ret);
            "function" == typeof fun && fun(ret.value);
        });
    },
    setKeyByRedis: function (key, value, second, fun) {
        var self = this;
        var data = {
            action: "set",
            key: cc.zy.openid + "_" + key,
            second: second ? second : 86400,
            value: value
        };
        self.jsonRequest("app-api/storageRedis.php", data, function (ret) {
            console.log("setKeyByRedis", ret);
            "function" == typeof fun && fun(ret);
        });
    },

    getTodayByRedis: function (key, value, fun) {
        var self = this;
        var data = {
            action: "getTodayByRedis",
            key: cc.zy.openid + "_" + key,
            value: value
        };
        self.jsonRequest("app-api/storageRedis.php", data, function (ret) {
            console.log("getTodayByRedis", ret);
            "function" == typeof fun && fun(ret.value);
        });
    },
    setTodayByRedis: function (key, value, fun) {
        var self = this;
        var data = {
            action: "setTodayByRedis",
            key: cc.zy.openid + "_" + key,
            value: value
        };
        self.jsonRequest("app-api/storageRedis.php", data, function (ret) {
            console.log("setTodayByRedis", ret);
            "function" == typeof fun && fun(ret);
        });
    },

    getListByRedis: function (key, second, fun) {
        var self = this;
        var data = {
            action: "getList",
            key: cc.zy.openid + "_" + key,
            second: second ? second : 86400
        };
        self.jsonRequest("app-api/storageRedis.php", data, function (ret) {
            console.log("getListByRedis", ret);
            "function" == typeof fun && fun(ret.value);
        });
    },
    setListByRedis: function (key, value, second, fun) {
        var self = this;
        var data = {
            action: "setList",
            key: cc.zy.openid + "_" + key,
            second: second ? second : 86400,
            value: value
        };
        self.jsonRequest("app-api/storageRedis.php", data, function (ret) {
            console.log("setListByRedis", ret);
            "function" == typeof fun && fun(ret);
        });
    },
    getSetByRedis: function (key, fun) {
        var self = this;
        var data = {
            action: "getSetByRedis",
            key: cc.zy.openid + "_" + key
        };
        self.jsonRequest("app-api/storageRedis.php", data, function (ret) {
            console.log("getSetByRedis", ret);
            "function" == typeof fun && fun(ret.value);
        });
    },

    deleteByRedis: function (key, fun) {
        var self = this;
        var data = {
            action: "deleteByRedis",
            key: cc.zy.openid + "_" + key,
        };
        self.jsonRequest("app-api/storageRedis.php", data, function (ret) {
            console.log("deleteByRedis", ret);
            "function" == typeof fun && fun(ret.value);
        });
    },
    setSetByRedis: function (key, value, second, fun) {
        var self = this;
        var data = {
            action: "setSetByRedis",
            key: cc.zy.openid + "_" + key,
            second: second ? second : 86400,
            value: value
        };
        self.jsonRequest("app-api/storageRedis.php", data, function (ret) {
            console.log("setSetByRedis", ret);
            "function" == typeof fun && fun(ret);
        });
    },

    getHashByRedis: function (key, fun) {
        var self = this;
        var data = {
            action: "getHashByRedis",
            key: cc.zy.openid + "_" + key
        };
        self.jsonRequest("app-api/storageRedis.php", data, function (ret) {
            console.log("getHashByRedis", ret);
            "function" == typeof fun && fun(ret?ret.value:null);
        });
    },
    setHashByRedis: function (key, key1, value, second, fun) {
        var self = this;
        var data = {
            action: "setHashByRedis",
            key: cc.zy.openid + "_" + key,
            key1: key1,
            second: second ? second : 86400,
            value: value
        };
        self.jsonRequest("app-api/storageRedis.php", data, function (ret) {
            console.log("setHashByRedis", ret);
            "function" == typeof fun && fun(ret);
        });
    },
    getAllKeyByRedis: function (allkey, fun) {
        var self = this;
        var data = {
            action: "getAllKeyByRedis",
            openid: cc.zy.openid,
            allkey: allkey
        };
        self.jsonRequest("app-api/storageRedis.php", data, function (ret) {
            console.log("getAllKeyByRedis", ret);
            "function" == typeof fun && fun(ret?ret.value:null);
        });
    },
    getKey: function (key, value, fun) {
        var self = this;
        var data = {
            action: "get",
            key: cc.zy.openid + "_" + key,
            value: value
        };
        self.jsonRequest("app-api/storage.php", data, function (ret) {
            window[cc.zy.platform].hideLoading()
            console.log("getKey", ret);
            "function" == typeof fun && fun(ret.value);
        });
    },
    setKey: function (key, value, fun) {
        var self = this;
        var data = {
            action: "set",
            key: cc.zy.openid + "_" + key,
            value: value
        };
        self.jsonRequest("app-api/storage.php", data, function (ret) {
            window[cc.zy.platform].hideLoading()
            console.log("setKey", ret);
            "function" == typeof fun && fun(ret);
        });
    },


    getAlways: function (key, value, fun) {
        var self = this;
        var data = {
            action: "getAlways",
            openid: cc.zy.openid,
            key: key,
            value: value
        };
        self.jsonRequest("app-api/storage.php", data, function (ret) {
            window[cc.zy.platform].hideLoading()
            console.log("getAlways", ret);
            "function" == typeof fun && fun(ret.value);
        });
    },
    setAlways: function (key, value, fun) {
        var self = this;
        var data = {
            action: "setAlways",
            openid: cc.zy.openid,
            key: key,
            value: value
        };
        self.jsonRequest("app-api/storage.php", data, function (ret) {
            window[cc.zy.platform].hideLoading()
            console.log("setAlways", ret);
            "function" == typeof fun && fun(ret);
        });
    },

    getToday: function (key, value, fun) {
        var self = this;
        var data = {
            action: "getToday",
            openid: cc.zy.openid,
            key: key,
            value: value
        };
        window[cc.zy.platform].showLoading()
        self.jsonRequest("app-api/storage.php", data, function (ret) {
            window[cc.zy.platform].hideLoading()
            console.log("getToday", ret);
            "function" == typeof fun && fun(ret.value);
        });
    },
    setToday: function (key, value, fun) {
        var self = this;
        var data = {
            action: "setToday",
            openid: cc.zy.openid,
            key: key,
            value: value
        };
        self.jsonRequest("app-api/storage.php", data, function (ret) {
            window[cc.zy.platform].hideLoading()
            console.log("setToday", ret);
            "function" == typeof fun && fun(ret);
        });
    },

    exchange: function (data, fun) {
        this.jsonRequest("app-api/exchange_detail.php", data, function (ret) {
            console.log("exchange_detail", ret);
            window[cc.zy.platform].hideLoading()
            "function" == typeof fun && fun(ret);
        });
    },

    subscription: function () {
        var self = this;
        var data = {
            openid: cc.zy.openid,
            nickName: cc.zy.nickName,
            appname: cc.zy.appname,
            appid: cc.zy.appid
        };
        self.jsonRequest("app-api/subscription.php", data, function (ret) {
            console.log("subscription", ret);
        });
    },

    subscribeAppMsg: function () {
        if (!window[cc.zy.platform]) return
        var self = this;
        if (window[cc.zy.platform].getStorageSync("authSetting") != 1) {
            window[cc.zy.platform].subscribeAppMsg({
                subscribe: true,
                success(res) {
                    self.subscription();
                    self.sendEv(0, "主动订阅", "", "")
                },
                fail(res) {
                }
            })
            window[cc.zy.platform].setStorageSync("authSetting", 1);
        } else {
        }
        window[cc.zy.platform].setStorageSync("authSetting", 1);
    },


    sendEv: function (eventId, eventName, shareAppName, onlineTime) {
        window[cc.zy.platform].request({
            url: "https://game.xcxvs.com/api/sendEv?appid=" + cc.zy.appid +
                "&openid=" + cc.zy.openid +
                "&channelId=" + cc.zy.channel +
                "&eventId=" + eventId +
                "&eventName=" + eventName +
                "&fromopenid=" + cc.zy.fromopenid +
                "&onlinetime=" + onlineTime +
                "&shareappname=" + shareAppName,
            method: "POST",
            header: {
                "Content-Type": "application/json"
            },
            success: function (a) {
            }
        });
    },


    jsonRequest: function (api, data, fun) {
        if (!window[cc.zy.platform]) return
        var self = this;
        window[cc.zy.platform].request({
            url: https + api,
            data: data,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded;charset=utf-8"
            },
            success: function (ret) {
                200 == ret.statusCode ? fun(ret.data) : self.ajaxFail();
            },
            fail: function (a) {
                self.ajaxFail();
            },
            complete: function (a) { }
        });
    },
    ajaxFail: function () {
        window[cc.zy.platform].hideLoading();
    },

});

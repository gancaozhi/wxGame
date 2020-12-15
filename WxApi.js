

cc.Class({
    extends: cc.Component,
    properties: {

    },

    showShareMenu: function () {
        var self = this
        if (window[cc.zy.platform] != undefined) {
          window[cc.zy.platform].showShareMenu({ withShareTicket: true });//设置分享按钮，方便获取群id展示群排行榜
            var title = "我通过了999关，你敢试一试吗！"
            var imageUrl = "https://6379-cy-54ed20-1258929048.tcb.qcloud.la/share.jpg"
            if (cc.zy.share && cc.zy.share.length > 0 && cc.zy.isShow) {//拿不到就默认
                var random = cc.zy.utils.getRandom(cc.zy.share.length)
                title = cc.zy.share[random].title
                imageUrl = cc.zy.share[random].url
            }
            var openid = cc.sys.localStorage.getItem("userid");
            // var openid = cc.sys.localStorage.getItem("openid");
           window[cc.zy.platform].onShareAppMessage(function () {
                return {
                    title: title,
                    imageUrl: imageUrl,
                    query: "channel=4&openid=" + openid,
                }
            });
        }
    },

    openKefu: function () {//进入客服会话
        if (window[cc.zy.platform] != undefined) {
            cc.zy.wxApi.aldSendEvent2("进入客服", { "channel": cc.sys.localStorage.getItem("channel") })
           window[cc.zy.platform].openCustomerServiceConversation({
                sessionFrom: '进入客服',
                showMessageCard: true,
                sendMessageTitle: "点我就可以领取水滴哦！",
                sendMessagePath: '?kefu=1',
                sendMessageImg: 'lingshuidi.png',
                success: function (res) {
                    console.log(res);
                    cc.zy.kefu=1;
                    cc.zy.wxApi.aldSendEvent2("进入客服成功", { "channel": cc.sys.localStorage.getItem("channel") })
                }
            })
        }
    },

    aldSendEvent: function (name) {
        if (window[cc.zy.platform] != undefined) {
            //    cc.zy.wxApi.aldSendEvent2(name)
            cc.zy.api.sendEv(0, name, "", "")//完整看视频
        }
    },

    aldSendEvent2: function (name, param) {
        if (window[cc.zy.platform] != undefined) {
            //    cc.zy.wxApi.aldSendEvent2(name, param)
            cc.zy.api.sendEv(0, name, "", "")//完整看视频
        }
    },

    getLaunchOptionsSync: function () {
        if (window[cc.zy.platform] != undefined) {
            var self = this;
    
            var LaunchOption =window[cc.zy.platform].getLaunchOptionsSync();

            console.log(LaunchOption)
            if (cc.zy.utils.isNewUser()) {
                cc.sys.localStorage.setItem("newUser", "false")
                cc.zy.isNew = true
            } else {
                cc.zy.isNew = false
            }

            cc.zy.shareopenid = LaunchOption.query.openid ? LaunchOption.query.openid : null;
            cc.zy.tastkey = LaunchOption.query.tastkey ? LaunchOption.query.tastkey : "";
            cc.zy.suoyaoid = LaunchOption.query.suoyaoid ? LaunchOption.query.suoyaoid : null;
            cc.zy.suoyaoIndex = LaunchOption.query.suoyaoIndex ? LaunchOption.query.suoyaoIndex : null;
            cc.zy.suoyaoOpenid = LaunchOption.query.suoyaoOpenid ? LaunchOption.query.suoyaoOpenid : null;
            cc.zy.suoyaoword = LaunchOption.query.suoyaoword ? LaunchOption.query.suoyaoword : null;
            // cc.zy.kefu = LaunchOption.query.kefu ? LaunchOption.query.kefu : null;

            if (LaunchOption.query.openid != undefined && cc.zy.isNew) { //存在邀请人openid 玩家是被邀请的
                cc.zy.inviterId = LaunchOption.query.openid;
                cc.zy.fromopenid= LaunchOption.query.openid;
            }

            if (LaunchOption.query.showbanner != undefined) { //存在邀请人openid 玩家是被邀请的
                cc.zy.showbanner = LaunchOption.query.showbanner;
            } else {
                cc.zy.showbanner = 0;
            }

            if (LaunchOption.query.task != undefined) { //存在邀请人openid 玩家是被邀请的
                cc.zy.task = LaunchOption.query.task;
            } else {
                cc.zy.task = 0;
            }

            if (LaunchOption.scene == 1104 || LaunchOption.scene == 1103 || LaunchOption.scene == 1023) {
                cc.sys.localStorage.setItem("addToMyMiniSuccess", "true");
            }
            if (LaunchOption.query.sharechannel != undefined) {
                if (cc.zy.isNew) {
                    cc.zy.zySdk.share_record_new(LaunchOption.query.sharechannel)
                }
                cc.zy.wxApi.aldSendEvent2("分享回流渠道", { 'channel': LaunchOption.query.sharechannel });
                cc.zy.storageMgr.setKey("sharechannel", LaunchOption.query.sharechannel)
            }

            if (LaunchOption.scene == 1037) {//小程序打开小程序
                cc.zy.wxApi.aldSendEvent2("渠道appid", { 'appid': LaunchOption.referrerInfo.appId });
            }

            if (LaunchOption.query.channel != undefined) {
                cc.zy.channel = LaunchOption.query.channel
                if (cc.sys.localStorage.getItem("channel") == null || cc.sys.localStorage.getItem("channel") == "") {//浏览器默认是null  微信是""
                    cc.sys.localStorage.setItem("channel", LaunchOption.query.channel)
                    if (LaunchOption.scene == 1037) {//小程序打开小程序
                        cc.sys.localStorage.setItem("fromappid", LaunchOption.referrerInfo.appId)
                    }
                    // cc.zy.zySdk.setChannel()
                }
            } else {
                if (cc.sys.localStorage.getItem("channel") == null || cc.sys.localStorage.getItem("channel") == "") {//浏览器默认是null  微信是""  第一次
                    cc.sys.localStorage.setItem("channel", "1")
                    // cc.zy.zySdk.setChannel()
                }
            }
            cc.zy.channel = cc.sys.localStorage.getItem("channel")
            this.wxLogin()
        }
    },

    showToast: function (title) {//自动跳转
        if (window[cc.zy.platform] != undefined) {
           window[cc.zy.platform].showToast({
                title: title,
                icon: 'success',
                duration: 2000
            })
        }
    },
    showloading: function () {//微信授权
        if (window[cc.zy.platform] != undefined) {
           window[cc.zy.platform].showToast({
                title: '加载中。。。',
                icon: 'loading',
                duration: 500
            })
        }
    },


    showToast2: function (title) {//tishi
        if (window[cc.zy.platform] != undefined) {
           window[cc.zy.platform].showToast({
                title: title,
                icon: 'none',
                duration: 1000
            })
        }
    },

    tip(content) {
        var self = this
       window[cc.zy.platform].showModal({
            title: '提示',
            content: content,
            confirmText: '我知道了',
            showCancel: false,
        })
    },

    share: function () {
        var self = this
        if (window[cc.zy.platform] != undefined) {
            // this.getOpenId()//获得session_key
            var title = "我通过了999关，你敢试一试吗！"
            var imageUrl = "https://6379-cy-54ed20-1258929048.tcb.qcloud.la/share.jpg"
            if (cc.zy.share && cc.zy.share.length > 0 && cc.zy.isShow) {//拿不到就默认
                var random = cc.zy.utils.getRandom(cc.zy.share.length)
                title = cc.zy.share[random].title
                imageUrl = cc.zy.share[random].url
            }
            var queryContent = "channel=4";
            var openid = cc.sys.localStorage.getItem("userid");
            var id = "&openid=" + openid;
            queryContent += id;

            var shareappid = "&shareappid=appid" + cc.sys.localStorage.getItem("fromappid");
            queryContent += shareappid;
            var sharechannel = "&sharechannel=" + cc.sys.localStorage.getItem("channel");
            queryContent += sharechannel;

            var ran = cc.zy.utils.random(1, 3)
           window[cc.zy.platform].shareAppMessage({
                title: title,
                imageUrl: imageUrl,
                query: queryContent,
            });
            this.shareAnalysis()
        }
    },
    shareAnalysis: function () {//分享分析
        cc.zy.api.sendEv(3, "分享", "", "")//分享
        cc.zy.wxApi.aldSendEvent2("分享", { 'appId': cc.sys.localStorage.getItem("fromappid") });
        cc.zy.wxApi.aldSendEvent2("分享渠道", { 'channel': cc.sys.localStorage.getItem("channel") });
        // cc.zy.zySdk.share_record("appid"+cc.sys.localStorage.getItem("fromappid"))
        cc.zy.zySdk.share_record_ci(cc.sys.localStorage.getItem("channel"))
        var key = "sharechannel" + cc.zy.utils.getTodayStr()
        if (cc.zy.storageMgr.isFist(key)) {
            cc.zy.zySdk.share_record(cc.sys.localStorage.getItem("channel"))
            cc.sys.localStorage.setItem(key, "false");
        }
    },
    wxLogin: function () {//登陆 获取openid  session_key
        //window[cc.zy.platform].login({
        //     success: function (res) {
        //         if (res.code) {
        //             var code = res.code;
        //             cc.zy.http.url = "https://game.xcxvs.com/api/get_openid";
        //             var onBackFun = function (res) {
        //                 //保存openid
        //                 cc.zy.openid = res.openid
        //                 cc.sys.localStorage.setItem("userid", res.openid)
        //                 cc.sys.localStorage.setItem("openid", res.openid);
        //                 cc.sys.localStorage.setItem("session_key", res.session_key);
        //                 cc.zy.wxApi.showShareMenu();//设置分享菜单按钮
        //                 cc.zy.zySdk.wxLogin();
        //                 cc.zy.zySdk.getUinfo();
        //                 cc.zy.zySdk.getUserSetting();
        //                 cc.zy.zySdk.getmlist();
        //             };
        //             cc.zy.http.sendRequest("",
        //                 {
        //                     appid: cc.zy.appid,
        //                     js_code: code,
        //                     grant_type: "authorization_code",
        //                 }, onBackFun);
        //         } else {
        //             console.log('登录失败！' + res.errMsg)
        //         }
        //     }
        // });
        cc.zy.api.login(null);
    },

    getUserInfo: function (fun) {//微信授权
        var self = this
        if (window[cc.zy.platform] != undefined) {
           window[cc.zy.platform].getUserInfo({
                success: function (res) {

                    var userInfo = res.userInfo
                    var nickName = userInfo.nickName
                    var avatarUrl = userInfo.avatarUrl
                    var gender = userInfo.gender //性别 0：未知、1：男、2：女
                    var province = userInfo.province
                    var city = userInfo.city
                    var country = userInfo.country
                    cc.sys.localStorage.setItem("isauthorize", 1)//授权

                    cc.sys.localStorage.setItem("nickName", nickName)//保存到本地
                    cc.sys.localStorage.setItem("avatarUrl", avatarUrl)
                    // cc.sys.localStorage.setItem("gender", gender)
                    // cc.sys.localStorage.setItem("province", province)
                    // cc.sys.localStorage.setItem("city", city)
                    // cc.sys.localStorage.setItem("country", country)
                    // cc.zy.zySdk.wxLogin()//授权登陆
                    cc.zy.api.updateUserInfo(userInfo,null);
                    "function" == typeof fun && fun();
                    // cc.zy.userParam.isauthorize = 1
                    // cc.zy.zySdk.setUserSetting();
                },
                fail: function (res) {
                    // self.createWxButton()
                }
            })
        }
    },

    createWxButton: function () {
        var self = this
        if (cc.sys.localStorage.getItem("nickName") != null & cc.sys.localStorage.getItem("nickName") != "") {
            self.wxLogin()
            return;
        }
        var self = this;
        if (window[cc.zy.platform] != undefined) {
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
            this.button =window[cc.zy.platform].createUserInfoButton({
                type: 'image',
                image: "http://lg-09px8wpw-1257721288.file.myqcloud.com/game/login.png",
                style: {
                    left: windowWidth / 2 - width / 2,
                    top: windowHeight / 2 - height / 2 + 15 / 2,
                    width: width,
                    height: height,
                }
            })
            this.button.onTap((res) => {
                self.button.destroy()
                cc.director.loadScene("Game");
                if (!res.userInfo) {
                    return;
                }
                if (typeof cc.zy.nickName !== 'undefined') {
                } else {
                    var userInfo = res.userInfo
                    var nickName = userInfo.nickName
                    var avatarUrl = userInfo.avatarUrl
                    var gender = userInfo.gender //性别 0：未知、1：男、2：女
                    var province = userInfo.province
                    var city = userInfo.city
                    var country = userInfo.country
                    cc.zy.nickName = nickName;
                    cc.zy.avatarUrl = avatarUrl;
                    cc.sys.localStorage.setItem("nickName", nickName)//保存到本地
                    cc.sys.localStorage.setItem("avatarUrl", avatarUrl)
                    cc.sys.localStorage.setItem("gender", gender)
                    cc.sys.localStorage.setItem("province", province)
                    cc.sys.localStorage.setItem("city", city)
                    cc.sys.localStorage.setItem("country", country)

                    // if (cc.sys.localStorage.getItem("nickName") == null || cc.sys.localStorage.getItem("nickName") == "") {//浏览器默认是null  微信是""
                    //     cc.zy.wxApi.aldSendEvent("授权成功")
                    //     cc.zy.zySdk.submitEvent(8)
                    //     cc.zy.zySdk.dadian(8)//授权成功
                    // }
                    cc.zy.zySdk.wxLogin();
                    self.wxLogin()
                    cc.zy.userParam.isauthorize = 1
                    cc.zy.zySdk.setUserSetting();
                }
            })
        }
    },

    requestSubscribeMessage(messageId) {
        //订阅消息
     
        const templates = {
            'new-version': 'BfDNBukLJZnf_ZyDp7p8J_C-c0rPYAPUDGsasBc0R64',
            'add-level': 'G_y9jbk9-kBNqsb1Z7SH4wXsNyX4jR3EWLUNi3Yoc4A',
            'message-rank': 'MeeVB8s0kKBSSwx0Fs-NjcfVnjosKquLfwZAa35U3-o'
        }

        let id = templates[messageId];
        if (this.subscribeMessage[id]) {
            console.log('消息已经订阅');
            return;
        }

       window[cc.zy.platform].requestSubscribeMessage({
            tmplIds: [id],
            success(res) {
                console.log('订阅成功', res);
                if (res[id] === 'accept') {
                    wxapi.uploadSubscribeMessage(id);
                }
            },
            fail(res) {
                console.log('订阅失败', res);
            }
        });
    },
    /**
     * 保存得分（子域）
     */
    saveScore(score, level) {
        // if (cc.sys.platform !== cc.sys.WECHAT_GAME) {
        //     return;
        // }
        // 发消息给子域
       window[cc.zy.platform].postMessage({
            message: 'save-score',
            score,
            level
        });

        //上传微信云
        this.uploadScore(score, level);
    },

      /**
     * 保存得分（子域）
     */
    saveScore(score, level) {
        // if (cc.sys.platform !== cc.sys.WECHAT_GAME) {
        //     return;
        // }
        // 发消息给子域
       window[cc.zy.platform].postMessage({
            message: 'save-score',
            score,
            level
        });

    },

    /**
     * 显示排行
     */
    showRankView(show) {
        // if (cc.sys.platform !== cc.sys.WECHAT_GAME) {
        //     return;
        // }

       window[cc.zy.platform].postMessage({// 发消息给子域
            message: show ? 'show-rank-list' : 'close-rank-list'
        });
    },

        /**
     * 显示邀请好友
     */
    showShareView(show) {
        // if (cc.sys.platform !== cc.sys.WECHAT_GAME) {
        //     return;
        // }
        console.log('showShareView');
       window[cc.zy.platform].postMessage({// 发消息给子域
            message: show ? 'show-share-list' : 'close-share-list'
        });
    },

});

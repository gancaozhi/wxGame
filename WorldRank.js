var limit = 50;
cc.Class({
    extends: cc.Component,
    properties: {
        content2048: cc.Node,
        prefabRankItem: cc.Prefab,
        scrollview2048: cc.Node,
        myRank2048: cc.Node,
        Scroebtn: cc.Node,
        Gkbtn: cc.Node,
    },
    start() {
        cc.zy.wxApi.aldSendEvent('进入世界排行榜')
        var ret = cc.zy.worlrankList
        if (ret == undefined) {
            this.getWorlRank()
        } else {
            this.btnScroe()
        }

        var ret2 = cc.zy.gkWorlrankList
        if (ret2 == undefined) {
            this.getGkWorlRank()
        } 
    },
    getWorlRank: function () {//游戏配置
        var self = this
        cc.zy.http.url = "https://game.xcxvs.com/api//world_rankings.php";
        var onBackFun = function (ret) {
            cc.zy.worlrankList = ret
            self.getLikeGame()
        };
        cc.zy.http.sendRequest("",
            {
                action: "get",
                appid: cc.zy.appid,
                key: "xxxxbestScore",
                page: 1,
                limit: 50,
            }, onBackFun);
    },
    getGkWorlRank: function () {//游戏配置
        var self = this
        cc.zy.http.url = "https://game.xcxvs.com/api//world_rankings.php";
        var onBackFun = function (ret) {
            cc.zy.gkWorlrankList= ret
        };
        cc.zy.http.sendRequest("",
        {
            action: "get",
            appid: cc.zy.appid,
            key: "xxxxbestScoreGK",
            page: 1,
            limit: 50,
        }, onBackFun);
    },
    showWorlRank: function () {
        var self = this
        var ret = this.rankList
        if (ret == undefined) {
            return;
        }
        self.content2048.removeAllChildren()
        if (ret.count > 0) {
            var data = ret.info;
            var myrank = 0;
            var smallscore = 0;
            self.content2048.height = 94 * ret.count + 500
            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                let userItem = cc.instantiate(self.prefabRankItem);
                userItem.y = -index * 98 - 50;
                userItem.parent = self.content2048

                let rank = userItem.getChildByName("rank").getComponent(cc.Label);
                let name = userItem.getChildByName("name").getComponent(cc.Label);
                let score =userItem.getChildByName("score").getComponent(cc.Label);
                let touxiang = userItem.getChildByName("touxiang").getComponent(cc.Sprite);
                if (index < 3) {
                    var r = index + 1
                    let rank = userItem.getChildByName("rank" + r);
                    rank.active = true

                    // let crownIcon = userItem.getChildByName("crownIcon");
                    // crownIcon.active=true
                }


                rank.string = index + 1
                name.string = element.nickName
                score.string = this.wenzi+ element.score
                cc.zy.utils.createImage(touxiang, element.avatarUrl)
                if (element.userid == cc.sys.localStorage.getItem("userid")) {
                    myrank = index + 1
                }
                smallscore = element.score
            }

            let rank = self.myRank2048.getChildByName("rank").getComponent(cc.Label);
            let name = self.myRank2048.getChildByName("name").getComponent(cc.Label);
            // let score = self.myRank2048.getChildByName("score").getComponent(cc.Label);
            let touxiang = self.myRank2048.getChildByName("touxiang").getComponent(cc.Sprite);
    
            if (myrank > 0) {
                rank.string = "我的排名：" + myrank
            } else {
                // var dis=smallscore- cc.zy.utils.getBestScore2048()
                // rank.string =parseInt(dis/1000+limit)
                rank.string = "我的排名：没进榜"
            }
            name.string = cc.sys.localStorage.getItem("nickName")
            // score.string = this.wenzi + cc.zy.utils.getBestScorePop()
            cc.zy.utils.createImage(touxiang, cc.sys.localStorage.getItem("avatarUrl"))

        }

    },
    btnScroe() {
        this.Scroebtn.active = true
        this.Gkbtn.active = false
        this.rankList=cc.zy.worlrankList
        this.wenzi=""
        this.showWorlRank()


        let score = this.myRank2048.getChildByName("score").getComponent(cc.Label)
        score.string = "分数："+ cc.zy.utils.getBestScorePop()
    },



    btnGk() {
        this.Scroebtn.active = false
        this.Gkbtn.active = true

        this.rankList=cc.zy.gkWorlrankList
        this.wenzi="关卡："
        this.showWorlRank()

        let score = this.myRank2048.getChildByName("score").getComponent(cc.Label)
        score.string = this.wenzi + cc.zy.storageMgr.getKey("bestStage", 1)
    },

 
    returnButtonFunc: function (event) {
        cc.director.loadScene("Home")
    },


    enterRank: function () {
        cc.director.loadScene("Rank")
    },
    share: function () {
        cc.zy.wxApi.share()
    },

});

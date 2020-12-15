//规则  优先视频  广告主  分享到群（每天三次）
cc.Class({
    extends: cc.Component,

    properties: {
        _onCloseCallBack: null,
    },

    init() {
        if (window.wx != undefined) {
            // 定义插屏广告
            this.interstitialAd = null
            // 创建插屏广告实例，提前初始化
            if (wx.createInterstitialAd) {
                this.interstitialAd = wx.createInterstitialAd({
                    adUnitId: 'adunit-01c107e095ff57fa'
                })
            }
            this.interstitialAd.onError(err => {
            })
        }
    },

    show: function () {
        // 在适合的场景显示插屏广告
        if (this.interstitialAd) {
            cc.zy.zySdk.sendEv(0, "插屏广告", "", "")//在线时长
            this.interstitialAd.show().catch((err) => {
                cc.zy.zySdk.sendEv(0, "插屏广告异常", "", "")//在线时长
                console.error(err)
            })
        }
    },

   
});

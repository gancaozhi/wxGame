

cc.Class({
    extends: cc.Component,

    properties: {
        showvedio: false,//是否正在观看视频
        _show: true,//是否正在观看视频
    },
    init: function () {
        if (window[cc.zy.platform] != undefined) {
            var self = this
            self._top = 0
            this.windowWidth = 300
            this.windowHeight = 500
            window[cc.zy.platform].getSystemInfo({
                success: function (res) {
                    self.windowWidth = res.windowWidth
                    self.windowHeight = res.windowHeight
                }
            })

            this.realHeight = 720 * self.windowHeight / self.windowWidth
        }
        this.refreshBannerAd()
        cc.zy.ad.setTop(-5000)
        //  this.run()
    },
    run: function () {
        // if (window[cc.zy.platform] != undefined) {
        //     var self = this
        //     this.windowWidth = 300
        //     this.windowHeight = 500
        //   window[cc.zy.platform].getSystemInfo({
        //         success: function (res) {
        //             self.windowWidth = res.windowWidth
        //             self.windowHeight = res.windowHeight
        //         }
        //     })

        //     this.realHeight = 720 * self.windowHeight / self.windowWidth
        //     if ( cc.zy.isIpx) {
        //         self._top = self.windowHeight * 1060 / 1280
        //     } else {
        //         self._top = self.windowHeight * 1080 / 1280
        //     }

        //     // this.refreshBannerAd();
        //     this.schedule(this.refreshBannerAd,cc.zy.globle.adFreshTime);
        // }
    },
    stop: function () {
        // this.destroyBannerAd()
        // this.unschedule(this.refreshBannerAd);
    },

    refreshBannerAd: function () {
        // console.log("refreshBannerAd")
        var self = this

        if (window[cc.zy.platform] != undefined) {
            if (this._bannerAd) {
                this._bannerAd.destroy()
            }

            this.windowWidth = 720
            this.windowHeight = 1280
            window[cc.zy.platform].getSystemInfo({
                success: function (res) {
                    console.log("getSystemInfo", res)
                    self.windowWidth = res.windowWidth
                    self.windowHeight = res.windowHeight
                    console.log(self.windowHeight)
                    self._bannerAd = window[cc.zy.platform].createBannerAd({
                        // adUnitId:  cc.zy.bannerId,
                        adUnitId: cc.zy.bannerId,
                        style: {
                            left: 0 ,
                            top: -5000,
                            width: self.windowWidth,
                            height: 80,
                        }
                    })
                    self._bannerAd.onError(err => {
                        console.log("广告条异常", res)
                        cc.zy.wxApi.aldEv("广告条异常", { "err": err.errMsg })
                    })
                    self._bannerAd.onLoad(function name(params) {
                        console.log("广告条onLoad")
                        self._bannerAd.show()
                    })
                    self._bannerAd.onResize(res => {
                        self._bottom = self.windowHeight - res.height
                        // self._bannerAd.style.top = self.windowHeight - res.height
                    })
                    // cc.zy.ad.setTop(-5000)
                }
            })



            // this._bannerAd.style.width = self.windowWidth * 0.7
            // this._bannerAd.style.left = self.windowWidth * 0.15


        }
    },
    addy: function (y) {
        // if (cc.zy.isShow )this._bannerAd.style.top += y
    },
    destroyBannerAd: function () {
        // if (window[cc.zy.platform] != undefined) {
        //     if (this._bannerAd) {
        //         this._bannerAd.destroy()
        //     }
        // }
    },
    setTop: function (y) {
        if (window[cc.zy.platform] != undefined) {
            this._bannerAd.style.top = this.windowHeight * (y + this.realHeight / 2) / this.realHeight
            this._top = this.windowHeight * (y + this.realHeight / 2) / this.realHeight
            // this._bannerAd.style.top = 0
            // this._top = 0
        }
    },
    setBottom: function () {
        if (window[cc.zy.platform] != undefined) {
            this._bannerAd.style.top = this._bottom
        }
    },
    show: function () {
        this._show = true
        if (window[cc.zy.platform] != undefined) {
            if (this._bannerAd) {
                this._bannerAd.show()
                // this._bannerAd.style.top = this._top
            }
        }
        //   this.refreshBannerAd()
    },
    hide: function () {
        // this._show = false
        // if (window[cc.zy.platform] != undefined) {
        //     if (this._bannerAd) {
        //         this._bannerAd.hide()
        //         // this._bannerAd.style.top = -500
        //     }
        // }
        //    this.stop()
        //    if(this._bannerAd){
        //      this._bannerAd.hide()
        //    }
    },
});

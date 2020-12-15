
cc.Class({
    extends: cc.Component,

    properties: {

    },
    onLoad(_onCloseCallBack, _noAdCallBack) {
        this._onSuccess = null
        this._onFail = null
        this.share = false
    },

    showShare(_onSuccess, _onFail) {
        var self = this
        cc.zy.wxApi.share();
        this.share = true
        cc.zy.backgroundTime = 0;
        this._onSuccess = _onSuccess
        this._onFail = _onFail
    },
    run: function () {
        this.schedule(this.tick, 0.1);
    },
    tick: function () {
        if (this.share) {
            if (cc.zy.backgroundTime > 2 && cc.zy.backgroundTime < 600) {
                this.share = false
                cc.zy.backgroundTime = 0;
                if (this._onSuccess) {
                    this._onSuccess()
                    this._onSuccess = null
                }
            } else {
                if (cc.zy.backgroundTime > 0 && cc.zy.backgroundTime < 2) {
                    if (this._onFail) {
                        this._onFail()
                        this._onFail = null
                        this.share = false
                    }
                }
            }
        }
    },

});

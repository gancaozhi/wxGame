
cc.Class({
  extends: cc.Component,

  properties: {
    moneyLable: cc.Label,
    yueLable: cc.Label,
  },
  close() {
    if (cc.sys.localStorage.getItem("isauthorize") != 1) {
      cc.zy.wxApi.getUserInfo()//微信授权
    }
    this.node.active = false;

    let yue = cc.find("Canvas/pan_huafei/yue")
    let yueLable = yue.getComponent(cc.Label)
    var old = parseFloat(cc.zy.utils.getHongbao())
    yueLable.string = old.toFixed(2) + "元"

    var m1 = cc.moveTo(0, -1357, 5);
    var m2 = cc.moveTo(0.3, 0, -6);
    var sequence = cc.sequence(m1, m2)
    yue.runAction(sequence)
  },
  onEnable() {
    this._money = cc.zy.utils.getMoney()
    var old = parseFloat(cc.zy.utils.getHongbao())
    old += this._money
    cc.zy.utils.setHongbao(old.toFixed(2));

    var old = parseFloat(cc.zy.utils.getHongbao())
    this.yueLable.string = "当前话费：" + old.toFixed(2) + "元"

    this.moneyLable.string = "" + this._money.toFixed(2) + "元"
  },

  onLoad() {
    this.fangqi = this.node.getChildByName("fangqi");
  },

  double: function () {
    var self = this
    var success = function () {
      if (cc.sys.localStorage.getItem("isauthorize") != 1) {
        cc.zy.wxApi.getUserInfo()//微信授权
      }
      cc.zy.wxApi.aldSendEvent2("双倍礼包领取成功", { "channel": cc.sys.localStorage.getItem("channel") })
      self.node.active = false;
      var old = parseFloat(cc.zy.utils.getHongbao())
      old += self._money
      self.yueLable.string = old.toFixed(2) + "元"
      cc.zy.utils.setHongbao(old.toFixed(2));
      cc.zy.wxApi.tip("双倍领取成功！成功领取" + self._money * 2 + "话费券" + "！已经存入余额！");

      let yue = cc.find("Canvas/pan_huafei/yue")
      let yueLable = yue.getComponent(cc.Label)
      var old = parseFloat(cc.zy.utils.getHongbao())
      yueLable.string = old.toFixed(2) + "元"
    };
    cc.zy.jili.jili(success.bind(this));
  },

  open() {
    this.close()
    let page = cc.find("Canvas/huafeiPage")
    page.active = true
  },

  guanzhuGzh() {
    if (cc.zy.globle.gzh == 1) {
      var self = this
      wx.showModal({
        title: '提示',
        content: "进入客服回复“1”，即可兑换！",
        confirmText: '去兑换',
        // cancelText: '取消',
        confirmColor: '#3cc51f',
        // cancelColor: '#3cc51f',
        // showCancel: true,
        success(res) {
          if (res.confirm) {
            cc.zy.wxApi.openKefu();
          } else if (res.cancel) {
            cc.zy.wxApi.openKefu();
          }
        }
      })
    } else {
      wx.aldSendEvent("二维码进入公众号", { "channel": cc.sys.localStorage.getItem("channel") })
      wx.previewImage({
        current: cc.zy.globle.gzh, // 当前显示图片的http链接
        urls: [cc.zy.globle.gzh],// 需要预览的图片http链接列表
      })
    }
  },
});

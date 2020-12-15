
cc.Class({
    extends: cc.Component,

    properties: {

    },
    isFist: function (key) {
        if (cc.sys.localStorage.getItem(key) == null || cc.sys.localStorage.getItem(key) == "") {
            return true
        }else{
            return false
        }
    },
    setKey: function (key, value) {
        cc.sys.localStorage.setItem(key, value)
    },
    getKey: function (key, def) {
        if (cc.sys.localStorage.getItem(key) == null || cc.sys.localStorage.getItem(key) == "") {
            cc.sys.localStorage.setItem(key, def)
        }
        return cc.sys.localStorage.getItem(key);
    },
 
});

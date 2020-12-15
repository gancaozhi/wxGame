
cc.Class({
    extends: cc.Component,
    properties: {

    },


    init() {
        cc.loader.loadRes("audio/" + 'bg', function (err, clip) {
            // cc.audioEngine.play(clip, true, 1);
            cc.audioEngine.playMusic(clip, true);
            cc.audioEngine.setMusicVolume(0.5);
        });
        // this.load2048()
        this.loadpop()
        // this.loadlbx()
    },
    pauseBg() {
        cc.audioEngine.pauseMusic();
    },
    playBg() {
        cc.audioEngine.resumeMusic();
    },

    start() {

    },



    loadpop() {
        var self = this
        var cliplist = ["genben", "gongxiguoguan", "jingcai", "ku", "pop", "taibangle", "hihi",
        "great", "cool", "good", "readygo", "select", 
        "pop_star", "bomb","lost","won",  "cheers", "applause", "button_start", "gold"]
        for (let index = 0; index < cliplist.length; index++) {
            const name = cliplist[index];
            //     cc.loader.load(downloadUrl+"audio/pop/"+name+".mp3", function(err, clip) {
            //         self[name]=clip
            // });
            cc.loader.loadRes("audio/" + name, function (err, clip) {
                self[name] = clip
            });
        }

    },

    playAudio: function (name) {
        if (cc.zy.audio)
            cc.audioEngine.playEffect(this[name])
    },


});

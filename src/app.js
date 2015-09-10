
var StartLayer = cc.Layer.extend({
    sprite:null,
    MiniBox:null,
    ctor:function () {
        this._super();

        var winsize = cc.director.getWinSize();
        var widthcenter = winsize.width / 2;
        var hightcenter = winsize.height / 2;
        var centerPos = cc.p(widthcenter, hightcenter);

        // play button
        var playButton = new ccui.Button(
            res.BTPlayNormal,
            res.BTPlaySelected      
        );
        playButton.setTouchEnabled(true);
        playButton.setPressedActionEnabled(true);
        playButton.x = winsize.width / 2;
        playButton.y = winsize.height / 2;
        playButton.addTouchEventListener(this.onPlay,this);
        this.addChild(playButton,10);
        
        var spriteBG = new cc.Sprite(res.FWBackground);
        spriteBG.setPosition(centerPos);
        this.addChild(spriteBG);
    },

    onPlay:function(){
      cc.director.runScene(new MinionScene());
    }

});

var StartScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new StartLayer();
        this.addChild(layer);
    }
});





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


        var reportMenu = new cc.Menu(
            new cc.MenuItemImage(
                res.IconBanana,
                res.IconBanana,
                this.onShowReport, this)
            );
        reportMenu.x = 350;
        reportMenu.y = 350;
        this.addChild(reportMenu,3);
    },

    onPlay:function(){
      cc.director.runScene(new MinionScene());
    },

    onShowReport:function(){
        rep = new ReportLayer(
            0,
            ['Bro','Ave','Slv','HoC','Flash','3-Body'],
            [1,2,3,4,5,6],
            [1,2,3,4,5,6],
            [2,3,4,5,5,6],
            ['w1','w3','w3','w2','w1','w3'],
            123
            );
        this.addChild(rep,90);
    }

});

var StartScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new StartLayer();
        this.addChild(layer);
    }
});




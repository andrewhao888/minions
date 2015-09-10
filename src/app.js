
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    MiniBox:null,
    ctor:function () {
        this._super();

        var winsize = cc.director.getWinSize();
        var widthcenter = winsize.width / 2;
        var hightcenter = winsize.height / 2;
        var centerPos = cc.p(widthcenter, hightcenter);

        var closeItem = new cc.MenuItemImage(
            res.BTPlayNormal,
            res.BTPlaySelected,
            this.onPlay, this);
        closeItem.attr({
            x: widthcenter,
            y: hightcenter,
            anchorX: 0.5,
            anchorY: 0.5
        });

        var menu = new cc.Menu(closeItem);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);
        
        var spriteBG = new cc.Sprite(res.FWBackground);
        spriteBG.setPosition(centerPos);
        this.addChild(spriteBG);
  
    },

    onPlay:function(){
      cc.director.runScene(new MinionScene());
    }

});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});




var BackgroundLayer = cc.Layer.extend({
  ctor : function () {
    this._super();
    this.init();
  },

  init : function () {
    this._super();

    var winsize = cc.director.getWinSize();
    var widthcenter = winsize.width / 2;
    var hightcenter = winsize.height / 2;
    var centerPos = cc.p(widthcenter, hightcenter);
    
    var spriteBG = new cc.Sprite(res.FWBackground);
    spriteBG.setPosition(centerPos);
    this.addChild(spriteBG);
  
  }

});
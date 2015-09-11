var AdvertiserLayer = cc.Layer.extend({
  ctor : function() {
    this._super();
    this.init();
  },

  init : function() {
    this._super();

    var winsize = cc.director.getWinSize();
    var widthcenter = winsize.width / 2;
    var hightcenter = winsize.height / 2;
    var centerPos = cc.p(widthcenter, hightcenter);


    cc.spriteFrameCache.addSpriteFrames(res.AdvBMW_plist);
    var minion1 = new cc.SpriteBatchNode(res.AdvBMW_png);
    minion1.setPosition(widthcenter - 180, hightcenter + 350);
    this.addChild(minion1);

    var animFrames1 = [];
    var plus = Math.round(Math.random() * 200);
    for (var i = 0; i < 8 + plus; i++) { 
      var str = "stuart_bmw_0.png";
      if( i >= 8 ) {
        str = "stuart_bmw_0.png";
      } else {
        str = "stuart_bmw_" + i + ".png";
      }
      var frame = cc.spriteFrameCache.getSpriteFrame(str);
      animFrames1.push(frame);
    }

    var animation1 = new cc.Animation(animFrames1, 0.1);
    this.runningAction = new cc.RepeatForever(new cc.Animate(animation1));
    this.sprite = new cc.Sprite("#stuart_bmw_0.png"); 
    this.sprite.runAction(this.runningAction);
    minion1.addChild(this.sprite);


    cc.spriteFrameCache.addSpriteFrames(res.AdvBurger_plist);
    var minion2 = new cc.SpriteBatchNode(res.AdvBurger_png);
    minion2.setPosition(widthcenter, hightcenter + 370);
    this.addChild(minion2);

    var animFrames2 = [];
    var plus = Math.round(Math.random() * 200)
    for (var i = 0; i < 9 + plus; i++) { 
      var str = "tim_burger_0.png";
      if( i >= 9 ) {
        str = "tim_burger_0.png";
      } else {
        str = "tim_burger_" + i + ".png";
      }
      var frame = cc.spriteFrameCache.getSpriteFrame(str);
      animFrames2.push(frame);
    }

    var animation2 = new cc.Animation(animFrames2, 0.1);
    this.runningAction = new cc.RepeatForever(new cc.Animate(animation2));
    this.sprite = new cc.Sprite("#tim_burger_0.png"); 
    this.sprite.setScale(1.2, 1.2);
    this.sprite.runAction(this.runningAction);
    minion2.addChild(this.sprite);


    cc.spriteFrameCache.addSpriteFrames(res.AdvCola_plist);
    var minion3 = new cc.SpriteBatchNode(res.AdvCola_png);
    minion3.setPosition(widthcenter + 180, hightcenter + 340);
    this.addChild(minion3);

    var animFrames3 = [];
    var plus = Math.round(Math.random() * 200);
    for (var i = 0; i < 5 + plus; i++) { 
      var str = "jorge_cola_0.png";
      if( i >= 5 ) {
        str = "jorge_cola_0.png";
      } else {
        str = "jorge_cola_" + i + ".png";
      }
      var frame = cc.spriteFrameCache.getSpriteFrame(str);
      animFrames3.push(frame);
    }

    var animation3 = new cc.Animation(animFrames3, 0.1);
    this.runningAction = new cc.RepeatForever(new cc.Animate(animation3));
    this.sprite = new cc.Sprite("#jorge_cola_0.png"); 
    this.sprite.runAction(this.runningAction);
    minion3.addChild(this.sprite);

  }
})



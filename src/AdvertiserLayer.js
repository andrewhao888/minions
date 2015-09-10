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
    for (var i = 0; i < 8; i++) { 
      var str = "stuart_bmw_" + i + ".png";
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
    for (var i = 0; i < 9; i++) { 
      var str = "tim_burger_" + i + ".png";
      var frame = cc.spriteFrameCache.getSpriteFrame(str);
      animFrames2.push(frame);
    }

    var animation2 = new cc.Animation(animFrames2, 0.1);
    this.runningAction = new cc.Animate(animation2);
    this.sprite = new cc.Sprite("#tim_burger_0.png"); 
    this.sprite.setScale(1.2, 1.2);
    
    var rand = Math.random() * 0.1;
    var delay = cc.DelayTime.create(rand);
    cc.Sequence.create(
      cc.DelayTime.create(rand),
      cc.RepeatForever.create(cc.Animate.create(animation)))
    );

var delay = cc.DelayTime.create(1);
var action = cc.FadeIn.create(delay);

    while(true) {
      this.sprite.runAction(this.runningAction);
    };


    minion2.addChild(this.sprite);


    cc.spriteFrameCache.addSpriteFrames(res.AdvCola_plist);
    var minion3 = new cc.SpriteBatchNode(res.AdvCola_png);
    minion3.setPosition(widthcenter + 180, hightcenter + 340);
    this.addChild(minion3);

    var animFrames3 = [];
    for (var i = 0; i < 5; i++) { 
      var str = "jorge_cola_" + i + ".png";
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



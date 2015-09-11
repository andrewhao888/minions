var StartLayer = cc.Layer.extend({
  sprite:null,
  MiniBox:null,
  ctor:function () {
    this._super();

    var winsize = cc.director.getWinSize();
    var widthcenter = winsize.width / 2;
    var hightcenter = winsize.height / 2;
    var centerPos = cc.p(widthcenter, hightcenter);

    // background
    var spriteBG = new cc.Sprite(res.StartBackground);
    spriteBG.setPosition(centerPos);
    this.addChild(spriteBG, 0);

    //logo
    var logoMinions = new ccui.ImageView(res.LogoMinions);
    var logoFW = new ccui.ImageView(res.LogoFW);

    logoMinions.x = winsize.width / 2;
    logoMinions.y = winsize.height*4 / 5 - 70;
    logoMinions.setScale(0.9, 1.1);

    logoFW.x = winsize.width / 2;
    logoFW.y = winsize.height*3 / 5 + 30;
    logoFW.setScale(1.4, 1.5);

    this.addChild(logoMinions, 2);
    this.addChild(logoFW, 3);

    // play button
    var playButton = new cc.MenuItemImage(
      res.BTPlayNormal,
    	res.BTPlaySelected,
    	this.onPlay, this);
    playButton.attr({
    	x: winsize.width / 2,
    	y: winsize.height*2 / 5,
    	anchorX: 0.5,
    	anchorY: 0.5
    });
    playButton.setScale(1.2, 1.2);
    		
    var menu = new cc.Menu(playButton);
    menu.x = 0;
    menu.y = 0;
    this.addChild(menu, 1);

    //minions queue plist
    cc.spriteFrameCache.addSpriteFrames(res.Queue_plist);
    queuePlist = new cc.SpriteBatchNode(res.Queue_png);
    queuePlist.setScale(2, 2);
    queuePlist.x = -800;
    queuePlist.y = -1035;
    this.addChild(queuePlist,2);

    var animFrames = [];
    for (var i = 0; i < 31; i++) {   
    	var str = "queue_s_" + i + ".png" 
    	var frame = cc.spriteFrameCache.getSpriteFrame(str);
    	animFrames.push(frame);
    }

    var animation = new cc.Animation(animFrames, 0.1);
    this.runningAction = new cc.RepeatForever(new cc.Animate(animation));
    this.sprite = new cc.Sprite("#queue_s_0.png"); 
    this.sprite.attr({x:winsize.width*3 / 4, y:winsize.height / 2});
    this.sprite.runAction(this.runningAction);
    queuePlist.addChild(this.sprite);
  },

  onPlay:function(){
    cc.director.runScene(new MinionScene());
  },
});

var StartScene = cc.Scene.extend({
  onEnter:function () {
    this._super();
    var layer = new StartLayer();
    this.addChild(layer);
  }
});

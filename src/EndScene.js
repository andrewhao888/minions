var EndLayer = cc.Layer.extend({
  _fontType:"Arial",
  _fontSize:25,
  _centerPos:null,

  ctor : function(score) {
    this._super();
    this.init(score);
  },

  init:function(score){
    this._super();

    var winsize      = cc.director.getWinSize();
    var widthcenter  = winsize.width / 2;
    var hightcenter  = winsize.height / 2;
    this._centerPos  = cc.p(widthcenter, hightcenter);

    this.renderTitle();
    this.renderScore();
    this.render();
    this.renderCast();
  },

  renderTitle:function(){
    var labelTitle = new cc.LabelTTF(
      'End of Game', this._fontType, this._fontSize + 10);
    labelTitle.setPosition(this._centerPos.x, this._centerPos.y+400);
    this.addChild(labelTitle);
  },

  renderScore:function(){
    var labelTitle = new cc.LabelTTF(
      'Total Revenue:', this._fontType, this._fontSize);
    labelTitle.setPosition(this._centerPos.x+200, this._centerPos.y+200);
    this.addChild(labelTitle);

    var coin = new cc.Sprite(res.IconBanana);
    coin.setPosition(this._centerPos.x+150, this._centerPos.y+150);
    this.addChild(coin);

    var labelScore = new cc.LabelTTF(
      Score.toFixed(2), this._fontType, this._fontSize);
    labelScore.setPosition(this._centerPos.x+230, this._centerPos.y+150);
    this.addChild(labelScore);
  },

  renderCast:function(){
    var labelCast = new cc.LabelTTF(
      'Cast', this._fontType, this._fontSize+5);
    labelCast.setPosition(this._centerPos.x-150, this._centerPos.y-100);
    this.addChild(labelCast);

    var labelStuff = new cc.LabelTTF(
      'Stuff', this._fontType, this._fontSize+5);
    labelStuff.setPosition(this._centerPos.x+150, this._centerPos.y-100);
    this.addChild(labelStuff);

    var casts = ['Stuart','Dave','Bob','Kevin','Tim','Mark','Jorge','Phil'];
    for(var i = 0; i < 7; i++){
      var label = new cc.LabelTTF(
        casts[i], this._fontType, this._fontSize);
      label.setPosition(this._centerPos.x-150, this._centerPos.y-150-40*i);
      label.setFontFillColor(new cc.Color(255,0,0));
      this.addChild(label);
    }

    var stuffs = ['美工 女神', '码农1号 好心人', '码农2号 小鲜肉', '游戏策划 404&500']
    for(var i = 0; i < 4; i++){
      var label = new cc.LabelTTF(
        stuffs[i], this._fontType, this._fontSize);
      label.setPosition(this._centerPos.x+150, this._centerPos.y-150-40*i);
      label.setFontFillColor(new cc.Color(255,255,0));
      this.addChild(label);
    }
  },

  render:function(){
    cc.spriteFrameCache.addSpriteFrames(res.EndWin_plist);
    queuePlist = new cc.SpriteBatchNode(res.EndWin_png);
    queuePlist.setScale(2, 2);
    queuePlist.x = -800;
    queuePlist.y = -1035;
    this.addChild(queuePlist,2);

    var animFrames = [];
    for (var i = 0; i < 9; i++) {
      var str = "dave_win_" + i + ".png"
      var frame = cc.spriteFrameCache.getSpriteFrame(str);
      animFrames.push(frame);
    }

    var animation = new cc.Animation(animFrames, 0.1);
    this.runningAction = new cc.RepeatForever(new cc.Animate(animation));
    winAnimation = new cc.Sprite("#dave_win_0.png");
    winAnimation.attr({x:400, y:500});
    winAnimation.runAction(this.runningAction);
    queuePlist.addChild(winAnimation);
  }
});

var EndScene = cc.Scene.extend({
  onEnter:function () {
    this._super();
    this.addChild(new BackgroundLayer());
    this.addChild(new EndLayer());
  }
});

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
    this.renderCast();
    if(Score < 0) this.renderWin();
    else this.renderLose();
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

  renderLose:function(){
    cc.spriteFrameCache.addSpriteFrames(res.EndLose_plist);
    var losePng = new cc.SpriteBatchNode(res.EndLose_png);
    losePng.setPosition(this._centerPos.x, this._centerPos.y);
    this.addChild(losePng);

    var loseFrames = [];
    for (var i = 0; i < 8; i++) {
      loseFrames.push(
        cc.spriteFrameCache.getSpriteFrame(
          "jorge_lose_" + i + ".png")
      );
    }

    var loseAnimation = new cc.Sprite("#jorge_lose_0.png");
    loseAnimation.runAction(
      new cc.RepeatForever(
        new cc.Animate(
          new cc.Animation(loseFrames, 0.1))
        )
      );
    loseAnimation.setPosition(this._centerPos.x-75, this._centerPos.y+150);
    this.addChild(loseAnimation);
  },

  renderWin:function(){
    cc.spriteFrameCache.addSpriteFrames(res.EndWin_plist);
    var winPng = new cc.SpriteBatchNode(res.EndWin_png);
    winPng.setPosition(this._centerPos.x, this._centerPos.y);
    this.addChild(winPng);

    var winFrames = [];
    for (var i = 0; i < 9; i++) {
      winFrames.push(
        cc.spriteFrameCache.getSpriteFrame(
          "dave_win_" + i + ".png")
      );
    }

    var winAnimation = new cc.Sprite("#dave_win_0.png");
    winAnimation.runAction(
      new cc.RepeatForever(
        new cc.Animate(
          new cc.Animation(winFrames, 0.1))
        )
      );
    winAnimation.setPosition(this._centerPos.x-75, this._centerPos.y+150);
    this.addChild(winAnimation);
  }
});

var EndScene = cc.Scene.extend({
  onEnter:function () {
    this._super();
    this.addChild(new BackgroundLayer());
    this.addChild(new EndLayer());
  }
});

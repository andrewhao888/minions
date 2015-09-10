var ReportLayer = cc.Layer.extend({
  _fontType:"Arial",
  _fontSize:25,
  _centerPos:null,
  _horizonPos:null,
  _vertical:null,
  m_touchListener:null,

  ctor : function (inventories, costs, asks, bids, wins, total) {
    this._super();
    this.init(inventories, costs, asks, bids, wins, total);

    var touchListener = {
      event: cc.EventListener.TOUCH_ONE_BY_ONE,
      swallowTouches: true,
      onTouchBegan: this.onTouchBegan,
      isTouchInside: this.isTouchInside
    };
    cc.eventManager.addListener(touchListener, this);
    this.m_touchListener = touchListener;
  },

  isTouchInside:function(owner,touch) {
    if(!owner || !owner.getParent()){
      return false;
    }
    var touchLocation = touch.getLocation(); // Get the touch position
    touchLocation = owner.getParent().convertToNodeSpace(touchLocation);
    return cc.rectContainsPoint(owner.getBoundingBox(), touchLocation);
  },

  onTouchBegan:function(touch, event) {
    var target = event.getCurrentTarget();
    if(!target.isVisible() || (!this.isTouchInside(target,touch))){
      return false;
    }
    return true;
  },

  init : function (inventories, costs, asks, bids, wins, total) {
    this._super();

    var winsize      = cc.director.getWinSize();
    var widthcenter  = winsize.width / 2;
    var hightcenter  = winsize.height / 2;
    this._centerPos  = cc.p(widthcenter, hightcenter);
    this._horizonPos = [108.96, 213.71, 315.71, 423.42, 537.93];
    this._vertical   = [695.86, 640.47, 593.92, 560.42, 526.92,
                        493.42, 458.92, 424.92, 358.76, 272.34];

    this.renderBg();
    this.renderGrid(inventories, costs, asks, bids, wins, total);
    this.renderClose();
  },

  renderBg:function(){
    bgImg = new cc.Sprite(res.RPTBackground);
    bgImg.setPosition(this._centerPos.x, this._centerPos.y - 100);
    this.addChild(bgImg);
  },

  renderGrid:function(inventories, costs, asks, bids, wins, total){
    columnTitle = ['Inventory','Cost','Ask','Sold','Winner'];
    for (var i = 0; i < 5; i++){
      var label = new cc.LabelTTF(
        columnTitle[i], this._fontType, this._fontSize+5);
      label.setPosition(this._horizonPos[i],this._vertical[0]);
      this.addChild(label);
    }

    for (var i = 1; i < 4; i++){
      var coin = new cc.Sprite(res.IconBanana);
      coin.setPosition(this._horizonPos[i],this._vertical[1]);
      this.addChild(coin);
    }

    var sum = [0, 0, 0];
    for (var i = 0; i < 6; i++){
      var inventory = new cc.LabelTTF(
        inventories[i], this._fontType, this._fontSize);
      inventory.setPosition(this._horizonPos[0],this._vertical[i+2]);
      this.addChild(inventory);

      var cost = new cc.LabelTTF(
        costs[i].toFixed(2), this._fontType, this._fontSize);
      cost.setFontFillColor(new cc.Color(255,0,0));
      cost.setPosition(this._horizonPos[1],this._vertical[i+2]);
      this.addChild(cost);

      var ask = new cc.LabelTTF(
        asks[i].toFixed(2), this._fontType, this._fontSize);
      ask.setFontFillColor(new cc.Color(255,0,0));
      ask.setPosition(this._horizonPos[2],this._vertical[i+2]);
      this.addChild(ask);

      var sold = new cc.LabelTTF(
        bids[i].toFixed(2), this._fontType, this._fontSize);
      sold.setFontFillColor(new cc.Color(255,0,0));
      sold.setPosition(this._horizonPos[3],this._vertical[i+2]);
      this.addChild(sold);

      var winner = new cc.LabelTTF(
        wins[i], this._fontType, this._fontSize);
      winner.setFontFillColor(new cc.Color(255,255,0));
      winner.setPosition(this._horizonPos[4],this._vertical[i+2]);
      this.addChild(winner);

      sum[0] += costs[i];
      sum[1] += asks[i];
      sum[2] += bids[i];
    }

    var labelSum = new cc.LabelTTF(
      'SUM', this._fontType, this._fontSize);
    labelSum.setPosition(this._horizonPos[0],this._vertical[8]);
    this.addChild(labelSum);
    for (var i = 0; i < 3; i++){
      var label = new cc.LabelTTF(
        sum[i].toFixed(2), this._fontType, this._fontSize);
      label.setFontFillColor(new cc.Color(255,0,0));
      label.setPosition(this._horizonPos[i + 1],this._vertical[8]);
      this.addChild(label);
    }

    var labelTotal = new cc.LabelTTF(
      'Total Revenue:', this._fontType, this._fontSize+5);
    labelTotal.setPosition(this._horizonPos[1], this._vertical[9]);
    this.addChild(labelTotal);

    var labelTotalScore = new cc.LabelTTF(
      total.toFixed(2), this._fontType, this._fontSize+5);
    labelTotalScore.setFontFillColor(new cc.Color(0,0,255));
    labelTotalScore.setPosition(382.96, this._vertical[9]);
    this.addChild(labelTotalScore);

    var coin = new cc.Sprite(res.IconBanana);
    coin.setPosition(482.23,this._vertical[9]);
    this.addChild(coin);
  },

  renderClose:function(){
    var menu = new cc.Menu(
      new cc.MenuItemImage(
        res.BTBackNormal,
        res.BTBackSelected,
        this.onClose, this
      ));
    menu.x = this._centerPos.x;
    menu.y = this._centerPos.y-400;
    this.addChild(menu, 1);
  },

  onClose:function(){
    this.removeFromParentAndCleanup();
  }

});

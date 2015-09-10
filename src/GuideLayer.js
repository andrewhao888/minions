var GuideLayer = cc.Layer.extend({
  _centerPos:null,
  ctor : function () {
    this._super();
    this.init();

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

  init:function (inventories, costs, asks, bids, wins, total) {
    this._super();

    var winsize      = cc.director.getWinSize();
    this._centerPos  = cc.p(winsize.width / 2, winsize.height / 2);
    this.renderBg();
    this.renderText();
    this.renderClose();
  },

  renderBg:function(){
    bgImg = new cc.Sprite(res.GuideBackground);
    bgImg.setPosition(this._centerPos.x, this._centerPos.y - 100);
    this.addChild(bgImg);
  },

  renderText:function(){
    var texts =
    ["You are a Content Right Owner!",
     "Inventories are your goods.",
     "You can give every inventory its Ask",
     "then let the Advertisers biding for them",
     "You don't know advertisers'",
     "budget and their biding strategy.",
     "But you do know your revenue will be",
     "the Difference between Ask and Cost.",
     "Just try to get the best total revenue after",
     "advertiser's 5 rounds biding.",
     "Good Luck.",
     ""
     // "Hello～ 你的身份是Content Right Owner。",
     // "你手上有6块Inventory, 它们各自有各自的成本(Cost).",
     // "为了赚钱，你必须设定合理的起拍价(Ask)",
     // "由三位advertiser进行实时竞价。",
     // "三位advertiser的竞价是有规律的，但是你并不清楚细节。",
     // "每轮依次对6块Inventory进行竞价",
     // "价高者会赢得Inventory并支付你你所Ask的钱。",
     // "5轮后完成游戏，你会得到最终的净收入(Revenue)。",
     // "如果收入太低，也许会被嘲笑～",
     // "祝你身体健康，好运"
     ];

    for (var i = 0; i < texts.length; i ++){
      var label = new cc.LabelTTF(
        texts[i], 'Arial', 25);
      label.setFontFillColor(new cc.Color(146,215,166));
      label.setPosition(this._centerPos.x,this._centerPos.y + 150 - i*40);
      label.setHorizontalAlignment(30);
      this.addChild(label);
    }
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

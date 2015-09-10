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
    this.renderClose();
  },

  renderBg:function(){
    bgImg = new cc.Sprite(res.RPTBackground);
    bgImg.setPosition(this._centerPos.x, this._centerPos.y - 100);
    this.addChild(bgImg);
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

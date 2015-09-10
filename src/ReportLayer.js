var ReportLayer = cc.Layer.extend({
  _fontType:"Arial",
  _fontSize:25,
  _centerPos:null,
  _horizonPos:null,
  _vertical:null,
  m_touchListener:null,

  ctor : function (round, inventories, costs, bids, wins) {
    this._super();
    this.init(round, inventories, costs, bids, wins);

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

  init : function (round, inventories, costs, bids, wins) {
    this._super();

    var winsize      = cc.director.getWinSize();
    var widthcenter  = winsize.width / 2;
    var hightcenter  = winsize.height / 2;
    this._centerPos  = cc.p(widthcenter, hightcenter);
    this._horizonPos = [winsize.width / 6,
                        winsize.width / 3,
                        widthcenter,
                        widthcenter + winsize.width / 6,
                        widthcenter + winsize.width / 3];
    this._vertical   = [winsize.width / 6,
                        winsize.width / 3,
                        widthcenter,
                        widthcenter + winsize.width / 6,
                        widthcenter + winsize.width / 3];


    this.renderTitle(round);
    this.renderColumnTitle();
    this.renderClose();
  },

  renderTitle:function(round){
    var rounds = ['Init', '1st','2nd','3rd','4th','Final'];
    var title = 'The ' + rounds[round] + ' Round Report';
    var labelTitle = new cc.LabelTTF(
      title, this._fontType, this._fontSize+10);
    labelTitle.setPosition(this._centerPos.x,this._centerPos.y+500);
    this.addChild(labelTitle);
  },

  renderColumnTitle:function(){
    var columnName = ['Inventory',
                      'Cost',
                      'Starting Price',
                      'Last Round Sold',
                      'Last Round Winner'];
    for(var i = 0; i < 6; i++){
      var label = new cc.LabelTTF(
        columnName[i],
        this._fontType,
        this._fontSize);
      label.setPosition(this._horizonPos[i],this._centerPos.y+300);
      this.addChild(label);
    }
  },

  renderClose:function(){
    var menu = new cc.Menu(
      new cc.MenuItemImage(
        res.BTPlayNormal,
        res.BTPlaySelected,
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

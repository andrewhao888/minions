var BackgroundLayer = cc.Layer.extend({
  ctor:function () {
    this._super();
    this.init();
  },

  init:function () {
    this._super();
    var winsize = cc.director.getWinSize();

    var centerPos = cc.p(winsize.width / 2, winsize.height / 2);
    var spriteBG = new cc.Sprite(res.HelloWorld_png);
    spriteBG.setPosition(centerPos);
    this.addChild(spriteBG);
    
    
    var editBox = [];
    for(var i = 0; i < 3; i++){
      editBox[i] = new cc.EditBox(
      	new cc.Size(50, 50),
      	new cc.Scale9Sprite(res.start_n_png), // normal state image
      	new cc.Scale9Sprite(res.start_s_png), //select state image
      	new cc.Scale9Sprite(res.start_s_png)  //disabled state image
      );
      editBox[i].setPosition(150, winsize.height - (i+1) * 100);
      this.addChild(editBox[i]);
    }
    
    var sumUp = new cc.MenuItemSprite(
    	new cc.Sprite(res.start_n_png),
    	new cc.Sprite(res.start_s_png),
    	this.onSum, this);
    sumUp.setPosition(250, winsize.height - 300);

    var menu = new cc.Menu(sumUp);
    this.addChild(menu);
    
  },

  onSum:function (editBox) {
	var sum = 0;
  }


});
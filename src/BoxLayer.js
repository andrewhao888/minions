var BoxLayer = cc.Layer.extend({
	ctor : function () {
    this._super();
    this.init();
  },

  init : function () {
  	this._super();

    var winsize = cc.director.getWinSize();
  	var widthcenter = winsize.width / 2;
    var hightcenter = winsize.height / 2;

		editBox = [];
		for(var i = 0; i < 3; i++){
			editBox[i] = new MinionBox(
					res.start_n_png,
					res.start_s_png,
					"edit",
					i * 10
			);
			editBox[i].setPosition(widthcenter + 200 * (i-1), hightcenter);
			this.addChild(editBox[i]);
		};

		var sumUp = new cc.MenuItemSprite(
				new cc.Sprite(res.bt_play_normal_png),
				new cc.Sprite(res.bt_play_press_png),
				this.onSum,
				this
		);
		var menu = new cc.Menu(sumUp);
		menu.setPosition(widthcenter, hightcenter - 120);
		this.addChild(menu);
	},

  onSum : function () {
    var sum = 0;
    for(var i = 0; i < 3; i++){
  	  sum += editBox[i].getCost();
    }
  }

});
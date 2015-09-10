
var MinionsLayer = cc.Layer.extend({
  round:0,
  inventorys:[],
	ctor : function() {
		this._super();
		this.init();
	},

	init : function() {
		this._super();
    this.initInventroy();
	},

  onPlay : function() {
    if (this.round < 5) {
      this.round += 1;
    cc.log(this.round);
      this.getAsk(this.inventorys);
      this.initRound(this.round);
      this.sumUp();
      // this.addChild(new ReportLayer());
    } else {
      cc.director.runScene(new EndScene());
    }
  },

  initInventroy : function() {
    var letUsGo = new cc.MenuItemImage(
      res.BTGoNormal,
      res.BTGoSelected,
      this.onPlay, this);
    var goMenu = new cc.Menu(letUsGo)
      goMenu.x = 640;
      goMenu.y = 260;
    goMenu.setScale(2, 2);
    this.addChild(goMenu);

    for(var i = 0; i < 6; i++) {
      var param = InventoryParam[i]
      this.inventorys[i] = new MinionBox(
        cc.p(param.position.x, param.position.y),
        param.logoBgRes,
        param.cost,
        param.name
      );
      this.inventorys[i].setScale(2, 2);
      this.addChild(this.inventorys[i]);
    };
  },

	initRound : function(round_id) {

		var advertisers = [];
		for(var a = 0; a < 3; a++) {
			advertisers[a] = new Advertiser(AdvertiserParam[a]);
		};

		for (var i = 0; i < 6; i++) {
			this.biding(i, advertisers, round_id);
		};
	},

  getAsk : function(inventorys) {
    for (var i = 0; i < 6; i++) {
      Asks[i] = inventorys[i].getAsk();
    }
  },

	biding : function(inv_id, advertisers, round_id) {
		var ask = Asks[inv_id];
		var winner = 0;
		var bestBid = 0;

		for (var i = 0; i < 3; i++) {
			var bid = advertisers[i].getBid(inv_id, round_id);
			if (bid >= ask && bid > bestBid) {
				winner = i + 1;
				bestBid = bid;
			}
		}

		Adver[inv_id] = winner;
		Bid[inv_id] = bestBid;

	},

  sumUp : function() {
    var sum = 0;
    for (var i = 0; i < 6; i++) {
      sum += Bid[i] - Costs[i];
    }
    Score = sum;
  }

});


var MinionScene = cc.Scene.extend({
	onEnter : function() {
		this._super();
    this.addChild(new BackgroundLayer());
    this.addChild(new AdvertiserLayer());
    var minionLayer = new MinionsLayer();
    minionLayer.setScale(0.5, 0.5);
		this.addChild(minionLayer);
	}
});
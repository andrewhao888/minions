
var MinionsLayer = cc.Layer.extend({
	ctor : function() {
		this._super();
		this.init();
	},

	init : function() {
		this._super(); 

		for (var r = 1; r <= 5; r++) {
			this.initRound(r);
		}

	},

	initRound : function(round_id) {
		var inventorys = [];
    for(var i = 0; i < 6; i++) {
      var param = InventoryParam[i]
      inventorys[i] = new MinionBox(
        cc.p(param.position.x, param.position.y),
        param.logoBgRes,
        param.cost,
        param.name
      );
      inventorys[i].setScale(2, 2);
      this.addChild(inventorys[i]);
    };

		var advertisers = [];
		for(var a = 0; a < 3; a++) {
			advertisers[a] = new Advertiser(AdvertiserParam[a]);
		};

		for (var i = 0; i < 6; i++) {
			this.biding(i, advertisers, round_id);
		};
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

	}

});


var MinionScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
    this.addChild(new BackgroundLayer());
    var minionLayer = new MinionsLayer()
    minionLayer.setScale(0.5, 0.5);
		this.addChild(minionLayer);
	}
});
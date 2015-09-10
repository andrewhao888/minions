
var MinionsLayer = cc.Layer.extend({
  round:0,
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
      this.initRound(this.round);
    } else {
      cc.director.runScene(new EndScene());
    }
    this.onShowReport();
  },

  onShowReport:function(){
    var report = new ReportLayer(
        ['Bro','Ave','Slv','HoC','Flash','3-Body'],
        Costs,
        Asks,
        Bid,
        Adver,
        123
        );
    report.setScale(2);
    this.addChild(report,90);
  },

  onShowGuide:function(){
    var guide = new GuideLayer();
    guide.setScale(2);
    this.addChild(guide, 89);
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
    }

    var reportMenu = new cc.Menu(
        new cc.MenuItemImage(
            res.BTRPTNormal,
            res.BTRPTSelected,
            this.onShowReport, this)
        );
    reportMenu.x = -100;
    reportMenu.y = -150;
    this.addChild(reportMenu);

    var guideMenu = new cc.Menu(
        new cc.MenuItemImage(
            res.BTRPTNormal,
            res.BTRPTSelected,
            this.onShowGuide, this)
        );
    guideMenu.x = 750;
    guideMenu.y = -150;
    this.addChild(guideMenu);
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
	onEnter : function() {
		this._super();
    this.addChild(new BackgroundLayer());
    var minionLayer = new MinionsLayer()
    minionLayer.setScale(0.5, 0.5);
		this.addChild(minionLayer);
	}
});

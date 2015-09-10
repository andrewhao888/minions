var MinionsLayer = cc.Layer.extend({
  round:0,
  inventorys:[],
  _centerPos:null,
	ctor : function() {
		this._super();
		this.init();
	},

	init : function() {
		this._super();

    var winsize = cc.director.getWinSize();
    var widthcenter = winsize.width / 2;
    var hightcenter = winsize.height / 2;
    this._centerPos = cc.p(widthcenter, hightcenter);

    this.initInventroy();
	},

  onPlay : function() {
    if (this.round < 5) {
      this.round += 1;
    cc.log(this.round);
      this.getAsk(this.inventorys);
      this.initRound(this.round);
      this.sumUp();
    } else {
      cc.director.runScene(new EndScene());
    }
    this.onShowReport();
  },

  onShowReport:function(){
    var name = [];
    for(var i = 0; i < 6; i++) {
      name[i] = InventoryParam[i].name
    }
    var report = new ReportLayer(
        name,
        Costs,
        Asks,
        Bid,
        Adver,
        Score
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

    for(var i = 0; i < 6; i++) {
      var param = InventoryParam[i]
      this.inventorys[i] = new MinionBox(
        cc.p(param.position.x, param.position.y),
        param.logoBgRes,
        Costs[i],
        param.name
      );
      this.inventorys[i].setScale(2, 2);
      this.addChild(this.inventorys[i]);
    };

    var reportMenu = new cc.Menu(
      new cc.MenuItemImage(
        res.BTRPTNormal,
        res.BTRPTSelected,
        this.onShowReport, this)
      );
    reportMenu.setPosition(this._centerPos.x-350, this._centerPos.y-680);
    this.addChild(reportMenu);

    var guideMenu = new cc.Menu(
        new cc.MenuItemImage(
            res.BTRPTNormal,
            res.BTRPTSelected,
            this.onShowGuide, this)
        );
    guideMenu.setPosition(this._centerPos.x+350, this._centerPos.y-680);
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

  getAsk : function(inventorys) {
    for (var i = 0; i < 6; i++) {
      Asks[i] = inventorys[i].getAsk();
      inventorys[i].clearAsk();
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
      sum += Asks[i] - Costs[i];
    }
    Score += sum;
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

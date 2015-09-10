var MinionsLayer = cc.Layer.extend({
  ctor : function() {
    this._super();
    this.init();
  },

  init : function() {
    this._super(); 

    for (var r = 1; r <= 5; r++) {
      cc.log('Round: '+ r);
      this.initRound(r);
      cc.log('Adver: '+ Adver);
    }

  },

  initRound : function(round_id) {
    // var inventorys = [];
    // for(var i = 0; i < 6; i++) {
    //   inventorys[i] = new MinionBox();
    // }

    var advertisers = [];
    for(var a = 0; a < 3; a++) {
      advertisers[a] = new Advertiser(AdvertiserParam[a]);
    }

    for (var i = 0; i < 6; i++) {
      this.biding(i, advertisers, round_id);
    }
  },

  biding : function(inv_id, advertisers, round_id) {
    var ask = Asks[inv_id];
    var winner = 0;
    var bestBid = 0;

    for (var i = 0; i < 3; i++) {
      var bid = advertisers[i].getBid(inv_id, round_id);
      cc.log('i: '+i+" bid: "+bid)
      if (bid >= ask && bid > bestBid) {
        winner = i + 1;
        bestBid = bid;
      }
    }

    Adver[inv_id] = winner;
    Bid[inv_id] = bestBid;

  }

});

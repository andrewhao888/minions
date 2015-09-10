function Advertiser(param) {
  this.id     = param.id
  this.budget = param.budget;
  this.diff   = param.diff;
  this.bLeft  = this.budget;
  this.bid    = 0;

  this.getBid = function(inventory_id, round_id) {
    var original_bid = this.bid;
    if (round_id == 1) {
      this.bid = Costs[inventory_id] * this.diff + this.fluctuate(inventory_id);
    } else if (Adver[inventory_id] === this.id-1) {
      this.bid = Bid[inventory_id] * (1 - this.decay()) + this.fluctuate(inventory_id);
    } else {
      this.bid = Bid[inventory_id] * (1 + this.enhance())  + this.fluctuate(inventory_id);
    }
    this.bLeft = this.getBLeft(inventory_id);
    if (this.bid >= this.bLeft) {
      this.bid = this.bLeft;
    }
    return this.bid;
  };

  this.getBLeft = function(inventory_id) {
    if (Adver[inventory_id-1] === this.id) {
      this.bLeft = this.bLeft - this.bid;
    } else {
      this.bLeft = this.bLeft;
    }
    return this.bLeft;
  };

  this.enhance = function(){
    switch(this.id)
    { case 1:
        return this.bLeft / this.budget * 0.5; break;
      case 2:
        return 1 - this.bLeft / this.budget * 0.2; break;
      case 3:
        return 0.2; break;
    }
  }

  this.decay = function(){
    switch(this.id)
    { case 1:
        return 1 - this.bLeft / this.budget; break;
      case 2:
        return this.bLeft / this.budget; break;
      case 3:
        return 0.2; break;
    }
  };

  this.fluctuate = function(inventory_id){
    return Costs[inventory_id] * 0.1 * Math.random();
  };

}



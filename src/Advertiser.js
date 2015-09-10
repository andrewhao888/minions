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
    } else if (Advertiser[inventory_id] == this.id) {
      this.bid = this.bid * (1 - this.decay()) + this.fluctuate(inventory_id);
    } else {
      this.bid = this.bid * (1 + this.enhance())  + this.fluctuate(inventory_id);
    }
    if (this.bid >= this.bLeft) {
      this.bid = this.getBLeft();
    }
    return this.bid;
  };

  this.getBLeft = function(inventory_id) {
    if (Advertiser[inventory_id] === this.id) {
      this.bLeft = this.budget - this.bid;
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

var param1 = {
  id     : 1,
  budget : 150,
  diff   : 1.05
};

var param2 = {
  id     : 2,
  budget : 200,
  diff   : 1
};

var param3 = {
  id     : 3,
  budget : 90,
  diff   : 1.1
};

var adv1 = new Advertiser(param1);
var adv2 = new Advertiser(param2);
var adv3 = new Advertiser(param3);


var MinionLayer = cc.Layer.extend({
  ctor : function () {
    this._super();
    this.init();
  },

  init : function () {
    this._super();

    var background = ccs.load(res.mainscene_json).node;
    this.addChild(background);
    
    var buttonNodes = ccs.load(res.node_json).node;
    this.addChild(buttonNodes);
  
  }

});

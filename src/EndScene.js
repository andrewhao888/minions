var EndLayer = cc.Layer.extend({
  ctor : function() {
    this._super();
    this.init();   
  },

  init : function() {
    this._super(); 
  }

});

var EndScene = cc.Scene.extend({
  onEnter:function () {
    this._super();
    this.addChild(new EndLayer());
  }
});
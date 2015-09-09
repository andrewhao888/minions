var MinionBox = cc.Sprite.extend({
    Logo:null,
    InputBox:null,
    _position:null,
    _fontType:"Arial",
    _fontSize:18,

    // Params:
    //   position:  cc.p(100,100)
    //   logoBgRes: res.logo_png
    //   cost:      123.45
    ctor:function(position, logoBgRes, cost, history, winner) {
      this._super();

      this._position = position;
      this.renderInventory(logoBgRes);
      this.renderEditBox();
      this.renderLabels(cost);

      this.init();
    },

    renderInventory:function(path){
      var position = this._position;
      this.Logo = new cc.Sprite(path);
      this.Logo.setPosition(position.x, position.y + 56);
      this.addChild(this.Logo);
    },

    renderEditBox:function(){
      var position = this._position;
      var inputBoxBg = new cc.Sprite(res.EditBoxBg);
      inputBoxBg.setPosition(position.x+25,position.y-100);
      this.addChild(inputBoxBg);

      this.InputBox = cc.EditBox.create(
          new cc.size(200,60),
          new cc.Scale9Sprite(res.EditBoxFront)
      );
      this.InputBox.setFontSize(28)
      this.InputBox.setPosition(position.x+25,position.y-100);
      this.addChild(this.InputBox);
    },

    renderLabels:function(cost){
      var position = this._position;
      var labelValue = new cc.LabelTTF("Value:", this._fontType, this._fontSize);
      labelValue.setPosition(position.x-50,position.y-15);
      this.addChild(labelValue);

      var labelCost = new cc.LabelTTF(cost.toFixed(2), this._fontType, this._fontSize);
      labelCost.setPosition(position.x+50,position.y-15);
      this.addChild(labelCost);

      var labelPrice = new cc.LabelTTF("Price:", this._fontType, this._fontSize);
      labelPrice.setPosition(position.x-50,position.y-50);
      this.addChild(labelPrice);

      var costBg = new cc.Sprite(res.EditBoxBg);
      costBg.setPosition(position.x,position.y-50);
      this.addChild(costBg);
    },

    init:function(){
      this._super();
    },

    getAsk:function(){
      var num = Number(this.InputBox.getString());
      if(isNaN(num)) return 0;
      else  return num;
    }
})
